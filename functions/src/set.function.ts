import * as functions from 'firebase-functions';

const firebase_tools = require('firebase-tools');

export const deleteSet = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    const path = `users/${data.userId}/sets/${data.setId}`;
    return firebase_tools.firestore.delete(path, {
      project: process.env.GCLOUD_PROJECT,
      recursive: true,
      yes: true,
      token: functions.config().fb.token,
    });
  });
