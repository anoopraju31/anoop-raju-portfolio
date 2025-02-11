import { type SchemaTypeDefinition } from 'sanity'
import contactMe from './contactMe'
import projects from './projects'
import { authorType } from './blogs/author'
import { tagType } from './blogs/tags'
import { postType } from './blogs/post'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorType, tagType, contactMe, projects, postType]
}
