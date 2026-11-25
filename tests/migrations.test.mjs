// The deploy workflow runs this (`pnpm test:migrations`) before it migrates the production D1.
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

const migrationsDir = new URL('../src/migrations/', import.meta.url)
const migrationFiles = readdirSync(migrationsDir).filter((file) => /^\d{8}_\d{6}.*\.ts$/.test(file))

// The body of a migration's up(), wherever it sits in the file (some files declare down() first).
function upBody(source) {
  const start = source.indexOf('export async function up')
  if (start === -1) return ''
  const next = source.indexOf('export async function', start + 1)
  return next === -1 ? source.slice(start) : source.slice(start, next)
}

// Names of `__new_<table>` tables a migration's up() creates. Drizzle generates these to rebuild a
// table it can't alter in place (a new column default, dropping a column with a foreign key).
function findTableRebuilds(source) {
  return [...upBody(source).matchAll(/CREATE TABLE \\?`(__new_[A-Za-z0-9_]+)\\?`/g)].map(
    (match) => match[1],
  )
}

test('finds rebuilds in up(), whichever function comes first', () => {
  const rebuild = 'await db.run(sql`CREATE TABLE \\`__new_posts\\` (`)'
  const alter = 'await db.run(sql`ALTER TABLE \\`posts\\` ADD \\`x\\` text;`)'
  assert.deepEqual(
    findTableRebuilds(
      `export async function up() {\n${rebuild}\n}\nexport async function down() {}`,
    ),
    ['__new_posts'],
  )
  assert.deepEqual(
    findTableRebuilds(
      `export async function down() {\n${rebuild}\n}\nexport async function up() {\n${alter}\n}`,
    ),
    [],
  )
  assert.deepEqual(
    findTableRebuilds(
      `export async function down() {}\nexport async function up() {\n${rebuild}\n}`,
    ),
    ['__new_posts'],
  )
})

test('finds the migration files', () => {
  assert.ok(migrationFiles.length > 0)
})

for (const file of migrationFiles) {
  test(`${file} does not rebuild a table`, () => {
    const rebuilds = findTableRebuilds(readFileSync(new URL(file, migrationsDir), 'utf8'))
    assert.deepEqual(
      rebuilds,
      [],
      `${file} rebuilds ${rebuilds.join(', ')}. On D1, dropping the old table cascade-deletes its child rows. ` +
        'Write the migration by hand with ALTER TABLE ... ADD and CREATE TABLE; see AGENTS.md.',
    )
  })
}
