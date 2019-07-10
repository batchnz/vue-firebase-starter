<template>
  <form @submit.prevent="handleSubmit" :class="className">
    <VRow>
      <!-- Name -->
      <VColumn size="1/2">
        <VLabel label-for="first-name" text="First Name" />
        <VInput
          id="first-name"
          v-model="form.firstName"
          :value="(initialForm && initialForm.firstName) || ''"
          type="text"
          name="firstName"
          placeholder="Walt"
        />
      </VColumn>
      <VColumn size="1/2">
        <VLabel label-for="last-name" text="Last Name" />
        <VInput
          id="last-name"
          v-model="form.lastName"
          :value="(initialForm && initialForm.lastName) || ''"
          type="text"
          name="lastName"
          placeholder="Disney"
        />
      </VColumn>

      <!-- Email -->
      <VColumn :size="(isRegister && '1/2') || 'full'">
        <VLabel text="Email" label-for="email" />
        <VInput
          id="email"
          v-model="form.email"
          :value="(initialForm && initialForm.email) || ''"
          name="email"
          placeholder="walt@disney.com"
          type="email"
          autocomplete="username email"
        />
      </VColumn>

      <!-- Group | Register only -->
      <VColumn v-if="isRegister" size="1/2">
        <VLabel text="Account Type" label-for="group" />
        <TheDropdownUserGroup v-model="form.group" />
      </VColumn>

      <!-- Password | Register only-->
      <template v-if="isRegister">
        <VColumn size="1/2">
          <VLabel label-for="password" text="Password" />
          <VInput
            id="password"
            v-model="form.password"
            name="password"
            type="password"
            :is-require="isRegister"
            autocomplete="new-password"
          />
        </VColumn>
        <VColumn size="1/2">
          <VLabel label-for="password-confirm" text="Confirm Password" />
          <VInput
            id="password-confirm"
            v-model="form.passwordConfirm"
            name="password-confirm"
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

import TheDropdownUserGroup from "@/components/forms/TheDropdownUserGroup";
import { userGroup } from "@/helpers/constants";

export default {
  name: "the-form-auth",
  components: { VRow, VColumn, VLabel, VInput, VButton, TheDropdownUserGroup },
  props: {
    className: {
      type: String,
      default: "",
      required: false
    },
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
          // TODO, data need to be loaded from db
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
      }
    };
  },
  methods: {
    handleSubmit(e) {
      if (e.target.password && e.target.password.value) {
        e.target.password.value = "";
        e.target["password-confirm"].value = "";
      }
      this.$emit("clicked", this.form);
    }
  }
};
</script>
