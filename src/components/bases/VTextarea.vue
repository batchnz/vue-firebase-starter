<template>
  <textarea
    class="appearance-none block w-full bg-gray-300 text-grey-darker border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow"
    cols="30"
    rows="8"
    @input="$emit('update:value', $event.target.value)"
    v-bind="$attrs"
  ></textarea>
</template>

<script>
export default {
  name: "v-textarea",
  inheritAttrs: false
};
</script>
