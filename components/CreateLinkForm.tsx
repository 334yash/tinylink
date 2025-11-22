'use client';

import React, { useState } from 'react';
import { CreateLinkRequest } from '../types';
import { isValidCodeFormat, isValidUrl } from '../services/linkService';

interface CreateLinkFormProps {
  onSubmit: (data: CreateLinkRequest) => Promise<void>;
  loading: boolean;
}

export const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    if (code && !isValidCodeFormat(code)) {
      setError('Custom code must be 6-8 alphanumeric characters.');
      return;
    }

    try {
      await onSubmit({ url, code: code || undefined });
      // Reset form on success
      setUrl('');
      setCode('');
    } catch (err: any) {
      setError(err.message || 'Failed to create link.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Create New Link</h2>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-grow w-full space-y-1">
          <label htmlFor="url" className="sr-only">Destination URL</label>
          <input
            type="url"
            id="url"
            placeholder="Paste a long URL https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            required
          />
        </div>
        
        <div className="w-full md:w-48 space-y-1 shrink-0">
          <label htmlFor="code" className="sr-only">Custom Code (Optional)</label>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400 text-sm">/</span>
             </div>
            <input
              type="text"
              id="code"
              placeholder="alias"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pl-6 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              title="6-8 alphanumeric characters"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !url}
          className={`px-6 py-3 rounded-lg font-medium text-white shadow-sm transition-all shrink-0 w-full md:w-auto
            ${loading || !url 
              ? 'bg-primary-300 cursor-not-allowed' 
              : 'bg-primary-600 hover:bg-primary-700 hover:shadow-md active:transform active:scale-95'
            }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Shortening...</span>
            </div>
          ) : 'Shorten'}
        </button>
      </form>
      
      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}
    </div>
  );
};