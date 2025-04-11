'use server'

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { CharacterList } from './definitions';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollection = process.env.COLLECTIONS_USERS!;

export async function getCharacters(playerId: string):  Promise<CharacterList> {
  const playerDoc = doc(db, userCollection, playerId);

  try {
    const querySnapshot = await getDoc(playerDoc);
  
    if (!querySnapshot) {
      console.warn('Player not found.');
      return {};
    }

    const player = querySnapshot.data();

    if (!player) {
      console.warn('Player not found.');
      return {};
    }

    if (Object.keys(player?.characters).length === 0) {
      console.warn('Player has no characters');
      return {};
    }

    return player.characters as CharacterList;
  } catch (e: any) {
    console.error(`Error loading player: ${e.message}`);
    return {};
  }
}