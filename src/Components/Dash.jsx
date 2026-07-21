import React, { useState } from 'react';
import {LayoutDashboard,PersonStanding,Speech,Headset} from "lucide-react"

const getInitials = (fullName) => {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

function Dash() {
  const [fullName] = useState('Mary Nasieku');
  const [activeTab, setActiveTab] = useState('Dashboard');
  
 
  const [preferences, setPreferences] = useState({
    language: 'Kiswahili',
    largeText: true,
    highContrast: false,
    textToSpeech: true,
    dataSaver: false,
    screenReader: true,
    voiceSpeed: '1.0x (Normal)',
  });

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      
  
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-6">
        <div>
          <div className="text-xl font-bold text-teal-600 mb-8 tracking-tight flex items-center gap-2">
            OneAssist <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full font-normal">AI</span>
          </div>
          <nav className="space-y-2">
            {['Dashboard', 'Accessibility Settings', 'Language & Voice', 'Help & Support'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'text-teal-700 bg-teal-50 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'Dashboard' && <LayoutDashboard />}
                {tab === 'Accessibility Settings' && <PersonStanding />}
                {tab === 'Language & Voice' && <Speech />}
                {tab === 'Help & Support' && <Headset />}
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="text-xs text-gray-400">OneAssist AI v1.0</div>
      </aside>

  
      <div className="flex-1 flex flex-col overflow-hidden">
        
   
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">
            {activeTab === 'Dashboard' ? 'Your Accessibility Hub' : activeTab}
          </h1>
          
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
          
         
          {activeTab === 'Dashboard' && (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl text-white shadow-md">
                <h2 className="text-2xl font-bold">Karibu, {fullName}!</h2>
                <p className="mt-1 text-teal-100 text-sm">Your digital workspace is currently adapted for your comfort and ease of use.</p>
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
                    <button onClick={() => togglePreference('largeText')} className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.largeText ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.largeText ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">Text-to-Speech (Read Aloud)</span>
                    <button onClick={() => togglePreference('textToSpeech')} className={`px-3 py-1 rounded-full text-xs font-semibold ${preferences.textToSpeech ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.textToSpeech ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        
          {activeTab === 'Accessibility Settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Vision & Readability Preferences</h2>
                  <p className="text-sm text-gray-500">Fine-tune screen elements to match your exact visual comfort level.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Larger Font Scaling</h4>
                      <p className="text-xs text-gray-500">Automatically scales typography across all components for low-vision users.</p>
                    </div>
                    <button onClick={() => togglePreference('largeText')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.largeText ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.largeText ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">High Contrast Mode</h4>
                      <p className="text-xs text-gray-500">Enhances color differentiation to make borders and text pop.</p>
                    </div>
                    <button onClick={() => togglePreference('highContrast')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.highContrast ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.highContrast ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Screen Reader Focus Rings</h4>
                      <p className="text-xs text-gray-500">Adds prominent outlines around interactable items for keyboard navigation.</p>
                    </div>
                    <button onClick={() => togglePreference('screenReader')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.screenReader ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.screenReader ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Low-Data & Bandwidth Saver</h4>
                      <p className="text-xs text-gray-500">Disables heavy background animations and optimizes assets for rural connections.</p>
                    </div>
                    <button onClick={() => togglePreference('dataSaver')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.dataSaver ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.dataSaver ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

       
          {activeTab === 'Language & Voice' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Language & Voice Customization</h2>
                  <p className="text-sm text-gray-500">Choose your preferred spoken language and audio speech settings.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Application Language</label>
                    <select 
                      value={preferences.language}
                      onChange={(e) => setPreferences(p => ({ ...p, language: e.target.value }))}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-teal-600"
                    >
                      <option value="Kiswahili">Kiswahili</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">AI Text-to-Speech Engine</h4>
                      <p className="text-xs text-gray-500">Automatically narrates screen instructions out loud.</p>
                    </div>
                    <button onClick={() => togglePreference('textToSpeech')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.textToSpeech ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {preferences.textToSpeech ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Voice Reader Speed</label>
                    <select 
                      value={preferences.voiceSpeed}
                      onChange={(e) => setPreferences(p => ({ ...p, voiceSpeed: e.target.value }))}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-teal-600"
                    >
                      <option value="0.75x (Slower)">0.75x (Slower)</option>
                      <option value="1.0x (Normal)">1.0x (Normal)</option>
                      <option value="1.25x (Faster)">1.25x (Faster)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

        
          {activeTab === 'Help & Support' && (
            <div className="max-w-4xl space-y-6">
              <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Assistance & Support Channels</h2>
                  <p className="text-sm text-gray-500">We are dedicated to helping you navigate OneAssist AI smoothly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 border border-gray-100 bg-gray-50 rounded-xl space-y-3">
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center font-bold text-lg">💬</div>
                    <h3 className="font-semibold text-gray-800">WhatsApp Instant Support</h3>
                    <p className="text-xs text-gray-500">Chat directly with a human assistant on WhatsApp for low-data guidance.</p>
                    <button onClick={() => alert("Redirecting to WhatsApp support line...")} className="w-full py-2 bg-green-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-green-700 transition-colors">
                      Open WhatsApp Chat
                    </button>
                  </div>

                  <div className="p-5 border border-gray-100 bg-gray-50 rounded-xl space-y-3">
                    <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center font-bold text-lg">📞</div>
                    <h3 className="font-semibold text-gray-800">Voice Call Back</h3>
                    <p className="text-xs text-gray-500">Request our team to call your phone directly to walk you through settings.</p>
                    <button onClick={() => alert("Callback request received! An assistant will call you shortly.")} className="w-full py-2 bg-teal-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-teal-700 transition-colors">
                      Request Phone Callback
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h3 className="font-semibold text-gray-800 text-sm">Frequently Asked Questions</h3>
                  <div className="space-y-2 text-xs text-gray-600">
                    <p className="p-3 bg-gray-50 rounded-lg"><strong>Q:</strong> Does data-saving mode affect speech quality?<br /><strong>A:</strong> No, voice scripts are compressed into lightweight audio files that use minimal network data.</p>
                    <p className="p-3 bg-gray-50 rounded-lg"><strong>Q:</strong> How do I switch languages back to English?<br /><strong>A:</strong> Go to the Language & Voice tab and select English from the dropdown menu.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
export default Dash;