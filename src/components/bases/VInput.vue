<template>
  <input
    :id="id"
    class="appearance-none block w-full bg-gray-300 text-grey-darker border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :required="isRequire"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "v-input",
  props: {
    id: {
      type: String,
      default: "",
      required: false
    },
    isRequire: {
      type: Boolean,
      default: true,
      required: false
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    type: {
      type: String,
      default: "text",
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    }
  },
  methods: {
    handleInput(e) {
      const inputValue =
        this.$props.type === "number" ? e.target.valueAsNumber : e.target.value;
      this.$emit("input", inputValue, this.name);
    }
  }
};
</script>
