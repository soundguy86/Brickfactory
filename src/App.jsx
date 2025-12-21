import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  Calendar,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Mic2,
  Sliders,
  Radio,
  Trophy,
  Users,
  CreditCard,
  Send
} from 'lucide-react';

// Import constants from central location
import { COACHING_LEVELS, QUIZ_QUESTIONS, APP_CONFIG } from './utils/constants';

// Import backend services
import { API } from './services/api';

// --- KOMPONENTEN ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#0F0F1E]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#00D9FF] rounded-lg flex items-center justify-center">
        <Music className="text-white" size={24} />
      </div>
      <span className="text-xl font-bold tracking-tighter text-white">BANDSTAGE <span className="text-[#FF6B35]">PRO</span></span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
      <a href="#levels" className="hover:text-[#00D9FF] transition-colors">Coaching</a>
      <a href="#services" className="hover:text-[#00D9FF] transition-colors">Services</a>
      <a href="#booking" className="bg-[#FF6B35] px-4 py-2 rounded-full text-white hover:scale-105 transition-transform">Jetzt Buchen</a>
    </div>
  </nav>
);

const Hero = ({ onStartQuiz }) => {
  const [text, setText] = useState("");
  const fullText = "Deine Band. Professionell. In Regensburg.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.1),transparent)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10"
      >
        <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight">
          {text}<span className="animate-pulse text-[#FF6B35]">_</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-10">
          Individuelles 1:1 Coaching + Full-Service Live-Production für die Regensburger Musikszene.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all flex items-center justify-center gap-2"
          >
            LEVEL-FINDER STARTEN <ChevronRight size={20} />
          </button>
          <button
            onClick={() => document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all"
          >
            ALLE LEVELS ANSEHEN
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default function BandStageApp() {
  const [view, setView] = useState('home'); // home, quiz, booking, success
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    bandName: '',
    genre: '',
    email: '',
    phone: '',
    message: '',
    preferredSlot: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Quiz Logik
  const handleQuizAnswer = (points) => {
    const newScore = score + points;
    setScore(newScore);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Auswertung
      let recommendation = COACHING_LEVELS[0];
      if (newScore > 4) recommendation = COACHING_LEVELS[1];
      if (newScore > 6) recommendation = COACHING_LEVELS[2];
      if (newScore > 8) recommendation = COACHING_LEVELS[3];
      setSelectedLevel(recommendation);
      setView('home');
      setTimeout(() => {
        document.getElementById('levels')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  // Booking Data Handler
  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  // Process Booking with Backend Integration
  const handleBookingSubmit = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare booking data
      const bookingPayload = {
        bandName: bookingData.bandName,
        email: bookingData.email,
        phone: bookingData.phone,
        level: selectedLevel.id,
        preferredDate: new Date().toISOString().split('T')[0], // TODO: Use selected date
        preferredTime: bookingData.preferredSlot,
        bandSize: 4, // TODO: Add band size input
        message: bookingData.message,
        price: selectedLevel.price,
      };

      // Process booking (creates DB entry + Stripe session)
      const result = await API.processBooking(bookingPayload);

      if (result.success) {
        console.log('✅ Booking created successfully:', result.booking.id);

        // TODO: Redirect to Stripe Checkout
        // For now, just show success page
        setView('success');
      } else {
        throw new Error(result.error || 'Booking failed');
      }
    } catch (err) {
      console.error('❌ Booking error:', err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#0F0F1E] min-h-screen text-white font-sans selection:bg-[#00D9FF]/30">
      <Navbar />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero onStartQuiz={() => setView('quiz')} />

            {/* COACHING CARDS SECTION */}
            <section id="levels" className="py-24 px-6 max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Wähle dein Coaching</h2>
                <div className="h-1 w-20 bg-[#FF6B35] mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {COACHING_LEVELS.map((level) => (
                  <motion.div
                    key={level.id}
                    whileHover={{ y: -10 }}
                    className={`relative p-8 rounded-3xl border ${selectedLevel?.id === level.id ? 'border-[#00D9FF] bg-[#00D9FF]/5' : 'border-white/10 bg-white/5'} flex flex-col h-full`}
                  >
                    {level.popular && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D9FF] text-[#0F0F1E] text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        Empfohlen
                      </span>
                    )}
                    <div className="text-3xl mb-2">{level.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{level.name}</h3>
                    <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{level.desc}</p>
                    <div className="text-4xl font-black mb-2" style={{ color: level.color }}>
                      {level.price}€
                    </div>
                    <div className="text-sm text-gray-500 mb-6">{level.duration} Session</div>

                    <ul className="space-y-3 mb-8 flex-grow text-sm">
                      {level.features.map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-[#4ADE80]" /> {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => { setSelectedLevel(level); setView('booking'); }}
                      className="w-full py-3 rounded-xl font-bold transition-all hover:scale-105"
                      style={{ backgroundColor: level.color, color: '#0F0F1E' }}
                    >
                      JETZT BUCHEN
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="w-full max-w-xl bg-white/5 p-10 rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-[#FF6B35] transition-all" style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />

              <span className="text-[#FF6B35] font-bold text-sm uppercase tracking-widest">Frage {quizStep + 1} von {QUIZ_QUESTIONS.length}</span>
              <h2 className="text-3xl font-bold mt-4 mb-8">{QUIZ_QUESTIONS[quizStep].question}</h2>

              <div className="space-y-4">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuizAnswer(opt.score)}
                    className="w-full p-6 text-left rounded-2xl border border-white/10 hover:border-[#00D9FF] hover:bg-[#00D9FF]/5 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{opt.text}</span>
                      <ChevronRight size={20} className="text-gray-600 group-hover:text-[#00D9FF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setView('home')} className="mt-8 text-gray-500 text-sm hover:underline">Quiz abbrechen</button>
            </div>
          </motion.div>
        )}

        {view === 'booking' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-32 pb-20 px-6 max-w-4xl mx-auto"
          >
            {/* PROGRESS BAR */}
            <div className="flex justify-between mb-12">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`h-2 flex-1 rounded-full mx-1 ${bookingStep >= s ? 'bg-[#FF6B35]' : 'bg-white/10'}`} />
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
              {bookingStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Paket bestätigt: {selectedLevel?.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="p-6 bg-white/5 rounded-2xl">
                      <p className="text-gray-400 mb-4">Inklusive Leistungen:</p>
                      {selectedLevel?.features.map(f => (
                        <div key={f} className="flex items-center gap-2 mb-2">
                          <CheckCircle size={14} className="text-[#00D9FF]"/>
                          <span className="text-sm">{f}</span>
                        </div>
                      ))}
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-gray-400 text-sm">Dauer: {selectedLevel?.duration}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl font-black text-[#FF6B35] mb-2">{selectedLevel?.price}€</div>
                      <p className="text-gray-500">Gesamtpreis inkl. MwSt.</p>
                    </div>
                  </div>
                  <button onClick={() => setBookingStep(2)} className="w-full mt-10 bg-[#FF6B35] py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform">
                    Weiter zur Terminwahl
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Wann habt ihr Zeit?</h2>
                  <p className="text-gray-400 mb-6">Wähle einen verfügbaren Zeitslot (finale Terminbestätigung per E-Mail)</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {['Mo 18:00', 'Di 18:00', 'Do 17:00', 'Fr 14:00', 'Sa 10:00', 'Sa 15:00', 'So 11:00'].map(slot => (
                      <button
                        key={slot}
                        onClick={() => setBookingData({...bookingData, preferredSlot: slot})}
                        className={`p-4 rounded-xl border transition-all ${
                          bookingData.preferredSlot === slot
                            ? 'bg-[#00D9FF] text-[#0F0F1E] border-[#00D9FF]'
                            : 'border-white/10 hover:border-[#00D9FF]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setBookingStep(1)} className="flex-1 border border-white/20 py-4 rounded-xl hover:bg-white/5 transition-all">
                      Zurück
                    </button>
                    <button
                      onClick={() => setBookingStep(3)}
                      disabled={!bookingData.preferredSlot}
                      className="flex-[2] bg-[#FF6B35] py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
                    >
                      Band-Infos eingeben
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Eure Band-Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="bandName"
                      value={bookingData.bandName}
                      onChange={handleInputChange}
                      placeholder="Bandname *"
                      required
                      className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00D9FF] text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      name="genre"
                      value={bookingData.genre}
                      onChange={handleInputChange}
                      placeholder="Genre"
                      className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00D9FF] text-white placeholder-gray-500"
                    />
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      placeholder="E-Mail Adresse *"
                      required
                      className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00D9FF] text-white placeholder-gray-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      placeholder="Telefon *"
                      required
                      className="bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#00D9FF] text-white placeholder-gray-500"
                    />
                    <textarea
                      name="message"
                      value={bookingData.message}
                      onChange={handleInputChange}
                      placeholder="Besonderheiten (z.B. Probleme mit dem Monitor-Mix?)"
                      className="md:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl h-32 focus:outline-none focus:border-[#00D9FF] text-white placeholder-gray-500"
                    />
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setBookingStep(2)} className="flex-1 border border-white/20 py-4 rounded-xl hover:bg-white/5 transition-all">
                      Zurück
                    </button>
                    <button
                      onClick={() => setBookingStep(4)}
                      disabled={!bookingData.bandName || !bookingData.email || !bookingData.phone}
                      className="flex-[2] bg-[#FF6B35] py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
                    >
                      Zahlung abschließen
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 4 && (
                <div className="text-center">
                  <CreditCard size={64} className="mx-auto text-[#00D9FF] mb-6" />
                  <h2 className="text-3xl font-bold mb-4">Sichere Zahlung</h2>
                  <p className="text-gray-400 mb-10">Wähle deine bevorzugte Zahlungsmethode aus.</p>

                  <div className="bg-white/5 p-6 rounded-xl mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Coaching:</span>
                      <span className="font-bold">{selectedLevel?.name}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400">Band:</span>
                      <span className="font-bold">{bookingData.bandName}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                      <span className="text-lg font-bold">Gesamt:</span>
                      <span className="text-2xl font-black text-[#FF6B35]">{selectedLevel?.price}€</span>
                    </div>
                  </div>

                  <button
                    onClick={handleBookingSubmit}
                    disabled={isProcessing}
                    className="w-full bg-[#4ADE80] text-[#0F0F1E] py-4 rounded-xl font-black text-xl hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0F0F1E]"></div>
                        Wird verarbeitet...
                      </>
                    ) : (
                      <>JETZT KOSTENPFLICHTIG BUCHEN</>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4">
                    Mit der Buchung akzeptierst du unsere AGB. Die Zahlung erfolgt sicher über Stripe.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center p-6 text-center"
          >
            <div className="max-w-md">
              <div className="w-24 h-24 bg-[#4ADE80] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(74,222,128,0.3)]">
                <CheckCircle size={48} className="text-[#0F0F1E]" />
              </div>
              <h1 className="text-4xl font-black mb-4">ROCK 'N' ROLL!</h1>
              <p className="text-gray-400 mb-4 text-lg">
                Dein <span className="text-[#FF6B35] font-bold">{selectedLevel?.name}</span> Coaching in Regensburg ist gebucht!
              </p>
              <p className="text-gray-500 mb-10">
                Check deine E-Mails ({bookingData.email}) für die Bestätigung und die nächsten Schritte.
              </p>
              <div className="bg-white/5 p-6 rounded-xl mb-8 text-left">
                <h3 className="font-bold mb-4 text-center">Was passiert jetzt?</h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#4ADE80] mt-1 flex-shrink-0" />
                    <span>Bestätigungs-E-Mail mit allen Details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#4ADE80] mt-1 flex-shrink-0" />
                    <span>Wir melden uns innerhalb 24h zur Terminbestätigung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#4ADE80] mt-1 flex-shrink-0" />
                    <span>7 Tage vorher: Erinnerung mit allen Infos</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-white/10 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Zurück zur Startseite
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 px-6 border-t border-white/5 bg-black/20 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Music className="text-[#FF6B35]" />
              <span className="text-xl font-bold tracking-tighter">BANDSTAGE PRO</span>
            </div>
            <p className="text-gray-500 text-sm">
              Premium Band-Coaching & Live-Service direkt in Regensburg. Wir machen dich bühnenreif.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Service</h4>
            <ul className="text-gray-500 text-sm space-y-4">
              <li>Coaching Levels</li>
              <li>Live Recording</li>
              <li>Technical Rider Service</li>
              <li>Equipment Rental</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Kontakt</h4>
            <p className="text-gray-500 text-sm mb-4 italic">{APP_CONFIG.address}</p>
            <p className="text-gray-500 text-sm mb-4">{APP_CONFIG.businessHours}</p>
            <a
              href={`mailto:${APP_CONFIG.supportEmail}`}
              className="flex items-center gap-2 text-[#00D9FF] font-bold hover:underline"
            >
              <Send size={16} /> {APP_CONFIG.supportEmail}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-700 text-xs mt-20">
          © 2025 BandStage Pro Regensburg. Designed for Musicians.
        </div>
      </footer>
    </div>
  );
}
