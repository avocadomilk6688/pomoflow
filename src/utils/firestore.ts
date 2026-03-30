import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const fetchPresets = async (userId: string) => {
    try {
        const presetsRef = collection(db, "users", userId, "presets")

        const q = query(presetsRef, orderBy("name", "asc"))

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(error)
        return [];
    }
};