import React from 'react';
import { useMsal } from "@azure/msal-react";

const Header: React.FC = () => {
  const { instance, accounts } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup();
  };

  const handleProfile = () => {
    // Add profile navigation logic
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={() => document.body.classList.toggle('sidebar-open')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="ml-2 text-xl font-semibold lg:ml-0">Nova HCM</span>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-gray-700 hover:text-gray-900"
                onClick={handleProfile}
              >
                <span className="mr-2">{accounts[0]?.username}</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${accounts[0]?.username || 'User'}`}
                  alt="User"
                />
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="ml-4 text-sm text-gray-700 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;