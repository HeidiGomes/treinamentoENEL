import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SupplyPointPage from './pages/SupplyPointPage';
import InteractionPage from './pages/InteractionPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar />
      
      <main className="ml-64 pt-16">
        <div className="max-w-[1440px] mx-auto p-6">
          <Routes>
            <Route path="/" element={<SupplyPointPage />} />
            <Route path="/interaction" element={<InteractionPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
