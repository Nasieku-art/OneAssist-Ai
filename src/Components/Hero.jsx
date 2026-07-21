import React from 'react';
import {GlobeCheck,LibraryBig,GlobeOff,EyeDashed,PersonStanding,Scale} from "lucide-react"

function Hero() {
  return (
    <div className="container mx-auto">
      <header className="px-8 py-20 md:py-28 text-center max-w-4xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-2 px-4 py-1 text-xs font-semibold text-teal-600 bg-teal-50 rounded-full border border-teal-100">
          <GlobeCheck className="w-3.5 h-3.5" /> Technology that adapts to everyone.
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Making the digital world accessible for <span className="text-teal-600">everyone</span>.
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          OneAssist AI is an intelligent accessibility platform that personalizes your digital experience automatically, ensuring no one is left behind due to physical, cognitive, or connection barriers.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3.5 bg-teal-600 text-white font-semibold rounded-xl shadow-md hover:bg-teal-700 transition-colors">
            Get Started
          </button>
          <a href="#problem" className="px-8 py-3.5 bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-center">
            Learn More
          </a>
        </div>
      </header>

      <section id="problem" className="px-8 py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full"> The Problem</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Today's digital world is not designed for everyone.</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Millions of people are excluded because they face different barriers across education, healthcare, and employment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-2xl"><EyeDashed /></span>
              <h3 className="font-semibold text-gray-900">Blind & Low Vision</h3>
              <p className="text-sm text-gray-600">Struggle with websites that lack screen-reader support, small fonts, and poor color contrast.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-2xl"><LibraryBig /></span>
              <h3 className="font-semibold text-gray-900">Low Literacy</h3>
              <p className="text-sm text-gray-600">Find complex language, dense documentation, and confusing interfaces difficult to understand.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-2xl"><GlobeOff /></span>
              <h3 className="font-semibold text-gray-900">Language Barriers</h3>
              <p className="text-sm text-gray-600">Cannot access crucial government, banking, or educational services due to missing local translations.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-2xl"><PersonStanding /></span>
              <h3 className="font-semibold text-gray-900">Elderly Users</h3>
              <p className="text-sm text-gray-600">Find many modern digital platforms overwhelming, cluttered, and difficult to navigate.</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-2xl"><Scale /></span>
              <h3 className="font-semibold text-gray-900">Rural Communities</h3>
              <p className="text-sm text-gray-600">Struggle with heavy data requirements on slow or unstable internet connections.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="px-8 py-20 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full">💡 The Solution</span>
            <h2 className="text-3xl font-bold text-gray-900">Personalization over separate platforms.</h2>
            <p className="text-gray-600 leading-relaxed">
              Instead of creating separate websites for different users, OneAssist AI learns each user's preferences and automatically adapts the interface to meet their needs.
            </p>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 space-y-2">
              <p className="text-xs font-bold text-teal-900 uppercase">Onboarding Philosophy</p>
              <p className="text-sm text-gray-700 italic">❌ Instead of asking: "What disability do you have?"</p>
              <p className="text-sm font-semibold text-teal-700">✔ We ask: "How can we make OneAssist AI easier for you to use?"</p>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-6 shadow-sm">
            <h3 className="font-bold text-gray-900 border-b border-gray-200 pb-3">Tailored Feature Selection</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-3">☑ Read text aloud</li>
              <li className="flex items-center gap-3">☑ Larger text mode</li>
              <li className="flex items-center gap-3">☑ High contrast mode</li>
              <li className="flex items-center gap-3">☑ Simplified language translation</li>
              <li className="flex items-center gap-3">☑ Data-saving mode for slow networks</li>
              <li className="flex items-center gap-3">🇬🇧 English & 🇰🇪 Kiswahili Localization</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;