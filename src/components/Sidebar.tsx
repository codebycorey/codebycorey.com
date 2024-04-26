import { FC } from 'react';
import WrappedLink from './WrappedLink';
import Image from 'next/image';

type Links = {
  href: string;
  label: string;
  icon?: JSX.Element;
};

const HEADER_LINKS: Links[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
];
const SOLIAL_LINKS: Links[] = [
  {
    href: 'https://github.com/codebycorey',
    label: 'GitHub',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="32"
        height="32"
        viewBox="0 0 30 30"
      >
        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/codebycorey',
    label: 'LinkedIn',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="32"
        height="32"
        viewBox="0 0 30 30"
      >
        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
      </svg>
    ),
  },
  {
    href: 'https://twitter.com/horticoder',
    label: 'Twitter',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="32"
        height="32"
        viewBox="0 0 50 50"
      >
        <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
      </svg>
    ),
  },
];
export const SIDEBAR_LINKS: Links[] = [...HEADER_LINKS, ...SOLIAL_LINKS];

const NAME = "Corey O'Donnell";
const ROLE = 'Software Engineer';

const Sidebar: FC = () => {
  return (
    <div className="space-y-5 flex flex-col md:items-center mt-12 sticky top-12">
      <nav className="w-full">
        <ul className="flex items-center gap-4">
          {HEADER_LINKS.map((link) => (
            <li key={link.href}>
              <WrappedLink className="text-xl" href={link.href}>
                {link.label}
              </WrappedLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex flex-row md:flex-col gap-4 items-center">
        <Image
          alt="profile"
          src="/static/images/profile.jpg"
          width="144"
          height="144"
          priority
          className="rounded-full w-24 h-24 md:w-36 md:h-36"
        />
        <div className="space-y-2 md:space-y-5 md:items-center">
          <p className="text-2xl md:text-4xl">{NAME}</p>
          <p className="text-xl md:text-2xl">{ROLE}</p>
          <nav>
            <ul className="flex gap-4">
              {SOLIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <WrappedLink
                    className="text-xl"
                    href={link.href}
                    hideDecorations
                  >
                    {link.icon}
                    <span className="sr-only">Open {link.label}</span>
                  </WrappedLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
