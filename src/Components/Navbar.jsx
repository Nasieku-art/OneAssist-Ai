import React from 'react';
import { Link } from 'react-router-dom';

const getInitials = (fullName) => {
  if (!fullName) return 'U';
  const nameParts = fullName.trim().split(/\s+/);
  if (nameParts.length === 0) return 'U';
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
};

function Navbar({ isAuthenticated, fullName, onProfileClick }) {

    console.log("Full Name received:",fullName)
  return (
    <div className="container mx-auto">
      <nav className="bg-teal-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
        
        <Link to="/" className="text-xl font-bold tracking-wide flex items-center gap-2">
          <span></span> OneAssist AI
        </Link>

        <div className="flex items-center gap-6 font-medium text-sm">
          <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-indigo-200 transition">Dashboard</Link>
          <Link to="/settings" className="hover:text-indigo-200 transition">Settings</Link>

        
          {isAuthenticated ? (
           
            <div 
              onClick={onProfileClick}
              className="flex items-center justify-center w-9 h-9 font-semibold text-teal-700 bg-white rounded-full shadow-sm cursor-pointer select-none hover:bg-teal-50 transition"
              title={fullName || 'User Profile'}
            >
              {getInitials(fullName)}
            </div>
          ) : (
            
            <div className="flex items-center gap-4">
              <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
              <Link to="/signup" className="bg-white text-black px-3 py-1 rounded-lg font-bold hover:bg-indigo-50 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;