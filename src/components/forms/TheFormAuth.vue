<template>
  <form @submit.prevent="handleSubmit">
    <VRow>
      <!-- Name -->
      <VColumn size="1/2">
        <VLabel label-for="first-name" text="First Name" />
        <VInput
          type="text"
          id="first-name"
          :value.sync="form.firstName"
          placeholder="Walt"
          autocomplete="family-name"
          required
        />
      </VColumn>
      <VColumn size="1/2">
        <VLabel label-for="last-name" text="Last Name" />
        <VInput
          type="text"
          id="last-name"
          :value.sync="form.lastName"
          placeholder="Disney"
          autocomplete="given-name"
          required
        />
      </VColumn>

      <!-- Email -->
      <VColumn :size="(isRegister && '1/2') || 'full'">
        <VLabel text="Email" label-for="email" />
        <VInput
          id="email"
          :value.sync="form.email"
          placeholder="walt@disney.com"
          type="email"
          autocomplete="username email"
          required
        />
      </VColumn>

      <!-- Group | Register only -->
      <VColumn v-if="isRegister" size="1/2">
        <VLabel text="Account Type" label-for="group" />
        <VDropdown id="group" :value.sync="form.group" required>
          <option v-for="group in userGroup" :key="group.id" :value="group.id">
            {{ group.name }}
          </option>
        </VDropdown>
      </VColumn>

      <!-- Password | Register only-->
      <template v-if="isRegister">
        <VColumn size="1/2">
          <VLabel label-for="password" text="Password" />
          <VInput
            id="password"
            :value.sync="form.password"
            type="password"
            :is-require="isRegister"
            autocomplete="new-password"
          />
        </VColumn>
        <VColumn size="1/2">
          <VLabel label-for="password-confirm" text="Confirm Password" />
          <VInput
            id="password-confirm"
            :value.sync="form.passwordConfirm"
            type="password"
            :is-require="isRegister"
            autocomplete="new-password"
          />
        </VColumn>
      </template>
    </VRow>
    <VButton
      type="submit"
      :disabled="isSubmitting"
      :text="
        isSubmitting ? 'Submitting' : (isRegister && 'Register') || 'Update'
      "
    />
  </form>
</template>

<script>
import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VLabel from "@/components/bases/VLabel";
import VInput from "@/components/bases/VInput";
import VButton from "@/components/bases/VButton";
import VDropdown from "@/components/bases/VDropdown";

import { userGroup } from "@/helpers/constants";

export default {
  name: "the-form-auth",
  components: { VRow, VColumn, VLabel, VInput, VButton, VDropdown },
  props: {
    isSubmitting: {
      type: Boolean,
      default: false,
      required: false
    },
    isRegister: {
      type: Boolean,
      default: false,
      reuired: false
    },
    initialForm: {
      type: Object,
      default() {
        return {
          firstName: "",
          lastName: "",
          email: "",
          // Dropdown request a default value
          group: userGroup.groupA.id
        };
      },
      required: false
    }
  },
  data() {
    const { initialForm } = this;
    return {
      form: {
        firstName: initialForm.firstName,
        lastName: initialForm.lastName,
        password: "",
        passwordConfirm: "",
        email: initialForm.email,
        group: initialForm.group
      },
      userGroup
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("clicked", this.form);
    }
  }
};
</script>
