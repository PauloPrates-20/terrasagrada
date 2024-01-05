import { firebaseApp } from "./firebaseAppConfig";
import { getFirestore } from 'firebase/firestore/lite';

export const firebaseDb = getFirestore(firebaseApp);