export type Language = 'en' | 'hi';

export type ScreenId =
  | 'splash'            // Screen 1
  | 'permissions'       // Screen 2
  | 'login'             // Screen 3
  | 'otp'               // Screen 4
  | 'create-profile'    // Screen 5
  | 'home'              // Screen 6
  | 'write-task'        // Screen 7
  | 'service-select'    // Screen 8
  | 'task-details'      // Screen 9
  | 'location-select'   // Screen 10
  | 'booking-summary'   // Screen 11
  | 'finding-partner'   // Screen 12
  | 'tip-selection'     // Screen 13
  | 'partner-accepted'  // Screen 14
  | 'partner-arrived'   // Screen 15
  | 'work-in-progress'  // Screen 16
  | 'work-completed'    // Screen 17
  | 'rate-partner'      // Screen 18
  | 'orders'            // Screen 19
  | 'order-details'     // Screen 20
  | 'notifications'     // Screen 21
  | 'profile'           // Screen 22
  | 'sos'               // Screen 23
  | 'support'           // Screen 24
  | 'terms'             // Screen 24 sub-view
  | 'privacy'           // Screen 24 sub-view
  | 'help-support';

export type BottomNavTab = 'home' | 'orders' | 'notifications' | 'profile';

export interface CustomerProfile {
  name: string;
  mobile: string;
  isVerified: boolean;
  avatarUrl?: string;
  termsAccepted: boolean;
  language: Language;
}

export interface ServiceItem {
  id: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  ratePerMin: number;
  minDurationMins: number;
  minCharge: number;
  iconName: string;
  taskOptions: {
    id: string;
    labelEn: string;
    labelHi: string;
  }[];
}

export interface BookingDraft {
  serviceId: string;
  serviceName: string;
  customTaskDescription?: string;
  selectedOptions: string[];
  additionalDetails: string;
  locationName: string;
  fullAddress: string;
  landmark: string;
  meetingInstructions: string;
  lat: number;
  lng: number;
  date: string;
  startTime: string;
  expectedDurationMins: number;
  ratePerMin: number;
  estimatedAmount: number;
  tipAmount: number;
}

export interface Partner {
  id: string;
  name: string;
  rating: number;
  totalRatingsCount: number;
  performanceBadge: 'Best' | 'Top Rated' | 'Verified';
  distanceKm: number;
  etaMins: number;
  photoUrl: string;
  lat: number;
  lng: number;
  // Personal phone number is masked/protected
  isMaskedCallingEnabled: boolean;
}

export type OrderStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';

export interface OrderTimelineItem {
  status: string;
  time: string;
  description: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  partner?: Partner;
  status: OrderStatus;
  date: string;
  scheduledTimeRange: string;
  locationName: string;
  fullAddress: string;
  landmark?: string;
  meetingInstructions?: string;
  expectedDurationMins: number;
  actualDurationMins?: number;
  ratePerMin: number;
  baseFare: number;
  tipAmount: number;
  finalAmount: number;
  paymentMethod: 'Cash' | 'UPI' | 'Card';
  paymentStatus: 'Pending' | 'Paid';
  bookingTime: string;
  arrivalTime?: string;
  workStartTime?: string;
  completionTime?: string;
  timeline: OrderTimelineItem[];
  ratingGiven?: number;
  reviewGiven?: string;
  taskDetails?: string;
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleHi: string;
  messageEn: string;
  messageHi: string;
  time: string;
  timeAgo?: string;
  read: boolean;
  isRead?: boolean;
  type: 'order' | 'system' | 'sos' | 'payment' | 'accepted' | 'arrived' | 'completed';
  orderId?: string;
  targetScreen?: ScreenId;
}

export interface SupportTicket {
  ticketNumber: string;
  category: string;
  description: string;
  createdAt: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  hasAttachment?: boolean;
}

export interface SOSEvent {
  id: string;
  orderId: string;
  timestamp: string;
  customerLocation: string;
  partnerLocation: string;
  dispatchedToEmergency: boolean;
  dispatchedToDoNowTeam: boolean;
  status: 'Reported' | 'Assistance Dispatched';
}

export interface PermissionsState {
  location: boolean;
  notifications: boolean;
  camera: boolean;
  microphone: boolean;
}
