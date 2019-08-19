<template>
  <button
    :class="`button ${btnType} ${btnSize} ${className}`"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
    v-bind="$attrs"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "v-button",
  props: {
    text: {
      type: String,
      default: "Unnamed",
      required: true
    },
    type: {
      type: String,
      // button|submit|reset
      default: "button",
      required: false
    },
    level: {
      validator(value) {
        return (
          ["primary", "secondary", "success", "warning", "danger"].indexOf(
            value
          ) !== -1
        );
      },
      default: "primary",
      required: false
    },
    size: {
      validator(value) {
        return ["tiny", "small", "regular"].indexOf(value) !== -1;
      },
      default: "regular",
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    className: {
      type: String,
      default: "",
      required: false
    }
  },
  computed: {
    btnType() {
      if (this.level === "primary") return "button--primary";
      if (this.level === "secondary") return "button--secondary";
      if (this.level === "danger") return "button--danger";
      return "button--primary";
    },
    btnSize() {
      if (this.size === "tiny") return "button--tiny";
      if (this.size === "small") return "button--small";
      return "";
    }
  },
  methods: {
    handleClick() {
      this.$emit("clicked");
    }
  }
};
</script>
