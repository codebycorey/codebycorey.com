const title = "CodeByCorey | Corey O'Donnell – Web Developer and writer";
const description = 'Web developer and TypeScript enthusiast';

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
        url: 'https://codebycorey.com/static/images/og.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    handle: '@codebycorey',
    site: '@codebycorey',
    cardType: 'summary_large_image'
  }
};
