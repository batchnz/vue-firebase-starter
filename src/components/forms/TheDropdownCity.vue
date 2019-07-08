<template>
  <VDropdown id="city" name="city" :value="value" @input="handleDropdown">
    <option
      v-for="city in citys"
      :key="city.value"
      :value="city.value"
      :selected="city.value === value"
    >
      {{ city.label }}
    </option>
  </VDropdown>
</template>

<script>
import VDropdown from "@/components/bases/VDropdown";

export default {
  name: "the-dropdown-city",
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
      citys: [
        { value: "Auckland", label: "Auckland" },
        { value: "Wellington", label: "Wellington" },
        { value: "Christchurch", label: "Christchurch" }
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
