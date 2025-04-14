import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
	const posts = await getCollection('writing');
	return rss({
		title: 'porter',
		description: 'my homepage, blog, and portfolio',
		site: context.site,
		items: posts.map((post) => {
			const body =
				post.description ?? post.body.split('\n').slice(0, 5).join('\n');
			body += `\n<a href="/writing/${post.id}/">[Read the rest here]</a>`;
			return {
				pubDate: post.data.published,
				title: post.data.title ?? post.id,
				description: post.data.description,
				link: `/writing/${post.id}/`,
			};
		}),
	});
}
