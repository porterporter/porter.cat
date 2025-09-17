import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { loadRenderers } from 'astro:container';
import sanitizeHtml from 'sanitize-html';
import type { APIRoute } from 'astro';

function absolutizeUrls(html: string, site: string): string {
	return html.replace(/src="\/([^"]+)"/g, `src="${site}/$1"`);
}

export const GET: APIRoute = async (context) => {
	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	const posts = await getCollection('writing');
	const url = new URL(context.request.url).origin;

	const items = posts.map(async (post) => {
		const { Content } = await render(post);
		let html = await container.renderToString(Content);

		html = absolutizeUrls(html, url);

		const cleanHtml = sanitizeHtml(html, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
			allowedAttributes: {
				...sanitizeHtml.defaults.allowedAttributes,
				img: ['src', 'alt', 'title', 'width', 'height'],
				a: ['href', 'title'],
			},
		});

		return {
			title: post.data.title ?? post.id,
			pubDate: post.data.published,
			link: `/writing/${post.id}/`,
			content: cleanHtml,
		} satisfies RSSFeedItem;
	});

	return rss({
		title: 'porter',
		description: 'my homepage, blog, and portfolio',
		site: url,
		items: await Promise.all(items),
	});
};
