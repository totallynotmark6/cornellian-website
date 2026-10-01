# The Cornellian Website

## Prerequisites

* [VSCode](https://code.visualstudio.com)
* [Node.js](https://nodejs.org)
* A GitHub Account

### Installation

```sh
npm install
npm run dev
```

Open http://localhost:4321 to see the site!

## Common

### Articles

To start, add a new Markdown file in `src/content/articles/<year>`. It's important to note that the file name will be the URL of the page! (So, `2026/a-response-to-the-fys-faculty-edition.md` turns into `/articles/2026/a-response-to-the-fys-faculty-edition/`) — use the helper script instead: `npm run make-article`.

> [!TIP]
> You can download Markdown from Google Docs! Note that you'll need to go in and manually specify the images in the Markdown, because Google Docs embeds them for some reason (vastly reducing their quality in the process).

Inside, you'll need to add a *frontmatter*, which tells the website important details like the author and the title. The frontmatter is formatted like the following:

```yaml
---
title: "Article Title"
author: "Luna"
pubDate: "Dec 16 2023"
# note that you can also add some other fields:
description: "Description for the RSS feed. (Defaults to 'No description!')"
updatedDate: "Dec 16 2024" # adds a "Last Updated" field
heroImage: "../../../images/articles/2026/some-photo.jpg" # path to an image, relative to the .md file
---
```

> [!NOTE]
> Image paths are relative to the Markdown file's location. Articles live in `src/content/articles/<year>/`, so they need three `../` to reach `src/images/`. Comics live in `src/content/comics/` and need two.

After you finish the frontmatter, you can add either regular Markdown (or use something like [MDX](https://mdxjs.com) if you need to get *really* fancy) like usual!

Once you finish, the article will be accessible through the development site. If there's an error (usually the frontmatter not being properly formatted), there will be a whole-screen popup detailing what went wrong.

### Comics

Add a file in `src/content/comics` with frontmatter for `title`, `author`, `pubDate`, then one Markdown image line per panel (two `../` to reach `src/images/comics/`). Full walkthrough: [MAINTAINING.md §4](MAINTAINING.md#4-adding-a-comic).

### Home / About Page

The "About Us" and "Meeting Times" paragraphs live inline in `src/pages/index.astro`; the site name/tagline live in `src/consts.ts`. See [MAINTAINING.md §6](MAINTAINING.md#6-editing-the-home-page).

## Advanced

Staff page, April Fools' ads, PDF export, and the deploy pipeline are documented in [MAINTAINING.md](MAINTAINING.md) (sections 5, 7, 8, and 11).

## Publishing

Commit and push to GitHub, then run `./scripts/deploy_image.sh root@SERVER_IP` to build the Docker image and update the server (manual server steps in `DEPLOY.md`). See [MAINTAINING.md §8](MAINTAINING.md#8-publishing-commit-push-deploy).

## Folder Structure

`src/content/` holds the article and comic Markdown; `src/images/` holds article, comic, and staff photos; `src/pages/` is the site's screens; `src/components/` and `src/layouts/` are the shared chrome; `public/` is served as-is (favicon, fake ads); `scripts/` holds the helper CLIs. `node_modules/`, `dist/`, and `.astro/` are generated — never edit or commit them.

## Credits

* Luna - Lead Developer
* Steph Ango - [Flexoki (Color Palette)](https://stephango.com/flexoki)
* Murray Page, James Belding and Eliza Carlson - Cornellian 24-25 E-Board
* Morgan Dalsing - Comic Page Design
