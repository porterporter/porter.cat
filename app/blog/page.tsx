import { posts } from '@/.velite';
import { PostItem } from '@/components/post-item';
import { QueryPagination } from '@/components/query-pagination';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const POSTS_PER_PAGE = 7;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog | porter.cat',
};

async function BlogPage({ searchParams: { page } }: BlogPageProps) {
  const currentPage = parseInt(page ?? '1', 10);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (totalPages === 0)
    return (
      <p className="text-center">
        If you&apos;re reading this, it means I haven&apos;t written anything
        here yet. Sorry about that! Check here later.
      </p>
    );

  if (currentPage > totalPages) redirect(`/blog?page=${totalPages}`);
  if (currentPage < 1) redirect(`/blog`);

  const displayPosts = posts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="flex w-full flex-col">
      <h1 className="py-4 text-4xl font-black">Blog</h1>
      <hr />

      <ul className="flex flex-col">
        {displayPosts.map((post) => (
          <li key={`post/${post.slug}`}>
            <PostItem key={post.slug} {...post} />
          </li>
        ))}
      </ul>
      {totalPages > 1 ? (
        <QueryPagination
          totalPages={totalPages}
          className="mt-4 justify-center"
        />
      ) : null}
    </div>
  );
}
export default BlogPage;
