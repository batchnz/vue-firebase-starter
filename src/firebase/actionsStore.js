/**
 * * A opt-in firebase Actions

 * For writhing less code
 * And centralized firebase query references
 * 
 */

import { fireStore, FieldValue } from "@/firebase";
import { errorToObject } from "@/helpers/errorHandler";

const userRef = fireStore.collection("user");
const groupRef = fireStore.collection("userGroup");
const projectsRef = fireStore.collection("projects");

export const getUserList = async () => {
  try {
    const userList = [];
    const snapshot = await userRef.get();
    snapshot.forEach(doc => {
      userList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return userList;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getUserDoc = async uid => {
  try {
    const userSnapshot = await userRef.doc(uid).get();
    return userSnapshot.data();
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getUserGroupList = async () => {
  try {
    const groupList = [];
    const snapshot = await groupRef.get();
    snapshot.forEach(doc => {
      groupList.push({
        id: doc.id,
        name: doc.data().name
      });
    });
    return groupList;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getProjectList = async () => {
  try {
    const projectList = [];
    const snapshot = await projectsRef.get();
    snapshot.forEach(doc => {
      projectList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return projectList;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getProjectListByUser = async uid => {
  try {
    const projectList = [];
    const snapshot = await projectsRef.where("userID", "==", uid).get();
    snapshot.forEach(doc => {
      projectList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return projectList;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const getProject = async projectUID => {
  try {
    const userSnapshot = await projectsRef.doc(projectUID).get();
    return userSnapshot.data();
  } catch (error) {
    throw errorToObject(error);
  }
};

export const addProject = async form => {
  try {
    form.createdAt = FieldValue.serverTimestamp();
    const { id } = await projectsRef.add(form);
    return id;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const updateProject = async (form, projectUID) => {
  try {
    form.updatedAt = FieldValue.serverTimestamp();
    await projectsRef.doc(projectUID).update(form);
  } catch (error) {
    throw errorToObject(error);
  }
};

export const unionProjectImages = async (url, projectUID) => {
  try {
    await projectsRef.doc(projectUID).update({
      images: FieldValue.arrayUnion(url)
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const removeProjectImages = async (url, projectUID) => {
  try {
    await projectsRef.doc(projectUID).update({
      images: FieldValue.arrayRemove(url)
    });
  } catch (error) {
    throw errorToObject(error);
  }
};

export const setProject = async (uid, form) => {
  try {
    const { id } = await projectsRef.doc(uid).set(form);
    return id;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const deleteProject = async projectUID => {
  try {
    await projectsRef.doc(projectUID).delete();
    return true;
  } catch (error) {
    throw errorToObject(error);
  }
};

export const deleteProjectField = async (field, projectUID) => {
  try {
    await projectsRef.doc(projectUID).update({
      [field]: FieldValue.delete()
    });
    return true;
  } catch (error) {
    throw errorToObject(error);
  }
};
// DELETE: https://firebase.google.com/docs/firestore/manage-data/delete-data
