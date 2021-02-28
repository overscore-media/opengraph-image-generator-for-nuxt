<template>
  <!-- For all other pages, like links to blog posts etc. -->
  <div class="page--content">
    <header class="page--header">
      <h1 v-if="!$fetchState.pending && !$fetchState.error && page">
        {{ page.name }}
      </h1>
      <div class="page--header--background"></div>
    </header>
    <main class="main--page--content">
      <section class="container">
        <nuxt-link to="/">Return to the Homepage</nuxt-link>
        <a href="https://github.com/overscore-media/opengraph-image-generator-for-nuxt" target="_blank">
          See the code on GitHub
        </a>
        Brought to you by: <a href="https://overscore.media" target="_blank">
          OverScore Media
        </a>
      </section>
      <Content v-if="page" :document="page" />
    </main>
  </div>
</template>

<script>
export default {
  transition: 'content-transition',
  data: () => ({
    page: {},
    throwError: false
  }),
  async fetch () {
    const parentRoute = this.$nuxt.context.route.params.pages
    const fullPath = this.$nuxt.context.route.fullPath

    const routeContent = await this.$content(parentRoute, { deep: true }).fetch().catch(() => {
      this.$nuxt.error({ statusCode: 404 })
    })

    const pageContent = routeContent.filter((page) => {
      if (fullPath.charAt(fullPath.length - 1) !== '/') {
        return page.path === fullPath
      } else {
        return page.path === fullPath.slice(0, -1)
      }
    })[0]

    if (pageContent) {
      this.page = pageContent
    } else {
      this.throwError = true
    }
  },
  head () {
    return {
      title: this.page.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.desc ?? ''
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `OGIGFN - ${this.page.name}`
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.baseUrl}${this.$nuxt.context.route.fullPath}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.desc
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl}/media/opengraph${this.$nuxt.context.route.fullPath}.png`
        }
      ]
    }
  },
  mounted () {
    if (process.browser && !this.page.name && this.throwError) {
      this.$nuxt.error({ statusCode: 404 })
    }
  },
  fetchOnServer: true
}
</script>

<style lang="scss">
.page--header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35vh;

  @include mq($from: tablet_p) {
    height: 30vh;
  }

  width: 100vw;
  background-color: $overdark;

  h1 {
    display: flex;
    justify-self: center;
    text-align: center;
    position: relative;
    font-size: 2rem;
    z-index: 2;
  }

  &--background {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    background-image: radial-gradient(ellipse at bottom, #262626, transparent);
    background-size: 100%;
    background-attachment: fixed;
    filter: blur(4px) contrast(150%) invert(10%) grayscale(40%) brightness(0.6);

    @media (prefers-reduced-motion: reduce) {
      animation: none !important;
    }
  }
}

.main--page--content {
  position: relative;
  background-color: $body-bg;
  box-shadow: 0 -20px 20px -5px $overdark;
  border-top: 2px solid $overdark;

  @include mq($from: desktop) {
    padding-left: 10%;
    padding-right: 10%;
  }

  .page--link {
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    font-size: 1.5rem;
    padding-top: 2rem;
    padding-bottom: 1rem;
    text-decoration: underline;
  }

  .page--desc {
    display: flex;
    justify-self: center;
    padding-left: 1rem;
    padding-right: 1rem;
    line-height: 3rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    font-weight: normal;
  }
}
</style>
