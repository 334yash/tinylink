import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">404 Not Found</h2>
      <p className="text-slate-500 mb-8">Could not find the requested resource.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}