// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://porter.cat',
  integrations: [mdx(), sitemap()],

  vite: {
      plugins: [tailwindcss()],
      build: {
          minify: false,
          sourcemap: 'inline',
      },
	},

  prefetch: {
      prefetchAll: true,
	},

  markdown: {
      remarkPlugins: [],
      rehypePlugins: [
          rehypeSlug,
          [
              rehypeAutolinkHeadings,
              {
                  behavior: 'wrap',
                  properties: {
                      className: 'anchor',
                  },
              },
          ],
      ],
	},

  adapter: vercel(),
});