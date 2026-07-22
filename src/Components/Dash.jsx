import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, PersonStanding, Speech, Headset, Phone, MessageCircleCheck,
  Mic, MicOff, Sparkles, Ear, Eye, GraduationCap, Wifi, BookOpen, Users,
  School, Building2, HeartPulse, Volume2, Loader2, CheckCircle2
} from "lucide-react";
import { useAuth } from '../Components/AuthContext';

const getInitials = (fullName) => {
  if (!fullName) return 'U';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

let _voiceCache = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => { _voiceCache = window.speechSynthesis.getVoices(); };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

const waitForVoices = (maxWaitMs = 1200, intervalMs = 100) => {
  return new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) { _voiceCache = existing; return resolve(existing); }

    let waited = 0;
    const timer = setInterval(() => {
      const voices = window.speechSynthesis.getVoices();
      waited += intervalMs;
      if (voices.length) {
        _voiceCache = voices;
        clearInterval(timer);
        resolve(voices);
      } else if (waited >= maxWaitMs) {
        clearInterval(timer);
        resolve([]);
      }
    }, intervalMs);
  });
};

const speakText = async (text, language = 'Kiswahili', rate = 1.0, onStatus) => {
  if (!('speechSynthesis' in window)) {
    onStatus && onStatus('unsupported');
    return;
  }
  window.speechSynthesis.cancel();

  const voices = await waitForVoices();
  const targetPrefix = language === 'Kiswahili' ? 'sw' : 'en';

  const utterance = new SpeechSynthesisUtterance(text);
  const voice =
    voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix)) ||
    voices.find(v => v.lang.toLowerCase().startsWith('en')) ||
    voices[0];

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = language === 'Kiswahili' ? 'sw-KE' : 'en-US';
    onStatus && onStatus('novoices');
  }
  utterance.rate = rate;
  utterance.onstart = () => onStatus && onStatus('speaking');
  utterance.onend = () => onStatus && onStatus('done');
  utterance.onerror = () => onStatus && onStatus('error');

  window.speechSynthesis.speak(utterance);
};

const getRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return SpeechRecognition ? new SpeechRecognition() : null;
};

const PROFILES = [
  {
    key: 'blind',
    icon: Eye,
    name: { Kiswahili: 'Watu wasioona', English: 'Blind users' },
    desc: { Kiswahili: 'Sauti husoma kila kitu, hakuna haja ya kuona skrini.', English: 'Everything is read aloud. Screen-reader friendly.' },
    prefs: { textToSpeech: true, screenReader: true, voiceAssistant: true, largeText: false, highContrast: false, dyslexiaFont: false },
  },
  {
    key: 'deaf',
    icon: Ear,
    name: { Kiswahili: 'Watu wasiosikia', English: 'Deaf / hard of hearing' },
    desc: { Kiswahili: 'Maandishi na picha badala ya sauti, arifa za kuona.', English: 'Text and visuals replace audio, with visual alerts.' },
    prefs: { textToSpeech: false, screenReader: false, voiceAssistant: false, visualAlerts: true, highContrast: true },
  },
  {
    key: 'dyslexia',
    icon: BookOpen,
    name: { Kiswahili: 'Changamoto za kusoma (Dyslexia)', English: 'Reading difficulties (Dyslexia)' },
    desc: { Kiswahili: 'Fonti na nafasi rahisi kusoma, pamoja na sauti.', English: 'Reading-friendly font & spacing, plus read-aloud.' },
    prefs: { dyslexiaFont: true, largeText: true, textToSpeech: true },
  },
  {
    key: 'elderly',
    icon: PersonStanding,
    name: { Kiswahili: 'Wazee', English: 'Elderly users' },
    desc: { Kiswahili: 'Maandishi makubwa, rangi zinazoonekana wazi, sauti polepole.', English: 'Large text, high contrast, and slower speech.' },
    prefs: { largeText: true, highContrast: true, textToSpeech: true, voiceSpeed: 0.8 },
  },
  {
    key: 'lowLiteracy',
    icon: GraduationCap,
    name: { Kiswahili: 'Kusoma na kuandika kidogo', English: 'Low literacy / students' },
    desc: { Kiswahili: 'Maneno rahisi (AI), sauti, na alama badala ya maandishi marefu.', English: 'AI-simplified words, audio, and icons over long text.' },
    prefs: { textToSpeech: true, aiSimplify: true, largeText: true },
  },
  {
    key: 'rural',
    icon: Wifi,
    name: { Kiswahili: 'Maeneo ya vijijini', English: 'Rural / low connectivity' },
    desc: { Kiswahili: 'Hali ya kutumia data kidogo, bila video au picha nzito.', English: 'Low-data mode — no heavy images, audio, or video.' },
    prefs: { dataSaver: true, textToSpeech: false },
  },
];

