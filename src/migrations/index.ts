import * as migration_20260322_154944 from './20260322_154944';
import * as migration_20261030_212004_payload_3_92 from './20261030_212004_payload_3_92';

export const migrations = [
  {
    up: migration_20260322_154944.up,
    down: migration_20260322_154944.down,
    name: '20260322_154944',
  },
  {
    up: migration_20261030_212004_payload_3_92.up,
    down: migration_20261030_212004_payload_3_92.down,
    name: '20261030_212004_payload_3_92'
  },
];
