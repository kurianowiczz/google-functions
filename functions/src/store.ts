import * as admin from "firebase-admin";

admin.initializeApp();

export const store = admin.firestore();
