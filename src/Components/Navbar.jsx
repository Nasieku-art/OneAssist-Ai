import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="container mx-auto">
    <nav className="bg-teal-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to="/" className="text-xl font-bold tracking-wide flex items-center gap-2">
        <span></span> OneAssist AI
      </Link>
      <div className="flex gap-6 font-medium text-sm">
        <Link to="/" className="hover:text-indigo-200 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-indigo-200 transition">Dashboard</Link>
        <Link to="/settings" className="hover:text-indigo-200 transition">Settings</Link>
        <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
        <Link to="/signup" className="bg-white text-black px-3 py-1 rounded-lg font-bold hover:bg-indigo-50 transition">
          Sign Up
        </Link>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;