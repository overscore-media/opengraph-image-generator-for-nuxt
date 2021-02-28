<template>
  <div class="hero--wrapper">
    <!-- A title and a play button, if on the homepage -->
    <header class="flex items-center justify-center w-screen hero">
      <h1 class="hero--title">
        {{ title }}
      </h1>
    </header>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
$background-size: 100%;

.hero {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;

  &--wrapper {
    position: relative;
    top: 0;
    left: 0;
    width: 100vw;
    height: 65vh;
    overflow: hidden !important;
    z-index: 1;
  }

  &--title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    position: relative;
    z-index: 3;
    font-size: 2rem;
    text-align: center;

    @include mq($from: tablet_l) {

      font-size: 4rem;
    }
    color: white;
  }
}
</style>
