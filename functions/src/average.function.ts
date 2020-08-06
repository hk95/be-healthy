import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const bodyOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall((data) => {
    let totalCount = 0;
    let totalValue = 0;
    const aggregateAverage = (whichCategory: string) => {
      db.doc(`users/${data.userId}/averagesYear/${data.year}年${whichCategory}`)
        .get()
        .then((doc) => {
          for (let i = 1; i <= 366; i++) {
            const key: string = i.toString();
            if (doc.data()?.[key] || doc.data()?.[key] === 0) {
              totalCount += 1;
              totalValue += doc.data()?.[key];
            }
          }
          if (totalCount > 0) {
            const averageOfYear = totalValue / totalCount;
            return db
              .doc(
                `users/${data.userId}/averagesYear/${data.year}年${whichCategory}`
              )
              .set({ averageOfYear }, { merge: true });
          } else {
            return db
              .doc(
                `users/${data.userId}/averagesYear/${data.year}年${whichCategory}`
              )
              .set({ averageOfYear: 0 }, { merge: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    aggregateAverage('体重');
    aggregateAverage('体脂肪');
  });
export const bodyOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    let totalCount = 0;
    let totalValue = 0;
    const aggregateAverage = (whichCategory: string) => {
      db.doc(
        `users/${data.userId}/averagesMonth/${data.year}年${data.month}月${whichCategory}`
      )
        .get()
        .then((doc) => {
          for (let i = 1; i <= 31; i++) {
            const key: string = i.toString();
            if (doc.data()?.[key] || doc.data()?.[key] === 0) {
              totalCount += 1;
              totalValue += doc.data()?.[key];
            }
          }
          if (totalCount > 0) {
            const averageOfMonth = totalValue / totalCount;
            return db
              .doc(
                `users/${data.userId}/averagesMonth/${data.year}年${data.month}月${whichCategory}`
              )
              .set({ averageOfMonth }, { merge: true });
          } else {
            return db
              .doc(
                `users/${data.userId}/averagesMonth/${data.year}年${data.month}月${whichCategory}`
              )
              .set({ averageOfMonth: 0 }, { merge: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    aggregateAverage('体重');
    aggregateAverage('体脂肪');
  });
export const bodyOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    let totalCount = 0;
    let totalValue = 0;
    const aggregateAverage = (whichCategory: string) => {
      db.doc(
        `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目${whichCategory}`
      )
        .get()
        .then((doc) => {
          for (let i = 0; i <= 6; i++) {
            const key: string = i.toString();
            if (doc.data()?.[key] || doc.data()?.[key] === 0) {
              totalCount += 1;
              totalValue += doc.data()?.[key];
            }
          }
          if (totalCount > 0) {
            const averageOfWeek = totalValue / totalCount;
            return db
              .doc(
                `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目${whichCategory}`
              )
              .set({ averageOfWeek }, { merge: true });
          } else {
            return db
              .doc(
                `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目${whichCategory}`
              )
              .set({ averageOfWeek: 0 }, { merge: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    aggregateAverage('体重');
    aggregateAverage('体脂肪');
  });

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
      .doc(`users/${data.userId}/averagesYear/${data.year}年カロリー`)
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
          const averageOfYear = totalCal / totalCount;
          return db
            .doc(`users/${data.userId}/averagesYear/${data.year}年カロリー`)
            .set({ averageOfYear }, { merge: true });
        } else {
          return db
            .doc(`users/${data.userId}/averagesYear/${data.year}年カロリー`)
            .set({ averageOfYear: 0 }, { merge: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
      .doc(
        `users/${data.userId}/averagesMonth/${data.year}年${data.month}月カロリー`
      )
      .get()
      .then((doc) => {
        for (let i = 1; i <= 31; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
          }
        }
        if (totalCount > 0) {
          const averageOfMonth = totalCal / totalCount;
          return db
            .doc(
              `users/${data.userId}/averagesMonth/${data.year}年${data.month}月カロリー`
            )
            .set({ averageOfMonth }, { merge: true });
        } else {
          return db
            .doc(
              `users/${data.userId}/averagesMonth/${data.year}年${data.month}月カロリー`
            )
            .set({ averageOfMonth: 0 }, { merge: true });
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
      .doc(
        `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目カロリー`
      )
      .get()
      .then((doc) => {
        for (let i = 0; i <= 6; i++) {
          const key: string = i.toString();
          if (doc.data()?.[key] || doc.data()?.[key] === 0) {
            totalCount += 1;
            totalCal += doc.data()?.[key];
          }
        }
        if (totalCount > 0) {
          const averageOfWeek = totalCal / totalCount;

          return db
            .doc(
              `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目カロリー`
            )
            .set({ averageOfWeek }, { merge: true });
        } else {
          return db
            .doc(
              `users/${data.userId}/averagesWeek/${data.year}年${data.week}週目カロリー`
            )
            .set({ averageOfWeek: 0 }, { merge: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
