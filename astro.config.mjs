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
	site: 'https://porter-astro.vercel.app',
	integrations: [mdx(), sitemap()],
	output: 'static',

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
		gfm: true,
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap',
					properties: {
						className: 'heading',
					},
				},
			],
		],
	},

	adapter: vercel({
		edgeMiddleware: true,
	}),
});
