<template>
  <router-link :class="`button ${btnType} ${btnSize} ${className}`" :to="to">{{
    text
  }}</router-link>
</template>

<script>
export default {
  name: "v-button-link",
  props: {
    to: {
      type: String,
      default: "/",
      required: true
    },
    type: {
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
    text: {
      type: String,
      default: "Go to",
      required: true
    },
    className: {
      type: String,
      default: "",
      required: false
    }
  },
  computed: {
    btnType() {
      if (this.type === "primary") return "button--primary";
      if (this.type === "secondary") return "button--secondary";
      if (this.type === "danger") return "button--danger";
      return "button--primary";
    },
    btnSize() {
      if (this.size === "tiny") return "button--tiny";
      if (this.size === "small") return "button--small";
      return "";
    }
  }
};
</script>
