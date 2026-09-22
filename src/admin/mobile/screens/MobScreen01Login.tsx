import React, { useState } from 'react';
import { Shield, Lock, Mail, KeyRound, UserCheck, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminRole } from '../../types';

export const MobScreen01Login: React.FC = () => {
  const { loginAdmin } = useAdmin();
  const [email, setEmail] = useState('ops.lead@donow.in');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState(['4', '8', '2', '9', '1', '0']);
  const [role, setRole] = useState<AdminRole>('Operations');

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(email, role);
  };

  return (
    <div className="flex-1 bg-neutral-950 text-white flex flex-col justify-between p-5 overflow-y-auto">
      {/* Top Brand Header */}
      <div>
        <div className="flex items-center justify-between pt-2 pb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center font-black text-neutral-950 text-base shadow-lg shadow-amber-500/20">
              ⚡
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-lg text-white">DoNow</span>
              <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-red-600/90 text-white uppercase">
                Admin Mobile
              </span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">
            v2.4 Live
          </span>
        </div>

        <div className="space-y-1 mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">Terminal Login</h1>
          <p className="text-xs text-neutral-400">
            Authorized access only for Operations, Safety, Finance & Super Admin.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Admin Email/ID Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-300 tracking-wide uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" /> Admin ID / Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@donow.in"
                required
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-300 tracking-wide uppercase flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-hidden transition-colors"
            />
          </div>

          {/* Role Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-300 tracking-wide uppercase flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" /> Role Selection
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as AdminRole)}
              className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-sm text-white outline-hidden cursor-pointer"
            >
              <option value="Super Admin">Super Admin (Full Master Control)</option>
              <option value="Operations">Operations (Dispatch & Field Teams)</option>
              <option value="Safety">Safety (SOS & Incident Response)</option>
              <option value="Finance">Finance (Commissions & Penalties)</option>
            </select>
          </div>

          {/* Mock 6-digit OTP */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-neutral-300 tracking-wide uppercase flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" /> 6-Digit MFA Token (OTP)
              </label>
              <span className="text-[10px] text-emerald-400 font-semibold">Auto-Synced</span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-full h-11 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-lg text-center font-mono font-bold text-base text-amber-400 outline-hidden"
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-neutral-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>LOGIN TO ADMIN CONSOLE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Security Disclaimer */}
      <div className="pt-4 border-t border-neutral-900 text-center">
        <div className="flex items-center justify-center gap-1.5 text-neutral-500 text-[11px]">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>AES-256 Encrypted Session • Lucknow Operations Zone</span>
        </div>
      </div>
    </div>
  );
};
