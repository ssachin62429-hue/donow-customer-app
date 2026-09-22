import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PartnerScreenId,
  PartnerLanguage,
  PartnerProfileData,
  IncomingOrderData,
  CommissionState,
  PerformanceStats,
} from '../types';
import { partnerTranslations, PartnerTranslationKey } from '../i18n/partnerTranslations';

interface PartnerContextType {
  currentScreen: PartnerScreenId;
  previousScreen: PartnerScreenId | null;
  navigate: (screen: PartnerScreenId) => void;
  goBack: () => void;
  language: PartnerLanguage;
  setLanguage: (lang: PartnerLanguage) => void;
  toggleLanguage: () => void;
  t: (key: PartnerTranslationKey) => string;

  // Online / Radar
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;

  // Profile & KYC
  profile: PartnerProfileData;
  submitKyc: (name: string) => void;
  approveKycDemo: () => void;

  // Incoming Order
  incomingOrder: IncomingOrderData;
  acceptIncomingOrder: () => void;
  rejectIncomingOrder: () => void;

  // Distance & Geofenced Arrival
  distanceMetres: number;
  setDistanceMetres: (metres: number) => void;
  isWithin50m: boolean;
  arrivalCode: string;
  validateArrivalCode: (code: string) => boolean;
  markArrived: () => boolean;

  // Work & Local Offline Timer
  timerSeconds: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  scheduledStartTime: string;
  endWorkAndGenerateBill: () => void;

  // Cash Collection
  actualDurationMins: number;
  totalCashToCollect: number;
  baseFareEarning: number;
  tipAmount: number;
  confirmCashCollected: () => void;

  // Commission & Lock
  commission: CommissionState;
  setCommission: React.Dispatch<React.SetStateAction<CommissionState>>;
  payCommissionUPI: () => void;
  toggleCommissionLockDemo: () => void;

  // Performance & Cooldown
  performance: PerformanceStats;
  toggleCooldownDemo: () => void;

  // No-Show Grace Waiting
  noShowSecondsRemaining: number;
  isNoShowButtonEnabled: boolean;
  skipNoShowTimerDemo: () => void;
  markCustomerNoShow: () => void;

  // Screen Tester
  isScreenTesterOpen: boolean;
  setIsScreenTesterOpen: (open: boolean) => void;
}

const defaultAssignedServices = [
  {
    id: 'event-party-help',
    nameEn: 'Event & Party Help',
    nameHi: 'इवेंट और पार्टी सहायता',
    ratePerMin: 3.0,
    approvedByAdmin: true,
    assignedDate: '12 Sep 2026',
  },
  {
    id: 'hospital-assistance',
    nameEn: 'Hospital & OPD Queue Assistance',
    nameHi: 'अस्पताल और ओपीडी कतार सहायता',
    ratePerMin: 2.5,
    approvedByAdmin: true,
    assignedDate: '12 Sep 2026',
  },
  {
    id: 'document-assistance',
    nameEn: 'Document & Office Assistance',
    nameHi: 'दस्तावेज और कार्यालय सहायता',
    ratePerMin: 2.0,
    approvedByAdmin: true,
    assignedDate: '15 Sep 2026',
  },
];

const defaultProfile: PartnerProfileData = {
  name: 'Rahul Sharma',
  mobile: '9876543210',
  isKycSubmitted: true,
  isKycApproved: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
  rating: 4.88,
  totalOrdersCompleted: 142,
  assignedServices: defaultAssignedServices,
};

