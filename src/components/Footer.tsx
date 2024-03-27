import { SIDEBAR_LINKS } from './Sidebar';
import WrappedLink from './WrappedLink';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 px-8 py-12 bg-zinc-100">
      <div className="mx-auto max-w-5xl flex justify-between items-center">
        <div className="space-y-2">
          <p>
            &copy; {year} Corey {`O'Donnell`}
          </p>
          <WrappedLink href="https://usefathom.com/ref/45XEAJ">
            Privacy-respecting analytics
          </WrappedLink>{' '}
          by Fathom
        </div>
        <div className="flex flex-col space-y-2 items-end">
          <nav>
            <ul className="flex space-x-4">
              {SIDEBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <WrappedLink href={link.href}>{link.label}</WrappedLink>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-zinc-500">Affiliate links may earn commissions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
