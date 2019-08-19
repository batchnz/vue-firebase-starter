import { fireFunctions } from "@/firebase";
import { errorToObject } from "@/helpers/errorHandler";

const setAdminRoleFun = fireFunctions.httpsCallable("setAdminRole");
const getUserListFun = fireFunctions.httpsCallable("getUserList");
const deleteUserFun = fireFunctions.httpsCallable("deleteUser");
export const setAdminRole = async data => {
  try {
    // TODO, data checking
    const result = await setAdminRoleFun(data);
    if (result && result.data) return result.data;
    throw new Error({
      code: "Error",
      message: "setAdminRole - Request failed"
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getUserList = async () => {
  try {
    const result = await getUserListFun();
    if (result && result.data) return result.data;
    throw new Error({
      code: "Error",
      message: "getUserList - Request failed"
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const deleteUser = async data => {
  try {
    const result = await deleteUserFun(data);
    if (result && result.data) return result.data;
    throw new Error({
      code: "Error",
      message: "deleteUser - Request failed"
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

// result.data
/*bytes: 32891
created_at: "2019-02-22T03:56:06Z"
etag: "bf7b50700780dd0ab208bf4874eb4482"
format: "jpg"
height: 250
placeholder: false
public_id: "allocate/r7UQYqkP0wZams1657M2CVOYzWO2/projects/GIZ0dOafJ9cqhCGAYDfK/c730e060-3655-11e9-a8a3-a379ba0543e4"
resource_type: "image"
secure_url: "https://res.cloudinary.com/batch/image/upload/v1550807766/allocate/r7UQYqkP0wZams1657M2CVOYzWO2/projects/GIZ0dOafJ9cqhCGAYDfK/c730e060-3655-11e9-a8a3-a379ba0543e4.jpg"
signature: "b7ebd0fd7bed921ce08e04e36ce77848454595d9"
tags: []
type: "upload"
url: "http://res.cloudinary.com/batch/image/upload/v1550807766/allocate/r7UQYqkP0wZams1657M2CVOYzWO2/projects/GIZ0dOafJ9cqhCGAYDfK/c730e060-3655-11e9-a8a3-a379ba0543e4.jpg"
version: 1550807766
width: 360
*/
