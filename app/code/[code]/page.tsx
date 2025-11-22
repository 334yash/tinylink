'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchLinkByCode } from '../../../services/linkService';
import { Link as LinkType } from '../../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function StatsPage() {
  const params = useParams();
  const code = params.code as string;
  
  const [link, setLink] = useState<LinkType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!code) return;
      try {
        const data = await fetchLinkByCode(code);
        if (data) {
          setLink(data);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [code]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  if (notFound || !link) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-slate-500 text-lg mb-8">Link not found or deleted.</p>
        <Link href="/" className="text-primary-600 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  // Mock data for the chart
  const mockChartData = [
    { name: 'Mon', clicks: Math.floor(link.clicks * 0.1) },
    { name: 'Tue', clicks: Math.floor(link.clicks * 0.2) },
    { name: 'Wed', clicks: Math.floor(link.clicks * 0.15) },
    { name: 'Thu', clicks: Math.floor(link.clicks * 0.25) },
    { name: 'Fri', clicks: Math.floor(link.clicks * 0.1) },
    { name: 'Sat', clicks: Math.floor(link.clicks * 0.05) },
    { name: 'Sun', clicks: Math.floor(link.clicks * 0.15) },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-primary-600 transition-colors">&larr; Back to Dashboard</Link>
        <span>/</span>
        <span>Stats</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
             <h1 className="text-3xl font-bold text-slate-900 mb-2">/{link.code}</h1>
             <a 
               href={link.originalUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-primary-600 hover:text-primary-800 hover:underline break-all"
             >
               {link.originalUrl}
             </a>
          </div>
          <div className="flex flex-col items-end gap-2">
             <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total Clicks</span>
             <span className="text-4xl font-bold text-slate-900">{link.clicks}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
           <div>
             <p className="text-sm text-slate-500">Created</p>
             <p className="font-medium text-slate-900">{new Date(link.createdAt).toLocaleDateString()} at {new Date(link.createdAt).toLocaleTimeString()}</p>
           </div>
           <div>
             <p className="text-sm text-slate-500">Last Clicked</p>
             <p className="font-medium text-slate-900">
               {link.lastClickedAt 
                 ? `${new Date(link.lastClickedAt).toLocaleDateString()} at ${new Date(link.lastClickedAt).toLocaleTimeString()}`
                 : 'Never'}
             </p>
           </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Click Activity (Simulated)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f1f5f9'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                {mockChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#6366f1" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}