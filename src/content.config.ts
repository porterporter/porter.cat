import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: 'src/content', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		published: z.coerce.date(),
	}),
});

export const collections = { writing };
