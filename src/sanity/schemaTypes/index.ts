import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from '@/sanity/schemaTypes/blogs/author'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorType]
}
