<template>
  <div class="layout">
    <Hero title="Page Not Found" />
  </div>
</template>

<script>
export default {
  props: [
    'error'
  ],
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss">
</style>
