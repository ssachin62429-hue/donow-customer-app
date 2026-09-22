import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import {
  Wallet,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  X,
  QrCode,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';

export const Screen11CommissionWallet: React.FC = () => {
  const {
    navigate,
    commission,
    incomingOrder,
    payCommissionUPI,
    toggleCommissionLockDemo,
    t,
  } = usePartner();

  const [showUpiModal, setShowUpiModal] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim' | 'qr'>('gpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const isLocked = commission.pendingAmount >= 100 || commission.completedOrdersCount >= 3;
  const isApproaching = !isLocked && (commission.pendingAmount >= 70 || commission.completedOrdersCount >= 2);
  const isSafe = commission.pendingAmount > 0 && !isLocked && !isApproaching;
  const isDueZero = commission.pendingAmount === 0;

  const handleStartPayment = () => {
    if (isDueZero) return;
    setIsSuccess(false);
    setIsProcessing(false);
    setShowUpiModal(true);
  };

  const handleConfirmUpiPay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const tid = `UPI-DN-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setTransactionId(tid);
      payCommissionUPI();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleResetDemoDue = (amount: number = 30, count: number = 1) => {
    // Allows setting sample pending due (e.g. 1 order = ₹30)
    toggleCommissionLockDemo();
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto relative">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <button
            onClick={() => navigate('partner-home')}
            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 text-neutral-700 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Platform Wallet
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-black text-neutral-950">
            {t('commissionWalletTitle')}
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            Cash order commission settlement ledger
          </p>
        </div>

        {/* Current Pending Amount Card */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 shadow-xl border-2 border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-extrabold text-neutral-400 tracking-wider flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-400" />
              {t('pendingCommissionAmount')}
            </span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-mono font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
              Limit: ₹100 / 3 Orders
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-mono font-black text-5xl text-amber-400">
              ₹{commission.pendingAmount}
            </span>
            <span className="text-xs text-neutral-400">
              across <strong className="text-white font-mono">{commission.completedOrdersCount} orders</strong>
            </span>
          </div>

          {/* Limit Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-neutral-400">Commission Limit Used</span>
              <span className={isLocked ? 'text-red-400' : isApproaching ? 'text-amber-400' : 'text-emerald-400'}>
                ₹{commission.pendingAmount} / ₹100 ({commission.completedOrdersCount}/3 Orders)
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  isLocked ? 'bg-red-500' : isApproaching ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${Math.min(100, (commission.pendingAmount / 100) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Status Card: Do NOT demand pay commission until 3 orders or ₹100 */}
        <div
          className={`p-4 rounded-2xl border-2 space-y-2 text-xs ${
            isDueZero
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : isLocked
              ? 'bg-red-50 border-red-300 text-red-950'
              : isApproaching
              ? 'bg-amber-50 border-amber-300 text-amber-950'
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}
        >
          <div
            className={`flex items-center gap-2 font-black ${
              isDueZero
                ? 'text-emerald-700'
                : isLocked
                ? 'text-red-700'
                : isApproaching
                ? 'text-amber-700'
                : 'text-emerald-700'
            }`}
          >
            {isDueZero ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : isLocked ? (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            ) : isApproaching ? (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <span className="text-sm">
              {isDueZero
                ? 'All Dues Cleared'
                : isLocked
                ? 'Commission Threshold Reached'
                : isApproaching
                ? 'Approaching 3-Order Threshold'
                : 'Limit Safe — No Payment Required'}
            </span>
          </div>

          <p className="leading-relaxed text-neutral-700">
            {isDueZero
              ? 'Your wallet has zero pending dues. All previous cash order commissions have been settled.'
              : isLocked
              ? 'Important Rule: You have reached the threshold of 3 completed orders or ₹100. Settle commission via UPI to immediately resume accepting orders.'
              : isApproaching
              ? 'Important Rule: You have 1 order remaining before reaching the 3-order threshold. You can continue taking orders.'
              : 'Important Rule: Commission payment is NOT required until you complete 3 orders OR reach ₹100 pending commission. You can freely keep taking new orders!'}
          </p>

          <p
            className={`font-bold ${
              isDueZero
                ? 'text-emerald-700'
                : isLocked
                ? 'text-red-700'
                : isApproaching
                ? 'text-amber-800'
                : 'text-emerald-700'
            }`}
          >
            {isDueZero
              ? 'Current Status: All dues clear (₹0 / 0 Orders) — Account Active ✓'
              : isLocked
              ? `Current Status: Limit Reached (₹${commission.pendingAmount} / ${commission.completedOrdersCount} Orders) — Account Paused`
              : isApproaching
              ? `Current Status: Approaching Limit (₹${commission.pendingAmount} / ${commission.completedOrdersCount} Orders) — 1 Order Left`
              : `Current Status: Limit Safe (₹${commission.pendingAmount} / ${commission.completedOrdersCount} of 3 Orders) — Orders Active ✓`}
          </p>
        </div>

        {/* Recent Orders Commission Breakdown */}
        <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 space-y-2 text-xs">
          <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider block">
            Unsettled Cash Orders
          </span>
          {!isDueZero ? (
            <>
              <div className="flex justify-between items-center py-1.5 border-b border-neutral-200">
                <div>
                  <p className="font-bold text-neutral-900">Recent Cash Order ({incomingOrder.id})</p>
                  <p className="text-[11px] text-neutral-500">Collected Cash: ₹490 (Platform Fee: ₹30)</p>
                </div>
                <span className="font-mono font-bold text-neutral-800">₹{commission.pendingAmount}.00</span>
              </div>
            </>
          ) : (
            <div className="py-3 text-center text-neutral-500">
              <p className="font-medium">No unsettled cash orders.</p>
              <p className="text-[11px] text-neutral-400">All previous collections have been settled.</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Do NOT demand pay commission until 3 orders or 100 rs */}
      <div className="pt-4 pb-2 space-y-2.5">
        {isLocked ? (
          /* THRESHOLD REACHED (3 orders or ₹100): NOW REQUIRED TO PAY */
          <button
            onClick={handleStartPayment}
            className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-2xl text-base shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>PAY COMMISSION NOW VIA UPI (₹{commission.pendingAmount})</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : isDueZero ? (
          /* ZERO DUE STATE */
          <div className="space-y-2">
            <button
              onClick={() => navigate('partner-home')}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>RETURN TO HOME DASHBOARD</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleResetDemoDue(30, 1)}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold rounded-xl border border-neutral-300 flex items-center justify-center gap-1.5 transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Simulate 1 Order (₹30 Due - Limit Safe State)</span>
            </button>
          </div>
        ) : (
          /* SAFE / APPROACHING STATE (< 3 orders and < ₹100):
             DO NOT FORCE COMMISSION PAYMENT! Primary action is CONTINUE TAKING ORDERS! */
          <div className="space-y-2">
            <button
              onClick={() => navigate('partner-home')}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>CONTINUE TAKING ORDERS →</span>
            </button>

            {/* Optional Early Settlement Link (voluntary, not forced) */}
            <button
              onClick={handleStartPayment}
              className="w-full py-2.5 text-neutral-600 hover:text-neutral-900 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Want to settle early? Pay ₹{commission.pendingAmount} via UPI (Optional)</span>
            </button>
          </div>
        )}

        {/* Simulator Button: Toggle to Screen 12 Commission Locked */}
        <button
          onClick={() => {
            toggleCommissionLockDemo();
            navigate('partner-commission-locked');
          }}
          className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-medium rounded-xl border border-neutral-200 transition-colors text-center"
        >
          Demo: Simulate Limit Reached (Locked State ₹115) →
        </button>
      </div>

      {/* Interactive UPI Payment Bottom Sheet Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-2xl border-t border-neutral-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-black text-base text-neutral-900">
                  {isSuccess ? 'Payment Receipt' : 'DoNow UPI Gateway'}
                </h3>
              </div>
              <button
                onClick={() => setShowUpiModal(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isSuccess ? (
              <>
                {/* Amount to pay */}
                <div className="bg-neutral-950 text-white rounded-2xl p-4 text-center space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                    Settlement Amount
                  </span>
                  <div className="text-3xl font-mono font-black text-amber-400">
                    ₹{commission.pendingAmount}.00
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Payee: DoNow Technologies Pvt Ltd (ICICI Bank Escrow)
                  </p>
                </div>

                {/* Choose UPI Method */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-700 block">
                    Select UPI Payment App
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('gpay')}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        selectedUpiApp === 'gpay'
                          ? 'border-emerald-600 bg-emerald-50/60 font-bold text-neutral-900 shadow-xs'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                        G
                      </span>
                      <span>Google Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('phonepe')}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        selectedUpiApp === 'phonepe'
                          ? 'border-emerald-600 bg-emerald-50/60 font-bold text-neutral-900 shadow-xs'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                        Pe
                      </span>
                      <span>PhonePe</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('paytm')}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        selectedUpiApp === 'paytm'
                          ? 'border-emerald-600 bg-emerald-50/60 font-bold text-neutral-900 shadow-xs'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 font-black flex items-center justify-center text-xs">
                        Pay
                      </span>
                      <span>Paytm UPI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedUpiApp('qr')}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all ${
                        selectedUpiApp === 'qr'
                          ? 'border-emerald-600 bg-emerald-50/60 font-bold text-neutral-900 shadow-xs'
                          : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-neutral-700" />
                      <span>BHIM / QR</span>
                    </button>
                  </div>
                </div>

                {/* Secure Trust Badge */}
                <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 flex items-center gap-2 text-[11px] text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant settlement with zero UPI surcharge fee.</span>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleConfirmUpiPay}
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-black rounded-2xl text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Processing Bank UPI...</span>
                    </div>
                  ) : (
                    <span>Pay ₹{commission.pendingAmount} via UPI</span>
                  )}
                </button>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto flex items-center justify-center border-2 border-emerald-400">
                  <CheckCircle2 className="w-9 h-9 text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-xl font-black text-neutral-950">
                    Commission Settled Successfully!
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    Your platform dues have been cleared instantly.
                  </p>
                </div>

                <div className="bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Amount Paid</span>
                    <span className="font-mono font-bold text-neutral-900">₹85.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Transaction Ref</span>
                    <span className="font-mono font-bold text-neutral-900">{transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Status</span>
                    <span className="font-bold text-emerald-600">Settled & Cleared ✓</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setShowUpiModal(false)}
                    className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-black rounded-xl text-xs uppercase tracking-wider"
                  >
                    View Updated Wallet (₹0 Due)
                  </button>

                  <button
                    onClick={() => {
                      setShowUpiModal(false);
                      navigate('partner-home');
                    }}
                    className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold rounded-xl text-xs"
                  >
                    Go to Home Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

