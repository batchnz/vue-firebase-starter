<template>
  <label>
    <input
      class="mr-2 leading-tight"
      type="checkbox"
      @input="$emit('update:checked', $event.target.checked)"
      v-bind="$attrs"
    />
    <span v-if="text" class="align-baseline">{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "v-checkbox",
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: "",
      required: false
    }
  }
};
</script>
