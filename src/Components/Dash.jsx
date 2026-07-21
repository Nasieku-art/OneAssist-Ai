import React, { useState } from 'react';


const getInitials = (fullName) => {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export default function OneAssistDashboard() {
  const [fullName] = useState('Mary Nasieku');
  
  
  const [preferences, setPreferences] = useState({
    language: 'Kiswahili',
    largeText: true,
    highContrast: false,
    textToSpeech: true,
    dataSaver: false,
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
      
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-6">
        <div>
          <div className="text-xl font-bold text-teal-600 mb-8 tracking-tight">
            OneAssist <span className="text-xs px-2 py-0.5 bg-indigo-100 text-teal-700 rounded-full font-normal">AI</span>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-teal-600 bg-teal-200 rounded-lg">Dashboard</a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Accessibility Settings</a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Language & Voice</a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Help & Support</a>
          </nav>
        </div>
        <div className="text-xs text-gray-400">OneAssist AI</div>
      </aside>

    
      <div className="flex-1 flex flex-col overflow-hidden">
      
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">Your Accessibility Hub</h1>
          
      
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">{fullName}</span>
            <div 
              className="flex items-center justify-center w-10 h-10 font-semibold text-white bg-teal-600 rounded-full shadow-sm select-none"
              title={fullName}
            >
              {getInitials(fullName)}
            </div>
          </div>
        </header>

     
        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          
         
              <div className="p-6 bg-gradient-to-r from-teal-300 to-teal-600 rounded-2xl text-white shadow-md">
            <h2 className="text-2xl font-bold">Karibu, {fullName}!</h2>
            <p className="mt-1 text-indigo-100 text-sm">Your digital workspace is currently adapted for your comfort and ease of use.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Active Language</p>
              <p className="text-xl font-bold text-gray-800 mt-1">{preferences.language}</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Active Adaptations</p>
              <p className="text-xl font-bold text-gray-800 mt-1">
                {Object.values(preferences).filter(v => v === true).length} Enabled
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500">Connection Mode</p>
              <p className="text-xl font-bold text-gray-800 mt-1">Optimized (Low-Data)</p>
            </div>
          </div>

         
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800">Quick Accessibility Adjustments</h3>
              <p className="text-xs text-gray-500">Toggle your personal preferences instantly to test how OneAssist AI adapts.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Larger Text Mode</span>
                <button 
                  onClick={() => togglePreference('largeText')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.largeText ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {preferences.largeText ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Text-to-Speech (Read Aloud)</span>
                <button 
                  onClick={() => togglePreference('textToSpeech')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.textToSpeech ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {preferences.textToSpeech ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">High Contrast Mode</span>
                <button 
                  onClick={() => togglePreference('highContrast')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.highContrast ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {preferences.highContrast ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                <span className="text-sm font-medium text-gray-700">Data-Saving Mode</span>
                <button 
                  onClick={() => togglePreference('dataSaver')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.dataSaver ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {preferences.dataSaver ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}