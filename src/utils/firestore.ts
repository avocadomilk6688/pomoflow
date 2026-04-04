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
    console.log("Setting changed");
};

export const fetchUserSettings = async (userId: string) => {
    const settingsRef = doc(db, "users", userId, "settings", "timerConfig");
    const snap = await getDoc(settingsRef);
    return snap.exists() ? snap.data() : null;
};

export const fetchSessions = async (userId: string) => {
    try {
        const sessionRef = collection(db, "users", userId, "sessions")

        const q = query(sessionRef, orderBy("date", "asc"))

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const logSession = async (userId: string, data: any) => {
    try {
        const sessionRef = collection(db, "users", userId, "sessions");

        const docRef = await addDoc(sessionRef, data);

        console.log("Session logged with ID: ", docRef.id);
    } catch (error) {
        console.error(error);
    }
}