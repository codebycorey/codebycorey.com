import { FC } from 'react';
import WrappedLink from './WrappedLink';
import Image from 'next/image';

export const SIDEBAR_LINKS: { href: string; label: string }[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: 'https://github.com/CodeByCorey',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/CodeByCorey',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/horticoder',
    label: 'Twitter',
  },
];

const Sidebar: FC = () => {
  return (
    <div className="space-y-5 flex flex-col items-center mt-12 sticky top-12">
      <Image
        alt="profile"
        src="/static/images/profile.jpg"
        width="200"
        height="200"
        className="rounded-full mb-4"
      />
      <div className="space-y-5">
        <h1 className="text-4xl">{"Corey O'Donnell"}</h1>
        <h2 className="text-2xl">Software Engineer</h2>
        <nav>
          <ul className="space-y-2">
            {SIDEBAR_LINKS.map((link) => (
              <li key={link.href}>
                <WrappedLink className="text-xl" href={link.href}>
                  {link.label}
                </WrappedLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
