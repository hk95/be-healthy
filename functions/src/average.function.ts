import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const averageTotalCal = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    // const incrementTotalCal = admin.firestore.FieldValue.increment(
    //   data.totalCal
    // );
    let totalCount = 0;
    let totalCal = 0;

    return db
      .doc(`users/${data.userId}/averagesYear/${data.year}年`)
      .get()
      .then((doc) => {
        console.log(doc.data());
        `data.()`;
        for (let i = 1; i <= 366; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
            console.log(doc.data()?.[key], totalCount, 'dataTrue');
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
            .set({ averageTotalCal: 0 }, { merge: true });
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
