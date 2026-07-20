import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <aside className="w-64 min-h-screen bg-teal-600 text-white p-6 flex justify-between shadow-xl fixed left-0 top-0 z-50">
      <aside className="bg-teal-600 text-white px-6 py-4 shadow-md flex flex-col items-center rounded-b-xl">
        <Link to="/" className="text-xl font-bold tracking-wide flex items-center gap-2">
           OneAssist AI
        </Link>
        <div className="flex flex-col gap-6 font-medium text-sm items-center">
          <Link to="/" className="hover:text-teal-200 transition">Home</Link>
          <Link to="/dashboard" className="hover:text-teal-200 transition">Dashboard</Link>
          <Link to="/settings" className="hover:text-teal-200 transition">Settings</Link>
          <Link to="/login" className="hover:text-teal-200 transition">Login</Link>
          <Link to="/signup" className="bg-white text-teal-900 px-3 py-1 rounded-lg font-bold hover:bg-teal-50 transition shadow-sm">
            Sign Up
          </Link>
        </div>
      </aside>
    </aside>
  );
}

export default Navbar;