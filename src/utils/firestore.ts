import { db } from "../firebase";
import { collection, getDoc, getDocs, setDoc, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";

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

export const deletePreset = async (userId: string, presetId: string) => {
    try {
        const presetRef = doc(db, "users", userId, "presets", presetId);
        await deleteDoc(presetRef);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updatePreset = async (userId: string, presetId: string, updatedData: any) => {
    try {
        const presetRef = doc(db, "users", userId, "presets", presetId);
        await updateDoc(presetRef, updatedData);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateUserSettings = async (userId: string, settings: any) => {
    const settingsRef = doc(db, "users", userId, "settings", "timerConfig");
    await setDoc(settingsRef, settings, { merge: true });
};

export const fetchUserSettings = async (userId: string) => {
    const settingsRef = doc(db, "users", userId, "settings", "timerConfig");
    const snap = await getDoc(settingsRef);
    return snap.exists() ? snap.data() : null;
};