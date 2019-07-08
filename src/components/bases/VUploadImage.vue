<template>
  <div>
    <label>
      <input type="file" @change="onImageChange" />
      <!-- Below btn could hide or not, v-if="!isReadyToSave" -->
      <span class="button button--primary max-w-xs">{{ textBtnUpload }}</span>
      <span v-if="showName && image.imageName">{{ image.imageName }}</span>
      <img :src="image.imageBase64" alt="Update my avatar" />
    </label>
    <!-- Conditional Button, only show up when it is ready to save to storage -->
    <VButton
      v-if="isReadyToSave"
      :text="saveBtnText"
      level="primary"
      size="small"
      className="max-w-xs"
      @clicked="onImageSave"
    />
  </div>
</template>

<script>
import placeholderImageUploadSVG from "@/assets/img/placeholder_image_upload.svg";
import VButton from "@/components/bases/VButton";
export default {
  name: "v-updade-image",
  props: {
    showName: {
      type: Boolean,
      default: false,
      required: false
    },
    isSaving: {
      type: Boolean,
      default: false,
      required: false
    },
    defaultImageLink: {
      type: String,
      default: placeholderImageUploadSVG,
      required: false
    },
    textBtnUpload: {
      type: String,
      default: "Upload",
      required: false
    },
    textBtnSave: {
      type: String,
      default: "Save",
      required: false
    }
  },
  components: {
    VButton
  },
  data: function() {
    return {
      image: {
        image: null,
        imageName: "",
        imageBase64: this.defaultImageLink
      }
    };
  },
  computed: {
    isReadyToSave() {
      if (this.image.image) return true;
      return false;
    },
    saveBtnText() {
      if (this.isSaving) return "Saving";
      return "Save";
    }
  },
  methods: {
    onImageChange(e) {
      const files = e.target.files;
      this.image.image = files[0];
      if (files[0].name) this.image.imageName = files[0].name;
      const reader = new FileReader();
      reader.onload = () => {
        this.image.imageBase64 = reader.result;
      };
      reader.readAsDataURL(files[0]);
      // this.$emit("onChange", this.image);
    },
    onImageSave() {
      this.$emit("onSave", this.image);
    }
  }
};
</script>
