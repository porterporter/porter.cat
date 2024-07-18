import { posts } from '@/.velite';
import { notFound } from 'next/navigation';
import { MDXContent } from '@/components/mdx-content';
import type { Metadata } from 'next';

import './post.css';

type Props = {
  params: {
    slug: string;
  };
};

function getPostFromSlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostFromSlug(params.slug);
  if (post == null) return {};
  return { title: post.title };
}

export function generateStaticParams(): Props['params'][] {
  return posts.map((page) => ({ slug: page.slug }));
}

export default function PostPage({ params }: Props) {
  const post = getPostFromSlug(params.slug);

  if (post == null) notFound();

  return (
    <article className="prose max-w-full text-pretty break-words p-6 dark:prose-invert">
      <h1 className="m-0 p-0">{post.title}</h1>
      {post.description && <p>{post.description}</p>}
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
