import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

const aggregateAverageOfYear = (
  whichCategory: string,
  userId: string,
  year: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesYear/${year}年${whichCategory}`)
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
          .doc(`users/${userId}/averagesYear/${year}年${whichCategory}`)
          .set({ averageOfYear }, { merge: true });
      } else {
        return db
          .doc(`users/${userId}/averagesYear/${year}年${whichCategory}`)
          .set({ averageOfYear: 0 }, { merge: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const aggregateAverageOfMonth = (
  whichCategory: string,
  userId: string,
  year: number,
  month: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesMonth/${year}年${month}月${whichCategory}`)
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
            `users/${userId}/averagesMonth/${year}年${month}月${whichCategory}`
          )
          .set({ averageOfMonth }, { merge: true });
      } else {
        return db
          .doc(
            `users/${userId}/averagesMonth/${year}年${month}月${whichCategory}`
          )
          .set({ averageOfMonth: 0 }, { merge: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const aggregateAverageOfWeek = (
  whichCategory: string,
  userId: string,
  year: number,
  week: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesWeek/${year}年${week}週目${whichCategory}`)
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
            `users/${userId}/averagesWeek/${year}年${week}週目${whichCategory}`
          )
          .set({ averageOfWeek }, { merge: true });
      } else {
        return db
          .doc(
            `users/${userId}/averagesWeek/${year}年${week}週目${whichCategory}`
          )
          .set({ averageOfWeek: 0 }, { merge: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const averageWeightOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall((data) => {
    aggregateAverageOfYear('体重', data.userId, data.year);
  });
export const averageFatOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall((data) => {
    aggregateAverageOfYear('体脂肪', data.userId, data.year);
  });
export const averageCalOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall((data) => {
    aggregateAverageOfYear('カロリー', data.userId, data.year);
  });
export const averageWeightOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfMonth('体重', data.userId, data.year, data.month);
  });
export const averageFatOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfMonth('体脂肪', data.userId, data.year, data.month);
  });
export const averageCalOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfMonth('カロリー', data.userId, data.year, data.month);
  });
export const averageWeightOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfWeek('体重', data.userId, data.year, data.week);
  });
export const averageFatOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfWeek('体脂肪', data.userId, data.year, data.week);
  });
export const averageCalOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    aggregateAverageOfWeek('カロリー', data.userId, data.year, data.week);
  });
