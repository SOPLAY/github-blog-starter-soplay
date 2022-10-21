import remarkImg from 'remark-unwrap-images';
import remarkGfm from 'remark-gfm';
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
const titleFilter = (props: string) =>
  props.replace(/ /g, '+').replace(/([^a-zA-z0-9가-힣-+])/g, '');

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: '**/*.(md|mdx)',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'Title of the post',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'Tags of the post',
      required: true,
    },
    description: {
      type: 'string',
      description: 'Description of the post',
      required: false,
    },
    image: {
      type: 'string',
      description: 'Image of the post',
      required: false,
    },
    date: {
      type: 'date',
      description: 'Date of the post',
      required: true,
    },
    serise: {
      type: 'string',
      description: 'serise of the post',
      required: false,
    },
  },
  computedFields: {
    fixedTitle: {
      type: 'string',
      resolve: (post) => titleFilter(post.title),
    },
    url: {
      type: 'string',
      resolve: (post) => `/posts/${titleFilter(post.title)}`,
    },
    fixedDescription: {
      type: 'string',
      resolve: (post) =>
        post.body.raw
          .slice(0, 300)
          .replace(/[^a-zA-Z가-힣0-9 :/()-@$%^&,.]/g, '')
          .slice(0, 150)
          .trimStart() + '...',
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: { remarkPlugins: [remarkImg, remarkGfm] },
});
