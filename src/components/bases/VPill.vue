<template>
  <div
    :class="
      `text-2xs tracking-wide inline-block font-medium uppercase rounded-full py-1 px-4 shadow ${pillType} ${className}`
    "
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "v-pill",
  props: {
    className: {
      type: String,
      default: "",
      required: false
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
    }
  },
  computed: {
    pillType() {
      if (this.type === "primary") return "bg-blue text-white";
      if (this.type === "secondary") return "bg-gray-300 bg-grey-darker";
      if (this.type === "success") return "bg-green text-white";
      if (this.type === "warning") return "bg-orange text-white";
      if (this.type === "danger") return "bg-red-400 text-white";
      return "bg-blue text-white";
    }
  },
  methods: {
    handleClick() {
      this.$emit("clicked");
    }
  }
};
</script>
