'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

interface QueryPaginationProps {
  totalPages: number;
  className?: string;
}

function QueryPagination({ totalPages, className }: QueryPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const createPageUrl = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            href={createPageUrl(previousPage)}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
          />
        </PaginationItem>
        {Array(totalPages)
          .fill('')
          .map((_, page) => (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`page-button-${page + 1}`}
            >
              <PaginationLink
                href={createPageUrl(page + 1)}
                isActive={currentPage === page + 1}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
            href={createPageUrl(nextPage)}
            className={
              currentPage >= totalPages
                ? 'pointer-events-none opacity-50'
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { QueryPagination };
