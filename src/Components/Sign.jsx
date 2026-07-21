import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Eye,EyeOff,Globe,Volume2,ChevronDown,ArrowRight,Check,
} from "lucide-react";

const LANGUAGES = ["English", "Kiswahili", "Kikuyu", "Luo", "Kamba"];

 function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("English");
  const [langOpen, setLangOpen] = useState(false);
  const [readAloud, setReadAloud] = useState(false);
  const [form, setForm] = useState({ fullName: "", emailAddress: "", passWord: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Enter your name";
    if (!form.emailAddress.trim()) next.emailAddress = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.emailAddress))
      next.email = "Enter a valid email";
    if (!form.passWord || form.passWord.length < 6)
      next.passWord = "At least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="container mx-auto flex flex-col">

        <div className="flex items-center justify-end gap-2 px-5 md:px-10 pt-6 ">
          <button
            type="button"
            onClick={() => setReadAloud((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              readAloud
                ? "bg-teal-50 border-teal-200 text-teal-700"
                : "bg-white border-slate-200 text-slate-500"
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            Read aloud {readAloud ? "on" : "off"}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang}
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-10">
                {LANGUAGES.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm hover:bg-slate-50 ${
                      l === lang
                        ? "text-teal-600 font-medium"
                        : "text-slate-600"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-0 flex items-center justify-center px-5 md:px-10 py-4 overflow-y-auto">
          <div className="w-full max-w-sm">
            {submitted ? (
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                  <Check
                    className="w-7 h-7 text-emerald-600"
                    strokeWidth={2.5}
                  />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  Account created
                </h1>
                <p className="text-slate-500 text-sm mb-6">
                  You are all set — taking you to your dashboard.
                </p>
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-600 text-white text-sm font-semibold "
                >
                  Continue to dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">
                  Create your account
                </h1>
                <p className="text-slate-500 text-sm mb-7">
                  Free for individuals,takes under a minute.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      fullName
                    </label>
                    <div className="relative">
                      <input
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Mary Nasieku"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border text-sm outline-none focus:ring-2 focus:ring-teal-800 ${
                          errors.name ? "border-red-400" : "border-slate-100"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      emailAddress
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@gmail.com"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border text-sm outline-none focus:ring-2 focus:ring-teal-800 ${
                          errors.email ? "border-red-400" : "border-slate-100"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      PassWord
                    </label>
                    <div className="relative">
                      <input
                        type={showPassWord ? "text" : "passWord"}
                        value={form.passWord}
                        onChange={update("passWord")}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border text-sm outline-none focus:ring-2 focus:ring-teal-800 ${
                          errors.passWord
                            ? "border-red-400"
                            : "border-slate-100"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassWord((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassWord ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.passWord && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.passWord}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-teal-600 text-white text-sm font-semibold  mt-2"
                  >
                    Create account <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-6">
                  Already have an account?{" "}
                  <Link to="/login" className="text-teal-600 font-semibold">
                    Log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>

    </div>
  );
}
export default Sign;