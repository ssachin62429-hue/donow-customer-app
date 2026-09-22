import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ScreenId,
  Language,
  CustomerProfile,
  BookingDraft,
  Order,
  NotificationItem,
  SupportTicket,
  SOSEvent,
  PermissionsState,
} from '../types';
import { translations, TranslationKey } from '../i18n/translations';
import { SERVICES_DATA } from '../data/servicesData';
import {
  DEMO_PARTNER,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_TICKETS,
} from '../data/mockRepository';
import {
  broadcastOrderToPartners,
  subscribeToLiveOrder,
  SharedLiveOrder,
} from '../lib/firebase';

interface AppContextType {
  // Navigation
  currentScreen: ScreenId;
  previousScreen: ScreenId | null;
  navigate: (screen: ScreenId) => void;
  goBack: () => void;
  isScreenSwitcherOpen: boolean;
  setIsScreenSwitcherOpen: (open: boolean) => void;

  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;

  // Profile & Permissions
  profile: CustomerProfile;
  setProfile: React.Dispatch<React.SetStateAction<CustomerProfile>>;
  permissions: PermissionsState;
  setPermissions: React.Dispatch<React.SetStateAction<PermissionsState>>;
  togglePermission: (key: keyof PermissionsState) => void;

  // Booking Draft
  bookingDraft: BookingDraft;
  updateBookingDraft: (updates: Partial<BookingDraft>) => void;
  selectService: (serviceId: string) => void;

  // Orders & Active Order
  orders: Order[];
  activeOrder: Order | null;
  selectedOrderForDetails: Order | null;
  setSelectedOrderForDetails: (order: Order | null) => void;

  // Matching & Tipping State
  matchingStage: 1 | 2 | 3;
  setMatchingStage: (stage: 1 | 2 | 3) => void;
  addTipAndSearch: (tipAmount: number) => void;

  // Work & Timer
  workTimerSeconds: number;
  isWorkTimerActive: boolean;
  setIsWorkTimerActive: (active: boolean) => void;
  partnerArrivedEarly: boolean;
  setPartnerArrivedEarly: (early: boolean) => void;

  // Actions
  handleBookingSubmit: () => void;
  handlePartnerAccept: () => void;
  handlePartnerArrive: () => void;
  handleStartWork: () => void;
  handleCompleteWork: () => void;
  handleConfirmPayment: () => void;
  handleSubmitRating: (stars: number, review: string) => void;
  handleCreateTicket: (category: string, description: string) => string;
  handleSendSOS: () => SOSEvent;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markAllNotificationsAsRead: () => void;
  markNotificationAsRead: (id: string) => void;
  logout: () => void;

  // Modals & Safety
  isCallingOpen: boolean;
  setIsCallingOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  sosEvent: SOSEvent | null;
  clearSOS: () => void;

  // Prototype UI Controls
  isPhoneFrame: boolean;
  setIsPhoneFrame: (val: boolean) => void;
}

const defaultBookingDraft: BookingDraft = {
  serviceId: 'event-party-help',
  serviceName: 'Event & Party Help',
  customTaskDescription: 'Birthday party mein guests manage karne ke liye help chahiye.',
  selectedOptions: ['guest-guidance', 'seating-arrangement'],
  additionalDetails: 'Please arrive by 10:00 AM sharp at the entrance.',
  locationName: 'KGMU Hospital / Chowk Complex',
  fullAddress: 'Shah Mina Rd, Chowk, Lucknow, Uttar Pradesh 226003',
  landmark: 'Near Gate 2 main parking',
  meetingInstructions: 'Wait near the reception lobby',
  lat: 26.8687,
  lng: 80.9135,
  date: 'Today, 19 Sep',
  startTime: '10:00 AM',
  expectedDurationMins: 120,
  ratePerMin: 3,
  estimatedAmount: 360,
  tipAmount: 0,
};

