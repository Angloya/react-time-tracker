import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseDoc } from '../model/enums';

enum Collections {
    SYSTEM = 'system',
}

export interface FirebaseCollections {
    getStatusCollection: () => Promise<string[]>
}

export default class SystemCollections {
    async getData<TData>(DocName: FirebaseDoc): Promise<TData | undefined> {
        const collectionRef = doc(db, Collections.SYSTEM, DocName);
        try {
            const snap = await getDoc(collectionRef);

            return snap.data() as TData;
        } catch (e) {
            console.error(e);
        }
    }
}