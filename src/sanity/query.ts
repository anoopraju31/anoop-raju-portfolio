import { groq } from 'next-sanity'

const postFields = /* groq */ `
    _id,
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    coverImage,
    readTime,
    "date": coalesce(date, _updatedAt),
    "tags": tags[]->title,
    "author": author->{"name": coalesce(name, "Anonymous"), picture},
  `

const postFieldsBlogsV2 = /* groq */ `
    _id,
    "status": select(_originalId in path("drafts.**") => "draft", "published"),
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    readTime,
    "coverImage": coverImage.asset->url,
    "seoTitle": seoTitle,
    "seoDescription": seoDescription,
    "keywords": keywords[],
    "tags": tags[]->title,
    "date": coalesce(date, _updatedAt),
    "author": author->{"name": coalesce(name, "Anonymous"), picture, socialLinks[]{ platform, url }, shortDescription},
`

const postFieldsV2 = /* groq */ `
     _id,
    "title": coalesce(title, "Untitled"),
    "slug": slug.current,
    readTime,
    "coverImage": coverImage.asset->url,
    "date": coalesce(date, _updatedAt),
    "tags": tags[]->title,
    "author": author->{"name": coalesce(name, "Anonymous"), picture},
`

export const AllBlogsQuery = groq`*[_type == "post"  ] | order(date desc, _updatedAt desc) [0...10] {${postFields}}`
export const AllBlogsQuery2 = groq`*[_type == "post"  ] | order(date desc, _updatedAt desc) {${postFields}}`
export const postQuery = groq`*[_type == "post" && slug.current == $slug] [0] {
    content, 
    conclusion,
    ${postFieldsBlogsV2}
}`
export const moreStoriesQuery = groq`*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {${postFieldsV2}}`
export const postSlugs = groq`*[_type == "post"]{slug}`
