const title = "CodeByCorey | Corey O'Donnell – Web Developer and writer";
const description = 'Web developer, TypeScript enthusiast, and Problem Solver';

export default {
  title,
  description,
  canonical: 'https://codebycorey.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://codebycorey.com',
    title,
    description,
    images: [
      {
        url: 'https://codebycorey.com/static/images/og.png',
        alt: title,
        width: 800,
        height: 420
      }
    ]
  },
  twitter: {
    handle: '@codebycorey',
    site: '@codebycorey',
    cardType: 'summary_large_image'
  }
};
