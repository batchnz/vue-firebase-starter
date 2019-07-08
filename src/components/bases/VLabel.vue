<template>
  <label
    :for="labelFor"
    class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
  >
    {{ text }}
  </label>
</template>

<script>
export default {
  name: "v-label",
  props: {
    labelFor: {
      type: String,
      default: "",
      required: false
    },
    text: {
      type: String,
      default: "",
      required: false
    }
  }
};
</script>
