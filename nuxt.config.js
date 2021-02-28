import { parse } from 'node-html-parser'
const isDev = process.env.NODE_ENV !== 'production'

let pagesMetaForPreviewImages = []

export default {
  target: 'static',

  htmlAttrs: {
    lang: 'en_CA'
  },

  head: {
    titleTemplate: isDev ? 'DEV - %s - OGIGFN' : '%s - OGIGFN',
    // Different favicon for development mode
    link: [{ rel: isDev ? 'shortcut icon' : 'icon', type: isDev ? 'image/svg+xml' : 'image/x-icon', href: isDev ? '/dev-favicon.svg' : '/icons/favicon-32x32.png' }],
    // Ionicons [https://ionicons.com/]
    script: [{
      src: 'https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js',
      type: 'module',
      body: true
    },
    {
      src: 'https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js',
      nomodule: '',
      body: true
    }
    ]
  },

  // The global variable used to let the site know where it's being hosted
  env: {
    baseUrl: 'https://ogigfn.overscore.media'
  },

  css: [
    '~/assets/scss/main'
  ],

  // Lets components be auto-imported by Nuxt
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources'
  ],

  // Makes SASS variables and mixins global
  styleResources: {
    scss: [
      './assets/scss/mixins/mixins.scss',
      './assets/scss/variables/variables.scss'
    ]
  },

  modules: [
    '@nuxt/content'
  ],

  // Nuxt Content configuration
  content: {
    liveEdit: false,
    markdown: {
      prism: {
        theme: 'prismjs/themes/prism-tomorrow.css'
      }
    }
  },

  hooks: {
    generate: {
      // Basically used to scrape the page titles
      async page (page) {
        const pageHtml = parse(page.html)

        if (!page.route.includes('/blog/')) {
          let pageMeta = {}

          // eslint-disable-next-line array-callback-return
          pageHtml.querySelectorAll('meta').map((meta) => {
            const name = meta.getAttribute('name')
            const property = meta.getAttribute('property')

            if (property === 'og:title') {
              // og:title, not the page title
              const ogTitle = meta.getAttribute('content')

              pageMeta.name = meta.getAttribute('content')
            }
          })

          if (page.route !== '/') {
            pageMeta.path = page.route
          } else {
            // For the homepage; otherwise the image generation file structure doesn't work
            pageMeta.path = '/index'
          }

          pagesMetaForPreviewImages.push(pageMeta)
        }
      },
      // https://timbenniks.dev/writings/easy-dynamic-routes-in-your-nuxt-sitemap/
      // Until the Nuxt sitemap module integrates this:
      // https://github.com/nuxt-community/sitemap-module/issues/143
      async done (context) {
        const listOfRoutes = Array.from(context.generatedRoutes)

        // This bit is from https://redfern.dev/articles/adding-a-sitemap-using-nuxt-content/
        const { $content } = require('@nuxt/content')
        const fetchedContent = await $content({ deep: true }).only(['path', 'name', 'header']).fetch()

        // eslint-disable-next-line array-callback-return
        fetchedContent.map((page) => {
          pagesMetaForPreviewImages.push(page)
        })

        console.dir(pagesMetaForPreviewImages)

        // The dynamic OpenGraph image generator
        const { createCanvas, loadImage, registerFont } = require('canvas')
        // Because fs itself is a bit more unwieldy and I don't trust myself with it
        const fs = require('fs-extra')
        const path = require('path')

        // Make the canvas itself
        const canvas = createCanvas(1200, 627)
        const ctx = canvas.getContext('2d')
        registerFont('./assets/fonts/Inter-Black.ttf', { family: 'Inter-Black' })

        // Fill the canvas with overdark
        ctx.fillStyle = '#262626'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Because otherwise the opengraph directory isn't included automatically in /dist
        const distDirectory = context.options.generate.dir

        // Iterate over the list of pages with metadata
        pagesMetaForPreviewImages.forEach((page) => {
          // Fill the canvas with overdark again
          ctx.fillStyle = '#262626'
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // This is the template (with the OverScore Media logo and dark overlay) for every page's image
          loadImage(path.join(__dirname, './assets/images/overscore-opengraph-template.png')).then((templateImage) => {

            // For pages that have their own header, let them use it
            // All other pages use the default background
            let backgroundImage = './assets/images/overscore-opengraph-default-background.png'
            if (page.header) {
              backgroundImage = `./static${page.header}`
            }

            loadImage(path.join(__dirname, backgroundImage)).then((header) => {
              // Fill with canvas with overdark if the page doesn't have its own header,
              // and dargrey if it does (for visibility/transparency reasons)
              if (page.header) {
                ctx.fillStyle = '#989eb9'
              } else {
                ctx.fillStyle = '#262626'
              }
              ctx.fillRect(0, 0, canvas.width, canvas.height)

              // Put the background (custom header or default) onto the canvas, right in the middle
              ctx.drawImage(header, canvas.width / 2 - header.width / 2, canvas.height / 2 - header.height / 2)
              // Overlay the template image
              ctx.drawImage(templateImage, 0, 0)

              // Type out the name of the page
              ctx.textAlign = 'center'
              ctx.fillStyle = '#ffffff'
              ctx.font = '50px Inter-Black'
              if (page.name.length > 42) {
                // Truncate page name after 42 characters
                ctx.fillText(`${page.name.substring(0, 42)}...`, 600, 314)
              } else {
                ctx.fillText(page.name, 600, 314)
              }

              // Write the canvas to a file (specifically, a file in the /dist/media/opengraph directory)
              fs.outputFile(path.join(distDirectory, `/media/opengraph/${page.path}.png`), canvas.toBuffer())
            })
          })

        })
      }
    }
  },

  build: {
    corejs: 3,
    babel: {},
    extend (config, { isDev, isClient, isServer, loaders }) {},
    html: {
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    // Using Dart Sass because it's cooler
    loaders: {
      sass: {
        implementation: require('sass')
      },
      scss: {
        implementation: require('sass')
      }
    },
    // If there are weird Nuxt errors during dev/build, change this to false to get more info
    quiet: false
  },

  // So 404 error pages are generated too in static mode
  generate: {
    fallback: true
  },

  // To keep Vue happy/quieter about ion-icon being a custom element
  vue: {
    config: {
      productionTip: false,
      ignoredElements: [
        'ion-icon'
      ]
    }
  }
}
