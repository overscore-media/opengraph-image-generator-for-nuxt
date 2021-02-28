<template>
  <div class="nuxt-content--wrapper">
    <nuxt-content :document="document" />
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  }
}
</script>
