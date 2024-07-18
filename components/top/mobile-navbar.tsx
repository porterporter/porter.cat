import Sheet from '@/components/top/sheet';
import { cn } from '@/lib/utils';
import { Home } from 'lucide-react';
import Link from 'next/link';

function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      <nav className="container flex h-full max-w-screen-lg items-center justify-between">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-2 py-1 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Home />
          <span className="font-bold">porter.cat</span>
        </Link>
        <Sheet />
      </nav>
    </div>
  );
}

export default Navbar;
