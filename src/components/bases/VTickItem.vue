<template>
  <li class="flex items-center">
    <svg
      class="text-purple fill-current h-5 w-5 md:h-6 md:w-6 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </svg>
    {{ text }}
  </li>
</template>

<script>
export default {
  name: "v-tick-item",
  props: {
    text: {
      type: String,
      default: "Unnamed",
      required: true
    }
  }
};
</script>
