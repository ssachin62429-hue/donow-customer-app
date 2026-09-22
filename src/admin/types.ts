export type AdminRole = 'Super Admin' | 'Operations' | 'Safety' | 'Finance';

export type AdminMobileScreen =
  | 'admin-mob-login'
  | 'admin-mob-dashboard'
  | 'admin-mob-map'
  | 'admin-mob-sos'
  | 'admin-mob-tickets';

export type AdminWebScreen =
  | 'web-dashboard'
  | 'web-partners'
  | 'web-services'
  | 'web-settings'
  | 'web-ledger'
  | 'web-audit';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  isLoggedIn: boolean;
}

export interface AdminPartner {
  id: string;
  name: string;
  mobile: string;
  status: 'Pending' | 'Active' | 'Locked';
  rating: number;
  totalOrders: number;
  joinedDate: string;
  aadharNumber: string;
  panNumber: string;
  assignedServices: string[];
  city: string;
  kycSubmittedAt: string;
  photoUrl: string;
}

export interface SOSAlert {
  id: string;
  orderId: string;
  triggeredBy: string;
  partnerName: string;
  partnerPhone: string;
  customerName: string;
  customerPhone: string;
  location: string;
  coordinates: string;
  timestamp: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED';
  batteryLevel: string;
  taskTitle: string;
  notes?: string;
}

export interface LiveMapPin {
  id: string;
  partnerName: string;
  phone: string;
  status: 'Available' | 'En Route' | 'At Work';
  orderId?: string;
  customerName?: string;
  serviceName?: string;
  xPercent: number; // For responsive SVG interactive map
  yPercent: number;
  battery: number;
  speedKmh: number;
  address: string;
}

export interface AdminTicket {
  id: string;
  orderId: string;
  customerName: string;
  partnerName: string;
  subject: string;
  status: 'WAITING FOR ADMIN' | 'IN REVIEW' | 'RESOLVED';
  tag: string;
  priority: 'High' | 'Medium' | 'Low';
  createdAt: string;
  messages: {
    id: string;
    sender: 'customer' | 'partner' | 'admin';
    senderName: string;
    text: string;
    time: string;
  }[];
}

export interface ServicePricingItem {
  id: string;
  nameEn: string;
  nameHi: string;
  baseRate: number; // e.g. ₹2.00 / min
  minDurationMins: number; // e.g. 30 mins
  minAmount: number; // auto-calculated: baseRate * minDurationMins
  isEnabled: boolean;
  category: string;
  description: string;
}

export interface GlobalPlatformSettings {
  platformCommissionPct: number; // 15
  commissionLockThresholdAmount: number; // 100
  commissionLockThresholdOrders: number; // 3
  matchingRadiusSteps: string; // "3km, 5km, 7km"
  customerCancelPenalty: number; // 20
  autoAssignBufferMins: number; // 5
  emergencyEscalationDelaySecs: number; // 45
}

export interface PendingCommissionItem {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerPhone: string;
  amountDue: number;
  ordersCount: number;
  status: 'PENDING' | 'SETTLED' | 'THRESHOLD_LOCKED';
  upiId: string;
  dueDate: string;
}

export interface CustomerPenaltyItem {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  owedPenalty: number;
  reason: string;
  nextOrderBlockStatus: 'BLOCKED' | 'WARNING' | 'CLEARED';
  cancelledOrderId: string;
  date: string;
}

export interface FraudAuditLog {
  id: string;
  timestamp: string;
  entityId: string;
  entityName: string;
  entityType: 'Partner' | 'Customer' | 'System';
  event: string;
  actionTaken: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  isOverridden: boolean;
}
