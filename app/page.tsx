'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SmartRadarSystem() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [threatStatus, setThreatStatus] = useState<string>('SAFE - SYSTEM NORMAL');
  const [alertLevel, setAlertLevel] = useState<number>(0);

  // ۱۔ کیمرہ ان کرنے کا فنکشن
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
      speakMessage('Radar system activated. Scanning area.');
    } catch (error) {
      console.error('Camera access error:', error);
      alert('کیمرہ آن کرنے میں مسئلہ ہے، براہ کرم پرمششن دیں!');
    }
  };

  // ۲۔ انگریزی میں آواز نکالنے کا فنکشن (Text-to-Speech API)
  const speakMessage = (message: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 1.0; // آواز کی رفتار
      utterance.pitch = 1.1; // تھوڑی بھاری یا روبوٹک آواز کے لیے
      window.speechSynthesis.speak(utterance);
    }
  };

  // ۳۔ خطرہ ظاہر کرنے اور کیپس لاک / بلب ٹرگر کرنے کا فنکشن
  const triggerDangerAlert = () => {
    setThreatStatus('⚠️ DANGER DETECTED! THREAT LEVEL: HIGH ⚠️');
    setAlertLevel(3);
    
    // انگریزی میں خطرے کا اعلان
    speakMessage('Warning! High danger detected. Security protocol engaged.');

    // نوٹ: براؤزر کی سکیورٹی پالیسی کی وجہ سے براہ راست کی بورڈ ہارڈویئر کی پریس یا کیپس لاک کو کنٹرول کرنے کے لیے 
    // ہم بیک اینڈ (Node.js API) یا اس سکرپٹ کا سگنل استعمال کرتے ہیں۔ 
    // یہاں ہم سکرین پر ویژول ریڈار فلیش اور الرٹ دکھا رہے ہیں۔
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-slate-950 text-white">
      {/* ہیڈر سیکشن */}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-800 bg-slate-900 pb-4 pt-4 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-slate-900/50 lg:p-4 text-cyan-400 font-bold">
          PROPRIETARY SMART RADAR SYSTEM — MERN & NEXT.JS SECURE
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-slate-950 via-slate-950/40 lg:static lg:h-auto lg:w-auto lg:bg-none">
          <span className="px-4 py-2 rounded bg-cyan-900 text-cyan-200 border border-cyan-700">
            Status: {isScanning ? '🟢 RADAR ACTIVE' : '🔴 OFFLINE'}
          </span>
        </div>
      </div>

      {/* مرکزی سکرین اور کیمرہ ویو */}
      <div className="flex flex-col items-center justify-center my-8 w-full max-w-2xl">
        <div className="relative border-4 border-cyan-500 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.5)] bg-black w-full aspect-video flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isScanning && (
            <div className="absolute inset-flex flex-col items-center justify-center bg-slate-900/90 text-center p-6">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">راڈار سسٹم بند ہے</h2>
              <button
                onClick={startCamera}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                सिस्टम स्टार्ट کریں (Start Radar)
              </button>
            </div>
          )}
        </div>

        {/* خطرے کا اسٹیٹس اور ڈسپلے */}
        <div className={`mt-6 p-4 w-full text-center rounded-xl font-bold text-lg transition-all duration-300 ${
          alertLevel > 0 ? 'bg-red-600 text-white animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-slate-900 text-green-400 border border-green-600'
        }`}>
          {threatStatus}
        </div>

        {/* ٹیسٹنگ کے لیے بٹنز (جو گورنمنٹ یا ڈیمو کے وقت کام آئیں گے) */}
        {isScanning && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                setThreatStatus('SAFE ZONE - NO THREAT');
                setAlertLevel(0);
                speakMessage('Area is safe. No threat found.');
              }}
              className="px-5 py-2.5 bg-green-700 hover:bg-green-600 rounded-lg font-semibold transition"
            >
              محیط محفوظ ہے (Safe Test)
            </button>
            <button
              onClick={triggerDangerAlert}
              className="px-5 py-2.5 bg-red-700 hover:bg-red-600 rounded-lg font-semibold transition animate-bounce"
            >
              خطرہ چیک کریں (Simulate Danger)
            </button>
          </div>
        )}
      </div>

      {/* فوٹر */}
      <footer className="text-xs text-slate-500 text-center">
        Designed for High-Tech School Presentation & Government Grade Demonstration.
      </footer>
    </main>
  );
}