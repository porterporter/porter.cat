import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';
import { loadRenderers } from 'astro:container';
import { getContainerRenderer } from '@astrojs/mdx';

const renderers = await loadRenderers([getContainerRenderer()]);
const container = await experimental_AstroContainer.create({ renderers });

export async function GET(context) {
	const posts = await getCollection('writing');
	return rss({
		title: 'porter',
		description: 'my homepage, blog, and portfolio',
		site: context.site,
		items: await Promise.all(
			posts.map(async (post) => {
				const { Content } = await render(post);
				const data = await container.renderToString(Content);
				let body = data.split('\n').slice(0, 10).join('\n');
				body += `...<br /><a href="/writing/${post.id}/">[Read the rest here]</a>`;

				/**
				 * @type {import('@astrojs/rss').RSSFeedItem}}
				 */
				const item = {
					pubDate: post.data.published,
					content: body,
					description: 'HELLO WORLD',
					title: post.data.title ?? post.id,
					link: `/writing/${post.id}/`,
				};
				return item;
			})
		),
	});
}
