import * as functions from 'firebase-functions';
import { auth } from 'firebase-admin';

import { db } from './db';
import { deleteCollection } from './utils/firebase.function';
import admin = require('firebase-admin');

const firebase_tools = require('firebase-tools');
const storage = admin.storage().bucket();

export const createUser = functions
  .region('asia-northeast1')
  .auth.user()
  .onCreate(async (user: auth.UserRecord) => {
    db.doc(`users/${user.uid}`)
      .set({
        name: user.displayName,
        avatarURL: user.photoURL,
        email: user.email,
        createdAt: new Date(),
        userId: user.uid,
      })
      .then(() => {
        db.doc(`users/${user.uid}/basicInfo/${user.uid}`)
          .set({
            name: user.displayName,
            avatarURL: user.photoURL,
            usreId: user.uid,
          })
          .then(() => {
            console.log('created');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

export const deleteUserAccount = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .auth.user()
  .onDelete(async (user: auth.UserRecord) => {
    const userId = user.uid;

    const userInfoPath = `users/${userId}`;
    const deleteUserInfo = firebase_tools.firestore.delete(userInfoPath, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });

    const recipesPath = db
      .collection('recipes')
      .where('authorId', '==', userId);
    const deleteAllRecipes = deleteCollection(recipesPath);

    const deleteCustomerInfo = db.doc(`customers/${userId}`).delete();

    const deleteUpdatedImages = storage.deleteFiles({
      directory: `users/${userId}`,
    });

    return Promise.all([
      deleteUserInfo,
      deleteAllRecipes,
      deleteCustomerInfo,
      deleteUpdatedImages,
    ]);
  });