const defaultIncomingOrder: IncomingOrderData = {
  id: 'ORD-DN-9942',
  serviceEn: 'Event & Party Help',
  serviceHi: 'इवेंट और पार्टी सहायता',
  customerFirstName: 'Amit',
  locationName: 'KGMU Hospital, Gate 2 Reception, Chowk',
  fullAddress: 'Shah Mina Rd, Chowk, Lucknow, Uttar Pradesh 226003',
  scheduledTimeRange: '10:00 AM – 12:00 PM',
  expectedDurationMins: 120,
  partnerBaseEarning: 340,
  customerTip: 40,
  totalPartnerEarning: 380,
  distanceKm: 1.8,
  etaMins: 7,
};

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const PartnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<PartnerScreenId>('partner-home');
  const [screenHistory, setScreenHistory] = useState<PartnerScreenId[]>(['partner-home']);
  const [language, setLanguage] = useState<PartnerLanguage>('en');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [profile, setProfile] = useState<PartnerProfileData>(defaultProfile);
  const [incomingOrder, setIncomingOrder] = useState<IncomingOrderData>(defaultIncomingOrder);

  // Strict 50m geofence: default is 350m so user can see and test the error & fallback
  const [distanceMetres, setDistanceMetres] = useState<number>(350);
  const arrivalCode = '4829';

  // Work Timer & Local clock persistence
  const [timerSeconds, setTimerSeconds] = useState<number>(75);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const scheduledStartTime = '10:00 AM';

  // Bill calculation for 150 mins
  const actualDurationMins = 150;
  const baseFareEarning = 450; // 150m @ ₹3/min
  const tipAmount = 40;
  const totalCashToCollect = 490; // Customer total cash to pay

  // Commission wallet state
  const [commission, setCommission] = useState<CommissionState>({
    pendingAmount: 85,
    completedOrdersCount: 2,
    isLocked: false,
  });

  // Performance stats
  const [performance, setPerformance] = useState<PerformanceStats>({
    lastTenCompleted: 8,
    completionRate: 80,
    tier: 'Green',
    cancellationsIn24h: 0,
    isCooldownActive: false,
    cooldownRemainingHours: 12,
  });

  // No-Show 10-minute timer (starts at 600s)
  const [noShowSecondsRemaining, setNoShowSecondsRemaining] = useState<number>(600);

  // Screen tester modal
  const [isScreenTesterOpen, setIsScreenTesterOpen] = useState<boolean>(false);

  // Active Job Timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && currentScreen === 'partner-work-timer') {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentScreen]);

  // No-Show timer countdown when on Screen 14
  useEffect(() => {
    let interval: any = null;
    if (currentScreen === 'partner-no-show' && noShowSecondsRemaining > 0) {
      interval = setInterval(() => {
        setNoShowSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, noShowSecondsRemaining]);

  const t = (key: PartnerTranslationKey): string => {
    const dict = partnerTranslations[language] || partnerTranslations.en;
    return dict[key] || partnerTranslations.en[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const navigate = (screen: PartnerScreenId) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const next = [...screenHistory];
      next.pop();
      const prevScreen = next[next.length - 1];
      setScreenHistory(next);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('partner-home');
    }
  };

  const submitKyc = (name: string) => {
    setProfile((prev) => ({
      ...prev,
      name: name || prev.name,
      isKycSubmitted: true,
      isKycApproved: false,
    }));
  };

  const approveKycDemo = () => {
    setProfile((prev) => ({
      ...prev,
      isKycSubmitted: true,
      isKycApproved: true,
    }));
    navigate('partner-home');
  };

  const acceptIncomingOrder = () => {
    navigate('partner-navigation');
  };

  const rejectIncomingOrder = () => {
    navigate('partner-home');
  };

  const validateArrivalCode = (code: string): boolean => {
    if (code.trim() === arrivalCode) {
      setDistanceMetres(15);
      navigate('partner-work-timer');
      return true;
    }
    return false;
  };

  const markArrived = (): boolean => {
    if (distanceMetres <= 50) {
      navigate('partner-work-timer');
      return true;
    } else {
      navigate('partner-arrival-exception');
      return false;
    }
  };

  const endWorkAndGenerateBill = () => {
    setIsTimerRunning(false);
    navigate('partner-cash-collection');
  };

  const confirmCashCollected = () => {
    // Add completed order to commission tracking
    setCommission((prev) => {
      const newCount = prev.completedOrdersCount + 1;
      const newAmount = prev.pendingAmount + 30; // ₹30 platform cut added to pending
      const locked = newAmount >= 100 || newCount >= 3;
      return {
        pendingAmount: newAmount,
        completedOrdersCount: newCount,
        isLocked: locked,
      };
    });
    navigate('partner-commission-wallet');
  };

  const payCommissionUPI = () => {
    setCommission({
      pendingAmount: 0,
      completedOrdersCount: 0,
      isLocked: false,
    });
  };

  const toggleCommissionLockDemo = () => {
    setCommission((prev) => ({
      pendingAmount: prev.isLocked ? 45 : 115,
      completedOrdersCount: prev.isLocked ? 1 : 3,
      isLocked: !prev.isLocked,
    }));
  };

  const toggleCooldownDemo = () => {
    setPerformance((prev) => ({
      ...prev,
      isCooldownActive: !prev.isCooldownActive,
      cancellationsIn24h: prev.isCooldownActive ? 0 : 3,
    }));
  };

  const skipNoShowTimerDemo = () => {
    setNoShowSecondsRemaining(0);
  };

  const markCustomerNoShow = () => {
    alert('Customer marked as No-Show. ₹60 cancellation compensation credited to your wallet.');
    navigate('partner-home');
  };

  return (
    <PartnerContext.Provider
      value={{
        currentScreen,
        previousScreen: screenHistory.length > 1 ? screenHistory[screenHistory.length - 2] : null,
        navigate,
        goBack,
        language,
        setLanguage,
        toggleLanguage,
        t,
        isOnline,
        setIsOnline,
        profile,
        submitKyc,
        approveKycDemo,
        incomingOrder,
        acceptIncomingOrder,
        rejectIncomingOrder,
        distanceMetres,
        setDistanceMetres,
        isWithin50m: distanceMetres <= 50,
        arrivalCode,
        validateArrivalCode,
        markArrived,
        timerSeconds,
        isTimerRunning,
        setIsTimerRunning,
        isOfflineMode,
        setIsOfflineMode,
        scheduledStartTime,
        endWorkAndGenerateBill,
        actualDurationMins,
        totalCashToCollect,
        baseFareEarning,
        tipAmount,
        confirmCashCollected,
        commission,
        setCommission,
        payCommissionUPI,
        toggleCommissionLockDemo,
        performance,
        toggleCooldownDemo,
        noShowSecondsRemaining,
        isNoShowButtonEnabled: noShowSecondsRemaining === 0,
        skipNoShowTimerDemo,
        markCustomerNoShow,
        isScreenTesterOpen,
        setIsScreenTesterOpen,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};
