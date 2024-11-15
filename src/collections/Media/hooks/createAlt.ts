import type { CollectionBeforeChangeHook } from 'payload'

export const createAlt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.alt) {
      const nameWithoutExtension = data.filename.replace(/\.[^/.]+$/, "");
      const words = nameWithoutExtension.replace(/[-_]/g, " ");
      const finalAlt = words.replace(/\b\w/g, (char) => char.toUpperCase())
      return {
        ...data,
        alt: finalAlt,
      }
    }
  }

  return data
}
