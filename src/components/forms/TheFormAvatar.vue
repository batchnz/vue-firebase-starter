<template>
  <VRow>
    <VColumn>
      <VUploadImage
        @onSave="handleAvatarOnSave"
        :isSaving="isSaving"
        :defaultImageLink="user.avatar"
      />
    </VColumn>
  </VRow>
</template>

<script>
import { mapActions } from "vuex";

import VRow from "@/components/bases/VRow";
import VColumn from "@/components/bases/VColumn";
import VUploadImage from "@/components/bases/VUploadImage";

import { updateAuthPhotoURL } from "@/firebase/actionsAuth";
import { uploadAvatarImage } from "@/firebase/actionsFunction";
import { toastedError, toastedSuccess } from "@/helpers/toasted";

export default {
  name: "the-form-avatar",
  components: {
    VRow,
    VColumn,
    VUploadImage
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isSaving: false
    };
  },
  methods: {
    ...mapActions("users", ["updateUserAvatar", "reloadUserAuth"]),
    async handleAvatarOnSave(data) {
      try {
        this.isSaving = true;
        // (1) Upload image to Cloudinary
        const imageUri = await uploadAvatarImage({
          imageStr: data.imageBase64,
          cloudinaryConfig: {
            public_id: `avatar_${this.user.uid}`,
            subFolder: this.user.uid,
            overwrite: true,
            invalidate: true
          }
        });
        // (2) Update firebase Auth photoURL
        await updateAuthPhotoURL(imageUri);
        // (4) Reload firebase auth info
        this.updateUserAvatar(imageUri);
        toastedSuccess(this.toasted, "Avatar is updated");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSaving = false;
      }
    }
  }
};
</script>