const defaultProfile: CustomerProfile = {
  name: 'Amit Verma',
  mobile: '9876543210',
  isVerified: true,
  avatarUrl: '',
  termsAccepted: true,
  language: 'en',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['splash']);
  const [isScreenSwitcherOpen, setIsScreenSwitcherOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const [profile, setProfile] = useState<CustomerProfile>(defaultProfile);
  const [liveOrderId, setLiveOrderId] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<PermissionsState>({
    location: true,
    notifications: true,
    camera: false,
    microphone: false,
  });

  const [bookingDraft, setBookingDraft] = useState<BookingDraft>(defaultBookingDraft);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(INITIAL_ORDERS[0]);

  const [matchingStage, setMatchingStage] = useState<1 | 2 | 3>(1);
  const [workTimerSeconds, setWorkTimerSeconds] = useState<number>(0);
  const [isWorkTimerActive, setIsWorkTimerActive] = useState<boolean>(false);
  const [partnerArrivedEarly, setPartnerArrivedEarly] = useState<boolean>(true);

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  const [isCallingOpen, setIsCallingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sosEvent, setSosEvent] = useState<SOSEvent | null>(null);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  // Live timer tick when work is running
  useEffect(() => {
    let interval: any = null;
    if (isWorkTimerActive) {
      interval = setInterval(() => {
        setWorkTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isWorkTimerActive]);

  // Translation helper
  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const navigate = (screen: ScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prev = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
  };

  const togglePermission = (key: keyof PermissionsState) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateBookingDraft = (updates: Partial<BookingDraft>) => {
    setBookingDraft((prev) => {
      const updated = { ...prev, ...updates };
      // Recalculate estimated amount based on rate and duration
      const duration = updated.expectedDurationMins || 30;
      const rate = updated.ratePerMin || 2;
      const base = duration * rate;
      updated.estimatedAmount = base + (updated.tipAmount || 0);
      return updated;
    });
  };

  const selectService = (serviceId: string) => {
    const service = SERVICES_DATA.find((s) => s.id === serviceId);
    if (!service) return;
    updateBookingDraft({
      serviceId: service.id,
      serviceName: language === 'hi' ? service.nameHi : service.nameEn,
      ratePerMin: service.ratePerMin,
      expectedDurationMins: Math.max(bookingDraft.expectedDurationMins, service.minDurationMins),
      selectedOptions: service.taskOptions.length > 0 ? [service.taskOptions[0].id] : [],
    });
    navigate('task-details');
  };

  const handleBookingSubmit = () => {
    // Start matching flow & broadcast to real-time Firebase Firestore
    setMatchingStage(1);
    const orderId = `DN-${Math.floor(10000 + Math.random() * 90000)}`;
    setLiveOrderId(orderId);

    const liveOrder: SharedLiveOrder = {
      id: orderId,
      customerId: 'CUST-POOJA-01',
      customerName: profile.name || 'Pooja Verma',
      customerPhone: profile.mobile || '9876543210',
      serviceCategory: bookingDraft.serviceName || 'Waiting in Line / Q Management',
      taskDescription: bookingDraft.customTaskDescription || bookingDraft.serviceName,
      locationAddress: `${bookingDraft.locationName}, ${bookingDraft.fullAddress}`,
      landmark: bookingDraft.landmark || 'Hazratganj, Lucknow',
      status: 'finding_partner',
      arrivalOtp: '4829',
      partnerId: null,
      partnerName: null,
      partnerPhone: null,
      partnerRating: 4.9,
      totalAmount: (bookingDraft.expectedDurationMins * bookingDraft.ratePerMin) + bookingDraft.tipAmount,
      tipAmount: bookingDraft.tipAmount,
      estimatedDurationMins: bookingDraft.expectedDurationMins,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    broadcastOrderToPartners(liveOrder);
    navigate('finding-partner');
  };

  // Real-time synchronization: When Partner accepts or updates order via Firebase
  useEffect(() => {
    if (!liveOrderId) return;
    const unsub = subscribeToLiveOrder(liveOrderId, (updatedOrder) => {
      if (updatedOrder.status === 'accepted' && currentScreen === 'finding-partner') {
        const acceptedPartner = {
          ...DEMO_PARTNER,
          name: updatedOrder.partnerName || DEMO_PARTNER.name,
          rating: updatedOrder.partnerRating || DEMO_PARTNER.rating,
        };
        const newOrder: Order = {
          id: updatedOrder.id,
          serviceId: bookingDraft.serviceId,
          serviceName: updatedOrder.serviceCategory,
          customerName: updatedOrder.customerName,
          partner: acceptedPartner,
          status: 'active',
          date: bookingDraft.date,
          scheduledTimeRange: `${bookingDraft.startTime} – 12:00 PM`,
          locationName: bookingDraft.locationName,
          fullAddress: updatedOrder.locationAddress,
          landmark: updatedOrder.landmark,
          meetingInstructions: bookingDraft.meetingInstructions,
          expectedDurationMins: updatedOrder.estimatedDurationMins,
          ratePerMin: bookingDraft.ratePerMin,
          baseFare: updatedOrder.estimatedDurationMins * bookingDraft.ratePerMin,
          tipAmount: updatedOrder.tipAmount,
          finalAmount: updatedOrder.totalAmount,
          paymentMethod: 'Cash',
          paymentStatus: 'Pending',
          bookingTime: 'Just now',
          taskDetails: updatedOrder.taskDescription,
          timeline: [
            { status: 'Order Placed', time: 'Just now', description: 'Order created by customer' },
            { status: 'Partner Accepted', time: 'Just now', description: `${acceptedPartner.name} accepted via Firebase Live Sync` },
          ],
        };
        setActiveOrder(newOrder);
        setOrders((prev) => [newOrder, ...prev]);
        navigate('partner-accepted');
      } else if (updatedOrder.status === 'arrived' && currentScreen === 'partner-accepted') {
        handlePartnerArrive();
      } else if (updatedOrder.status === 'in_progress' && currentScreen === 'partner-arrived') {
        handleStartWork();
      } else if (updatedOrder.status === 'completed' && (currentScreen === 'work-in-progress' || currentScreen === 'partner-arrived')) {
        handleCompleteWork();
      }
    });
    return () => unsub();
  }, [liveOrderId, currentScreen, bookingDraft]);

  const addTipAndSearch = (tipAmount: number) => {
    updateBookingDraft({ tipAmount });
    setMatchingStage(2);
    navigate('finding-partner');
  };

  const handlePartnerAccept = () => {
    const newOrder: Order = {
      id: `DN-${Math.floor(10000 + Math.random() * 90000)}`,
      serviceId: bookingDraft.serviceId,
      serviceName: bookingDraft.serviceName,
      customerName: profile.name,
      partner: DEMO_PARTNER,
      status: 'active',
      date: bookingDraft.date,
      scheduledTimeRange: `${bookingDraft.startTime} – 12:00 PM`,
      locationName: bookingDraft.locationName,
      fullAddress: bookingDraft.fullAddress,
      landmark: bookingDraft.landmark,
      meetingInstructions: bookingDraft.meetingInstructions,
      expectedDurationMins: bookingDraft.expectedDurationMins,
      ratePerMin: bookingDraft.ratePerMin,
      baseFare: bookingDraft.expectedDurationMins * bookingDraft.ratePerMin,
      tipAmount: bookingDraft.tipAmount,
      finalAmount: (bookingDraft.expectedDurationMins * bookingDraft.ratePerMin) + bookingDraft.tipAmount,
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      bookingTime: '09:50 AM',
      taskDetails: bookingDraft.customTaskDescription || bookingDraft.serviceName,
      timeline: [
        { status: 'Order Placed', time: '09:50 AM', description: 'Order created by customer' },
        { status: 'Partner Accepted', time: '09:52 AM', description: `${DEMO_PARTNER.name} accepted the task` },
      ],
    };

    setActiveOrder(newOrder);
    setOrders((prev) => [newOrder, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleEn: 'Partner Found ✓',
      titleHi: 'पार्टनर मिल गया ✓',
      messageEn: `${DEMO_PARTNER.name} is on the way (ETA ${DEMO_PARTNER.etaMins} mins).`,
      messageHi: `${DEMO_PARTNER.name} आपके स्थान की ओर आ रहे हैं (${DEMO_PARTNER.etaMins} मिनट में)।`,
      time: 'Just now',
      read: false,
      type: 'order',
      orderId: newOrder.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    navigate('partner-accepted');
  };

  const handlePartnerArrive = () => {
    if (activeOrder) {
      const updatedOrder = {
        ...activeOrder,
        arrivalTime: '09:55 AM',
        timeline: [
          ...activeOrder.timeline,
          {
            status: 'Partner Arrived',
            time: '09:55 AM',
            description: 'Arrived within 50m radius. Timer starts at scheduled 10:00 AM.',
          },
        ],
      };
      setActiveOrder(updatedOrder);
      setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    }
    navigate('partner-arrived');
  };

  const handleStartWork = () => {
    setIsWorkTimerActive(true);
    setWorkTimerSeconds(1);
    if (activeOrder) {
      const updatedOrder = {
        ...activeOrder,
        workStartTime: '10:00 AM',
        timeline: [
          ...activeOrder.timeline,
          {
            status: 'Work Commenced',
            time: '10:00 AM',
            description: 'Task ongoing with active timer',
          },
        ],
      };
      setActiveOrder(updatedOrder);
      setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    }
    navigate('work-in-progress');
  };

  const handleCompleteWork = () => {
    setIsWorkTimerActive(false);
    // Business rule: Actual time billing, min 30 mins
    const actualMinutes = Math.max(150, Math.ceil(workTimerSeconds / 60));
    const serviceAmount = actualMinutes * (activeOrder?.ratePerMin || 2);
    const tip = activeOrder?.tipAmount || 40;
    const finalAmount = serviceAmount + tip;

    if (activeOrder) {
      const updatedOrder: Order = {
        ...activeOrder,
        actualDurationMins: actualMinutes,
        baseFare: serviceAmount,
        finalAmount: finalAmount,
        completionTime: '12:30 PM',
        timeline: [
          ...activeOrder.timeline,
          {
            status: 'Work Completed',
            time: '12:30 PM',
            description: `Actual work duration: ${actualMinutes} minutes`,
          },
        ],
      };
      setActiveOrder(updatedOrder);
      setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
    }
    navigate('work-completed');
  };

  const handleConfirmPayment = () => {
    if (activeOrder) {
      const updatedOrder: Order = {
        ...activeOrder,
        status: 'completed',
        paymentStatus: 'Paid',
        timeline: [
          ...activeOrder.timeline,
          {
            status: 'Payment Confirmed',
            time: '12:32 PM',
            description: `Payment of ₹${activeOrder.finalAmount} received via Cash`,
          },
        ],
      };
      setActiveOrder(null);
      setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
      setSelectedOrderForDetails(updatedOrder);
    }
    navigate('rate-partner');
  };

  const handleSubmitRating = (stars: number, review: string) => {
    if (selectedOrderForDetails) {
      const updated = {
        ...selectedOrderForDetails,
        ratingGiven: stars,
        reviewGiven: review,
      };
      setSelectedOrderForDetails(updated);
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    }
    navigate('orders');
  };

  const handleCreateTicket = (category: string, description: string): string => {
    const ticketNum = `DN-TK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      ticketNumber: ticketNum,
      category,
      description,
      createdAt: 'Just now',
      status: 'Open',
    };
    setTickets((prev) => [newTicket, ...prev]);
    return ticketNum;
  };

  const handleSendSOS = (): SOSEvent => {
    const event: SOSEvent = {
      id: `SOS-${Date.now()}`,
      orderId: activeOrder?.id || 'DN-89210',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customerLocation: bookingDraft.fullAddress,
      partnerLocation: '2.1 km away (GPS Locked)',
      dispatchedToEmergency: true,
      dispatchedToDoNowTeam: true,
      status: 'Assistance Dispatched',
    };
    setSosEvent(event);
    return event;
  };

  const clearSOS = () => {
    setSosEvent(null);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true, isRead: true })));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true, isRead: true } : n))
    );
  };

  const logout = () => {
    setProfile({
      name: '',
      mobile: '',
      isVerified: false,
      termsAccepted: false,
      language: 'en',
    });
    setActiveOrder(null);
    setCurrentScreen('login');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        previousScreen: screenHistory.length > 1 ? screenHistory[screenHistory.length - 2] : null,
        navigate,
        goBack,
        isScreenSwitcherOpen,
        setIsScreenSwitcherOpen,
        language,
        setLanguage,
        t,
        profile,
        setProfile,
        permissions,
        setPermissions,
        togglePermission,
        bookingDraft,
        updateBookingDraft,
        selectService,
        orders,
        activeOrder,
        selectedOrderForDetails,
        setSelectedOrderForDetails,
        matchingStage,
        setMatchingStage,
        addTipAndSearch,
        workTimerSeconds,
        isWorkTimerActive,
        setIsWorkTimerActive,
        partnerArrivedEarly,
        setPartnerArrivedEarly,
        handleBookingSubmit,
        handlePartnerAccept,
        handlePartnerArrive,
        handleStartWork,
        handleCompleteWork,
        handleConfirmPayment,
        handleSubmitRating,
        handleCreateTicket,
        handleSendSOS,
        notifications,
        unreadNotificationsCount,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        logout,
        isCallingOpen,
        setIsCallingOpen,
        isChatOpen,
        setIsChatOpen,
        sosEvent,
        clearSOS,
        isPhoneFrame,
        setIsPhoneFrame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
