import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const calOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    let totalCount = 0;
    let totalCal = 0;
    return db
      .doc(`users/${data.userId}/averagesYear/${data.year}年`)
      .get()
      .then((doc) => {
        for (let i = 1; i <= 366; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
          }
        }
        if (totalCount > 0) {
          const averageTotalCalOfYear = totalCal / totalCount;
          return db
            .doc(`users/${data.userId}/averagesYear/${data.year}年`)
            .set({ averageTotalCalOfYear }, { merge: true });
        } else {
          return db
            .doc(`users/${data.userId}/averagesYear/${data.year}年`)
            .set({ averageTotalCalOfYear: 0 }, { merge: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // const counter = admin.firestore.FieldValue.increment(1);
    // const totalCal = db.doc(`users/${data.userId}/averagesYear/${data.year}年`)
    // const averageTotalCalOfYear =

    // 年
    // db.doc(`users/${data.userId}/averagesYear/${data.year}年`)
    //   .set({ incrementTotalCal, counter: counter }, { merge: true })
    //   .then(() => {
    //     db.doc(`users/${data.userId}/averagesYear/${data.year}年`)
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           return doc.data()?.incrementTotalCal / doc.data()?.counter;
    //         } else {
    //           return;
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   })
    //   .catch((err) => console.log(err));
  });
export const calOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    let totalCount = 0;
    let totalCal = 0;
    return db
      .doc(`users/${data.userId}/averagesMonth/${data.year}年${data.month}月`)
      .get()
      .then((doc) => {
        console.log(doc.data());
        for (let i = 1; i <= 31; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
            console.log(doc.data()?.[key], totalCount, 'dataofmonth');
          }
        }
        if (totalCount > 0) {
          const averageTotalCalOfMonth = totalCal / totalCount;
          return db
            .doc(
              `users/${data.userId}/averagesMonth/${data.year}年${data.month}月`
            )
            .set({ averageTotalCalOfMonth }, { merge: true });
        } else {
          return db
            .doc(
              `users/${data.userId}/averagesMonth/${data.year}年${data.month}月`
            )
            .set({ averageTotalCalOfMonth: 0 }, { merge: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
export const calOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    let totalCount = 0;
    let totalCal = 0;
    return db
      .doc(`users/${data.userId}/averagesWeek/${data.year}年${data.week}週目`)
      .get()
      .then((doc) => {
        console.log(doc.data());
        for (let i = 0; i <= 6; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
            console.log(doc.data()?.[key], totalCount, 'dataofweek');
          }
        }
        if (totalCount > 0) {
          const averageTotalCalOfWeek = totalCal / totalCount;

          return db
            .doc(
              `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目`
            )
            .set({ averageTotalCalOfWeek }, { merge: true });
        } else {
          return db
            .doc(
              `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目`
            )
            .set({ averageTotalCalOfWeek: 0 }, { merge: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
