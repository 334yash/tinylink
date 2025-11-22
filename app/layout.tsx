import React from 'react';
import { Layout } from '../components/Layout';
import './globals.css';

export const metadata = {
  title: 'TinyLink | Shorten Your World',
  description: 'A robust URL shortener built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-primary-100 selection:text-primary-700">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}