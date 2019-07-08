const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { server } = require("./server/server");

admin.initializeApp();

const fireStore = admin.firestore();
fireStore.settings({ timestampsInSnapshots: true });
const userRef = fireStore.collection("user");

const { HttpsError, onCall, onRequest } = functions.https;

function clientErrorHandler(error, code) {
  return new HttpsError(
    code || "unknown",
    (error.message && error.message) || "an error with no messages.",
    (error.stack && error.stack) || "an error don't have stack."
  );
}

exports.server = onRequest(server);

exports.setAdminRole = onCall(async (data, context) => {
  // (1) Data checking
  if (!data.uid)
    throw new HttpsError("invalid-argument", "UID value is missing.");
  // (2) Check is action made by admin user
  if (!context.auth.token.admin)
    throw new HttpsError("unauthenticated", "Unauthorized request.");
  try {
    // (3) Data Updating
    const { uid, admin: _admin } = data;
    await admin.auth().setCustomUserClaims(uid, { admin: _admin });
    // (4.1) Success
    return {
      code: "set user as Admin",
      message: `Successfully ${_admin ? "add a new " : "removed a"} admin`
    };
  } catch (error) {
    // (4.2) Error
    throw clientErrorHandler(error);
  }
});

exports.getUserList = onCall(async (_, context) => {
  // https://firebase.google.com/docs/auth/admin/manage-users#list_all_users
  // https://firebase.google.com/docs/reference/admin/node/admin.auth.UserRecord
  if (!context.auth.token.admin)
    throw new HttpsError("unauthenticated", "Unauthorized request.");
  try {
    const { users } = await admin.auth().listUsers();
    const userList = [];
    users.forEach(userRecord => {
      const user = userRecord.toJSON();
      userList.push({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        claims: {
          ...(user.customClaims && user.customClaims)
        }
      });
    });
    return userList;
  } catch (error) {
    throw clientErrorHandler(error);
  }
});

exports.deleteUser = onCall(async (data, context) => {
  if (!data.uid)
    throw new HttpsError("invalid-argument", "UID value is missing.");
  if (!context.auth.token.admin)
    throw new HttpsError("unauthenticated", "Unauthorized request.");
  try {
    await Promise.all([
      admin.auth().deleteUser(data.uid),
      userRef.doc(data.uid).delete()
    ]);
    return {
      code: "Success",
      message: "Successfully deleted user"
    };
  } catch (error) {
    throw clientErrorHandler(error);
  }
});

// https://firebase.google.com/docs/reference/functions/functions.https.HttpsError
// https://firebase.google.com/docs/functions/http-events

exports.uploadImageCloudinaryData64 = onCall(async data => {
  const { uploadImage } = require("./cloudinary");
  // (1) Checking critical argument
  if (!data.imageStr)
    throw new HttpsError("invalid-argument", "Image data is missing.");
  // (2) Integrating optional argument
  const config = {
    subFolder: "unclassified",
    ...(data.cloudinaryConfig && data.cloudinaryConfig)
  };
  // (3) Start to uploading Image
  try {
    const result = await uploadImage(data.imageStr, config);
    return result;
  } catch (error) {
    throw clientErrorHandler(error);
  }
});
