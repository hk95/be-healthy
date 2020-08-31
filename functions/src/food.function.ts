import { Algolia } from './utils/algolia';
import * as functions from 'firebase-functions';

const algolia = new Algolia();

export const createFood = functions
  .region('asia-northeast1')
  .firestore.document('foods/{foodId}')
  .onCreate((snap) => {
    const data = snap.data();
    if (data) {
      return algolia.saveRecord('foods', data, data.foodId);
    } else {
      return;
    }
  });

export const deleteFood = functions
  .region('asia-northeast1')
  .firestore.document('foods/{foodId}')
  .onDelete((snap) => {
    const data = snap.data();

    if (data) {
      return algolia.removeRecord('foods', data.foodId);
    } else {
      return;
    }
  });

export const updateFood = functions
  .region('asia-northeast1')
  .firestore.document('foods/{foodId}')
  .onUpdate((change) => {
    const data = change.after.data();
    if (data) {
      return algolia.saveRecord('foods', data, data.foodId, true);
    } else {
      return;
    }
  });
