import * as functions from "firebase-functions";

import {store} from "./store";
import {User} from "./types";

const OVERWRITE_FIELDS = ["coins_left", "games_completed"];


export const updateUser = functions.https.onCall(
  async (user: User) => {
    const userDoc = await store.collection("users")
      .doc(user.id.toString())
      .get();

    if (!userDoc.exists) {
      await store.collection("users").doc(user.id.toString()).create(user);

      return userDoc;
    }

    const baseData = userDoc.data() as User;

    for (const key of Object.keys(user)) {
      if (typeof baseData[key] === "number" &&
        !OVERWRITE_FIELDS.includes(key)) {
        baseData[key] = (+baseData[key] + (+user[key]));
      } else if (baseData[key]) {
        baseData[key] = user[key];
      }
    }

    await store.collection("users").doc(user.id.toString()).update(baseData);

    return baseData;
  });
