// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import tailwindcss from '@tailwindcss/vite';

import favicons from 'astro-favicons';
import remarkAlert from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
    site: 'https://porter.cat',
    integrations: [mdx(), sitemap(), favicons({
		input: 'public/icon.png',
		name: 'porter',
		short_name: 'porter',
		pixel_art: true,
	})],
    output: 'static',
    vite: {
        plugins: [tailwindcss()],
        build: {
            minify: false,
        },
        server: {
            allowedHosts: ['.local'],
        },
    },

    prefetch: {
        prefetchAll: true,
    },

    markdown: {
        gfm: true,
        remarkPlugins: [
            remarkAlert,
        ],
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
});