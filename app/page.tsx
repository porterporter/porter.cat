import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Porter Milton | porter.cat',
  keywords: [
    'porter',
    'porter.cat',
    'porter milton',
    'juiceboy',
    'the feiring',
  ],
};

export default function Home() {
  return (
    <section className="flex flex-col gap-2 self-center rounded-lg bg-foreground/20 p-2">
      <p>hi, i&apos;m porter!</p>
      <p>indie developer from 📌 madison, wi</p>
      <p>featured projects:</p>{' '}
      <div>
        <Link
          className="underline decoration-dotted"
          href="https://thefeiring.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Feiring Website
        </Link>
        {' | '}
        <Link
          className="underline decoration-dotted"
          href="https://github.com/porterporter/OrangeJuice"
        >
          Orange Juice
        </Link>
      </div>
    </section>
  );
}
