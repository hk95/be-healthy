import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const addMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const increment = admin.firestore.FieldValue.increment(
      data.amount * data.cal
    );
    if (data.meal === 'breakfast') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .set({ totalCal: increment, breakfastCal: increment }, { merge: true })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
    if (data.meal === 'lunch') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .set({ totalCal: increment, lunchCal: increment }, { merge: true })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
    if (data.meal === 'dinner') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .set({ totalCal: increment, dinnerCal: increment }, { merge: true })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
  });
export const removeMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const decline = admin.firestore.FieldValue.increment(
      -data.amount * data.cal
    );
    if (data.meal === 'breakfast') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .update({ totalCal: decline, breakfastCal: decline })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
    if (data.meal === 'lunch') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .update({ totalCal: decline, lunchCal: decline })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
    if (data.meal === 'dinner') {
      return db
        .doc(`users/${data.userId}/dailyInfos/${data.date}`)
        .update({ totalCal: decline, dinnerCal: decline })
        .catch(() => console.log('success'))
        .catch((err) => console.log(err));
    }
  });
