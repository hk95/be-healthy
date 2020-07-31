import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const addMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const increment = admin.firestore.FieldValue.increment(
      data.amount * data.cal
    );
    switch (data.meal) {
      case 'breakfast':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .set(
            { totalCal: increment, breakfastCal: increment },
            { merge: true }
          )
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
      case 'lunch':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .set({ totalCal: increment, lunchCal: increment }, { merge: true })
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
      case 'dinner':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .set({ totalCal: increment, dinnerCal: increment }, { merge: true })
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
    }
  });
export const removeMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const decline = admin.firestore.FieldValue.increment(
      -data.amount * data.cal
    );
    switch (data.meal) {
      case 'breakfast':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .update({ totalCal: decline, breakfastCal: decline })
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
      case 'lunch':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .update({ totalCal: decline, lunchCal: decline })
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
      case 'dinner':
        db.doc(`users/${data.userId}/dailyInfos/${data.date}`)
          .update({ totalCal: decline, dinnerCal: decline })
          .then(() => console.log('success'))
          .catch((err) => console.log(err));
        break;
    }
  });
