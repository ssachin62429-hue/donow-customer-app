import React, { createContext, useContext, useState } from 'react';
import {
  AdminMobileScreen,
  AdminPartner,
  AdminRole,
  AdminTicket,
  AdminUser,
  AdminWebScreen,
  CustomerPenaltyItem,
  FraudAuditLog,
  GlobalPlatformSettings,
  LiveMapPin,
  PendingCommissionItem,
  ServicePricingItem,
  SOSAlert,
} from '../types';
import {
  INITIAL_AUDIT_LOGS,
  INITIAL_CUSTOMER_PENALTIES,
  INITIAL_GLOBAL_SETTINGS,
  INITIAL_MAP_PINS,
  INITIAL_PARTNERS,
  INITIAL_PENDING_COMMISSIONS,
  INITIAL_SERVICES_PRICING,
  INITIAL_SOS_ALERTS,
  INITIAL_TICKETS,
} from '../mockAdminData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface AdminContextType {
  // Auth & Admin User
  adminUser: AdminUser;
  setAdminRole: (role: AdminRole) => void;
  loginAdmin: (email: string, role: AdminRole) => void;
  logoutAdmin: () => void;

  // Navigation
  activeInterface: 'mobile' | 'web';
  setActiveInterface: (mode: 'mobile' | 'web') => void;
  mobileScreen: AdminMobileScreen;
  setMobileScreen: (screen: AdminMobileScreen) => void;
  webScreen: AdminWebScreen;
  setWebScreen: (screen: AdminWebScreen) => void;

  // Master Global Orders Emergency Pause
  isOrdersGloballyPaused: boolean;
  setIsOrdersGloballyPaused: (paused: boolean | ((prev: boolean) => boolean)) => void;

  // Screen 2 & 4: SOS
  sosAlerts: SOSAlert[];
  activeSOSCount: number;
  resolveSOS: (id: string, notes?: string) => void;
  selectedSOS: SOSAlert | null;
  setSelectedSOS: (alert: SOSAlert | null) => void;

  // Screen 3: Live Map
  mapPins: LiveMapPin[];
  selectedPin: LiveMapPin | null;
  setSelectedPin: (pin: LiveMapPin | null) => void;

  // Screen 5: Support Tickets
  tickets: AdminTicket[];
  selectedTicket: AdminTicket | null;
  setSelectedTicket: (ticket: AdminTicket | null) => void;
  sendMessageToTicket: (ticketId: string, text: string) => void;
  resolveTicket: (ticketId: string) => void;

  // Screen 7: Partners & KYC
  partners: AdminPartner[];
  selectedPartnerForKYC: AdminPartner | null;
  setSelectedPartnerForKYC: (partner: AdminPartner | null) => void;
  approvePartnerKYC: (partnerId: string, assignedServices: string[]) => void;
  togglePartnerLock: (partnerId: string) => void;

  // Screen 8: Services & Pricing
  servicesPricing: ServicePricingItem[];
  updateServicePricing: (
    serviceId: string,
    updates: Partial<ServicePricingItem>
  ) => void;
  saveAllPricingChanges: () => void;

  // Screen 9: Global Settings
  globalSettings: GlobalPlatformSettings;
  updateGlobalSettings: (updates: Partial<GlobalPlatformSettings>) => void;
  saveGlobalSettings: () => void;

  // Screen 10: Financial Ledger
  pendingCommissions: PendingCommissionItem[];
  customerPenalties: CustomerPenaltyItem[];
  markUPISettlementPaid: (commissionId: string) => void;
  clearCustomerPenalty: (penaltyId: string) => void;

  // Screen 11: Audit & Fraud Logs
  auditLogs: FraudAuditLog[];
  revokeBanOrOverride: (logId: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: ToastMessage['type']) => void;
  dismissToast: (id: string) => void;

  // Quick Action Call Modal Simulator (112, Partner, Customer)
  activeCallingSim: {
    isOpen: boolean;
    name: string;
    number: string;
    role: 'Police (112)' | 'Partner' | 'Customer';
  } | null;
  triggerCall: (name: string, number: string, role: 'Police (112)' | 'Partner' | 'Customer') => void;
  closeCall: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Profile & Auth
  const [adminUser, setAdminUser] = useState<AdminUser>({
    id: 'ADM-01',
    name: 'Vikramaditya Rao',
    email: 'operations.admin@donow.in',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isLoggedIn: true,
  });

  // Mobile & Web active views
  const [activeInterface, setActiveInterface] = useState<'mobile' | 'web'>('web');
  const [mobileScreen, setMobileScreen] = useState<AdminMobileScreen>('admin-mob-dashboard');
  const [webScreen, setWebScreen] = useState<AdminWebScreen>('web-dashboard');

  // Emergency Global Pause
  const [isOrdersGloballyPaused, setIsOrdersGloballyPaused] = useState<boolean>(false);

  // SOS
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>(INITIAL_SOS_ALERTS);
  const [selectedSOS, setSelectedSOS] = useState<SOSAlert | null>(INITIAL_SOS_ALERTS[0]);

  // Live Map
  const [mapPins] = useState<LiveMapPin[]>(INITIAL_MAP_PINS);
  const [selectedPin, setSelectedPin] = useState<LiveMapPin | null>(INITIAL_MAP_PINS[0]);

  // Support Tickets
  const [tickets, setTickets] = useState<AdminTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<AdminTicket | null>(INITIAL_TICKETS[0]);

  // Partners & KYC
  const [partners, setPartners] = useState<AdminPartner[]>(INITIAL_PARTNERS);
  const [selectedPartnerForKYC, setSelectedPartnerForKYC] = useState<AdminPartner | null>(null);

  // Services Pricing
  const [servicesPricing, setServicesPricing] = useState<ServicePricingItem[]>(INITIAL_SERVICES_PRICING);

  // Global Settings
  const [globalSettings, setGlobalSettings] = useState<GlobalPlatformSettings>(INITIAL_GLOBAL_SETTINGS);

  // Financial Ledger
  const [pendingCommissions, setPendingCommissions] = useState<PendingCommissionItem[]>(INITIAL_PENDING_COMMISSIONS);
  const [customerPenalties, setCustomerPenalties] = useState<CustomerPenaltyItem[]>(INITIAL_CUSTOMER_PENALTIES);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<FraudAuditLog[]>(INITIAL_AUDIT_LOGS);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Calling Simulator
  const [activeCallingSim, setActiveCallingSim] = useState<{
    isOpen: boolean;
    name: string;
    number: string;
    role: 'Police (112)' | 'Partner' | 'Customer';
  } | null>(null);

  const showToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setAdminRole = (role: AdminRole) => {
    setAdminUser((prev) => ({ ...prev, role }));
    showToast('Role Switched', `Active role changed to ${role}`, 'info');
  };

  const loginAdmin = (email: string, role: AdminRole) => {
    setAdminUser((prev) => ({
      ...prev,
      email,
      role,
      isLoggedIn: true,
    }));
    setMobileScreen('admin-mob-dashboard');
    showToast('Login Successful', `Authenticated as ${role} (${email})`, 'success');
  };

  const logoutAdmin = () => {
    setAdminUser((prev) => ({ ...prev, isLoggedIn: false }));
    setMobileScreen('admin-mob-login');
    showToast('Logged Out', 'Signed out from admin terminal', 'info');
  };

  // SOS operations
  const activeSOSCount = sosAlerts.filter((s) => s.status === 'ACTIVE').length;

  const resolveSOS = (id: string, notes?: string) => {
    setSosAlerts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'RESOLVED', notes: notes || 'Resolved by Admin.' } : s))
    );
    if (selectedSOS?.id === id) {
      setSelectedSOS((prev) => (prev ? { ...prev, status: 'RESOLVED' } : null));
    }
    showToast('SOS Resolved', `Alert ${id} successfully closed and logged in safety registry.`, 'success');
  };

  // Ticket operations
  const sendMessageToTicket = (ticketId: string, text: string) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: 'admin' as const,
      senderName: `${adminUser.name} (${adminUser.role})`,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: 'IN REVIEW',
              messages: [...t.messages, newMsg],
            }
          : t
      )
    );

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) =>
        prev
          ? {
              ...prev,
              status: 'IN REVIEW',
              messages: [...prev.messages, newMsg],
            }
          : null
      );
    }
    showToast('Message Sent', 'Admin update posted to dispute thread.', 'info');
  };

  const resolveTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'RESOLVED' } : t))
    );
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: 'RESOLVED' } : null));
    }
    showToast('Ticket Resolved', `Ticket ${ticketId} marked as resolved.`, 'success');
  };

  // Partner KYC operations
  const approvePartnerKYC = (partnerId: string, assignedServices: string[]) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === partnerId
          ? {
              ...p,
              status: 'Active',
              assignedServices,
            }
          : p
      )
    );
    setSelectedPartnerForKYC(null);
    showToast('Partner Approved & Activated', `Partner ${partnerId} is now live with ${assignedServices.length} assigned services.`, 'success');
  };

  const togglePartnerLock = (partnerId: string) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === partnerId) {
          const newStatus = p.status === 'Locked' ? 'Active' : 'Locked';
          showToast(
            newStatus === 'Locked' ? 'Partner Account Locked' : 'Partner Account Unlocked',
            `Status updated for ${p.name}`,
            newStatus === 'Locked' ? 'warning' : 'success'
          );
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
  };

  // Services Pricing
  const updateServicePricing = (serviceId: string, updates: Partial<ServicePricingItem>) => {
    setServicesPricing((prev) =>
      prev.map((svc) => {
        if (svc.id === serviceId) {
          const updated = { ...svc, ...updates };
          // Auto-calculate minAmount if baseRate or minDuration changed
          if (updates.baseRate !== undefined || updates.minDurationMins !== undefined) {
            updated.minAmount = Number((updated.baseRate * updated.minDurationMins).toFixed(2));
          }
          return updated;
        }
        return svc;
      })
    );
  };

  const saveAllPricingChanges = () => {
    showToast('Pricing Saved', 'Service tariffs and billing rules updated across mobile gateways.', 'success');
  };

  // Global Settings
  const updateGlobalSettings = (updates: Partial<GlobalPlatformSettings>) => {
    setGlobalSettings((prev) => ({ ...prev, ...updates }));
  };

  const saveGlobalSettings = () => {
    showToast('Settings Updated', 'Platform variables saved and synchronized.', 'success');
  };

  // Financial Ledger
  const markUPISettlementPaid = (commissionId: string) => {
    setPendingCommissions((prev) =>
      prev.map((item) =>
        item.id === commissionId
          ? { ...item, status: 'SETTLED', amountDue: 0, ordersCount: 0 }
          : item
      )
    );
    showToast('UPI Settlement Cleared', 'Commission dues marked as paid. Partner account unlocked.', 'success');
  };

  const clearCustomerPenalty = (penaltyId: string) => {
    setCustomerPenalties((prev) =>
      prev.map((p) => (p.id === penaltyId ? { ...p, nextOrderBlockStatus: 'CLEARED', owedPenalty: 0 } : p))
    );
    showToast('Penalty Waived/Cleared', 'Customer order dispatch restrictions lifted.', 'info');
  };

  // Fraud / Audit Logs
  const revokeBanOrOverride = (logId: string) => {
    setAuditLogs((prev) =>
      prev.map((log) => {
        if (log.id === logId) {
          return {
            ...log,
            isOverridden: true,
            actionTaken: `OVERRIDDEN by Admin (${adminUser.name}) on ${new Date().toLocaleTimeString()}`,
          };
        }
        return log;
      })
    );
    showToast('Ban Revoked / Overridden', `Audit flag ${logId} overridden by Admin.`, 'success');
  };

  // Call simulation
  const triggerCall = (name: string, number: string, role: 'Police (112)' | 'Partner' | 'Customer') => {
    setActiveCallingSim({
      isOpen: true,
      name,
      number,
      role,
    });
  };

  const closeCall = () => {
    setActiveCallingSim(null);
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        setAdminRole,
        loginAdmin,
        logoutAdmin,
        activeInterface,
        setActiveInterface,
        mobileScreen,
        setMobileScreen,
        webScreen,
        setWebScreen,
        isOrdersGloballyPaused,
        setIsOrdersGloballyPaused,
        sosAlerts,
        activeSOSCount,
        resolveSOS,
        selectedSOS,
        setSelectedSOS,
        mapPins,
        selectedPin,
        setSelectedPin,
        tickets,
        selectedTicket,
        setSelectedTicket,
        sendMessageToTicket,
        resolveTicket,
        partners,
        selectedPartnerForKYC,
        setSelectedPartnerForKYC,
        approvePartnerKYC,
        togglePartnerLock,
        servicesPricing,
        updateServicePricing,
        saveAllPricingChanges,
        globalSettings,
        updateGlobalSettings,
        saveGlobalSettings,
        pendingCommissions,
        customerPenalties,
        markUPISettlementPaid,
        clearCustomerPenalty,
        auditLogs,
        revokeBanOrOverride,
        toasts,
        showToast,
        dismissToast,
        activeCallingSim,
        triggerCall,
        closeCall,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
