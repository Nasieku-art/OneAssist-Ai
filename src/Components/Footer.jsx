import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm border-t border-slate-700">
        <div className='container mx-auto'>
        <p>
          © {new Date().getFullYear()} OneAssist AI
          Technology that adapts people, NOT people adapting to technology.
        </p>
        </div>
      </footer>
    </div>
  );
}