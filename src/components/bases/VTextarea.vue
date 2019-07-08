<template>
  <textarea
    id=""
    class="appearance-none block w-full bg-gray-300 text-grey-darker border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow"
    name=""
    :value="value"
    :placeholder="placeholder"
    :cols="cols"
    :rows="rows"
    @input="handleInput"
  ></textarea>
</template>

<script>
export default {
  name: "v-textarea",
  props: {
    // Required props
    name: {
      type: String,
      default: "",
      required: true
    },
    // Un-required props
    id: {
      type: String,
      default: "idTextarea",
      required: false
    },
    value: {
      type: String,
      default: "",
      required: false
    },
    isRequire: {
      type: Boolean,
      default: true,
      required: false
    },
    cols: {
      type: String,
      default: "30",
      required: false
    },
    rows: {
      type: String,
      default: "8",
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
      this.$emit("input", e.target.value);
    }
  }
};
</script>
