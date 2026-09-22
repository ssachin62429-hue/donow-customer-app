import React from 'react';
import { PartnerProvider, usePartner } from './context/PartnerContext';
import { AndroidStatusBar } from '../components/AndroidStatusBar';
import { AndroidNavBar } from '../components/AndroidNavBar';
import { PartnerScreenTester } from './components/PartnerScreenTester';

// Import all 16 Screens
import { Screen01Splash } from './screens/Screen01Splash';
import { Screen02LoginOTP } from './screens/Screen02LoginOTP';
import { Screen03StrictPermissions } from './screens/Screen03StrictPermissions';
import { Screen04KYCRegistration } from './screens/Screen04KYCRegistration';
import { Screen05HomeDashboard } from './screens/Screen05HomeDashboard';
import { Screen06IncomingOrderAlert } from './screens/Screen06IncomingOrderAlert';
import { Screen07NavigationToCustomer } from './screens/Screen07NavigationToCustomer';
import { Screen08ArrivalExceptions } from './screens/Screen08ArrivalExceptions';
import { Screen09WorkInProgressTimer } from './screens/Screen09WorkInProgressTimer';
import { Screen10WorkCompletedCash } from './screens/Screen10WorkCompletedCash';
import { Screen11CommissionWallet } from './screens/Screen11CommissionWallet';
import { Screen12CommissionLocked } from './screens/Screen12CommissionLocked';
import { Screen13PerformanceCooldown } from './screens/Screen13PerformanceCooldown';
import { Screen14NoShowCancellation } from './screens/Screen14NoShowCancellation';
import { Screen15SupportTicket } from './screens/Screen15SupportTicket';
import { Screen16ProfileSettings } from './screens/Screen16ProfileSettings';

interface PartnerAppContentProps {
  onSwitchToCustomerApp?: () => void;
}

const PartnerAppContent: React.FC<PartnerAppContentProps> = ({ onSwitchToCustomerApp }) => {
  const { currentScreen, goBack, navigate } = usePartner();

  // Determine if dark theme is needed for high contrast screens
  const isDarkScreen = [
    'partner-splash',
    'partner-home',
    'partner-incoming-order',
    'partner-navigation',
    'partner-work-timer',
    'partner-commission-locked',
  ].includes(currentScreen);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'partner-splash':
        return <Screen01Splash />;
      case 'partner-login-otp':
        return <Screen02LoginOTP />;
      case 'partner-permissions':
        return <Screen03StrictPermissions />;
      case 'partner-kyc':
        return <Screen04KYCRegistration />;
      case 'partner-home':
        return <Screen05HomeDashboard />;
      case 'partner-incoming-order':
        return <Screen06IncomingOrderAlert />;
      case 'partner-navigation':
        return <Screen07NavigationToCustomer />;
      case 'partner-arrival-exception':
        return <Screen08ArrivalExceptions />;
      case 'partner-work-timer':
        return <Screen09WorkInProgressTimer />;
      case 'partner-cash-collection':
        return <Screen10WorkCompletedCash />;
      case 'partner-commission-wallet':
        return <Screen11CommissionWallet />;
      case 'partner-commission-locked':
        return <Screen12CommissionLocked />;
      case 'partner-performance':
        return <Screen13PerformanceCooldown />;
      case 'partner-no-show':
        return <Screen14NoShowCancellation />;
      case 'partner-support':
        return <Screen15SupportTicket />;
      case 'partner-profile':
        return <Screen16ProfileSettings />;
      default:
        return <Screen05HomeDashboard />;
    }
  };

  return (
    <div className="w-full max-w-md h-[844px] max-h-[100dvh] bg-neutral-950 text-neutral-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border-4 border-neutral-800">
      {/* Android Native Status Bar */}
      <AndroidStatusBar isDarkTheme={isDarkScreen} />

      {/* Active Screen Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {renderScreen()}
      </div>

      {/* Android Native 3-Button Navigation Bar */}
      <AndroidNavBar
        isDarkTheme={isDarkScreen}
        onBackPress={goBack}
        onHomePress={() => navigate('partner-home')}
        onRecentsPress={() => navigate('partner-profile')}
      />

      {/* Floating 16-Screen Tester & Switcher */}
      <PartnerScreenTester onSwitchToCustomerApp={onSwitchToCustomerApp} />
    </div>
  );
};

export const PartnerApp: React.FC<PartnerAppContentProps> = (props) => {
  return (
    <PartnerProvider>
      <PartnerAppContent {...props} />
    </PartnerProvider>
  );
};
