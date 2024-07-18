'use client';

import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import { GithubIcon } from './github-icon';
import { ThemeButton } from './theme-button';

function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <nav className="container flex h-full max-w-screen-lg items-center justify-between">
        <div className="ml-[-0.5rem] flex items-center gap-4">
          <NavLink
            href="/"
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Home />
            <span className="font-bold">porter.cat</span>
          </NavLink>

          <NavLink href="/blog">Blog</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/porterporter"
            target="_blank"
            rel="norefferer"
          >
            <div
              className={cn(buttonVariants({ variant: 'ghost' }), 'w-10 px-0')}
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeButton className="w-10 px-0" />
        </div>
      </nav>
    </div>
  );
}

function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        className,
        ['/', href].includes(pathname)
          ? 'text-foreground'
          : 'text-foreground/60',
        'transition-colors duration-300 hover:text-foreground'
      )}
    >
      {children}
    </Link>
  );
}

export default Navbar;
