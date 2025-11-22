import React from 'react';
import { HealthResponse } from '../types';

export const HealthCheck: React.FC = () => {
  const response: HealthResponse = {
    ok: true,
    version: "1.0",
    uptime: performance.now(),
    timestamp: new Date().toISOString()
  };

  return (
    <pre className="bg-slate-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-auto shadow-xl max-w-2xl mx-auto mt-10">
      {JSON.stringify(response, null, 2)}
    </pre>
  );
};
