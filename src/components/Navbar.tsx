import React, { useState } from 'react';
import { Bell, Search, Settings, User, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatSimulator from './ChatSimulator';

export default function Navbar() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-blue-600">ENEL Light</span>
              <div className="ml-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="pl-10 pr-4 py-2 w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/interaction"
                className="p-2 rounded-full hover:bg-gray-100"
                title="Centro de Interação"
              >
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </Link>
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowChat(true)}
              >
                <MessageSquare className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showChat && <ChatSimulator onClose={() => setShowChat(false)} />}
    </>
  );
}