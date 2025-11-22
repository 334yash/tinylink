'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { fetchLinks, createLink, deleteLink } from '../services/linkService';
import { Link as LinkType, CreateLinkRequest } from '../types';
import { LinkList } from '../components/LinkList';
import { CreateLinkForm } from '../components/CreateLinkForm';

export default function Dashboard() {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchLinks();
        setLinks(data);
      } catch (e) {
        console.error("Failed to fetch links", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refreshTrigger]);

  const handleCreate = useCallback(async (data: CreateLinkRequest) => {
    await createLink(data);
    setRefreshTrigger(prev => prev + 1); // Reload list
  }, []);

  const handleDelete = useCallback(async (code: string) => {
    if (!window.confirm(`Are you sure you want to delete /${code}?`)) return;
    
    try {
      await deleteLink(code);
      setLinks(prev => prev.filter(l => l.code !== code));
    } catch (e) {
      alert("Failed to delete link.");
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage your shortened links and track their performance.</p>
      </div>

      <CreateLinkForm onSubmit={handleCreate} loading={loading} />
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Links</h2>
        <LinkList links={links} onDelete={handleDelete} loading={loading} />
      </div>
    </div>
  );
}