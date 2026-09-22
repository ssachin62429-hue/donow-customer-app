import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { WebSidebar } from './components/WebSidebar';
import { WebHeader } from './components/WebHeader';
import { WebScreen06Dashboard } from './screens/WebScreen06Dashboard';
import { WebScreen07PartnersKYC } from './screens/WebScreen07PartnersKYC';
import { WebScreen08ServicesPricing } from './screens/WebScreen08ServicesPricing';
import { WebScreen09GlobalSettings } from './screens/WebScreen09GlobalSettings';
import { WebScreen10FinancialLedger } from './screens/WebScreen10FinancialLedger';
import { WebScreen11AuditLogs } from './screens/WebScreen11AuditLogs';
import { AdminWebScreen } from '../types';

export const AdminWebPanel: React.FC = () => {
  const { webScreen, setWebScreen, isOrdersGloballyPaused } = useAdmin();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderActiveWebScreen = () => {
    switch (webScreen) {
      case 'web-dashboard':
        return <WebScreen06Dashboard />;
      case 'web-partners':
        return <WebScreen07PartnersKYC />;
      case 'web-services':
        return <WebScreen08ServicesPricing />;
      case 'web-settings':
        return <WebScreen09GlobalSettings />;
      case 'web-ledger':
        return <WebScreen10FinancialLedger />;
      case 'web-audit':
        return <WebScreen11AuditLogs />;
      default:
        return <WebScreen06Dashboard />;
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Top Banner if Global Orders Paused */}
      {isOrdersGloballyPaused && (
        <div className="bg-red-600 text-white px-6 py-2 text-center text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 z-50">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>EMERGENCY DISPATCH HALTED — ALL NEW INCOMING CUSTOMER ORDERS PAUSED GLOBALLY</span>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Left Sidebar */}
        <WebSidebar
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Web Header */}
          <WebHeader />

          {/* Scrollable View Area */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-neutral-950/90">
            {renderActiveWebScreen()}
          </main>
        </div>
      </div>
    </div>
  );
};
