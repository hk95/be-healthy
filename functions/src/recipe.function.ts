import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const storage = admin.storage().bucket();

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
