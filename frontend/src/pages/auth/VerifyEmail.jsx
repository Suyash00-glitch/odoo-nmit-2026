import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, Mail, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth.api.js';
import { AuthUI, CustomPillInput } from '@/components/ui/auth-ui';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [status, setStatus] = useState(searchParams.get('token') ? 'verifying' : 'waiting');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;
    authApi.verifyEmail(token)
      .then(() => setStatus('verified'))
      .catch((err) => {
        setStatus('invalid');
        toast.error(err?.response?.data?.error?.message || 'Unable to verify this link.');
      });
  }, [searchParams]);

  const resend = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setIsResending(true);
    try {
      await authApi.resendVerification(email.trim());
      toast.success('If the account needs verification, a new email is on its way.');
    } catch (err) {
      toast.error(err?.response?.data?.error?.message || 'Unable to resend the email.');
    } finally {
      setIsResending(false);
    }
  };

  if (status === 'verified') return <AuthUI title="Email verified" subtitle="Your Dayflow account is ready to use."><div className="rounded-3xl bg-white/80 border border-emerald-100 p-6 text-center space-y-4"><CheckCircle2 className="mx-auto text-emerald-500" size={44} /><p className="text-sm text-gray-600 font-medium">Sign in to continue to your workforce portal.</p><Link to="/signin" className="block w-full py-4 rounded-full bg-[#D4FF00] text-black font-black text-sm">Continue to sign in</Link></div></AuthUI>;

  return <AuthUI title={status === 'verifying' ? 'Verifying your email' : 'Check your inbox'} subtitle={status === 'invalid' ? 'This link has expired or was already used. Request a fresh one below.' : 'We sent a secure activation link to your work email.'}>
    {status === 'verifying' ? <div className="py-10 flex flex-col items-center gap-3 text-gray-500"><Loader2 className="animate-spin text-[#6B42EF]" size={34} /><span className="text-sm font-bold">Confirming your account…</span></div> : <>
      <div className="rounded-3xl bg-white/80 border border-white p-5 flex gap-3 items-start"><div className="shrink-0 rounded-2xl bg-[#D4FF00] p-2.5"><Mail size={20} /></div><p className="text-sm text-gray-600 leading-relaxed">Open the verification email and select the secure link. It expires after 24 hours.</p></div>
      <form onSubmit={resend} className="space-y-3"><CustomPillInput label="Work email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required /><button type="submit" disabled={isResending} className="w-full py-3.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-900 font-black text-sm flex justify-center items-center gap-2">{isResending ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />} Resend verification email</button></form>
      <p className="text-center text-xs text-gray-500">Already verified? <Link className="font-black text-neutral-900 hover:underline" to="/signin">Sign in</Link></p>
    </>}</AuthUI>;
};

export default VerifyEmail;
