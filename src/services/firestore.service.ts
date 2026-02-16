import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from "firebase/firestore";
import { firestore } from "../config/firebase";

const REMINDERS_COLLECTION = collection(firestore, "reminders");

export const createReminder = async (reminder: {
  title: string;
  time: Date;
  description?: string;
  type?: string;
}) => {
  try {
    const docRef = await addDoc(REMINDERS_COLLECTION, {
      ...reminder,
      time: reminder.time.toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating reminder:", error);
    throw error;
  }
};

// export const getReminders = async () => {
//   try {
//     const querySnapshot = await getDocs(REMINDERS_COLLECTION);
//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error getting reminders:", error);
//     throw error;
//   }
// };

export const deleteReminder = async (id: string) => {
  try {
    await deleteDoc(doc(firestore, "reminders", id));
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw error;
  }
};
export const subscribeToReminders = (callback: (data: any[]) => void) => {
  const q = query(REMINDERS_COLLECTION, orderBy("time", "asc"));

  const unsubscribe = onSnapshot(q, (snapshot: { docs: any[] }) => {
    const reminders = snapshot.docs.map(
      (doc: { id: any; data: () => any }) => ({
        id: doc.id,
        ...doc.data(),
      }),
    );

    callback(reminders);
  });

  return unsubscribe;
};

export const updateReminder = async (
  id: string,
  updatedFields: Partial<{
    title: string;
    time: Date;
    description: string;
    type: string;
    active: boolean;
  }>,
) => {
  try {
    const docRef = doc(firestore, "reminders", id);
    await updateDoc(docRef, updatedFields);
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw error;
  }
};

export const getReminderById = async (id: string) => {
  const docRef = doc(firestore, "reminders", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return { id: snapshot.id, ...snapshot.data() };
};
