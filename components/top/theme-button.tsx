'use client';

import { Button } from '@/components/ui/button';
import { useHotkeys } from '@mantine/hooks';
import { Cloudy, Loader, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';

const themes = {
  system: { next: 'light', icon: <Cloudy /> },
  light: { next: 'dark', icon: <Sun /> },
  dark: { next: 'system', icon: <Moon /> },
} as {
  [key: string]: { next: string; icon: React.ReactNode };
};

interface ThemeButtonProps {
  className?: string;
}
function ThemeButton({ className }: ThemeButtonProps) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [clicked, setClicked] = useState(0);

  const { setTheme, theme } = useTheme();
  const { reward } = useReward('reward', 'confetti', {
    angle: 222,
    spread: 125,
    elementCount: 80,
  });

  useHotkeys([
    [
      'mod+B',
      () => {
        if (!theme) return;
        setClicked(clicked + 1);
        setTheme(themes[theme].next ?? 'system');
      },
    ],
  ]);

  if (!hasMounted) return <PlaceHolder className={className} />;
  if (!theme)
    return (
      <Button className={className} variant="ghost">
        <Cloudy />
        <span className="sr-only">Theme Toggle</span>
      </Button>
    );

  const nextTheme = themes[theme].next;

  return (
    <Button
      variant="ghost"
      className={className}
      id="reward"
      onClick={() => {
        setClicked(clicked + 1);
        setTheme(nextTheme ?? 'system');
        if (clicked < 2) reward();
      }}
    >
      {themes[theme]?.icon ?? <Cloudy />}
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}

export { ThemeButton };

function PlaceHolder({ className }: ThemeButtonProps) {
  return (
    <Button variant="ghost" className={className}>
      <Loader />
      <span className="sr-only">Theme Toggle</span>
    </Button>
  );
}