const ORG_TYPES = [
  { key: 'individual', label: { Kiswahili: 'Mtu binafsi', English: 'Individual' }, icon: PersonStanding },
  { key: 'school', label: { Kiswahili: 'Shule', English: 'School' }, icon: School },
  { key: 'hospital', label: { Kiswahili: 'Hospitali', English: 'Hospital' }, icon: HeartPulse },
  { key: 'ngo', label: { Kiswahili: 'NGO', English: 'NGO' }, icon: Building2 },
];

function Dash() {
  // fullName and accessibilityPreference now come from the real logged-in
  // user (AuthContext), not a hardcoded placeholder.
  const { fullName: authFullName, accessibilityPreference } = useAuth();
  const fullName = authFullName || 'there';

  const [activeTab, setActiveTab] = useState('Dashboard');
  const [orgType, setOrgType] = useState('individual');
  const [activeProfile, setActiveProfile] = useState(null);

  const [preferences, setPreferences] = useState({
    language: 'Kiswahili',
    largeText: true,
    highContrast: false,
    textToSpeech: true,
    dyslexiaFont: false,
    dataSaver: false,
    screenReader: true,
    voiceAssistant: false,
    visualAlerts: false,
    aiSimplify: false,
    voiceSpeed: 1.0,
  });

  // On first load, apply whatever accessibility profile the user picked at
  // signup — same effect as tapping one of the profile cards below.
  useEffect(() => {
    if (!accessibilityPreference || accessibilityPreference === 'none') return;
    const match = PROFILES.find((p) => p.key === accessibilityPreference);
    if (match) {
      setPreferences((prev) => ({ ...prev, ...match.prefs }));
      setActiveProfile(match.key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessibilityPreference]);

  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState('');

  const [isDictating, setIsDictating] = useState(false);
  const [dictationText, setDictationText] = useState('');

  const [simplifyInput, setSimplifyInput] = useState('');
  const [simplifyOutput, setSimplifyOutput] = useState('');
  const [simplifyLevel, setSimplifyLevel] = useState('simple');
  const [aiMode, setAiMode] = useState('simplify');
  const [summaryLength, setSummaryLength] = useState('short');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifyError, setSimplifyError] = useState('');

  const [ttsStatus, setTtsStatus] = useState(null);

  const lang = preferences.language;
  const t = (sw, en) => (lang === 'Kiswahili' ? sw : en);

  const say = (sw, en) => {
    const text = en === undefined ? sw : t(sw, en);
    speakText(text, lang, preferences.voiceSpeed, setTtsStatus);
  };

  const togglePreference = (key) => {
    const newState = !preferences[key];
    setPreferences(prev => ({ ...prev, [key]: newState }));
    setActiveProfile(null);
    if (key === 'textToSpeech' && newState === true) {
      say('Kusoma maandishi kwa sauti kumewashwa.', 'Text to speech has been enabled.');
    }
  };

  const applyProfile = (profile) => {
    setPreferences(prev => ({ ...prev, ...profile.prefs }));
    setActiveProfile(profile.key);
    const willSpeak = profile.prefs.textToSpeech !== false;
    if (willSpeak) {
      const msg = t(
        `Sasa umewekewa mpangilio wa ${profile.name.Kiswahili}.`,
        `Your interface is now adjusted for ${profile.name.English}.`
      );
      speakText(msg, lang, profile.prefs.voiceSpeed || preferences.voiceSpeed);
    }
  };

  const goToTab = (tab) => setActiveTab(tab);

  const handleVoiceCommand = (transcriptRaw) => {
    const transcript = transcriptRaw.toLowerCase();
    let matched = false;
    let feedback = '';

    const nav = [
      { keys: ['dashboard', 'nyumbani', 'home'], tab: 'Dashboard' },
      { keys: ['accessibility', 'settings', 'mipangilio'], tab: 'Accessibility Settings' },
      { keys: ['language', 'voice', 'lugha', 'sauti'], tab: 'Language & Voice' },
      { keys: ['simplify', 'summarize', 'rahisisha', 'muhtasari', 'ai'], tab: 'AI Simplify & Summarize' },
      { keys: ['help', 'support', 'msaada'], tab: 'Help & Support' },
    ];
    for (const n of nav) {
      if (n.keys.some(k => transcript.includes(k))) {
        goToTab(n.tab);
        matched = true;
        feedback = t(`Nimekupeleka kwenye ${n.tab}.`, `Taking you to ${n.tab}.`);
        break;
      }
    }

    if (!matched) {
      const toggles = [
        { keys: ['large text', 'maandishi makubwa'], key: 'largeText' },
        { keys: ['high contrast', 'rangi kali'], key: 'highContrast' },
        { keys: ['dyslexia'], key: 'dyslexiaFont' },
        { keys: ['data saver', 'akiba ya data'], key: 'dataSaver' },
      ];
      for (const tgl of toggles) {
        if (tgl.keys.some(k => transcript.includes(k))) {
          const turnOn = transcript.includes('on') || transcript.includes('washa');
          const turnOff = transcript.includes('off') || transcript.includes('zima');
          setPreferences(prev => ({ ...prev, [tgl.key]: turnOn ? true : turnOff ? false : !prev[tgl.key] }));
          matched = true;
          feedback = t('Nimebadilisha mpangilio wako.', 'I updated that setting for you.');
          break;
        }
      }
    }

    if (!matched) {
      feedback = t(
        "Samahani, sikuelewa. Jaribu kusema 'nenda kwenye mipangilio' au 'washa maandishi makubwa'.",
        "Sorry, I didn't catch that. Try saying 'go to settings' or 'turn on large text'."
      );
    }

    setVoiceFeedback(feedback);
    speakText(feedback, lang, preferences.voiceSpeed);
  };

  const startVoiceAssistant = () => {
    const recognition = getRecognition();
    if (!recognition) {
      setVoiceFeedback(t('Vivinjari hivi haviwezi kutumia sauti.', 'Voice recognition is not supported in this browser.'));
      return;
    }
    recognition.lang = lang === 'Kiswahili' ? 'sw-KE' : 'en-KE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    setVoiceFeedback('');
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      handleVoiceCommand(transcript);
    };
    recognition.onerror = () => {
      setIsListening(false);
      setVoiceFeedback(t('Samahani, sikusikia vizuri.', 'Sorry, I could not hear that clearly.'));
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const startDictation = () => {
    const recognition = getRecognition();
    if (!recognition) {
      setVoiceFeedback(t('Uandishi wa sauti hautumiki kwenye kivinjari hiki.', 'Speech-to-text is not supported in this browser.'));
      return;
    }
    recognition.lang = lang === 'Kiswahili' ? 'sw-KE' : 'en-KE';
    recognition.interimResults = false;
    setIsDictating(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDictationText(prev => (prev ? prev + ' ' : '') + transcript);
    };
    recognition.onerror = () => setIsDictating(false);
    recognition.onend = () => setIsDictating(false);
    recognition.start();
  };

  const handleProcessText = async () => {
    if (!simplifyInput.trim()) return;
    setIsSimplifying(true);
    setSimplifyError('');
    setSimplifyOutput('');
    try {
      const langInstruction = lang === 'Kiswahili' ? 'Respond in Kiswahili.' : 'Respond in English.';
      let prompt;

      if (aiMode === 'summarize') {
        const lengthInstruction = summaryLength === 'short'
          ? 'Keep it to 2-3 short sentences covering only the most important point(s).'
          : 'Keep it to one short paragraph (about 4-6 sentences) covering the key points.';
        prompt = `Summarize the following text clearly and accurately. ${lengthInstruction} ${langInstruction} Only return the summary, with no preamble or explanation.\n\nText:\n${simplifyInput}`;
      } else {
        const levelInstruction = simplifyLevel === 'very-simple'
          ? 'Use very short sentences and everyday words a child or new reader could understand. Keep paragraphs to 1-2 sentences.'
          : 'Use clear, plain language with shorter sentences. Avoid jargon and complex words.';
        prompt = `Rewrite the following text to be much easier to read. ${levelInstruction} ${langInstruction} Only return the rewritten text, with no preamble or explanation.\n\nText:\n${simplifyInput}`;
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await response.json();
      const text = (data.content || []).map(b => b.text || '').join('\n').trim();
      setSimplifyOutput(text || t('Samahani, imeshindikana.', 'Sorry, something went wrong.'));
    } catch (err) {
      setSimplifyError(t('Hitilafu imetokea. Tafadhali jaribu tena.', 'Something went wrong. Please try again.'));
    }
    setIsSimplifying(false);
  };

  const CONTACT_DISPLAY = '+254701391756';
  const CONTACT_DIGITS = '254701391756';

  const handleWhatsApp = () => {
    say('Ninafungua WhatsApp...', 'Opening WhatsApp...');
    window.open(`https://wa.me/${CONTACT_DIGITS}`, '_blank');
  };

  const handlePhoneCall = () => {
    say('Ninafungua simu yako...', 'Opening your phone dialer...');
    window.location.href = `tel:${CONTACT_DISPLAY}`;
  };

  const activeCount = Object.entries(preferences).filter(([k, v]) => v === true).length;
  const hc = preferences.highContrast;

  const rootStyle = {
    fontFamily: preferences.dyslexiaFont ? 'Verdana, Tahoma, sans-serif' : undefined,
    letterSpacing: preferences.dyslexiaFont ? '0.04em' : undefined,
    lineHeight: preferences.dyslexiaFont ? 1.8 : undefined,
  };

  const surface = hc ? 'bg-black text-yellow-200' : 'bg-gray-50 text-gray-800';
  const cardSurface = hc ? 'bg-black border-yellow-400 text-yellow-100' : 'bg-white border-gray-200';
  const subtleText = hc ? 'text-yellow-300' : 'text-gray-500';

  return (
    <div className={`flex h-screen font-sans ${surface}`} style={rootStyle}>
      <style>{`:root { font-size: ${preferences.largeText ? '18px' : '15px'}; }`}</style>

      <aside className={`w-64 hidden md:flex flex-col justify-between p-6 border-r ${hc ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
        <div>
          <div className={`text-xl font-bold mb-8 tracking-tight flex items-center gap-2 ${hc ? 'text-yellow-300' : 'text-teal-600'}`}>
            OneAssist <span className={`text-xs px-2 py-0.5 rounded-full font-normal ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-50 text-teal-700'}`}>AI</span>
          </div>
          <nav className="space-y-2">
            {['Dashboard', 'Accessibility Settings', 'Language & Voice', 'AI Simplify & Summarize', 'Help & Support'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? (hc ? 'bg-yellow-400 text-black font-semibold' : 'text-teal-700 bg-teal-50 font-semibold')
                    : (hc ? 'text-yellow-200 hover:bg-gray-900' : 'text-gray-600 hover:bg-gray-50')
                }`}
              >
                {tab === 'Dashboard' && <LayoutDashboard size={18} />}
                {tab === 'Accessibility Settings' && <PersonStanding size={18} />}
                {tab === 'Language & Voice' && <Speech size={18} />}
                {tab === 'AI Simplify & Summarize' && <Sparkles size={18} />}
                {tab === 'Help & Support' && <Headset size={18} />}
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className={`text-xs ${subtleText}`}>OneAssist AI v1.0</div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`flex items-center justify-between px-8 py-4 border-b ${hc ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'}`}>
          <h1 className="text-lg font-semibold">
            {activeTab === 'Dashboard' ? t('Kituo Chako cha Ufikiaji', 'Your Accessibility Hub') : activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:inline">{fullName}</span>
            <div
              className={`flex items-center justify-center w-10 h-10 font-semibold rounded-full shadow-sm select-none ${hc ? 'bg-yellow-400 text-black' : 'text-white bg-teal-600'}`}
              title={fullName}
            >
              {getInitials(fullName)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 space-y-6">

          {activeTab === 'Dashboard' && (
            <div className="space-y-6">
              <div
                onClick={() => say(`Karibu, ${fullName}!`, `Welcome back, ${fullName}!`)}
                className={`p-6 rounded-2xl shadow-md cursor-pointer hover:opacity-95 transition-opacity ${hc ? 'bg-yellow-400 text-black' : 'text-white bg-gradient-to-r from-teal-500 to-teal-700'}`}
                title="Click to read aloud"
              >
                <h2 className="text-2xl font-bold">{t('Karibu', 'Welcome back')}, {fullName}! </h2>
                <p className={`mt-1 text-sm ${hc ? 'text-black/70' : 'text-teal-100'}`}>
                  {t('Nafasi yako ya kidijitali imewekwa kulingana na mahitaji yako. (Bofya kusikia)', 'Your digital workspace is adapted for your comfort. (Click box to hear audio)')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl border shadow-sm ${cardSurface}`}>
                  <p className={`text-sm ${subtleText}`}>{t('Lugha Inayotumika', 'Active Language')}</p>
                  <p className="text-xl font-bold mt-1">{preferences.language}</p>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm ${cardSurface}`}>
                  <p className={`text-sm ${subtleText}`}>{t('Mabadiliko Yanayotumika', 'Active Adaptations')}</p>
                  <p className="text-xl font-bold mt-1">{activeCount} {t('Yamewashwa', 'Enabled')}</p>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm ${cardSurface}`}>
                  <p className={`text-sm ${subtleText}`}>{t('Aina ya Mtumiaji', 'Account Type')}</p>
                  <p className="text-xl font-bold mt-1 capitalize">{orgType}</p>
                </div>
              </div>

              <div className={`p-6 rounded-xl border shadow-sm ${cardSurface}`}>
                <h3 className="text-base font-semibold mb-1">{t('Unatumia hii kama nani?', 'Who are you using this as?')}</h3>
                <p className={`text-xs mb-4 ${subtleText}`}>{t('Hii hutusaidia kubinafsisha uzoefu wako.', 'This helps us tailor the experience for you.')}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {ORG_TYPES.map(o => {
                    const Icon = o.icon;
                    const active = orgType === o.key;
                    return (
                      <button
                        key={o.key}
                        onClick={() => { setOrgType(o.key); say(`Umechagua ${o.label.Kiswahili}`, `Selected ${o.label.English}`); }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-colors ${
                          active ? (hc ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-teal-600 text-white border-teal-600') : (hc ? 'border-yellow-400 hover:bg-gray-900' : 'border-gray-200 hover:bg-gray-50')
                        }`}
                      >
                        <Icon size={20} />
                        {o.label[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${cardSurface}`}>
                <div>
                  <h3 className="text-base font-semibold">{t('Wasifu wa Ufikiaji', 'Accessibility Profiles')}</h3>
                  <p className={`text-xs ${subtleText}`}>{t('Bofya wasifu mmoja ili kubadilisha mipangilio yote mara moja.', 'Tap a profile to instantly adjust every setting to match your needs.')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PROFILES.map(p => {
                    const Icon = p.icon;
                    const active = activeProfile === p.key;
                    return (
                      <button
                        key={p.key}
                        onClick={() => applyProfile(p)}
                        className={`text-left p-4 rounded-xl border transition-colors ${
                          active ? (hc ? 'bg-yellow-400 border-yellow-400 text-black' : 'bg-teal-50 border-teal-500') : (hc ? 'border-yellow-400 hover:bg-gray-900' : 'border-gray-100 bg-gray-50 hover:bg-gray-100')
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon size={18} />
                          <span className="font-semibold text-sm">{p.name[lang]}</span>
                          {active && <CheckCircle2 size={16} className={hc ? 'text-black' : 'text-teal-600'} />}
                        </div>
                        <p className={`text-xs ${active ? '' : subtleText}`}>{p.desc[lang]}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Accessibility Settings' && (
            <div className="max-w-4xl space-y-6">
              <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold">{t('Mapendeleo ya Kuona na Kusoma', 'Vision & Readability Preferences')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t('Rekebisha vipengele vya skrini kulingana na mahitaji yako.', 'Fine-tune screen elements to match your exact comfort level.')}</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'largeText', title: t('Ukubwa wa Maandishi', 'Larger Font Scaling'), desc: t('Huongeza ukubwa wa maandishi kila mahali.', 'Scales typography across the whole app for low-vision users.') },
                    { key: 'highContrast', title: t('Hali ya Rangi Kali', 'High Contrast Mode'), desc: t('Huongeza tofauti ya rangi ili maandishi yaonekane wazi.', 'Enhances color differentiation so borders and text pop.') },
                    { key: 'dyslexiaFont', title: t('Fonti Rafiki kwa Dyslexia', 'Dyslexia-Friendly Font & Spacing'), desc: t('Hutumia fonti na nafasi rahisi zaidi kusoma.', 'Uses a clearer font with wider letter and line spacing.') },
                    { key: 'visualAlerts', title: t('Arifa za Kuona', 'Visual Alerts'), desc: t('Badala ya sauti, arifa huonekana kama picha/rangi.', 'Replaces audio cues with on-screen flashes, useful for deaf users.') },
                    { key: 'dataSaver', title: t('Kuhifadhi Data', 'Data Saver Mode'), desc: t('Hupunguza matumizi ya data kwa maeneo yenye mtandao dhaifu.', 'Reduces bandwidth use for rural or low-connectivity areas.') },
                    { key: 'screenReader', title: t('Msomaji wa Skrini', 'Screen Reader Support'), desc: t('Huongeza lebo za ARIA kwa visomaji vya skrini.', 'Adds ARIA labelling optimized for screen readers.') },
                  ].map(item => (
                    <div key={item.key} className={`flex items-center justify-between p-4 border rounded-xl ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                      <div>
                        <h4 className="text-sm font-semibold">{item.title}</h4>
                        <p className={`text-xs ${subtleText}`}>{item.desc}</p>
                      </div>
                      <button onClick={() => togglePreference(item.key)} className={`px-4 py-1.5 rounded-full text-xs font-semibold shrink-0 ml-4 ${preferences[item.key] ? (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white') : (hc ? 'bg-gray-800 text-yellow-200' : 'bg-gray-200 text-gray-600')}`}>
                        {preferences[item.key] ? t('IMEWASHWA', 'ENABLED') : t('IMEZIMWA', 'DISABLED')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Language & Voice' && (
            <div className="max-w-4xl space-y-6">
              <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold">{t('Lugha na Sauti', 'Language & Voice Customization')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t('Chagua lugha yako pendwayo na mipangilio ya sauti.', 'Choose your preferred language and audio speech settings.')}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('Lugha Kuu ya Programu', 'Primary Application Language')}</label>
                    <select
                      value={preferences.language}
                      onChange={(e) => {
                        const newLang = e.target.value;
                        setPreferences(p => ({ ...p, language: newLang }));
                        speakText(newLang === 'Kiswahili' ? 'Lugha imebadilishwa kuwa Kiswahili' : 'Language changed to English', newLang, preferences.voiceSpeed);
                      }}
                      className={`w-full p-3 border rounded-lg text-sm font-medium ${hc ? 'bg-black border-yellow-400 text-yellow-200' : 'bg-gray-50 border-gray-200 focus:outline-teal-600'}`}
                    >
                      <option value="Kiswahili">Kiswahili</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className={`flex items-center justify-between p-4 border rounded-xl ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                    <div>
                      <h4 className="text-sm font-semibold">{t('Kusoma kwa Sauti', 'AI Text-to-Speech Engine')}</h4>
                      <p className={`text-xs ${subtleText}`}>{t('Husoma maelekezo ya skrini kwa sauti moja kwa moja.', 'Automatically narrates screen instructions out loud.')}</p>
                    </div>
                    <button onClick={() => togglePreference('textToSpeech')} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${preferences.textToSpeech ? (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white') : (hc ? 'bg-gray-800 text-yellow-200' : 'bg-gray-200 text-gray-600')}`}>
                      {preferences.textToSpeech ? t('IMEWASHWA', 'ENABLED') : t('IMEZIMWA', 'DISABLED')}
                    </button>
                  </div>

                  <div className={`p-4 border rounded-xl ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                    <h4 className="text-sm font-semibold mb-2">{t('Kasi ya Sauti', 'Speech Speed')}: {preferences.voiceSpeed.toFixed(1)}x</h4>
                    <input
                      type="range" min="0.5" max="1.5" step="0.1"
                      value={preferences.voiceSpeed}
                      onChange={(e) => setPreferences(p => ({ ...p, voiceSpeed: parseFloat(e.target.value) }))}
                      className="w-full"
                    />
                  </div>

                  <div className={`p-4 border rounded-xl space-y-2 ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                    <h4 className="text-sm font-semibold">{t('Jaribu Sauti', 'Test Voice')}</h4>
                    <p className={`text-xs ${subtleText}`}>{t('Bofya ili kuhakikisha sauti inafanya kazi kwenye kifaa chako.', 'Tap to confirm read-aloud is working on your device.')}</p>
                    <button
                      onClick={() => say('Hii ni sauti ya majaribio. Ikiwa unanisikia, sauti inafanya kazi vizuri.', 'This is a test of the voice. If you can hear this, read-aloud is working correctly.')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                    >
                      <Volume2 size={16} /> {t('Sikiliza Sauti ya Majaribio', 'Play Test Voice')}
                    </button>
                    {ttsStatus === 'speaking' && <p className="text-xs font-medium text-teal-600">{t('🔊 Inasema sasa...', '🔊 Speaking now...')}</p>}
                    {ttsStatus === 'done' && <p className={`text-xs font-medium ${subtleText}`}>{t('✓ Imemaliza kusema.', '✓ Finished speaking.')}</p>}
                    {ttsStatus === 'error' && <p className="text-xs font-medium text-red-500">{t('Sauti imeshindikana kucheza. Angalia sauti ya kifaa chako.', 'Playback failed. Check your device volume/audio permissions.')}</p>}
                    {ttsStatus === 'novoices' && <p className="text-xs font-medium text-red-500">{t('Kifaa hiki hakina sauti za kusoma zilizosakinishwa. Angalia mipangilio ya sauti ya mfumo wako.', 'This device has no text-to-speech voices installed. Check your OS speech/accessibility settings.')}</p>}
                    {ttsStatus === 'unsupported' && <p className="text-xs font-medium text-red-500">{t('Kivinjari hiki hakiwezi kusoma kwa sauti.', 'This browser does not support text-to-speech.')}</p>}
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold">{t('Msaidizi wa Sauti', 'Voice Assistant')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t("Sema, kwa mfano 'nenda kwenye mipangilio' au 'washa maandishi makubwa'.", "Speak a command, e.g. 'go to settings' or 'turn on large text'.")}</p>
                </div>
                <button
                  onClick={startVoiceAssistant}
                  disabled={isListening}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm ${isListening ? 'bg-red-500 text-white' : (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700')}`}
                >
                  {isListening ? <Loader2 className="animate-spin" size={18} /> : <Mic size={18} />}
                  {isListening ? t('Ninasikiliza...', 'Listening...') : t('Bofya Uzungumze', 'Tap to Speak')}
                </button>
                {voiceTranscript && <p className="text-sm"><span className={subtleText}>{t('Ulisema', 'You said')}: </span>"{voiceTranscript}"</p>}
                {voiceFeedback && <p className={`text-sm font-medium ${hc ? 'text-yellow-300' : 'text-teal-700'}`}>{voiceFeedback}</p>}
              </div>

              <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold">{t('Andika kwa Sauti (Speech-to-Text)', 'Speech-to-Text Dictation')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t('Muhimu kwa mtu asiyeweza kuandika au kuona vizuri — zungumza badala ya kuandika.', 'Useful if typing or reading is hard — speak instead of typing.')}</p>
                </div>
                <textarea
                  value={dictationText}
                  onChange={(e) => setDictationText(e.target.value)}
                  placeholder={t('Maneno yako yataonekana hapa...', 'Your spoken words will appear here...')}
                  className={`w-full min-h-[100px] p-3 border rounded-lg text-sm ${hc ? 'bg-black border-yellow-400 text-yellow-100' : 'bg-gray-50 border-gray-200'}`}
                />
                <div className="flex gap-3">
                  <button
                    onClick={startDictation}
                    disabled={isDictating}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${isDictating ? 'bg-red-500 text-white' : (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700')}`}
                  >
                    {isDictating ? <MicOff size={16} /> : <Mic size={16} />}
                    {isDictating ? t('Ninasikiliza...', 'Listening...') : t('Anza Kuzungumza', 'Start Dictating')}
                  </button>
                  <button onClick={() => setDictationText('')} className={`px-4 py-2 rounded-lg text-sm font-medium ${hc ? 'bg-gray-800 text-yellow-200' : 'bg-gray-200 text-gray-700'}`}>
                    {t('Futa', 'Clear')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'AI Simplify & Summarize' && (
            <div className="max-w-4xl space-y-6">
              <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles size={20} /> {t('Kurahisisha na Kufupisha kwa AI', 'AI Simplify & Summarize')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t('Bandika maandishi magumu — AI itayarahisisha au kuyafupisha.', 'Paste any complex text — AI will rewrite it simply, or condense it to the key points.')}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setAiMode('simplify'); setSimplifyOutput(''); }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${aiMode === 'simplify' ? (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white') : (hc ? 'bg-gray-800 text-yellow-200' : 'bg-gray-200 text-gray-700')}`}
                  >
                    {t('Rahisisha', 'Simplify')}
                  </button>
                  <button
                    onClick={() => { setAiMode('summarize'); setSimplifyOutput(''); }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold ${aiMode === 'summarize' ? (hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white') : (hc ? 'bg-gray-800 text-yellow-200' : 'bg-gray-200 text-gray-700')}`}
                  >
                    {t('Fupisha', 'Summarize')}
                  </button>
                </div>

                <textarea
                  value={simplifyInput}
                  onChange={(e) => setSimplifyInput(e.target.value)}
                  placeholder={t('Bandika maandishi hapa...', 'Paste text here...')}
                  className={`w-full min-h-[120px] p-3 border rounded-lg text-sm ${hc ? 'bg-black border-yellow-400 text-yellow-100' : 'bg-gray-50 border-gray-200'}`}
                />

                <div className="flex flex-wrap items-center gap-3">
                  {aiMode === 'simplify' ? (
                    <select
                      value={simplifyLevel}
                      onChange={(e) => setSimplifyLevel(e.target.value)}
                      className={`p-2 border rounded-lg text-sm font-medium ${hc ? 'bg-black border-yellow-400 text-yellow-200' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <option value="simple">{t('Rahisi', 'Simple')}</option>
                      <option value="very-simple">{t('Rahisi Sana', 'Very Simple')}</option>
                    </select>
                  ) : (
                    <select
                      value={summaryLength}
                      onChange={(e) => setSummaryLength(e.target.value)}
                      className={`p-2 border rounded-lg text-sm font-medium ${hc ? 'bg-black border-yellow-400 text-yellow-200' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <option value="short">{t('Fupi (sentensi 2-3)', 'Short (2-3 sentences)')}</option>
                      <option value="medium">{t('Wastani (aya moja)', 'Medium (one paragraph)')}</option>
                    </select>
                  )}
                  <button
                    onClick={handleProcessText}
                    disabled={isSimplifying || !simplifyInput.trim()}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-50 ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                  >
                    {isSimplifying ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    {isSimplifying
                      ? (aiMode === 'summarize' ? t('Inafupisha...', 'Summarizing...') : t('Inarahisisha...', 'Simplifying...'))
                      : (aiMode === 'summarize' ? t('Fupisha Maandishi', 'Summarize Text') : t('Rahisisha Maandishi', 'Simplify Text'))}
                  </button>
                </div>

                {simplifyError && <p className="text-sm text-red-500">{simplifyError}</p>}

                {simplifyOutput && (
                  <div className={`p-4 border rounded-xl space-y-2 ${hc ? 'border-yellow-400' : 'border-teal-100 bg-teal-50'}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">{aiMode === 'summarize' ? t('Muhtasari', 'Summary') : t('Matokeo Rahisi', 'Simplified Result')}</h4>
                      <button onClick={() => speakText(simplifyOutput, lang, preferences.voiceSpeed)} className={`flex items-center gap-1 text-xs font-semibold ${hc ? 'text-yellow-300' : 'text-teal-700'}`}>
                        <Volume2 size={14} /> {t('Sikiliza', 'Listen')}
                      </button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{simplifyOutput}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'Help & Support' && (
            <div className="max-w-4xl space-y-6">
              <div className={`p-6 rounded-xl border shadow-sm space-y-6 ${cardSurface}`}>
                <div>
                  <h2 className="text-xl font-bold">{t('Msaada na Njia za Mawasiliano', 'Assistance & Support Channels')}</h2>
                  <p className={`text-sm ${subtleText}`}>{t('Tumejitolea kukusaidia kutumia OneAssist AI kwa urahisi.', 'We are dedicated to helping you navigate OneAssist AI smoothly.')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-5 border rounded-xl space-y-3 ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="w-10 h-10 bg-green-100 text-green-700 rounded-lg flex items-center justify-center"><MessageCircleCheck /></div>
                    <h3 className="font-semibold">{t('Msaada wa Papo Hapo wa WhatsApp', 'WhatsApp Instant Support')}</h3>
                    <p className={`text-xs ${subtleText}`}>{t('Ongea moja kwa moja na msaidizi kupitia WhatsApp, hata kwa data kidogo.', 'Chat directly with a human assistant on WhatsApp for low-data guidance.')}</p>
                    <button onClick={handleWhatsApp} className={`w-full py-2 text-xs font-semibold rounded-lg shadow-sm ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-800 text-white hover:bg-green-700'}`}>
                      {t('Fungua WhatsApp', 'Open WhatsApp Chat')}
                    </button>
                    <p className={`text-[11px] ${subtleText}`}>{t(`Itafungua WhatsApp kwa nambari ${CONTACT_DISPLAY}`, `Opens WhatsApp to ${CONTACT_DISPLAY}`)}</p>
                  </div>

                  <div className={`p-5 border rounded-xl space-y-3 ${hc ? 'border-yellow-400' : 'border-gray-100 bg-gray-50'}`}>
                    <div className="w-10 h-10 bg-teal-100 text-teal-700 rounded-lg flex items-center justify-center"><Phone /></div>
                    <h3 className="font-semibold">{t('Simu ya Kurudishiwa', 'Voice Call Back')}</h3>
                    <p className={`text-xs ${subtleText}`}>{t('Omba timu yetu ikupigie simu ili kukusaidia na mipangilio.', 'Request our team to call your phone directly to walk you through settings.')}</p>
                    <button onClick={handlePhoneCall} className={`w-full py-2 text-xs font-semibold rounded-lg shadow-sm ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-800 text-white hover:bg-teal-700'}`}>
                      {t('Piga Simu Sasa', 'Call Now')}
                    </button>
                    <p className={`text-[11px] ${subtleText}`}>{t(`Itafungua simu kwa nambari ${CONTACT_DISPLAY}`, `Opens your dialer for ${CONTACT_DISPLAY}`)}</p>
                  </div>
                </div>
              </div>

              {orgType !== 'individual' && (
                <div className={`p-6 rounded-xl border shadow-sm space-y-3 ${cardSurface}`}>
                  <h3 className="font-semibold flex items-center gap-2"><Users size={18} /> {t('Msaada kwa Mashirika', 'Support for Organizations')}</h3>
                  <p className={`text-sm ${subtleText}`}>
                    {t(
                      `Kama ${orgType}, unaweza kuomba mafunzo ya kikundi na usanidi wa akaunti nyingi kwa wanafunzi, wagonjwa, au jamii unayowahudumia.`,
                      `As a ${orgType}, you can request group training and bulk account setup for the students, patients, or communities you serve.`
                    )}
                  </p>
                  <button onClick={() => say('Ombi la mafunzo ya kikundi limetumwa', 'Group training request sent')} className={`px-4 py-2 rounded-lg text-xs font-semibold ${hc ? 'bg-yellow-400 text-black' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                    {t('Omba Mafunzo ya Kikundi', 'Request Group Onboarding')}
                  </button>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default Dash;