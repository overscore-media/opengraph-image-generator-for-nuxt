<template>
  <div class="page--content">
    <Hero title="OpenGraph Image Generator for Nuxt - Example" />
    <main class="main--content">
      <hr />
      <section class="container">
        <nuxt-link to="/other">Other Page</nuxt-link>
        <div v-for="(contentItem, itemIndex) in content" :key="itemIndex">
          <nuxt-link :to="contentItem.path">{{ contentItem.name }}</nuxt-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  transition: 'content-transition',
  data: () => ({
    content: []
  }),
  async fetch () {
    const someContent = await this.$content({ deep: true }).fetch()
    this.content = someContent
  },
  head () {
    return {
      title: 'Home',
      meta: [
        {
          hid: 'description',
          content: `OpenGraph Image Generator for Nuxt.js, by OverScore Media`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'OGIGFN by OverScore Media'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          // Note the slash
          content: `${process.env.baseUrl}/`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `OpenGraph Image Generator for Nuxt.js, by OverScore Media`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${process.env.baseUrl}/media/opengraph/index.png`
        }
      ]
    }
  },
  fetchOnServer: true
}
</script>

<style lang="scss">
.page--content {
  min-height: 100vh;
}

.container {
  display: flex;
  justify-content: space-around;
}
</style>
