import { type SchemaTypeDefinition } from 'sanity'
import authorType from '@/sanity/schemaTypes/blogs/author'
import tags from '@/sanity/schemaTypes/blogs/tags'
import contactMe from './contactMe'
import projects from './projects'
import blockContent from './blogs/blockContent'
import post from './blogs/post'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorType, tags, contactMe, projects]
}
