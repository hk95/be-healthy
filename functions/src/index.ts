import * as admin from 'firebase-admin';
admin.initializeApp();

export * from './user.function';
export * from './food.function';
export * from './set.function';
export * from './meal.function';
export * from './average.function';
export * from './stripe/customer.function';
export * from './stripe/payment-method.function';
export * from './stripe/intent.function';
export * from './stripe/charge.function';
export * from './stripe/invoice.function';
