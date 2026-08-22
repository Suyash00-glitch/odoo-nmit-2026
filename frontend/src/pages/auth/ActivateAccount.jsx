import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth.api.js';
import { AuthUI, CustomPillInput } from '@/components/ui/auth-ui';

const ActivateAccount = () => {
  const [params] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const activate = async (event) => {
    event.preventDefault();
    const token = params.get('token');
    if (!token) return toast.error('This activation link is incomplete. Ask HR for a new invitation.');
    if (password.length < 6) return toast.error('Use at least 6 characters for your password.');
    if (password !== confirmPassword) return toast.error('Passwords do not match.');
    setSaving(true);
    try { await authApi.activate(token, password); setDone(true); }
    catch (err) { toast.error(err?.response?.data?.error?.message || 'Unable to activate your account.'); }
    finally { setSaving(false); }
  };
  if (done) return <AuthUI title="Account activated" subtitle="Your work email is verified and your Dayflow profile is ready."><div className="rounded-3xl bg-white/80 border border-emerald-100 p-6 text-center space-y-4"><CheckCircle2 className="mx-auto text-emerald-500" size={44} /><Link to="/signin" className="block py-4 rounded-full bg-[#D4FF00] text-sm font-black text-black">Sign in to Dayflow</Link></div></AuthUI>;
  return <AuthUI title="Activate your account" subtitle="Create a secure password to finish your HR onboarding."><form onSubmit={activate} className="space-y-3"><CustomPillInput label="Create password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required /><CustomPillInput label="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" required /><button disabled={saving} className="w-full py-4 mt-3 rounded-full bg-[#D4FF00] text-black font-black text-sm flex justify-center gap-2">{saving && <Loader2 size={16} className="animate-spin" />}Activate account</button></form></AuthUI>;
};
export default ActivateAccount;
