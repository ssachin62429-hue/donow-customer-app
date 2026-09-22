import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface SharedLiveOrder {
  id: string; // e.g. "DN-9942"
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceCategory: string;
  taskDescription: string;
  locationAddress: string;
  landmark: string;
  status: 'finding_partner' | 'accepted' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  arrivalOtp: string;
  partnerId: string | null;
  partnerName: string | null;
  partnerPhone: string | null;
  partnerRating: number;
  totalAmount: number;
  tipAmount: number;
  estimatedDurationMins: number;
  actualDurationMins?: number;
  workTimerSeconds?: number;
  cashCollected?: boolean;
  distanceMetres?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LiveChatMessage {
  id: string;
  orderId: string;
  sender: 'customer' | 'partner';
  text: string;
  timestamp: string;
}

/**
 * Creates or updates an active task in Firestore
 */
export async function syncOrderToFirestore(order: SharedLiveOrder): Promise<void> {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(orderRef, {
      ...order,
      lastSyncedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('[Firebase] syncOrderToFirestore fallback:', err);
  }
}

/**
 * Subscribes to changes on a specific order in real time
 */
export function subscribeToLiveOrder(
  orderId: string,
  onUpdate: (order: SharedLiveOrder) => void
): Unsubscribe {
  const orderRef = doc(db, 'orders', orderId);
  return onSnapshot(
    orderRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate(snapshot.data() as SharedLiveOrder);
      }
    },
    (error) => {
      console.warn(`[Firebase] Live order subscription warning for ${orderId}:`, error);
    }
  );
}

/**
 * Subscribes to the latest broadcast order for Partners
 */
export function subscribeToLatestBroadcastOrder(
  onNewOrder: (order: SharedLiveOrder) => void
): Unsubscribe {
  // Listen to the canonical shared broadcast order
  const broadcastRef = doc(db, 'orders', 'CURRENT_BROADCAST_ORDER');
  return onSnapshot(
    broadcastRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as SharedLiveOrder;
        onNewOrder(data);
      }
    },
    (err) => {
      console.warn('[Firebase] Broadcast subscription warning:', err);
    }
  );
}

/**
 * Broadcasts an order to all nearby online partners
 */
export async function broadcastOrderToPartners(order: SharedLiveOrder): Promise<void> {
  try {
    // 1. Save specific order record
    const specificRef = doc(db, 'orders', order.id);
    await setDoc(specificRef, order, { merge: true });

    // 2. Update global broadcast order pointer
    const broadcastRef = doc(db, 'orders', 'CURRENT_BROADCAST_ORDER');
    await setDoc(broadcastRef, order, { merge: true });
  } catch (err) {
    console.warn('[Firebase] broadcastOrderToPartners warning:', err);
  }
}

/**
 * Updates order status (e.g. Partner Accepted, Arrived, Work in Progress, Completed)
 */
export async function updateLiveOrderStatus(
  orderId: string,
  updates: Partial<SharedLiveOrder>
): Promise<void> {
  try {
    const specificRef = doc(db, 'orders', orderId);
    await updateDoc(specificRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });

    const broadcastRef = doc(db, 'orders', 'CURRENT_BROADCAST_ORDER');
    await setDoc(broadcastRef, updates, { merge: true });
  } catch (err) {
    console.warn('[Firebase] updateLiveOrderStatus warning:', err);
  }
}

/**
 * In-app chat messages
 */
export async function sendLiveMessage(orderId: string, message: Omit<LiveChatMessage, 'id'>): Promise<void> {
  try {
    const messagesCol = collection(db, 'orders', orderId, 'messages');
    await addDoc(messagesCol, message);
  } catch (err) {
    console.warn('[Firebase] sendLiveMessage warning:', err);
  }
}

export function subscribeToLiveMessages(
  orderId: string,
  onMessageReceived: (messages: LiveChatMessage[]) => void
): Unsubscribe {
  const messagesCol = collection(db, 'orders', orderId, 'messages');
  return onSnapshot(
    messagesCol,
    (snapshot) => {
      const msgs: LiveChatMessage[] = [];
      snapshot.forEach((docSnap) => {
        msgs.push({ id: docSnap.id, ...(docSnap.data() as Omit<LiveChatMessage, 'id'>) });
      });
      onMessageReceived(msgs);
    },
    (err) => {
      console.warn('[Firebase] Chat subscription warning:', err);
    }
  );
}
