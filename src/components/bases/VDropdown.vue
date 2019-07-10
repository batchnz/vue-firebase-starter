<template>
  <div class="relative">
    <select
      :id="id"
      :name="name"
      :value="value"
      class="appearance-none block w-full bg-gray-300 text-gray-500 border border-gray-300 rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 focus:shadow"
      required
      @input="handleDropdown"
    >
      <slot />
    </select>
    <div
      class="pointer-events-none absolute top-0 right-0 flex items-center px-2 text-grey-darker"
    >
      <svg class="fill-current h-4 w-4" viewBox="0 0 20 20">
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-dropdown",
  props: {
    id: {
      type: String,
      default: "",
      required: false
    },
    name: {
      type: String,
      default: "text",
      required: false
    },
    value: {
      type: String,
      default: "",
      required: false
    }
  },
  methods: {
    handleDropdown(e) {
      this.$emit("input", e.target.value, this.name);
    }
  }
};
</script>
