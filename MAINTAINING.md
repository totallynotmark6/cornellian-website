# Maintaining the Cornellian Website

A complete guide to keeping [thecornellian.org](https://thecornellian.org) alive. This is written so that someone who has never written a line of code can add an article pretty easily! Sections marked **advanced** are for the few people who are comfortable poking at the site's internals - everyone else can safely ignore them (or you can read them and try to learn something new - there's a preview for a reason!).

## Contents

1. [How this website works](#1-how-this-website-works-30-second-version)
2. [Setting up your computer](#2-setting-up-your-computer-first-time-only)
3. [Adding an article](#3-adding-an-article)
4. [Adding a comic](#4-adding-a-comic)
5. [Updating the staff page](#5-updating-the-staff-page)
6. [Editing the home page](#6-editing-the-home-page)
7. [April Fools' fake ads](#7-april-fools-fake-ads)
8. [Publishing: commit, push, deploy](#8-publishing-commit-push-deploy)
9. [When things go wrong (troubleshooting)](#9-when-things-go-wrong-troubleshooting)
10. [What lives where (folder map)](#10-what-lives-where-folder-map)
11. [Command cheat sheet](#11-command-cheat-sheet)
12. [House rules](#12-house-rules)
13. [Who to ask](#13-who-to-ask)

---

## 1. How this website works (30-second version)

The entire website is made of plain text files. That's the whole trick.

- **Articles and comics are Markdown files.** Markdown is just plain text with a few special marks that get turned into a formatted web page. A line starting with `# ` becomes a heading, `*this*` becomes *italic*, `![...](...)` becomes an image, and so on. You do not need to learn it all - there's examples in this guide and links to resources.
- **Each file starts with an "info box"** (technically *frontmatter*) holding the title, author, and date.
- A program called **Astro** reads every Markdown file and turns the whole collection into a real website (really a folder of finished web pages).
- The finished site is packed into a **Docker container** and run on a small rented computer (a *server*) that hosts thecornellian.org.

So "editing the website" just means "editing a text file." Nothing about it is magic (even though it feels like it at times), and you cannot break anything permanent - every change is saved to GitHub's history and can be undone.

The main loop:

1. Edit a file on your computer
2. Check it in the local preview (section 3)
3. Save your work to GitHub (commit + push, section 8)
4. Put the new version on the server (deploy, section 8)

---

## 2. Setting up your computer (first time only)

You need three programs. All are free.

If you want to edit this in the browser, you can! See [2b. Setting up Codespaces](#2b-setting-up-codespaces)

| Program | What it is | Where to get it |
|---|---|---|
| **VS Code** | The text editor you will use for everything | code.visualstudio.com |
| **Node.js** | The JavaScript runtime | nodejs.org (follow the install instructions for your computer) |
| **Git** | The program that talks to GitHub | Comes with GitHub Desktop (easiest) or with Xcode command line tools on Mac; on Windows install "Git for Windows" |

Also have a **GitHub account** and ask for access to the repository: `totallynotmark6/cornellian-website`. (Note: we might want to move this?)

Then, in a terminal (on Mac: the Terminal app; on Windows: PowerShell; in VS Code: `Ctrl+` or Cmd+`):

```sh
# Download the project files to your computer
git clone git@github.com:totallynotmark6/cornellian-website.git
cd cornellian-website

# Download the site's helper tools (creates a node_modules folder)
npm install
```

`npm install` only needs to be run once, and again whenever you pull changes from someone else (see section 8) (or when you add packages *but*-).

### 2 — Start the local preview:

```sh
npm run dev
```

Open <http://localhost:4321> in your browser. That's the website, running on *your* computer, and it updates live as you type. You can leave this running all day.

> **Terminal tip:** if a command seems to be stuck, it's usually just asking you a question - read the last line and type your answer.

### 2b. Setting Up Codespaces

You'll need a free GitHub account, and a usuable computer!

To get started, visit the repository, hit the "Clone" button (it's unlabeled - but it's green and looks like `<>`), and hit "Codespaces". You'll then be able to create a codespace (by hitting the big green button) if you don't already have one. If you do, it'll show the name (usually some random words), which you can then click on to access.

In either case, this will open the Codespace in your browser. Your codespace may take a bit to warm up, but you're good to go once you see an all clear message in the terminal (the panel at the bottom of the screen).

When you go to look at the preview by starting the development server, you'll need to open the link that is exposed from port `4321`. If you're lost, there should be a "Active Ports" panel you can click on and manually get the URL, but there should be a notification popup in the bottom-right corner.

Other than that, this guide should be the same!

---

## 3. Adding an article

This is the most common task, so read this section first.

### Step 1 — Create the file (the easy way)

```sh
npm run make-article
```

Answer the three questions it asks:

1. **Title** - the article's headline
2. **Author** - your name (as you want it printed)
3. **Publication Date** - the date the article was actually published (it defaults to the newest date already on the site, which is usually right). The date must be after 2010.

The script creates the file for you, in the right folder, with the info box already filled in. Open it in VS Code and start writing.

(You can also create the file by hand - see "By hand" below - but the script saves you from the most common mistakes.)

### Step 2 — Know where the file lives

```
src/content/articles/2026/my-article-name.md
```

- The folder is the **year the article publishes** (`2026`, `2025`, …). The script picks this for you.
- **The file name (minus `.md`) *is* the web address.** `my-article-name.md` becomes
  `https://thecornellian.org/articles/2026/my-article-name/`
- Use **lowercase letters and dashes**, no spaces: `the-royal-purple-yearbook-returns.md`
- **Draft trick:** if you name a file with a leading underscore — `_my-article.md` — the site pretends it doesn't exist. Perfect for work-in-progress. Rename it (drop the `_`) when it's ready.

### Step 3 — Fill in the info box (frontmatter)

The top of the file looks like this:

```yaml
---
title: The Royal Purple Yearbook Returns
author: Tram Nguyen
pubDate: Feb 10, 2026
description: A short sentence that shows up in the RSS feed.
updatedDate: Mar 1 2026
heroImage: "../../../images/articles/2026/cover-photo.jpg"
heroImageCaption: The yearbook spread on display
heroImageCredit: Satin Bennett
---
```

Every line after the first `---` and before the second `---` is one piece of information:

| Field | Required? | What it does |
|---|---|---|
| `title` | **yes** | The headline printed at the top of the article |
| `author` | **yes** | Printed under the headline |
| `pubDate` | **yes** | The publication date. Also controls *where the article sorts* on the home page and article list (newest first), so use the real date, not "today" |
| `description` | no | A one-sentence summary for the RSS feed. Defaults to "No description!" |
| `updatedDate` | no | Adds a *Last updated on …* line under the date |
| `heroImage` | no | The big image at the top of the article. It's also the thumbnail on the home page and the article list, so pick a good one! |
| `heroImageCaption` | no | Italic line under the hero image |
| `heroImageCredit` | no | Prints "Credit: …" after the hero image caption |

Dates can be anything a human would understand: `Feb 10, 2026`, `Dec 16 2023`, `12/16/2023`. Just don't write nonsense, because the computer will try (and fail) to read it.

### Step 4 — Write the article

Below the second `---`, write plain Markdown:

```markdown
The yearbook is back, and this time it's really purple.

## A section heading

Regular *italic* and **bold** work too. Here's a quote:

> The best yearbook we've ever made. — The editor

![Students at the launch {caption=The launch event in Thomas Commons} {credit=Isabella Rivera}](../../../images/articles/2026/launch-day.jpg)
```

That's 90% of what you'll ever need. Links work like `[like this](https://example.com)`.

### Images: the part that trips people up

1. **Put the image file in the images folder**, in a subfolder for the year:
   `src/images/articles/2026/launch-day.jpg`
   In VS Code, just drag the image from your computer into that folder in the file explorer (the left sidebar).

2. **In the Markdown, the path is measured from the article file, not from the project.** An article lives three folders deep, so to reach `images` you go up three levels:

   | You are in | You want | You write |
   |---|---|---|
   | `src/content/articles/2026/` | `src/images/articles/2026/photo.jpg` | `../../../images/articles/2026/photo.jpg` |

   Each `../` means "one folder up." Copy the pattern above and swap the file name — it's always three `../` for articles.

3. **Plain image:** `![what the photo shows](../../../images/articles/2026/photo.jpg)`

4. **Image with caption and credit:**
   `![whatever {caption=The real caption} {credit=Whoever took it}](../../../images/articles/2026/photo.jpg)`
   - If you don't write `{caption=...}`, the "whatever" text becomes the caption.
   - If you write neither caption nor credit, you get a plain image.
   - Credit the photographer whenever you can.

5. **Keep photos a reasonable size** - the site will automatically compress images during build time, but storage isn't infinite!

### Tips

- **Writing in Google Docs?** Use *File → Download →* the Markdown option, then save it as your article file. **You must add images by hand** — Google Docs pastes its own squashed copies of images into the download, which look bad. Keep the original photos and drop them in with the syntax above.
- **Pasting text from Word or a PDF** that has random line breaks and words chopped with dashes (`Novemb-\ner`)? Save the text to a file and run:
  ```sh
  npm run unwrap draft.txt > draft-clean.txt
  ```
  It joins the chopped words, removes the extra line breaks, and leaves proper paragraphs in `draft-clean.txt`. Paste that in.
- **Need something fancy?** The site also supports MDX (Markdown plus a little extra). It's not needed for most articles; if you're using it either you want to be *really* fancy or you geuinely need the power.
- **Reading time** ("4 min read") is calculated for you automatically.

### Step 5 — Check your work

- Refresh <http://localhost:4321> (if it doesn't do it automatically) and click **Articles** — your piece is there, sorted by date. Open it and check the title, author, date, images, and caption.
- If the info box has a mistake, the browser shows a **full-screen error popup** instead of the article. Don't panic - the popup tells you exactly which line is wrong or what you need to add. See [section 9](#9-when-things-go-wrong-troubleshooting).

### By hand (instead of the script)

Copy an existing article from this year, rename the file (lowercase-dashes), edit the three required lines in the info box, and replace the text. Same rules as above.

---

## 4. Adding a comic

Comics live in their own little section with previous/next buttons and an archive page.

```sh
npm run make-comic
```

This creates `src/content/comics/my-comic-name.md`:

```yaml
---
title: Tiny Stupid Hands
author: Morgan Dalsing
pubDate: Nov 26 2023
description: A one-line summary (optional).
---
```

Then add the panel images. Put them in `src/images/comics/` (or a subfolder named after the comic, like `src/images/comics/friendship/`), one Markdown image line per panel, **in reading order, one per line**:

```markdown
![Panel 1](../../images/comics/friendship/panel1.png)
![Panel 2](../../images/comics/friendship/panel2.png)
![Panel 3](../../images/comics/friendship/panel3.png)
```

Note the path only needs **two** `../` — comic files sit two folders deep, not three.

The web address will be `https://thecornellian.org/comics/my-comic-name/`. The `pubDate` decides where the comic sorts (the *Next/Previous* buttons and the archive at `/comics/archive` are both ordered by date). `/comics/rss.xml` is a feed of comics.

---

## 5. Updating the staff page

The staff page is a real page of the site, so this one means opening a code file.

The file is `src/pages/staff.astro`. For each person there are two parts:

1. **At the top**, next to the other image imports, import the photo:
   ```
   import clara from '../images/member/clara.jpg';
   ```
   (Put the photo itself in `src/images/member/` first. The variable name can be anything; lowercase-letters are the convention.)

2. **In the body**, add a card under the right section heading:
   ```
   <StaffCard name="Clara" pronouns="she / her" image={clara}>
      <p>Clara is studying International Relations and Russian…</p>
   </StaffCard>
   ```

To remove someone, delete their import line and their `<StaffCard>` block. To move someone to a different section, cut the `<StaffCard>` block and paste it under the other heading.

When removing staff members, once the last image is removed, it'll let you know (with a squiggly underline and being grayed out), but it won't remove the underlying file. At this point, feel free to remove the image - the site will throw up a large error if it's still required!

---

## 6. Editing the home page

The home page (`src/pages/index.astro`) contains two plain-English paragraphs — **About Us** and **Meeting Times** — right in the file, as normal sentences. If the meeting room or time changes, edit that line directly. It's the easiest "code" change you'll ever make.

The site's name, tagline, and description live in one more place: `src/consts.ts`:

```ts
export const SITE_TITLE = 'The Cornellian';
export const SITE_SUBTITLE = "Truth Without Fear";
export const SITE_DESCRIPTION = 'Cornell College\'s student-run newspaper, since the 1800s.';
```

Only change these if you really mean to rename the paper.

---

## 7. April Fools' fake ads

Every April 1st the site becomes "The Cornhellian": the name changes, the purple theme turns orange, and fake 728×90 banner ads appear on the pages. All of this is automatic — no one has to flip a switch.

If you're adding a new fake ad for the year:

1. Save the banner image (exactly **728 pixels wide by 90 pixels tall**, PNG) in the `public/ads/` folder.
2. Add it to **both** lists (they must match):
   - `src/components/Advertisement.astro` — the list of ads that appear randomly on pages
   - `src/pages/ads.astro` — the "collection" page at `/ads`

   Each entry looks like:
   ```
   { src: '/ads/niko.png', link: '', label: 'Niko' },
   ```
   `link` is where the ad points when clicked (leave it empty if nowhere), `label` is the caption on the /ads page.

The `/ads` page and the ad banner are the only things a visitor sees; the rest of the April Fools behavior (name swap, orange colors) needs no maintenance.

---

## 8. Publishing: commit, push, deploy

"Commit" and "push" save your work to GitHub, where it is safe and where other people can see it. "Deploy" copies the new version to the server.

### 8.1 — Pull first

Before you start working, get the latest changes from everyone else:

```sh
git pull
npm install   # only if the pull mentioned new packages
```

### 8.2 — Commit your work

```sh
git status                 # what changed? (safe to run anytime)
git add src/content/articles/2026/my-article.md   # mark your files as "to be saved"
git commit -m "Add spring picnic article"          # save them with a note
```

A good commit note is a short sentence describing the change: `add comic: tiny stupid hands`, `fix date on yearbook article`, `add staff card for Clara`.

If you're using Codespaces, there's a more visual way, look to the left where they'll have an icon like a tree branch, and, once you're in there, you'll be able to commit and push.

### 8.3 — Push to GitHub

```sh
git push
```

Your work is now on GitHub and visible to the rest of the team.

### 8.4 — Deploy to the server

You'll want to go to Actions, then Deploy. You'll see a list of previous runs, and a button at top that says "Run workflow". Hit it, making sure to use the workflow from `Branch: main`. Then, wait around 5 minutes! You can click into the job if you want to see what step it's on, or, if it errors, any errors. It's that simple :)

### 8.5 — Before you deploy

```sh
npm run build
```

This type-checks and builds the site exactly like the server does. If it fails, **do not deploy** — fix the error it describes (section 9 will help) and run it again until it passes. (It shouldn't let you until you do, but this saves you the trouble.)

Note that a build runs whenever you push (and on pull requests), look for a green checkmark next to your commit if it passes!

---

## 9. When things go wrong

Almost every error on this site is one of the following.

### The full-screen error popup

When you save an article/comic with a broken info box, the preview page shows a big error instead of the content. It always points at a specific line. Common causes:

| Symptom | Cause | Fix |
|---|---|---|
| Error mentions `title`, `author`, or `pubDate` | One of the required lines is missing or empty | Make sure all three are present and filled in |
| "Could not parse date" / weird date behavior | The date is written in a way the computer can't read | Use `Dec 16 2023` or `12/16/2023`. It must be after 2010 |
| Error mentions an image path | The `heroImage` file doesn't exist where you say it is | Check the spelling, the capitalization, and that the file is actually in the folder you're pointing at |
| Any mysterious YAML error | You used a **tab** in the info box, or a value contains a colon without quotes | The info box uses spaces, never tabs. If a value has a `:` in it (like a time), wrap it in quotes: `title: "Q&A: Spring Edition"` |
| You can't find the info box | The two `---` lines are missing or malformed | The info box must start and end with a line containing exactly three dashes |

### My article isn't showing up

- The file name starts with `_` (the draft trick from section 3).
- The file is in the wrong folder — it must be under `src/content/articles/<year>/`.
- You're looking at the live site but haven't pushed + deployed yet (section 8).
- The `pubDate` is old, so it's sorted way down the list.

### An image won't display

- The path is wrong. Remember: **measured from the article file** (three `../` for articles, two for comics), and it must match the real file name *exactly*, including capitalization.
- The file was never actually saved into the folder (drag-and-drop in VS Code is silent — check the file explorer).
- The file name has spaces or special characters and the path didn't match them exactly. Rename the image to `lowercase-dashes.png` and use that.

### `node: command not found`

Node.js isn't installed, or the terminal doesn't know about it yet. Install it (nodejs.org) and **restart the terminal** (close it fully and open a new one).

### Port 4321 is already in use

Another copy of the preview server is already running - probably yours, from earlier. Just use that one, or kill it and start fresh: `Ctrl+C` in the terminal where `npm run dev` is running, then run it again.

### The deploy failed

Read the output. The most common failure is the build step (step 1 of the script), which is just `npm run build` in a box - run it locally to see the same error without the server in the way.

### The live site still shows the old version after deploying

- Wait a minute and hard-refresh (`Cmd+Shift+R` / `Ctrl+F5`) — browsers cache aggressively.
- Confirm the deploy script actually finished with "Deployment complete!".
- Confirm you pushed *and* deployed — pushing to GitHub alone does not update the server (see the note in section 8.4).

---

## 10. What lives where

| Place | What it is | Touch it? |
|---|---|---|
| `src/content/articles/<year>/` | Article text files, one per article | **Yes!** |
| `src/content/comics/` | Comic files | Yes |
| `src/images/articles/<year>/` | Photos used in articles | Yes |
| `src/images/comics/` | Comic panel images | Yes |
| `src/images/member/` | Staff photos | Yes (when the staff page changes) |
| `public/ads/` | The fake April Fools banner images | Yes (once a year) |
| `scripts/` | The helper programs (`make-article.ts`, etc.) | Only if asked, or if improving something |
| `src/pages/` | The actual pages of the site (home, staff, ads, 404…) | Only if you know what you're doing |
| `src/components/` | Shared parts: header, footer, the ad banner | Only if you know what you're doing |
| `src/layouts/` | The frame that wraps every article and comic | Only if you know what you're doing |
| `src/styles/global.css` | All the colors (the site's theme) | Only if asked |
| `src/consts.ts` | The site's name and tagline | Only if you're *absolutely* sure |
| `astro.config.mjs`, `Dockerfile`, `Caddyfile`, `docker-compose.yml` | How the site is built and served | ...Probably not. |
| `node_modules/`, `dist/`, `.astro/` | The computer's working files | **There's no need!** Never open, edit, delete, or "clean up" these (unless you're low on disk space). They're rebuilt automatically and are already excluded from GitHub. |

---

## 11. Command cheat sheet

| Command | What it does |
|---|---|
| `npm install` | Downloads the site's helper tools. Run once after cloning, and after pulling changes. |
| `npm run dev` | Starts the local preview at <http://localhost:4321> with live reload. |
| `npm run build` | Checks everything and builds the site, exactly like the server does. Run before deploying. |
| `npm run preview` | Shows the *built* site locally (useful for a final look after `npm run build`). |
| `npm run make-article` | Interactive: creates a new article file with the info box filled in. |
| `npm run make-comic` | Interactive: creates a new comic file. |
| `npm run unwrap draft.txt > clean.txt` | Cleans up text copied from Word/PDF (fixes line breaks and hyphenated words). |
| `npm run chs-print` | **advanced.** Exports every article as a print-styled PDF into an `article-pdfs/` folder. Requires the preview server to be running, and a web-browser engine that the script downloads on first use (it's currently installed as an indirect dependency — if it's ever missing, run `npm install puppeteer`). This is mainly meant so that the Historical Society doesn't have to print all of the articles by their own hand. |
| `git status` / `git pull` / `git add …` / `git commit -m "…"` / `git push` | The GitHub saving dance (section 8). |
| `./scripts/deploy_image.sh root@SERVER_IP` | Builds and publishes the new version to the server (section 8.4). |

---

## 12. House rules

1. **The file name is the web address.** Once an article is published, don't rename its file — old links (and the RSS feed) will break. If a title changes, change the `title:` line in the info box; leave the file name alone.
2. **Keep image names boring:** lowercase, dashes, no spaces. (`photo-of-the-event.jpg` beats `Photo Of The Event (2).jpg`.) It's easier to give attribution and actually type the image if it's simple!
3. **Credit photos** in `{credit=…}` or `heroImageCredit`. The amazing photographers deserve their credit!
4. **Use the real publication date** in `pubDate` — it controls where the article sorts on the site, not just what's printed. I usually sync it to when the physical paper is distributed.
5. **Don't commit things you can't share.** The whole repository is public. No passwords, no personal emails beyond the newspaper's, no draft opinions that weren't meant for the page.
6. **Check the preview before you commit, and `npm run build` before you deploy.** Two quick habits that prevent almost all incidents.
7. **Look at the site on a phone.** It's designed to work on small screens and adapt to larger screens. This isn't needed when doing day-to-day work, but any style changes it's needed!
8. **Dark mode is automatic** — visitors see a dark or light version of the site based on their system setting. Nothing to maintain, but do a quick glance at both.
9. **When in doubt, ask before touching** anything outside `src/content/`, `src/images/`, and `public/ads/`.

---

## 13. Who to ask

- **Content questions** (what's being published, deadlines, meeting times): the current E-board.
- **"The site is broken / the build is failing / I need deploy access":** the website lead (was Luna), or the E-board if they're unreachable.
- **Archives older than this website:** the [Cornellian archive database](http://cornellcollege.advantage-preservation.com/) covers 1880–2012; the Historical Society (`historicalsociety@cornellcollege.edu`) can help with anything in between.

I, Luna, will strive to do my best to help maintain this website even after graduation, so feel free to email me with questions! This should be relatively simple to keep afloat, I believe in y'all!
