<template>
  <VDropdown id="country" name="country" :value.sync="selected">
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
  watch: {
    selected(v) {
      if (!v) return;
      this.$emit("update:value", v);
    }
  },
  mounted() {
    if (this.value) {
      this.selected = this.value;
    }
  }
};
</script>
