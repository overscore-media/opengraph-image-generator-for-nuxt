# OGIGFN - by OverScore Media

A demonstration of how to use the Nuxt Content module, `node-canvas`, and some technical trickery to dynamically generate OpenGraph (social media page embed preview) images for the pages on your Nuxt.js site. We use it at https://overscore.media (try sharing a link from our page on Facebook/Twitter/LinkedIn and see the image that pops up).

We were inspired by Vercel's [og-image](https://github.com/vercel/og-image) service, and wanted to try something a bit different using Nuxt and static site generation.

Feel free to use this as a reference, but it's probably best not to base a new project completely off it. At this point there are just a lot of moving parts. Maybe in the future we could make it a self-contained Nuxt module, or the Nuxt team might make something that renders it obsolete ;].

Live at https://ogigfn.overscore.media

Made by [OverScore Media](https://overscore.media), a distributed software, web, and digital design agency based in Peterborough, Ontario. If you're looking for work or have a project in mind [we offer free, comprehensive consultations for all our clients] do drop us a line.

#### OverScore Media - Your Message, Levelled Up!
---

### Development Setup

- Make sure you have Git, Node.js, Yarn, etc. installed (Node 14 and up is very much recommended)
- You may need the Visual Studio C++ Tools (or whatever they're called these days) to develop on Windows
  - (I use Kali Linux in WSL, so it's probable that I may have broken/hampered Windows compatibility in some way)
- Clone the repo from GitLab (I recommend setting up an SSH key for GitLab)
- `yarn` to install all the Node dependencies

---

### Helpful Commands
- `yarn dev` - to spin up a dev server on `localhost:1234`
- `yarn prod` - to generate the static files and spin up a production server on `localhost:5678`
- `yarn lint` - to lint all JavaScript/CSS [including Vue/SCSS files]
- `yarn fix` - to lint all JavaScript/CSS, auto-fixing any problems that can be auto-fixed

---

### Files (in decending alphabetical order for some reason)

`yarn.lock` - the lockfile for Node dependencies, as managed by `yarn`

`stylelint.config.js` - the Stylelint config for linting CSS/SCSS (right now it's basically standard minus some nuisances)

`package.json` - the main Node.js application/dependency information file

`nuxt.config.js` - where Nuxt-specific config is stored

`jsconfig.json` - IDK, VS Code likes it, though

`commitlint.config.js` - maybe this is silly, but it checks that all commits should be in [Semantic Commit style](https://www.conventionalcommits.org/en/v1.0.0/)

`.gitignore` - the files/directories that Git should not version-track

`.eslintrc.js` - the ESLint config for linting JavaScript/Vue files

`.editorconfig` - text editors like it, IDK

---

### Directories

`.nuxt` - Nuxt's magical directory while it's running

`assets` - where fonts, [some] images, and styles go
  - `fonts`
    - The Inter-Black typeface is here for the OpenGraph images, but you can easily swap it out
      - (just remember to update the `registerFont` call in nuxt.config.js if you do change the font)
  - `images`
    - Mostly for SVGs, small icons, non-dynamic background images, etc.
  - `scss`
    - The global styles for the site (page- and component-specific styles are mostly in their own page/component's Vue file)
    - Also global SASS mixins and variables

`components` - where Vue components are loaded in
  - Note that Nuxt no longer requires importing the components into other files, as the `@nuxt/components` module takes care of lazy-loading them via Webpack at runtime (TLDR, you can use these in any other page/component straight in the markup without having to `import Component from '~/components/component-name.vue`)

`content` - where the Nuxt Content... content is stored. Mostly Markdown
  - There is currently one file in the root of the directory, and another two in the `/blog` subdirectory
  - See https://content.nuxtjs.org/

`layouts` - think of these as the grandparent/supra-components. Layouts define pages, pages have components, and components can have child/grandchild/etc. components in them
  - Currently a default layout for all pages and an error page for 404's and stuff

`pages` - pages go here. Routing in Nuxt is a little weird, though
  - Where necessary, pages have comments explaining what they do
  - Like layouts and components, pages are `.vue` files

`static` - stuff that's supposed to be at `https://ogigfn.overscore.media/some-file.png` or whatever (i.e. not an "asset" but loaded in when needed)
  - Favicons and content/dynamically-fetched images go here
  - OpenGraph images go in `/static/media/opengraph`
    - Since they're dynamically created when you call `yarn generate`, they shouldn't be version-controlled
  - Remember, everything in static ends up at a publicly-available URL

---

### Other Helpful Links

[Vercel's OG Image-as-a-Service](https://github.com/vercel/og-image)

[Nuxt 2.x Documentation](https://nuxtjs.org/docs/2.x/get-started/installation)

[Vue Documentation (currently using Vue 2 on this site)](https://vuejs.org/)

[ESLint Documentation](https://eslint.org/docs/user-guide/configuring)

[Stylelint Documentation](https://stylelint.io/user-guide/configure)

[Sass-MQ](https://github.com/sass-mq/sass-mq)

[node-canvas Documentation](https://github.com/Automattic/node-canvas)