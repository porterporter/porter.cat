import { readFileSync } from 'fs';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { defineCollection, defineConfig, s } from 'velite';

const theme = JSON.parse(
  readFileSync('./public/maple-dark-theme.json', 'utf-8')
);

const posts = defineCollection({
  name: 'Post',
  pattern: ['posts/**/*.mdx', 'posts/**/*.md'],
  schema: s.object({
    title: s.string().max(99),
    date: s.isodate(),
    description: s.string().optional(),
    body: s.mdx(),
    slug: s.slug('blog'),
    cover: s.image().optional(),
    tags: s.array(s.string()).default([]),
  }),
});

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme }],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: ['subheading-anchor'], ariaHidden: true },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
