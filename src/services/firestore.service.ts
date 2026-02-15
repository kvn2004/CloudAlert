import { firestore } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

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
