// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";

import sitemap from '@astrojs/sitemap';

import { remarkReadingTime } from './remark-reading-time.mjs';
import { remarkImageCaptions } from './remark-image-captions.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://thecornellian.org',
    markdown: {
        shikiConfig: {
            themes: {
                dark: "catppuccin-mocha",
                light: "catppuccin-latte",
            }
        },
        remarkPlugins: [remarkReadingTime, remarkImageCaptions]
    },
    vite: {
    	// @ts-expect-error type mismatch between tailwindcss/vite and astro's vite
    	plugins: [tailwindcss()]
    },
    integrations: [mdx(), sitemap()],
});
