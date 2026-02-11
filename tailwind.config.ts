import type { Config } from 'tailwindcss';

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/pages/**/*.{astro,js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{astro,js,ts,jsx,tsx}',
    './src/components/**/*.{astro,js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [forms, typography],
};
export default config;
