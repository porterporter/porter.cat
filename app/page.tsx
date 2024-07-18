import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'porter.cat',
};

export default function Home() {
  return (
    <section className="flex flex-col gap-2 self-center text-center">
      <h1 className="text-2xl font-normal">
        Hello! I&apos;m Porter, an indie developer attending UW-Madison.
      </h1>
      <p>
        Right now, I&apos;m working on a few projects, including{' '}
        <Link
          className="italic underline"
          href="https://github.com/porterporter/OrangeJuice"
        >
          Minecraft Forge Mods for 1.8.9
        </Link>{' '}
        <Link
          className="italic underline"
          href="https://github.com/porterporter/SimpleRewardClaim"
        >
          (2)
        </Link>{' '}
        and web design and cable networking for{' '}
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
