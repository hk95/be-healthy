import * as functions from 'firebase-functions';
import { auth } from 'firebase-admin';

import { db } from './db';

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
            userName: user.displayName,
            avatarURL: user.photoURL,
            gender: '',
            height: '',
            goalWeight: '',
            goalFat: '',
            goalCal: '',
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
