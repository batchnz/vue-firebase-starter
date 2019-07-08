import { fireAuth } from "@/firebase";
import { errorToObject, errorMsg } from "@/helpers/errorHandler";

// TODO, 1, check user whether exist or not
// TODO, 2, The ErrorToObject() could be catches again.

export const getUserClaims = async () => {
  try {
    const idTokenResult = await fireAuth.currentUser.getIdTokenResult();
    const { claims } = idTokenResult;
    return claims;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const updateAuthPhotoURL = async photoURL => {
  try {
    const user = fireAuth.currentUser;
    await user.updateProfile({ photoURL });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const updateAuthInfo = async form => {
  try {
    const user = fireAuth.currentUser;
    await user.updateProfile({
      ...(form.firstName &&
        form.lastName && { displayName: `${form.firstName} ${form.lastName}` }),
      ...(form.avatar && { photoURL: form.avatar }),
      ...(form.email && { email: form.email })
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const sendEmailVerification = async () => {
  try {
    const user = fireAuth.currentUser;
    await user.sendEmailVerification();
  } catch (error) {
    throw errorToObject(error);
  }
};

export const sendPasswordResetEmail = async email => {
  try {
    if (!email) throw new Error(errorMsg.emailParam);
    await fireAuth.sendPasswordResetEmail(email);
  } catch (error) {
    throw errorToObject(error);
  }
};

// ! Important: To set a user's email address, the user must have signed in recently
// https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
export const updateAuthEmail = async email => {
  try {
    const user = fireAuth.currentUser;
    await user.updateEmail(email);
  } catch (error) {
    throw errorToObject(error);
  }
};

export const updatePassword = async newPassword => {
  try {
    const user = fireAuth.currentUser;
    await user.updatePassword(newPassword);
  } catch (error) {
    throw errorToObject(error);
  }
};

export const deleteCurrentUser = async () => {
  try {
    const user = fireAuth.currentUser;
    await user.delete();
  } catch (error) {
    throw errorToObject(error);
  }
};
