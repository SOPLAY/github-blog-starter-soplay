import { defineDocumentType, makeSource } from 'contentlayer/source-files';
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.(md|mdx)',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'Date of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags of the post',
      required: false,
    },
    serise: {
      type: 'string',
      description: 'serise of the post',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
    titleImage: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}/title.jpg`,
    },
  },
}));

export default makeSource({ contentDirPath: 'posts', documentTypes: [Post] });
