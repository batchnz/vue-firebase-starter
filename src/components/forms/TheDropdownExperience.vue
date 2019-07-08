<template>
  <VDropdown
    id="experience"
    name="experience"
    :value="value"
    @input="handleDropdown"
  >
    <option
      v-for="level in experience"
      :key="level.value"
      :value="level.value"
      :selected="level.value === value"
    >
      {{ level.label }}
    </option>
  </VDropdown>
</template>

<script>
import VDropdown from "@/components/bases/VDropdown";

export default {
  name: "the-dropdown-experience",
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
      experience: [
        { value: "World class", label: "World class" },
        { value: "Senior", label: "Senior" },
        { value: "Intermediate", label: "Intermediate" },
        { value: "Junior", label: "Junior" }
      ]
    };
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
