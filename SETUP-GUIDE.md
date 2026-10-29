# Raleigh County 911 website: setup guide (one time, about an hour)

You will make three free accounts. Use an agency email for each, not a personal one, so the next owner can take over.

## 1. GitHub (stores the site files)
1. Go to github.com and sign up with the agency email.
2. Click New repository. Name it `raleigh911`. Choose Private. Click Create.
3. Click "uploading an existing file". Unzip the site folder on your computer, then drag in everything inside it (the `src` folder, `.eleventy.js`, `.pages.yml`, `package.json`, `.gitignore`). Click Commit changes.

## 2. Cloudflare Pages (puts the site on the internet)
1. Go to cloudflare.com and sign up with the agency email.
2. Open Workers & Pages, click Create, choose Pages, then Connect to Git. Pick the `raleigh911` repository.
3. Build command: `npm run build`. Build output directory: `_site`. Click Save and Deploy.
4. After a minute you get a temporary address ending in `.pages.dev`. Open it and check the site.

## 3. Pages CMS (the login screen for staff)
1. Go to app.pagescms.org and sign in with GitHub.
2. Add the `raleigh911` repository. The editing screens (Board, Statistics, Phone Numbers and so on) appear from the settings file already in the site.
3. To let a staff member edit: in GitHub open the repository, Settings, Collaborators, and add their GitHub username. They sign in at app.pagescms.org with their own GitHub account.

Every time someone clicks Save in Pages CMS, Cloudflare rebuilds the site and it is live in about a minute.

## 4. Put the site on raleigh911.org (do this last)
Do this only after you approve the site at the `.pages.dev` address. In Cloudflare Pages open your project, then Custom domains, and add `raleigh911.org` and `www.raleigh911.org`. Cloudflare shows what to change.

Careful with email: the agency's email depends on the domain's mail records. Never change the nameservers or delete any MX or TXT records at Namecheap unless you have copied them first. Take a screenshot of the Namecheap DNS page before changing anything, and only add the records Cloudflare asks for. If Cloudflare asks you to move the domain's nameservers, stop and ask for help so the email records are copied first.

## 5. Forms
Make three forms in Google Forms (forms.google.com) using the agency Google account: Street Sign Request, Tour Request, Resource Request. Copy each form's link into the Form links screen in Pages CMS. Until a link is added, the site tells visitors to call.

## Things still needed from the agency
- The phone directory (law enforcement, health, fire and rescue, other). Add it on the Phone Numbers screen.
- Roles for Richard Filipek and Cody Fortner (they are hidden until filled in on the Staff screen).
- The 2025 statistics law figure (83,397) double-checked.
- PDFs for the Downloads page: street names list, street sign guidelines, hazardous materials annex and incident report, shelter in place brochure.
- The LEPC graph picture, and a line describing it.
