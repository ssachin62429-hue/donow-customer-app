export type PartnerLanguage = 'en' | 'hi';

export type PartnerScreenId =
  | 'partner-splash'                // Screen 1: Splash
  | 'partner-login-otp'             // Screen 2: Login & OTP
  | 'partner-permissions'           // Screen 3: Strict Permissions
  | 'partner-kyc'                   // Screen 4: KYC & Registration
  | 'partner-home'                  // Screen 5: Home Dashboard (Approved)
  | 'partner-incoming-order'        // Screen 6: Incoming Order Alert
  | 'partner-navigation'            // Screen 7: Navigation to Customer
  | 'partner-arrival-exception'     // Screen 8: Arrival Exceptions (>50m / Code Fallback)
  | 'partner-work-timer'            // Screen 9: Work in Progress (Timer)
  | 'partner-cash-collection'       // Screen 10: Work Completed (Cash Collection)
  | 'partner-commission-wallet'     // Screen 11: Commission Wallet (Warning)
  | 'partner-commission-locked'     // Screen 12: Commission Locked (Account Paused)
  | 'partner-performance'           // Screen 13: Performance & Cooldown
  | 'partner-no-show'               // Screen 14: No-Show / Cancellation
  | 'partner-support'               // Screen 15: Help & Support Ticket
  | 'partner-profile';              // Screen 16: Profile & Settings

export type PartnerTier = 'Green' | 'Amber' | 'Red';

export interface AdminAssignedService {
  id: string;
  nameEn: string;
  nameHi: string;
  ratePerMin: number;
  approvedByAdmin: boolean;
  assignedDate: string;
}

export interface PartnerProfileData {
  name: string;
  mobile: string;
  isKycSubmitted: boolean;
  isKycApproved: boolean;
  avatarUrl: string;
  rating: number;
  totalOrdersCompleted: number;
  assignedServices: AdminAssignedService[];
}

export interface IncomingOrderData {
  id: string;
  serviceEn: string;
  serviceHi: string;
  customerFirstName: string;
  locationName: string;
  fullAddress: string;
  scheduledTimeRange: string;
  expectedDurationMins: number;
  // Earning Transparency Rule: Partner sees ONLY their earning + customer tip.
  // Not the customer total charge or platform commission.
  partnerBaseEarning: number;
  customerTip: number;
  totalPartnerEarning: number;
  distanceKm: number;
  etaMins: number;
}

export interface CommissionState {
  pendingAmount: number; // Threshold: ₹100
  completedOrdersCount: number; // Threshold: 3 orders
  isLocked: boolean; // Auto locked if >= ₹100 or >= 3 orders
}

export interface PerformanceStats {
  lastTenCompleted: number; // e.g. 8 out of 10
  completionRate: number;   // 80%
  tier: PartnerTier;        // 'Green' / Best Tier
  cancellationsIn24h: number; // If 3, triggers 12-hr cooldown
  isCooldownActive: boolean;
  cooldownRemainingHours: number;
}
