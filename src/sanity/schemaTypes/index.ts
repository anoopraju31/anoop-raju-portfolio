import { type SchemaTypeDefinition } from 'sanity'
import authorType from '@/sanity/schemaTypes/blogs/author'
import tags from '@/sanity/schemaTypes/blogs/tags'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorType, tags]
}
