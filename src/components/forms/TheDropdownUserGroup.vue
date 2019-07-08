<template>
  <VDropdown id="spcialty" name="group" @input="handleDropdown">
    <option v-for="group in userGroup" :key="group.id" :value="group.id">
      {{ group.name }}
    </option>
  </VDropdown>
</template>

<script>
import VDropdown from "@/components/bases/VDropdown";
import { userGroup } from "@/helpers/constants";

export default {
  name: "the-dropdown-user-group",
  components: { VDropdown },
  data() {
    return {
      userGroup
    };
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
