import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { AndroidNavBar } from './components/AndroidNavBar';
import { CallingModal } from './components/CallingModal';
import { ChatModal } from './components/ChatModal';
import { ScreenSwitcherModal } from './components/ScreenSwitcherModal';
import { PartnerApp } from './partner/PartnerApp';
import { DoNowAdminEcosystem } from './admin/DoNowAdminEcosystem';

// Screens 1 - 24 (Customer App)
import { Screen01Splash } from './screens/Screen01Splash';
import { Screen02Permissions } from './screens/Screen02Permissions';
import { Screen03MobileLogin } from './screens/Screen03MobileLogin';
import { Screen04OTP } from './screens/Screen04OTP';
import { Screen05CreateProfile } from './screens/Screen05CreateProfile';
import { Screen06Home } from './screens/Screen06Home';
import { Screen07WriteTask } from './screens/Screen07WriteTask';
import { Screen08ServiceSelection } from './screens/Screen08ServiceSelection';
import { Screen09TaskDetails } from './screens/Screen09TaskDetails';
import { Screen10Location } from './screens/Screen10Location';
import { Screen11BookingSummary } from './screens/Screen11BookingSummary';
import { Screen12FindingPartner } from './screens/Screen12FindingPartner';
import { Screen13Tip } from './screens/Screen13Tip';
import { Screen14PartnerAccepted } from './screens/Screen14PartnerAccepted';
import { Screen15PartnerArrived } from './screens/Screen15PartnerArrived';
import { Screen16WorkInProgress } from './screens/Screen16WorkInProgress';
import { Screen17WorkCompleted } from './screens/Screen17WorkCompleted';
import { Screen18RatePartner } from './screens/Screen18RatePartner';
import { Screen19Orders } from './screens/Screen19Orders';
import { Screen20OrderDetails } from './screens/Screen20OrderDetails';
import { Screen21Notifications } from './screens/Screen21Notifications';
import { Screen22Profile } from './screens/Screen22Profile';
import { Screen23SOS } from './screens/Screen23SOS';
import { Screen24Support } from './screens/Screen24Support';

interface CustomerAppContentProps {
  onSwitchToPartnerApp: () => void;
}

const CustomerAppContent: React.FC<CustomerAppContentProps> = ({ onSwitchToPartnerApp }) => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <Screen01Splash />;
      case 'permissions':
        return <Screen02Permissions />;
      case 'login':
        return <Screen03MobileLogin />;
      case 'otp':
        return <Screen04OTP />;
      case 'create-profile':
        return <Screen05CreateProfile />;
      case 'home':
        return <Screen06Home />;
      case 'write-task':
        return <Screen07WriteTask />;
      case 'service-select':
        return <Screen08ServiceSelection />;
      case 'task-details':
        return <Screen09TaskDetails />;
      case 'location-select':
        return <Screen10Location />;
      case 'booking-summary':
        return <Screen11BookingSummary />;
      case 'finding-partner':
        return <Screen12FindingPartner />;
      case 'tip-selection':
        return <Screen13Tip />;
      case 'partner-accepted':
        return <Screen14PartnerAccepted />;
      case 'partner-arrived':
        return <Screen15PartnerArrived />;
      case 'work-in-progress':
        return <Screen16WorkInProgress />;
      case 'work-completed':
        return <Screen17WorkCompleted />;
      case 'rate-partner':
        return <Screen18RatePartner />;
      case 'orders':
        return <Screen19Orders />;
      case 'order-details':
        return <Screen20OrderDetails />;
      case 'notifications':
        return <Screen21Notifications />;
      case 'profile':
        return <Screen22Profile />;
      case 'sos':
        return <Screen23SOS />;
      case 'support':
      case 'terms':
      case 'privacy':
        return <Screen24Support />;
      default:
        return <Screen06Home />;
    }
  };

  const isDarkScreen = currentScreen === 'splash' || currentScreen === 'finding-partner' || currentScreen === 'sos';

  return (
    <div className="w-full sm:max-w-[420px] h-[100dvh] sm:h-[880px] sm:max-h-[92vh] bg-neutral-50 rounded-none sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-neutral-800">
      {/* Top Speaker/Sensor Pill for Android Device Simulation */}
      <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-neutral-900 rounded-full z-50 pointer-events-none" />

      {/* Android Status Bar */}
      <AndroidStatusBar isDarkTheme={isDarkScreen} />

      {/* Main Screen Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col relative bg-neutral-50">
        {renderScreen()}
      </main>

      {/* Android Navigation Bar */}
      <AndroidNavBar isDarkTheme={isDarkScreen} />

      {/* Masked In-App Calling Modal */}
      <CallingModal />

      {/* In-App Messaging Modal */}
      <ChatModal />

      {/* Screen Switcher Floating Button & Modal */}
      <ScreenSwitcherModal onSwitchToPartnerApp={onSwitchToPartnerApp} />
    </div>
  );
};

export default function App() {
  const [appMode, setAppMode] = useState<'admin' | 'partner' | 'customer'>('admin');

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-start sm:justify-center p-0 select-none font-sans">
      {/* Top Universal Ecosystem Bar */}
      <div className="w-full bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex items-center justify-between text-xs z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-black text-xs">
            ⚡
          </div>
          <span className="font-extrabold text-white tracking-tight">DoNow Prototype Suite</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-xl border border-neutral-800">
          <button
            onClick={() => setAppMode('admin')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              appMode === 'admin'
                ? 'bg-amber-500 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>⚡ DoNow Admin (11 Screens)</span>
          </button>

          <button
            onClick={() => setAppMode('partner')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              appMode === 'partner'
                ? 'bg-amber-500 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>🤝 Partner App (16 Screens)</span>
          </button>

          <button
            onClick={() => setAppMode('customer')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              appMode === 'customer'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span>👤 Customer App (24 Screens)</span>
          </button>
        </div>
      </div>

      {/* Active App Mode Rendering */}
      {appMode === 'admin' ? (
        <DoNowAdminEcosystem onBackToApps={() => setAppMode('partner')} />
      ) : appMode === 'partner' ? (
        <div className="py-6 flex flex-col items-center justify-center">
          <PartnerApp onSwitchToCustomerApp={() => setAppMode('customer')} />
        </div>
      ) : (
        <div className="py-6 flex flex-col items-center justify-center">
          <AppProvider>
            <CustomerAppContent onSwitchToPartnerApp={() => setAppMode('partner')} />
          </AppProvider>
        </div>
      )}
    </div>
  );
}
