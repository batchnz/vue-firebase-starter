import Vue from "vue";

export const toastedError = (toasted, message) => {
  if (!toasted) toasted = Vue.toasted;
  toasted.error(message, {
    duration: 4000,
    position: "bottom-center",
    action: {
      text: "close",
      onClick(e, toastObject) {
        toastObject.goAway(0);
      }
    }
  });
};

export const toastedInfo = (toasted, message) => {
  if (!toasted) toasted = Vue.toasted;
  toasted.info(message, {
    duration: 4000,
    position: "bottom-center",
    action: {
      text: "close",
      onClick(e, toastObject) {
        toastObject.goAway(0);
      }
    }
  });
};

export const toastedSuccess = (toasted, message) => {
  if (!toasted) toasted = Vue.toasted;
  toasted.success(message, {
    duration: 4000,
    position: "bottom-center",
    action: {
      text: "close",
      onClick(e, toastObject) {
        toastObject.goAway(0);
      }
    }
  });
};

export const toastedClear = toasted => {
  if (!toasted) toasted = Vue.toasted;
  toasted.clear();
};
