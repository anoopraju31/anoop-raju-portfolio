import { type SchemaTypeDefinition } from 'sanity'
import contactMe from './contactMe'
import projects from './projects'
import { authorType } from './blogs/author'
import { tagType } from './blogs/tags'

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [authorType, tagType, contactMe, projects]
}
