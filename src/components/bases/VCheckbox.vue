<template>
  <label>
    <input
      :id="id"
      class="mr-2 leading-tight"
      type="checkbox"
      :name="name"
      :checked="value"
      :required="isRequire"
      @input="handleInput"
    />
    <span v-if="text" class="align-baseline">{{ text }}</span>
  </label>
</template>

<script>
export default {
  name: "v-checkbox",
  props: {
    name: {
      type: String,
      default: "",
      required: true
    },
    id: {
      type: String,
      default: "",
      required: false
    },
    isRequire: {
      type: Boolean,
      default: false,
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    },
    value: {
      type: Boolean,
      default: false,
      required: false
    },
    text: {
      type: String,
      default: "",
      required: false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.checked, this.name);
    }
  }
};
</script>
