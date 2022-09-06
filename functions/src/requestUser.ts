import * as functions from "firebase-functions";

import {store} from "./store";
import {User} from "./types";

export const requestUser = functions.https.onCall(
  async (id: string | undefined) => {
    console.log(1, id);

    const user = await store
      .collection("users")
      .doc(`${id}`)
      .get();

    if (!user.exists) {
      throw new functions.https.HttpsError(
        "unknown", "User does not exist");
    }

    return user.data() as User;
  });
