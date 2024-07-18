import { cn } from '@/lib/utils';
import MobileNavbar from './mobile-navbar';
import Navbar from './navbar';

function Top({ className }: { className?: string }) {
  return (
    <header className={cn(className, 'sticky top-0')}>
      <Navbar className="hidden md:block" />
      <MobileNavbar className="block md:hidden" />
    </header>
  );
}

export default Top;
