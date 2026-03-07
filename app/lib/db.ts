'use server'

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Player, PlayerCharacter } from './definitions';
import admin from 'firebase-admin';

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG!);
const app = initializeApp(firebaseConfig);
const clientDb = getFirestore(app);

if(admin.apps.length === 0) {
    admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)) });
}
const adminDb = admin.firestore();

// collections
const userCollection = process.env.COLLECTIONS_USERS!;

export async function getCharacters(playerId: string): Promise<PlayerCharacter[]> {
    try {
        const querySnapshot = await adminDb.collection(userCollection).doc(playerId).get();

        if (!querySnapshot || !querySnapshot.data()) {
            console.error('Player not found.');
            return [];
        }

        const player = querySnapshot.data() as Player;

        if (player!.characters.length === 0) {
            console.error('Player has no characters');
            return [];
        }

        return player.characters;
    } catch (e) {
        if(e instanceof Error) {
            console.error(`Error loading player: ${e.message}`);
        }
        return [];
    }
}

export async function getItemList(list: 'consumableItems' | 'magicItems' | 'magicVariants') {
    if(list === 'magicItems') {
        const ref1 = doc(clientDb, 'items', list + 1);
        const ref2 = doc(clientDb, 'items', list + 2);

        const snapshot1 = await getDoc(ref1);
        const snapshot2 = await getDoc(ref2);

        if(!(snapshot1.exists() || snapshot2.exists())) {
            console.error('Item list doesn\'t exist');
            return [];
        }

        return [...snapshot1.data() as any[], ...snapshot2.data() as any[]];
    }

    const ref = doc(clientDb, 'items', list);
    const snapshot = await getDoc(ref);

    if(!snapshot.exists()) {
        console.error('Item list doesn\'t exist');
        return []
    };

    return snapshot.data() as any[];
}