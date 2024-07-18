'use client';

import { GithubIcon } from '@/components/top/github-icon';
import { ThemeButton } from '@/components/top/theme-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Home, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';

function NavSheet() {
  const [isOpen, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-10 px-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sheet</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavLink href="/" onClick={close} className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          <span className="font-bold">porter.cat</span>
        </NavLink>
        <div className="mt-3 flex flex-col gap-3">
          <NavLink href="/blog" onClick={close} className="font-medium">
            Blog
          </NavLink>
        </div>
        <div className="flex w-full justify-center">
          <Link
            href="https://github.com/porterporter"
            target="_blank"
            rel="norefferer"
            onClick={() => setOpen(false)}
          >
            <div
              className={cn(buttonVariants({ variant: 'ghost' }), 'w-10 px-0')}
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeButton />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function NavLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={onClick}
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

export default NavSheet;
