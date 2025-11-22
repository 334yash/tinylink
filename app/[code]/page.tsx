'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { incrementClick } from '../../services/linkService';

export default function RedirectPage() {
  const params = useParams();
  const code = params?.code as string | undefined;
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const performRedirect = async () => {
      if (!code) return;

      try {
        const url = await incrementClick(code);
        if (url) {
          // Use window.location for hard redirect to external site
          window.location.replace(url);
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      }
    };

    performRedirect();
  }, [code]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="mx-auto h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Link Not Found</h1>
          <p className="text-slate-500 mb-6">The short link you are trying to visit does not exist or has been deleted.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
       <div className="flex flex-col items-center gap-4">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
         <p className="text-slate-500 font-medium animate-pulse">Redirecting...</p>
       </div>
    </div>
  );
}