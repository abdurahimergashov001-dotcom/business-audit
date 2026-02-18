
import React, { useState } from 'react';
import Wizard from './components/Wizard';
import Report from './components/Report';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Sparkles, ArrowRight } from 'lucide-react';

function App() {
  const [view, setView] = useState('intro'); // intro, wizard, report
  const [data, setData] = useState(null);

  const handleStart = () => {
    setView('wizard');
  };

  const handleWizardComplete = (answers) => {
    setData(answers);
    setView('report');
  };

  const handleRestart = () => {
    setData(null);
    setView('intro');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-6 flex justify-center">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Moliya & Marketing
            </span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence mode='wait'>
            {view === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-2xl px-4"
              >
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 text-blue-400 text-sm font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  AI orqali Biznes Tahlili
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                  Biznesingizni <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    O'sish Nuctalari
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                  9 ta oddiy savol orqali marketing va moliya holatingizni tahlil qiling.
                  Aniq raqamlar va strategik rejaga ega bo'ling.
                </p>

                <button
                  onClick={handleStart}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 font-bold rounded-full hover:bg-slate-200 transition-all text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.4)]"
                >
                  Boshlash
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {view === 'wizard' && (
              <motion.div
                key="wizard"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Wizard onComplete={handleWizardComplete} />
              </motion.div>
            )}

            {view === 'report' && (
              <motion.div
                key="report"
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Report data={data} onRestart={handleRestart} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="p-6 text-center text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Marketing Audit AI
        </footer>
      </div>
    </div>
  );
}

export default App;
