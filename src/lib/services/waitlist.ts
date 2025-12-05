import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
  limit,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface WaitlistEntry {
  id?: string;
  email: string;
  source?: string;
  location?: string;
  interests?: string[];
  createdAt: any;
  ipAddress?: string;
  userAgent?: string;
}

export interface WaitlistStats {
  totalSignups: number;
  todaySignups: number;
  weeklySignups: number;
}

class WaitlistService {
  private collectionName = "waitlist";

  async addToWaitlist(
    email: string,
    additionalData?: Partial<WaitlistEntry>
  ): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: "Please enter a valid email address",
        };
      }

      // Check if email already exists
      const existingUser = await this.checkEmailExists(email);
      if (existingUser) {
        return {
          success: false,
          message: "You're already on our waitlist! We'll keep you updated.",
        };
      }

      // Add to waitlist
      const waitlistData: Omit<WaitlistEntry, "id"> = {
        email: email.toLowerCase().trim(),
        source: "welcome_page",
        location: "Nigeria", // Default for Metromellow
        createdAt: serverTimestamp(),
        ...additionalData,
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        waitlistData
      );

      return {
        success: true,
        message:
          "Welcome to Metromellow! You're now on our exclusive waitlist.",
        id: docRef.id,
      };
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return {
        success: false,
        message: "Oops! Something went wrong. Please try again.",
      };
    }
  }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("email", "==", email.toLowerCase().trim())
      );

      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  }

  async getWaitlistStats(): Promise<WaitlistStats> {
    try {
      const now = new Date();
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Total signups
      const totalQuery = query(collection(db, this.collectionName));
      const totalSnapshot = await getCountFromServer(totalQuery);
      const totalSignups = totalSnapshot.data().count;

      // Today's signups
      const todayQuery = query(
        collection(db, this.collectionName),
        where("createdAt", ">=", todayStart)
      );
      const todaySnapshot = await getCountFromServer(todayQuery);
      const todaySignups = todaySnapshot.data().count;

      // Weekly signups
      const weeklyQuery = query(
        collection(db, this.collectionName),
        where("createdAt", ">=", weekAgo)
      );
      const weeklySnapshot = await getCountFromServer(weeklyQuery);
      const weeklySignups = weeklySnapshot.data().count;

      return {
        totalSignups,
        todaySignups,
        weeklySignups,
      };
    } catch (error) {
      console.error("Error getting waitlist stats:", error);
      return {
        totalSignups: 0,
        todaySignups: 0,
        weeklySignups: 0,
      };
    }
  }

  async getRecentSignups(limitCount: number = 10): Promise<WaitlistEntry[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy("createdAt", "desc"),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const signups: WaitlistEntry[] = [];

      querySnapshot.forEach((doc) => {
        signups.push({
          id: doc.id,
          ...doc.data(),
        } as WaitlistEntry);
      });

      return signups;
    } catch (error) {
      console.error("Error getting recent signups:", error);
      return [];
    }
  }

  async exportWaitlist(): Promise<WaitlistEntry[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const waitlist: WaitlistEntry[] = [];

      querySnapshot.forEach((doc) => {
        waitlist.push({
          id: doc.id,
          ...doc.data(),
        } as WaitlistEntry);
      });

      return waitlist;
    } catch (error) {
      console.error("Error exporting waitlist:", error);
      return [];
    }
  }
}

export const waitlistService = new WaitlistService();
