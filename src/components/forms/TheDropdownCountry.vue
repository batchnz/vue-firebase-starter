<template>
  <VDropdown
    id="country"
    name="country"
    v-model="selected"
    @input="handleDropdown"
  >
    <option
      v-for="country in countries"
      :key="country.value"
      :value="country.value"
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
      selected: "New Zealand",
      countries: [
        { value: "New Zealand", label: "New Zealand" },
        { value: "Australia", label: "Australia" }
      ]
    };
  },
  mounted() {
    if (this.value) {
      this.selected = this.value;
    }
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
