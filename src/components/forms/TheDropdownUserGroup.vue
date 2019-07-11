<template>
  <VDropdown
    id="userGroup"
    name="group"
    @input="handleDropdown"
    ref="dropdown"
    v-model="selected"
  >
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
      userGroup,
      selected: userGroup.groupA.id
    };
  },
  methods: {
    handleDropdown(value) {
      this.$emit("input", value);
    }
  }
};
</script>
