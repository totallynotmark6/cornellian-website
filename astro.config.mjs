// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from "@tailwindcss/vite";
import { satteri } from "@astrojs/markdown-satteri";
import imgAttr from "satteri-imgattr";
import sitemap from '@astrojs/sitemap';
import { readingTimePlugin } from "./src/plugins/reading-time.ts";
import satteriDescription from 'satteri-description';

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
        processor: satteri({
            mdastPlugins: [
                readingTimePlugin,
                satteriDescription()
            ],
            hastPlugins: [
                imgAttr({
                    defaults: {
                        loading: "lazy", decoding: "async"
                    }
                })
            ]
        })
    },
    vite: {
    	plugins: [tailwindcss()]
    },
    integrations: [mdx(), sitemap()],
});
