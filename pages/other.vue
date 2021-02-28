<template>
  <div class="page--content">
    <Hero title="Other Page" />
    <main class="main--content">
      <hr />
      <h3 class="heading">
        Here's another page just to show that routing works
      </h3>
      <section class="container">
        <nuxt-link to="/">
          Return to the Homepage
        </nuxt-link>
        <a href="https://github.com/overscore-media/opengraph-image-generator-for-nuxt" target="_blank">
          See the code on GitHub
        </a>
        Brought to you by <a href="https://overscore.media" target="_blank">
          OverScore Media
        </a>
      </section>
      <hr />
    </main>
  </div>
</template>

<script>
export default {
  transition: 'content-transition',
  head () {
    return {
      title: 'Other Page',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `Another page to show that routing is working as expected`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Other Page'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.baseUrl}${this.$nuxt.context.route.fullPath}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Another page to show that routing is working as expected`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl}/media/opengraph${this.$nuxt.context.route.fullPath}.png`
        }
      ]
    }
  }
}
</script>
