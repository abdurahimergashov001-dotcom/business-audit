import React, { useState, useEffect } from "react";
import Wizard from "./components/Wizard";
import Report from "./components/Report";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
    const [view, setView] = useState("intro"); // intro, wizard, report
    const [data, setData] = useState(null);

    useEffect(() => {
        document.documentElement.classList.add("dark");
    }, []);

    const handleStart = () => {
        setView("wizard");
    };

    const handleWizardComplete = (answers) => {
        setData(answers);
        setView("report");
    };

    const handleRestart = () => {
        setData(null);
        setView("intro");
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-background [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] opacity-20"></div>
            <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="p-6 flex justify-center border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                            <Sparkles
                                size={16}
                                className="text-primary-foreground"
                            />
                        </div>
                        <span className="font-bold">Moliya & Marketing</span>
                    </div>
                </header>

                <main className="flex-1 flex items-center justify-center p-4">
                    <AnimatePresence mode="wait">
                        {view === "intro" && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="text-center max-w-3xl px-4 flex flex-col items-center"
                            >
                                <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                    AI orqali Biznes Tahlili
                                </div>

                                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tighter">
                                    Biznesingizni <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                        O'sish Nuqtalari
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
                                    9 ta oddiy savol orqali marketing va moliya
                                    holatingizni tahlil qiling. Aniq raqamlar va
                                    strategik rejaga ega bo'ling.
                                </p>

                                <Button
                                    onClick={handleStart}
                                    size="lg"
                                    className="h-14 px-8 text-lg rounded-full shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-all gap-2"
                                >
                                    Boshlash
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        )}

                        {view === "wizard" && (
                            <motion.div
                                key="wizard"
                                className="w-full max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <Wizard onComplete={handleWizardComplete} />
                            </motion.div>
                        )}

                        {view === "report" && (
                            <motion.div
                                key="report"
                                className="w-full max-w-5xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Report data={data} onRestart={handleRestart} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <footer className="p-6 text-center text-muted-foreground text-sm border-t border-white/5">
                    &copy; {new Date().getFullYear()} Marketing Audit AI.
                    Powered by Shadcn UI.
                </footer>
            </div>
        </div>
    );
}

export default App;
