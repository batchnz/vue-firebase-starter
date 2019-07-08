<template>
  <VDropdown
    id="specialty"
    name="specialty"
    :value="value"
    @input="handleDropdown"
  >
    <optgroup v-for="(options, key) in optgroups" :label="key" :key="key">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :selected="option.value === value"
      >
        {{ option.label }}
      </option>
    </optgroup>
  </VDropdown>
</template>

<script>
// https://www.upwork.com/i/freelancer-categories-all/
import VDropdown from "@/components/bases/VDropdown";
export default {
  name: "the-dropdown-specialty",
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
      optgroups: {
        // ! First Letter is uppercase
        Design: [
          {
            value: "Graphic, branding & design",
            label: "Graphic, branding & design"
          },
          { value: "UI/UX design", label: "UI/UX design" }
        ],
        Development: [
          { value: "Web development", label: "Web development" },
          { value: "Mobile development", label: "Mobile development" }
        ],
        Sales: [
          { value: "Digital marketing", label: "Digital marketingn" },
          { value: "Public relations", label: "Public relations" },
          { value: "Copywriting", label: "Copywriting" }
        ],
        Others: [
          { value: "Photography", label: "Photography" },
          { value: "Video production", label: "Video production" }
        ]
      }
    };
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
