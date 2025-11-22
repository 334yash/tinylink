import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Stats } from './pages/Stats';
import { RedirectHandler } from './pages/RedirectHandler';
import { HealthCheck } from './pages/HealthCheck';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Dashboard - List, Add, Delete */}
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />

        {/* Stats Page */}
        <Route path="/code/:code" element={
          <Layout>
            <Stats />
          </Layout>
        } />

        {/* Health Check - Renders raw JSON-like UI */}
        <Route path="/healthz" element={
          <Layout>
            <HealthCheck />
          </Layout>
        } />

        {/* Redirect Logic - Handles /:code */}
        <Route path="/:code" element={<RedirectHandler />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
