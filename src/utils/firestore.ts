import { db } from "../firebase";
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore";

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

export const logPresets = async (userId: string, data: any) => {
    try {
        const presetsRef = collection(db, "users", userId, "presets")

        const docRef = await addDoc(presetsRef, data);

        console.log("Preset logged with ID: ", docRef.id);
    } catch (error) {
        console.error(error);
    }
}