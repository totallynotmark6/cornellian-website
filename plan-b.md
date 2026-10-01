# Plan B

## Overview
This plan (affectionately called "Plan B") details how to quickly move away from Digital Ocean, for whatever reason. This still requires the domain from Cloudflare, but the droplet need not exist.

> [!CAUTION]
> This will require the site to be built as a *static* site. Server dependent features, such as analytics, in-site polls, or anything requiring a server to process content in between updates will cease to work, and may actually prevent the site from building. This is, of course, semi-reversable.

## Requirements
- Access to the Cloudflare Account
- A copy of this repository, either in a Codespace or locally.
- ~2 hours

## Procedure

> [!NOTE]
> I can't account for all edge cases, so if something's off, you might have to get into the weeds yourself. This should get you most of the way there, if not entirely. Good luck!

1. If you still have access to the droplet, remove it. If you do not, skip this step.
2. In this repository's settings, under "Code, planning, and automation" -> "Pages", change "Source" to **GitHub Actions** (from **Deploy from a branch**).
3. GitHub will try to suggest workflow templates. Ignore it for now, we'll provide our own.
4. In your code editor, open `.github/workflows/deploy.yml`.
5. Delete stuff.
6. Add stuff.
7. Commit the changes and push it.
8. Deploy the site via the usual method.
9. Once the site is deployed successfully, go back to the settings and enter "thecornellian.org" under "Custom domain". (It won't appear until it successfuly deploys.)
10. Go to Cloudflare, and go to DNS records. You'll want to add a record of type `ALIAS` with a name of `@` and a value of:
  - If this is still under `totallynotmark6`, then `totallynotmark6.github.io`
  - If this is under a Cornellian-specific Organization (or user), then `<user/org>.github.io`.
11. You can optionally add `A`, `AAAA`, and `CNAME` types from [these docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#dns-records-for-your-custom-domain)
12. Remove any and *all* other DNS records, and save your changes.
13. Wait anywhere from 5-15 minutes for DNS records to propagate. This may take less time, this may take more, it really depends on how aggressive the caching is.
14. In a terminal, run `dig thecornellian.org`. You should see the `CNAME` record from earlier.
15. Success!

## Troubleshooting

### The Site Doesn't Build!
The site is probably dynamic (e.g. requiring the server for functionality).

### The Site Doesn't Deploy!
If the site builds (locally/in a codespace):
- The workflow YAML file is probably invalid, try a YAML checker or reverting that commit and trying again.

If it doesn't:
- ...yep.

### The Browser Is Complaining About Insecurity??
You'll want to wait 24 hours, and go back to the settings and enable **Enforce HTTPS**.

### `www.thecornellian.org` isn't working!
Add a `CNAME` record, with name `www.thecornellian.org` and the value from step 10.

### There's no `ALIAS` record type
1. It might be named `ANAME`.
2. Configure `A` records instead (see 11).

## References
- Manage a custom domain - GitHub Docs
