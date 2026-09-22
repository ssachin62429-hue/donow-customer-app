import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
  Zap,
  Github,
  FileCode2,
} from 'lucide-react';

interface InstallAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (app: 'customer' | 'partner' | 'admin') => void;
}

export const InstallAppsModal: React.FC<InstallAppsModalProps> = ({
  isOpen,
  onClose,
  onSelectApp,
}) => {
  const [activeTab, setActiveTab] = useState<'apk' | 'pwa'>('apk');
  const [copiedLink, setCopiedLink] = useState<'customer' | 'partner' | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  if (!isOpen) return null;

  const origin = window.location.origin;
  const customerUrl = `${origin}/?app=customer`;
  const partnerUrl = `${origin}/?app=partner`;

  const copyUrl = (type: 'customer' | 'partner', url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('To install on your phone:\n1. Open this link in Chrome or Safari on your phone\n2. Tap the Menu (⋮) or Share button\n3. Tap "Add to Home screen" or "Install App"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
                <Smartphone className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-black text-white">Download DoNow Apps</h2>
            </div>
            <p className="text-xs text-neutral-400 mt-1">
              GitHub APK Build or Instant Mobile Web Installation
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-950 rounded-2xl border border-neutral-800 my-3">
          <button
            onClick={() => setActiveTab('apk')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'apk'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Github className="w-4 h-4" />
            <span>GitHub APK Download</span>
          </button>
          <button
            onClick={() => setActiveTab('pwa')}
            className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'pwa'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>1-Tap Phone Install (PWA)</span>
          </button>
        </div>

        {activeTab === 'apk' ? (
          /* GitHub APK Download Step-by-Step Guide */
          <div className="space-y-3.5 my-2">
            <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-2.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <FileCode2 className="w-4 h-4 shrink-0" />
                <span>Automated GitHub Actions APK Builder Ready!</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hamne aapke repo me <code className="text-amber-300 font-mono">.github/workflows/build-apk.yml</code> configure kar diya hai.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-xs space-y-3">
              <p className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-black">1</span>
                <span>AI Studio se GitHub par Export karein:</span>
              </p>
              <p className="text-neutral-400 pl-7 text-[11px] leading-relaxed">
                Upar right side me <strong>Settings (⚙️)</strong> ya <strong>Export</strong> par click karein aur <strong>"Export to GitHub"</strong> choose karein.
              </p>

              <p className="font-bold text-white flex items-center gap-2 pt-1 border-t border-neutral-900">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-black">2</span>
                <span>GitHub Repository me Actions Tab kholein:</span>
              </p>
              <p className="text-neutral-400 pl-7 text-[11px] leading-relaxed">
                Apne GitHub repo me upar <strong>"Actions"</strong> tab par click karein. Wahan <strong className="text-amber-300">"Build Android APKs"</strong> workflow automatically start ho jayega.
              </p>

              <p className="font-bold text-white flex items-center gap-2 pt-1 border-t border-neutral-900">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-black">3</span>
                <span>1-Click APK Download:</span>
              </p>
              <p className="text-neutral-400 pl-7 text-[11px] leading-relaxed">
                Workflow complete hote hi (2-3 mins), <strong>Artifacts</strong> section me <strong className="text-emerald-400">DoNow-Android-APKs.zip</strong> par click karke direct mobile APK download kar lein!
              </p>
            </div>
          </div>
        ) : (
          /* PWA Direct Installation */
          <div className="space-y-3 my-2">
            {/* Real-time sync badge */}
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300">
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Firebase Live Sync Connected:</strong> Instant sync between customer & partner phones!
              </span>
            </div>

            {/* Customer App Card */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-emerald-600/50 rounded-2xl p-3 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">DoNow Customer App</h3>
                    <p className="text-[11px] text-neutral-400">Book tasks & track live partner</p>
                  </div>
                </div>
                <button
                  onClick={() => copyUrl('customer', customerUrl)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  {copiedLink === 'customer' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedLink === 'customer' ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Partner App Card */}
            <div className="bg-neutral-950 border border-neutral-800 hover:border-amber-600/50 rounded-2xl p-3 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-sm">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">DoNow Partner App</h3>
                    <p className="text-[11px] text-neutral-400">Accept orders & collect cash</p>
                  </div>
                </div>
                <button
                  onClick={() => copyUrl('partner', partnerUrl)}
                  className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  {copiedLink === 'partner' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedLink === 'partner' ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Chrome Install steps */}
            <div className="bg-neutral-950/60 rounded-2xl p-3 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
              <p className="font-bold text-neutral-300">Phone me Chrome se install karne ke steps:</p>
              <p>1. Link copy karke mobile Chrome browser me kholein.</p>
              <p>2. Chrome menu <strong>(⋮)</strong> &gt; <strong>"Install app"</strong> ya <strong>"Add to Home screen"</strong> dabayein.</p>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-neutral-800 flex gap-2">
          {activeTab === 'pwa' && (
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install PWA on this Device</span>
            </button>
          )}
          <button
            onClick={onClose}
            className={`py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors ${
              activeTab === 'pwa' ? 'px-4' : 'w-full'
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
