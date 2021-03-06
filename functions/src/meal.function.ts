import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();
const getDateOfPath = (date: string): string => {
  return date.substr(0, 5).replace(/\./g, '-');
};

export const addMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const increment = admin.firestore.FieldValue.increment(
      Math.round(data.amount * data.cal * 10) / 10
    );
    const dateOfPath = getDateOfPath(data.date);
    db.doc(`users/${data.userId}/dailyInfos/${dateOfPath}`)
      .set(
        {
          list: {
            [data.dayOfMonth]: {
              authorId: data.userId,
              date: data.date,
              totalCal: increment,
              [`${data.meal}Cal`]: increment,
            },
          },
          dateOfPath,
        },
        { merge: true }
      )
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
    return db
      .doc(`users/${data.userId}/dailyInfos/${data.date}`)
      .set(
        {
          authorId: data.userId,
          date: data.date,
          totalCal: increment,
          [`${data.meal}Cal`]: increment,
        },
        { merge: true }
      )
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  });

export const removeMeal = functions
  .region('asia-northeast1')
  .https.onCall(async (data) => {
    const calNum = admin.firestore.FieldValue.increment(
      Math.round(-data.amount * data.cal * 10) / 10
    );
    const decline = !data.isLastMeal ? calNum : 0;
    const dateOfPath = getDateOfPath(data.date);
    db.doc(`users/${data.userId}/dailyInfos/${dateOfPath}`)
      .set(
        {
          list: {
            [data.dayOfMonth]: {
              totalCal: decline,
              [`${data.meal}Cal`]: decline,
            },
          },
        },
        { merge: true }
      )
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
    return db
      .doc(`users/${data.userId}/dailyInfos/${data.date}`)
      .update({
        totalCal: decline,
        [`${data.meal}Cal`]: decline,
      })
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  });
