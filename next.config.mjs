import { build } from 'velite';
import { Feed } from 'feed';
import { readFileSync, writeFileSync } from 'fs';

/** @type {import('next').NextConfig} */
const config = {
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.plugins.push(new VeliteRssPlugin());
    return config;
  },
};

export default config;

class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      await build({ watch: dev, clean: !dev });
    });
  }
}

class VeliteRssPlugin {
  static started = false;
  static rendered = 0;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    compiler.hooks.afterEmit.tap('VeliteRssPlugin', async (compilation) => {
      if (VeliteRssPlugin.started) return;
      VeliteRssPlugin.rendered++;
      VeliteRssPlugin.started = true;
      console.log('help!');
      const postFiles = readFileSync('./.velite/posts.json', 'utf-8');
      const posts = JSON.parse(postFiles);

      const feedOptions = {
        title: `porter.cat`,
        description:
          "I'm Porter, a software engineer and designer. I write about web development, networking, and other things I find interesting.",
        id: `porter.cat`,
        link: 'https://porter.cat',
        favicon: `https://porter.cat/favicon.ico`,
        copyright: `© ${new Date().getFullYear()}, Porter`,
        feedLinks: {
          rss2: `https://porter.cat/rss.xml`,
          json: `https://porter.cat/rss.json`,
          atom: `https://porter.cat/atom.xml`,
        },
      };

      const feed = new Feed(feedOptions);

      posts.map((post) => {
        feed.addItem({
          title: post.title,
          description: post.description,
          link: `https://porter.cat/blog/${post.slug}`,
          guid: post.slug,
          date: new Date(post.date),
        });
      });

      writeFileSync('./public/rss.xml', feed.rss2());
      writeFileSync('./public/rss.json', feed.json1());
      writeFileSync('./public/atom.xml', feed.atom1());

      console.log(`RSS feeds generated. Pass: ${VeliteRssPlugin.rendered}`);
    });
  }
}
