export type NavLink = {
  href: string;
  label: string;
  icon?: string;
};

export const HEADER_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
];

export const SOCIAL_LINKS: NavLink[] = [
  {
    href: 'https://github.com/codebycorey',
    label: 'GitHub',
    icon: 'github',
  },
  {
    href: 'https://www.linkedin.com/in/codebycorey',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    href: 'https://twitter.com/horticoder',
    label: 'Twitter',
    icon: 'twitter',
  },
];

export const ALL_LINKS: NavLink[] = [...HEADER_LINKS, ...SOCIAL_LINKS];
