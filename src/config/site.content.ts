import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: '',
  },
  footer: {
    tagline: 'Business listings',
  },
  hero: {
    badge: 'Curated business discovery',
    title: ['Where serious buyers meet', 'serious businesses.'],
    description:
      'A premium directory experience for operators who want clarity, trust signals, and listings that read like a real commercial site—not a generic feed.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'List your business',
      href: '/register',
    },
    searchPlaceholder: 'Search companies, categories, and locations',
    focusLabel: 'Focus',
    featureCardBadge: 'Featured rotation',
    featureCardTitle: 'Fresh listings shape the first impression of your brand.',
    featureCardDescription:
      'Recent directory entries stay visible at the top without changing any platform behavior underneath.',
  },
  home: {
    metadata: {
      title: 'Premium business listings & directory',
      description:
        'Discover and list exceptional businesses with a directory built for credibility, scanning, and search-friendly presentation.',
      openGraphTitle: 'Premium business listings & directory',
      openGraphDescription:
        'Explore verified-style business listings with strong typography, trust cues, and a professional discovery flow.',
      keywords: [
        'business directory',
        'company listings',
        'B2B discovery',
        'premium listings',
        'local business',
        'Digitalvirtuose',
      ],
    },
    introBadge: 'Professional directory',
    introTitle: 'Built for operators who care how discovery feels.',
    introParagraphs: [
      'This site foregrounds business listings with a calm, high-trust visual system so visitors can scan categories, compare options, and drill into detail without noise.',
      'The same multi-task engine stays underneath: articles, classifieds, media, and other formats remain reachable by URL and search even when the homepage stays listing-first.',
      'Whether traffic arrives from organic search, partner links, or direct visits, surfaces are framed to feel like a deliberate product—not a renamed template.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Listing-first homepage with conversion-oriented hierarchy.',
      'Emerald palette and spacing tuned for premium B2B positioning.',
      'Cross-task search when visitors need to go beyond the directory.',
      'Lightweight motion and CSS-first polish for fast loads.',
    ],
    primaryLink: {
      label: 'Open listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Site search',
      href: '/search',
    },
  },
  cta: {
    badge: 'Start here',
    title: 'Put your business where buyers already browse.',
    description:
      'Claim a listing surface that feels bespoke: strong typography, disciplined whitespace, and cues that signal legitimacy.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles & insights',
    description: 'Editorial-style reading alongside the Digitalvirtuose business directory.',
  },
  listing: {
    title: 'Business listings',
    description: 'Discover companies, services, and structured listing pages on Digitalvirtuose.',
  },
  classified: {
    title: 'Classifieds & offers',
    description: 'Timely offers and notices paired with the main listing experience.',
  },
  image: {
    title: 'Visual stories',
    description: 'Image-led posts and galleries connected to the broader platform.',
  },
  profile: {
    title: 'Profiles',
    description: 'People and brands behind listings and content on Digitalvirtuose.',
  },
  sbm: {
    title: 'Saved resources',
    description: 'Curated links and references indexed alongside directory content.',
  },
  pdf: {
    title: 'Documents & PDFs',
    description: 'Downloadable resources supporting listings and editorial content.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Directory listings & service pages',
    paragraphs: [
      'Browse businesses with category, geography, and summary context surfaced for quick evaluation.',
      'Each listing remains connected to the wider platform so supporting articles, media, or documents are never far away.',
      'Use filters to narrow the grid, then open a detail page for the full story.',
    ],
    links: [
      { label: 'Search everything', href: '/search' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Long-form articles & briefings',
    paragraphs: [
      'This section uses editorial pacing: larger type, more line height, and room for narrative setup.',
      'Articles complement listings by explaining positioning, trends, or how teams work behind the brand.',
      'Move from a story into related listings or resources without switching mental models.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Images', href: '/images' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds & short-form offers',
    paragraphs: [
      'A faster-scanning board for deals, roles, and time-sensitive posts with clearer urgency cues.',
      'Paired with listings so short posts can point to fuller business pages when needed.',
      'Filter by category, then jump into detail or related directory entries.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Visual galleries & media posts',
    paragraphs: [
      'Imagery leads here: tighter crops, darker surround, and a rhythm closer to a studio wall than a spreadsheet.',
      'Ideal for brand photography, spaces, and product shots that support listings.',
      'Open a visual post, then continue into related stories or directory pages.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles & identities',
    paragraphs: [
      'Identity-first layout: who is behind the work, where they operate, and how to engage.',
      'Acts as a trust anchor when visitors land from listings or articles.',
      'Browse profiles to validate expertise before moving deeper into the site.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'Images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated bookmarks & libraries',
    paragraphs: [
      'Compact, index-style cards for links, tools, and references you want to revisit.',
      'Stays visually distinct from listings: lighter chrome, smaller imagery, collection framing.',
      'Use it as a research shelf that still lives inside the same authenticated ecosystem.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs & document vault',
    paragraphs: [
      'Document-forward grid with stronger borders and print-adjacent spacing.',
      'Hosts decks, one-pagers, and long downloads that support listings and stories.',
      'Pick a file, preview context, then continue to related listings or articles.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Lightweight signals that keep the network feeling active.',
      'Use them as quick entry points into listings or longer content.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Discussion & responses',
    paragraphs: [
      'Comments stay tethered to articles so context never drifts.',
      'Use them for clarification, testimonials, or follow-up questions.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations & teams',
    paragraphs: [
      'Structured pages for agencies, studios, and teams that appear across the platform.',
      'Pairs with listings and articles for a coherent entity story.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
