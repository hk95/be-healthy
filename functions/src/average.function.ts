import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

const setDataOfWeek = (
  category: string,
  userId: string,
  amount: number,
  year: number,
  week: number,
  date: string,
  dayOfWeek: number
) => {
  return db
    .doc(`users/${userId}/averagesWeek/${year}年${week}週目${category}`)
    .set(
      {
        [dayOfWeek]: amount,
        category,
        date,
        year,
        week,
      },
      { merge: true }
    );
};

const setDataOfMonth = (
  category: string,
  userId: string,
  amount: number,
  year: number,
  month: number,
  date: string,
  dayOfMonth: number
) => {
  return db
    .doc(`users/${userId}/averagesMonth/${year}年${month}月${category}`)
    .set(
      {
        [dayOfMonth]: amount,
        category,
        date,
        year,
        month,
      },
      { merge: true }
    );
};

const setDataOfYear = (
  category: string,
  userId: string,
  amount: number,
  year: number,
  date: string,
  dayOfYear: number
) => {
  return db.doc(`users/${userId}/averagesYear/${year}年${category}`).set(
    {
      [dayOfYear]: amount,
      category,
      date,
      year,
    },
    { merge: true }
  );
};

const aggregateAverageOfYear = (
  category: string,
  userId: string,
  year: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesYear/${year}年${category}`)
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
          .doc(`users/${userId}/averagesYear/${year}年${category}`)
          .set({ averageOfYear }, { merge: true });
      } else {
        return db
          .doc(`users/${userId}/averagesYear/${year}年${category}`)
          .set({ averageOfYear: 0 }, { merge: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const aggregateAverageOfMonth = (
  category: string,
  userId: string,
  year: number,
  month: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesMonth/${year}年${month}月${category}`)
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
          .doc(`users/${userId}/averagesMonth/${year}年${month}月${category}`)
          .set({ averageOfMonth }, { merge: true });
      } else {
        return db
          .doc(`users/${userId}/averagesMonth/${year}年${month}月${category}`)
          .set({ averageOfMonth: 0 }, { merge: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const aggregateAverageOfWeek = (
  category: string,
  userId: string,
  year: number,
  week: number
) => {
  let totalCount = 0;
  let totalValue = 0;
  db.doc(`users/${userId}/averagesWeek/${year}年${week}週目${category}`)
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
          .doc(`users/${userId}/averagesWeek/${year}年${week}週目${category}`)
          .set({ averageOfWeek }, { merge: true });
      } else {
        return db
          .doc(`users/${userId}/averagesWeek/${year}年${week}週目${category}`)
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
  .https.onCall(async (data) => {
    await setDataOfYear(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.date,
      data.dayOfYear
    );
    aggregateAverageOfYear(data.category, data.userId, data.year);
  });

export const averageFatOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfYear(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.date,
      data.dayOfYear
    );
    aggregateAverageOfYear(data.category, data.userId, data.year);
  });

export const averageCalOfYear = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfYear(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.date,
      data.dayOfYear
    );
    aggregateAverageOfYear(data.category, data.userId, data.year);
  });

export const averageWeightOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfMonth(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.month,
      data.date,
      data.dayOfMonth
    );
    aggregateAverageOfMonth(data.category, data.userId, data.year, data.month);
  });

export const averageFatOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfMonth(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.month,
      data.date,
      data.dayOfMonth
    );
    aggregateAverageOfMonth(data.category, data.userId, data.year, data.month);
  });

export const averageCalOfMonth = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfMonth(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.month,
      data.date,
      data.dayOfMonth
    );
    aggregateAverageOfMonth(data.category, data.userId, data.year, data.month);
  });

export const averageWeightOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfWeek(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.week,
      data.date,
      data.dayOfWeek
    );
    aggregateAverageOfWeek(data.category, data.userId, data.year, data.week);
  });

export const averageFatOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfWeek(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.week,
      data.date,
      data.dayOfWeek
    );
    aggregateAverageOfWeek(data.category, data.userId, data.year, data.week);
  });

export const averageCalOfWeek = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 540,
    memory: '2GB',
  })
  .https.onCall(async (data) => {
    await setDataOfWeek(
      data.category,
      data.userId,
      data.amount,
      data.year,
      data.week,
      data.date,
      data.dayOfWeek
    );
    aggregateAverageOfWeek(data.category, data.userId, data.year, data.week);
  });
