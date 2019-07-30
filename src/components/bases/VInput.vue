<template>
  <input
    class="appearance-none block w-full bg-gray-300 text-grey-darker border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow"
    @input="handleInput"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: "v-input",
  inheritAttrs: false,
  methods: {
    handleInput(e) {
      const inputValue =
        this.$attrs.type === "number" ? e.target.valueAsNumber : e.target.value;
      this.$emit("update:value", inputValue);
    }
  }
};
</script>
