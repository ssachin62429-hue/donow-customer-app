import React, { useState } from 'react';
import { usePartner } from '../context/PartnerContext';
import { Camera, FileText, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const Screen04KYCRegistration: React.FC = () => {
  const { navigate, t, profile, submitKyc, approveKycDemo } = usePartner();
  const [fullName, setFullName] = useState(profile.name || 'Rahul Sharma');
  const [selfieUploaded, setSelfieUploaded] = useState(true);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(true);
  const [panUploaded, setPanUploaded] = useState(true);
  const [isSubmittedState, setIsSubmittedState] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitKyc(fullName);
    setIsSubmittedState(true);
  };

  return (
    <div className="flex-1 bg-white text-neutral-900 flex flex-col justify-between p-5 select-none overflow-y-auto">
      {!isSubmittedState ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Header */}
          <div className="space-y-1 pt-1">
            <span className="text-[11px] font-black tracking-wider uppercase text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              KYC & Background Verification
            </span>
            <h2 className="text-2xl font-black text-neutral-950">
              {t('kycTitle')}
            </h2>
            <p className="text-xs text-neutral-600">
              {t('kycSubtitle')}
            </p>
          </div>

          {/* CRITICAL BUSINESS RULE BANNER: No Skill Selection */}
          <div className="bg-neutral-950 text-white rounded-2xl p-4 border border-neutral-800 shadow-md space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{t('noSkillNoticeTitle')}</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {t('noSkillNoticeDesc')}
            </p>
          </div>

          {/* Full Legal Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 uppercase">
              {t('fullNameLabel')}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
              className="w-full px-3.5 py-3 rounded-xl border-2 border-neutral-800 font-bold text-sm text-neutral-950 bg-neutral-50 focus:bg-white focus:border-amber-500 focus:outline-hidden"
            />
          </div>

          {/* Selfie Upload Placeholder */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 uppercase">
              {t('selfieLabel')}
            </label>
            <div
              onClick={() => setSelfieUploaded(!selfieUploaded)}
              className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-colors ${
                selfieUploaded
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${selfieUploaded ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">
                    {selfieUploaded ? 'Selfie Attached (front_cam.jpg)' : t('tapToUpload')}
                  </p>
                  <p className="text-[11px] text-neutral-500">{t('selfieHint')}</p>
                </div>
              </div>
              {selfieUploaded && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>
          </div>

          {/* Aadhaar Card Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 uppercase">
              {t('aadhaarLabel')}
            </label>
            <div
              onClick={() => setAadhaarUploaded(!aadhaarUploaded)}
              className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-colors ${
                aadhaarUploaded
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${aadhaarUploaded ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">
                    {aadhaarUploaded ? 'Aadhaar_Card_Verified.pdf' : t('tapToUpload')}
                  </p>
                  <p className="text-[11px] text-neutral-500">Government UIDAI Card</p>
                </div>
              </div>
              {aadhaarUploaded && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>
          </div>

          {/* PAN Card Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-700 uppercase">
              {t('panLabel')}
            </label>
            <div
              onClick={() => setPanUploaded(!panUploaded)}
              className={`p-3.5 rounded-xl border-2 border-dashed flex items-center justify-between cursor-pointer transition-colors ${
                panUploaded
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${panUploaded ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">
                    {panUploaded ? 'PAN_Card_Scanned.jpg' : t('tapToUpload')}
                  </p>
                  <p className="text-[11px] text-neutral-500">Income Tax Department PAN</p>
                </div>
              </div>
              {panUploaded && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 text-white font-bold rounded-2xl text-base shadow-lg transition-all active:scale-[0.98]"
            >
              {t('submitKycBtn')}
            </button>
          </div>
        </form>
      ) : (
        /* Next State: Under Verification */
        <div className="my-auto space-y-6 text-center py-8">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl mx-auto flex items-center justify-center border-2 border-amber-300">
            <ShieldAlert className="w-10 h-10 text-amber-700" />
          </div>

          <div className="space-y-2 max-w-sm mx-auto">
            <h3 className="text-2xl font-black text-neutral-950">
              {t('underReviewTitle')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('underReviewDesc')}
            </p>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-left space-y-2">
            <span className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">
              Verification Pipeline Status
            </span>
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Identity & Criminal Record Check</span>
              <span className="text-amber-700">In Progress</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Admin Service Assignment</span>
              <span className="text-neutral-500">Pending Review</span>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={approveKycDemo}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>{t('proceedDemoBtn')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
