<script setup></script>

<template>
  <div>
    <NuxtPage></NuxtPage>
  </div>
</template>

<style lang="scss">
@use "assets/style/main.scss";

.page-enter-active,
.page-leave-active {
  transition-duration: 200ms;
  transition-property: filter opacity;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
