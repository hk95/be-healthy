import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Algolia } from './utils/algolia';

const storage = admin.storage().bucket();
const algolia = new Algolia();

export const createRecipe = functions
  .region('asia-northeast1')
  .firestore.document('recipes/{recipeId}')
  .onCreate(async (snap) => {
    const data = snap.data();
    if (data) {
      return algolia.saveRecord('recipes', data, data.recipeId);
    } else {
      return;
    }
  });

export const deleteRecipe = functions
  .region('asia-northeast1')
  .firestore.document('recipes/{recipeId}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('recipes', data.recipeId);
    } else {
      return;
    }
  });

export const updateRecipe = functions
  .region('asia-northeast1')
  .firestore.document('recipes/{recipeId}')
  .onUpdate((change) => {
    const data = change.after.data();
    if (data) {
      return algolia.saveRecord('recipes', data, data.recipeId, true);
    } else {
      return;
    }
  });

export const deleteUpdatedImage = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall((data: { userId: string; recipeId: string }) => {
    storage
      .deleteFiles({
        directory: `users/${data.userId}/recipes/${data.recipeId}`,
      })
      .then(() => {
        console.log('success');
      })
      .catch((err) => {
        console.log(err);
      });
  });
