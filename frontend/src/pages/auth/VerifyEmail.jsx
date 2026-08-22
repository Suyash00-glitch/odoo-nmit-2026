import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { authApi } from '../../api/auth.api.js';
import { CheckCircle, XCircle, Loader2, Zap } from 'lucide-react';

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = params.get('token');
    const email = params.get('email');
    if (!token || !email) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    authApi.verifyEmail(token, email)
      .then(() => { setStatus('success'); setMessage('Your email has been verified!'); })
      .catch((err) => {
        setStatus('error');
        setMessage(err?.response?.data?.error?.message ?? 'Verification failed.');
      });
  }, [params]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-8">
      <div className="card max-w-md w-full text-center">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="w-8 h-8 bg-primary-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">Dayflow HRMS</span>
        </div>

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="text-primary-400 animate-spin" size={40} />
            <p className="text-white/60">Verifying your email...</p>
          </div>
        )}
        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="text-emerald-400" size={48} />
            <div>
              <h2 className="text-xl font-bold text-white">Email Verified!</h2>
              <p className="text-white/50 mt-1">{message}</p>
            </div>
            <Link to="/signin" className="btn-primary">Sign in to Dayflow</Link>
          </div>
        )}
        {status === 'error' && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="text-red-400" size={48} />
            <div>
              <h2 className="text-xl font-bold text-white">Verification Failed</h2>
              <p className="text-white/50 mt-1">{message}</p>
            </div>
            <Link to="/signup" className="btn-secondary">Back to Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
