import type { Config } from 'tailwindcss';

import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{astro,js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{astro,js,ts,jsx,tsx}',
    './src/components/**/*.{astro,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
export default config;
