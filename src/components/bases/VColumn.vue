<template>
  <div :class="`w-full lg:w-${size} pl-3 mb-6`">
    <slot />
  </div>
</template>

<script>
export default {
  name: "v-column",
  props: {
    size: {
      type: String,
      default: "full",
      required: false
    }
  }
};
</script>
