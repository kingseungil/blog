import type { Site } from '$lib/types/site';
import type { Giscus } from '$lib/types/giscus';
import type { DD } from '$lib/types/dd';

import Avatar from '$assets/profile_picture.jpg';
import Avatar_128 from '$assets/profile_picture.jpg?w=128&h=128&format=avif;webp&imagetools';
import Avatar_48_PNG from '$assets/profile_picture.jpg?w=48&h=48&imagetools';
import Avatar_96_PNG from '$assets/profile_picture.jpg?w=96&h=96&imagetools';
import Avatar_192_PNG from '$assets/profile_picture.jpg?w=192&h=192&imagetools';
import Avatar_512_PNG from '$assets/profile_picture.jpg?w=512&h=512&imagetools';

import SiteCover from '$assets/og.png';

export const siteConfig: Site.Config = {
  url: 'https://k-devlog.vercel.app',
  title: 'K-Devlog',
  subtitle: '🚀 공부 기록',
  description: '🚀 백엔드 개발자의 공부 기록',
  lang: 'en',
  timeZone: 'Asia/Seoul',
  since: 2023,
  cover: SiteCover,
  author: {
    name: 'King seungil',
    status: '🚀',
    statusTip:
      '<a href="https://github.com/kingseungil/blog" rel="external" style="color:#0F0" onMouseOver="this.style.color=\'#0FF\'" onMouseOut="this.style.color=\'#0F0\'" >Hello</a> here is my blog',
    avatar: Avatar,
    avatar_128: Avatar_128,
    avatar_48_png: Avatar_48_PNG,
    avatar_96_png: Avatar_96_PNG,
    avatar_192_png: Avatar_192_PNG,
    avatar_512_png: Avatar_512_PNG,
    website: 'https://github.com/kingseungil/blog',
    github: 'https://github.com/kingseungil',
    email: 'flykim5115@gmail.com',
    bio: `<span rel="external" style="color:#7c84a9">Hello</span> <br/> I am backend developer`,
  },
};

export const headConfig: Site.Head = {
  // Used for IndieWeb
  me: ['https://github.com/kingseungil'],
  custom: ({ dev }) =>
    dev
      ? [
          // For Development Environment
        ]
      : [
          // For Production Environment

          // Replace the following with your own setting

          // Plausible
          // '<link rel="preconnect" href="https://plausible.kwchang0831.dev" />',
          // '<script defer type="text/partytown" data-domain="svelte-qwer.vercel.app" src="https://plausible.kwchang0831.dev/js/plausible.js"></script>',
          // Google tag (gtag.js)
          `<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-ZSD9NV5KSJ"></script>`,
          `<script type="text/partytown">
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZSD9NV5KSJ');
          </script>`,
        ],
};

export const dateConfig: Site.DateConfig = {
  toPublishedString: {
    locales: 'en-KO',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
  toUpdatedString: {
    locales: 'en-KO',
    options: {
      year: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      timeZone: `${siteConfig.timeZone}`,
    },
  },
};

// Replace with your own Giscus setting
// See https://giscus.app/
export const giscusConfig: Giscus.Config = {
  enable: true,
  id: 'giscus-comment',
  repo: import.meta.env.QWER_GISCUS_REPO,
  repoId: import.meta.env.QWER_GISCUS_REPO_ID,
  category: import.meta.env.QWER_GISCUS_CATEGORY,
  categoryId: import.meta.env.QWER_GISCUS_CATEGORY_ID,
  mapping: 'pathname',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'top',
  loading: 'lazy',
  lang: 'en',
  'data-strict': '0',
};

export const navConfig: (DD.Nav | DD.Link)[] = [
  {
    name: 'About',
    url: '/about',
  },
  // {
  //   name: 'See Docs 📄',
  //   url: 'https://docs-svelte-qwer.vercel.app/',
  //   rel: 'external',
  // },
  // {
  //   name: 'Get QWER 🚀',
  //   url: 'https://github.com/kwchang0831/svelte-QWER',
  //   rel: 'external',
  // },
];

export const mobilenavConfig: DD.Nav = {
  orientation: 2,
  links: [
    {
      name: 'About',
      url: '/about',
    },
    // {
    //   name: 'See Docs 📄',
    //   url: 'https://docs-svelte-qwer.vercel.app/',
    //   rel: 'external',
    // },
    // {
    //   name: 'Get QWER 🚀',
    //   url: 'https://github.com/kwchang0831/svelte-QWER',
    //   rel: 'external',
    // },
  ],
};
