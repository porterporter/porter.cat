import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer } from 'astro/container';

const container = await experimental_AstroContainer.create();

export async function GET(context) {
	const posts = await getCollection('writing');
	return rss({
		title: 'porter',
		description: 'my homepage, blog, and portfolio',
		site: context.site,
		items: posts.map(async (post) => {
			const data = await container.renderToString(render(post));
			let body = data.split('\n').slice(0, 10).join('\n');
			body += `...<br /><a href="/writing/${post.id}/">[Read the rest here]</a>`;
			return {
				pubDate: post.data.published,
				title: post.data.title ?? post.id,
				content: body,
				link: `/writing/${post.id}/`,
			};
		}),
	});
}
