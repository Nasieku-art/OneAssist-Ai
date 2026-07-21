import React from 'react';

export default function Footer() {
  return (
    <div className="container mx-auto">
      <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm border-t border-slate-700">
        <p>
          © {new Date().getFullYear()} OneAssist AI
          Technology that adapts people, NOT people adapting to technology.
        </p>
      </footer>
    </div>
  );
}