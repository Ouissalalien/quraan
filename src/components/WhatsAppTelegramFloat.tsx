import React, { useState } from 'react';
import { MessageSquare, Send, Phone, X, ExternalLink, Sparkles } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';
import { Language } from '../types';

interface WhatsAppTelegramFloatProps {
  language: Language;
}

export const WhatsAppTelegramFloat: React.FC<WhatsAppTelegramFloatProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isAr = language === 'ar';

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start select-none">
      
      {/* Floating Popup Modal when clicked */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-150">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                قرآن
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-xs font-cairo">
                  {isAr ? 'مدرسة الشيخ الدلاعي - المروج 3' : 'École Cheikh Al Dalai'}
                </h4>
                <p className="text-[10px] text-emerald-700 font-semibold">
                  {isAr ? 'متصل الآن للاستفسار والتسجيل' : 'En ligne'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* WhatsApp Direct Option */}
            <a
              href={`https://wa.me/${SCHOOL_INFO.rawPhone}?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن التسجيل في مدرسة الشيخ الدلاعي بالمروج 3')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  WA
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">محادثة WhatsApp</div>
                  <div dir="ltr" className="text-[11px] text-emerald-700 font-mono text-right rtl:text-right ltr:text-left">
                    93 708 100
                  </div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </a>

            {/* Telegram Channel Option */}
            <a
              href={SCHOOL_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-sky-950">قناة Telegram الرسمية</div>
                  <div className="text-[11px] text-sky-700">@ecole_aldalai_mourouj3</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
            </a>

            {/* Direct Phone Call Option */}
            <a
              href={`tel:${SCHOOL_INFO.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-800 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">مكالمة هاتفية مباشرة</div>
                  <div dir="ltr" className="text-[11px] text-stone-600 font-mono text-right rtl:text-right ltr:text-left">
                    93 708 100
                  </div>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-stone-600" />
            </a>
          </div>

          <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] text-stone-500 text-center">
            المروج 3، بن عروس | al.dalai.ecole@gmail.com
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="floating-contact-trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xl shadow-emerald-900/30 border border-emerald-500/40 transition-all transform hover:scale-105"
        title="تواصل معنا عبر واتساب وتلغرام"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>

        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span>WhatsApp / Telegram</span>
        </div>

        <span className="bg-emerald-900 text-amber-300 text-[11px] font-mono px-2 py-0.5 rounded-full">
          93 708 100
        </span>
      </button>

    </div>
  );
};
