import React, { useState } from 'react';

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-64 bg-white border border-slate-300 rounded-xl p-4 shadow-2xl space-y-2 text-sm text-slate-800">
          <h3 className="font-bold border-b pb-1 mb-2">Quick Controls</h3>
          <button 
            onClick={() => document.documentElement.classList.toggle('high-contrast')}
            className="w-full text-left p-2 rounded hover:bg-slate-100 border border-slate-200 font-medium"
          >
            Toggle High Contrast
          </button>
          <button 
            onClick={() => document.documentElement.classList.toggle('text-large')}
            className="w-full text-left p-2 rounded hover:bg-slate-100 border border-slate-200 font-medium"
          >
            Toggle Large Text
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-amber-400 flex items-center gap-2"
        aria-label="Accessibility Options"
      >
        <span className="text-xl">♿</span>
      </button>
    </aside>
  );
}