<template>
  <section>
    <PortfolioProjectPreview
      :project="formPreview"
      :isEdit="true"
      @onDelete="handleImageDeletion"
    />
    <!-- Editor -->
    <TheFormPortfolioProject
      :userID="user.uid"
      :isSubmitting="isSubmitting"
      :isImageSaving="isImageSaving"
      :isEdit="true"
      :formPreview="formPreview"
      :modifyImageUri="modifyImageUri"
      @clicked="handleUpdateProject"
      @changed="handleFormChange"
      @imageUpload="handleImageUpload"
    />
    <!-- Go back link -->
    <VButtonLink
      :to="projectViewLink"
      text="Cancel Edit"
      type="danger"
      size="tiny"
      className="max-w-xs mt-6"
    />
  </section>
</template>

<script>
import { mapState } from "vuex";
import uuidv1 from "uuid/v1";
import {
  toastedError,
  toastedSuccess,
  toastedInfo,
  toastedClear
} from "@/helpers/toasted";
import { routePaths } from "@/helpers/constants";
import VButtonLink from "@/components/bases/VButtonLink";
import TheFormPortfolioProject from "@/components/forms/TheFormPortfolioProject";
import PortfolioProjectPreview from "@/components/PortfolioProjectPreview";

import {
  updatePortfolioProject,
  unionPortfolioProjectImages,
  removePortfolioProjectImages
} from "@/firebase/actionsStore";
import { uploadProjectImage } from "@/firebase/actionsFunction";

export default {
  name: "page-dashboard-portfolio-project-edit",
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    VButtonLink,
    TheFormPortfolioProject,
    PortfolioProjectPreview
  },
  data() {
    return {
      isSubmitting: false,
      formPreview: this.project,
      error: false,
      projectViewLink: routePaths.dashboard.portfolio.projects.view(
        this.$route.params.id
      ),
      // Value is used for passing down to child componet
      modifyImageUri: "",
      // Value is used for passing down to child componet
      isImageSaving: false
    };
  },
  computed: {
    ...mapState("users", ["user"]),
    isLoading() {
      if (!this.formPreview && !this.error) return true;
      return false;
    }
  },
  watch: {
    error(newV) {
      if (newV) this.$route.push(routePaths.dashboard.home);
    }
  },
  methods: {
    handleFormChange(form) {
      this.formPreview = form;
    },
    async handleUpdateProject(form) {
      try {
        this.isSubmitting = true;
        // TODO, add error message to errorSchema()
        if (!this.user || !this.user.uid) throw new Error("Missing userID");
        if (!form) throw new Error("Missing form data");
        form.userID = this.user.uid;
        await updatePortfolioProject(form, this.$route.params.id);
        toastedSuccess(this.$toasted, "The project is updated");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isSubmitting = false;
      }
    },
    async handleImageUpload(data) {
      try {
        this.isImageSaving = true;
        // TODO, add error message to errorSchema()
        if (!data || !data.imageBase64)
          throw new Error("Server Error: Missing image data.");
        const projectID = this.$route.params.id;
        const timestamp = uuidv1();
        // (1) Upload image to Cloudinary
        const imageUri = await uploadProjectImage({
          imageStr: data.imageBase64,
          cloudinaryConfig: {
            public_id: timestamp,
            subFolder: `${this.user.uid}/projects/${projectID}`
          }
        });
        // (2) Insert image URL to fireStore everytime when user inserting
        await unionPortfolioProjectImages(imageUri, projectID);
        // Update children component
        this.modifyImageUri = imageUri;
        toastedSuccess(this.toasted, "Image is saved");
      } catch (error) {
        toastedError(this.$toasted, error.message);
      } finally {
        this.isImageSaving = false;
      }
    },
    async handleImageDeletion(ImageUri) {
      try {
        toastedInfo(this.$toasted, "Deleting");
        const projectID = this.$route.params.id;
        // ! Order contains logic, so it's matter
        // (1) delete Image from Array (database), Level: Height
        await removePortfolioProjectImages(ImageUri, projectID);
        // (2) delete Image from Array (client-side), Level: Height
        this.modifyImageUri = ImageUri;
        // (3) delete Image from cloudinary, Level: Low
      } catch (error) {
        const _this = this;
        // * Avoid Notification run into racing condition
        setTimeout(function() {
          toastedError(_this.$toasted, error.message);
        }, 100);
      } finally {
        toastedClear();
      }
    }
  }
};
</script>
