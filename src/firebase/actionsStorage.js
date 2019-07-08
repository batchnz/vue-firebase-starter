import { fireStorage } from "@/firebase";
import { errorToObject } from "@/helpers/errorHandler";

export const updateUserProfile = async (imageData, userUid) => {
  try {
    const fileData = await fireStorage
      .ref(`userProfile/${userUid}`)
      .put(imageData);
    const iUrl = await fileData.ref.getDownloadURL();
    return iUrl;
  } catch (error) {
    throw errorToObject(error);
  }
};
