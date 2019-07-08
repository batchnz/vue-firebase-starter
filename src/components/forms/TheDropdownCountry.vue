<template>
  <VDropdown id="country" name="country" :value="value" @input="handleDropdown">
    <option
      v-for="country in countries"
      :key="country.value"
      :value="country.value"
      :selected="country.value === value"
    >
      {{ country.label }}
    </option>
  </VDropdown>
</template>

<script>
import VDropdown from "@/components/bases/VDropdown";

export default {
  name: "the-dropdown-country",
  components: { VDropdown },
  props: {
    value: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      countries: [{ value: "New Zealand", label: "New Zealand" }]
    };
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
