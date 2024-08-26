import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'porter.cat',
};

export default function Home() {
  return (
    <section className="flex flex-col gap-2 self-center rounded-lg bg-foreground/20 p-6 text-center">
      <h1 className="text-2xl font-normal">
        Hi! I&apos;m Porter, an indie developer attending UW-Madison.
      </h1>
      <p>Check out some of my recent projects:</p>
      <p>
        -{' '}
        <Link
          className="italic underline"
          href="https://github.com/porterporter/OrangeJuice"
        >
          1.8.9 Forge mods
        </Link>{' '}
        <Link
          className="italic underline"
          href="https://github.com/porterporter/SimpleRewardClaim"
        >
          (2)
        </Link>
      </p>
      <p>
        - Web design and cable networking for{' '}
        <Link className="italic underline" href="https://thefeiring.com">
          The Feiring
        </Link>
      </p>
      <p>
        Check back in on this space in the next couple months to see what
        I&apos;ve been up to!
      </p>
    </section>
  );
}
