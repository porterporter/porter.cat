import { isNullOrUndefined } from '@/lib/utils';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import type { Post } from '@/.velite';
import Image from 'next/image';

function PostItem({ slug, title, description, date, cover }: Post) {
  return (
    <article className="flex flex-col justify-between gap-1 border-b border-border py-3">
      <div id="spread" className="flex items-center justify-between">
        <div id="left" className="flex flex-col gap-1">
          <h2 className="line-clamp-3 text-ellipsis text-2xl font-bold">
            <Link
              href={'/blog/' + slug}
              className="underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {title}
            </Link>
          </h2>
          {!isNullOrUndefined(description) ? (
            <div className="line-clamp-3 max-w-none text-ellipsis text-muted-foreground">
              {description}
            </div>
          ) : null}
        </div>
        <div id="right" className="max-w-28">
          {!isNullOrUndefined(cover) ? (
            <Image
              src={cover.src}
              alt={`Cover for ${title.toLowerCase()}`}
              width={112}
              height={112}
              priority={true}
              blurDataURL={cover.blurDataURL}
              placeholder="blur"
              className="min-w-28 rounded-md bg-cover"
            />
          ) : null}
        </div>
      </div>
      <div id="spread" className="flex justify-between pt-1">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
            <Calendar className="h-5 w-5" />
            <time dateTime={date}>{format(date, 'LLLL do, yyyy')}</time>
          </dd>
        </dl>
        <Link
          href={'/blog/' + slug}
          className="self-end whitespace-nowrap rounded-md text-sm font-medium underline-offset-4 ring-offset-background transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

export { PostItem };
