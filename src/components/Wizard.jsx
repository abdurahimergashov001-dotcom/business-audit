
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { ArrowRight, Check, ChevronRight } from 'lucide-react';

const questions = [
    {
        id: 'isOwner',
        question: "Siz biznes egasimisiz?",
        type: 'boolean',
        options: [
            { label: 'Ha, biznes egasiman', value: true },
            { label: 'Yo\'q, menejerman/mutaxassisman', value: false }
        ]
    },
    {
        id: 'hasCrm',
        question: "Sizda CRM tizimi mavjudmi?",
        subtext: "Mijozlar bazasi elektron shaklda yuritiladimi?",
        type: 'boolean',
        options: [
            { label: 'Ha, bor (AmoCRM, Bitrix va h.k)', value: true },
            { label: 'Yo\'q, Excel yoki daftarda', value: false }
        ]
    },
    {
        id: 'hasSalesTeam',
        question: "Alohida sotuv bo'limi (Menejerlar) bormi?",
        type: 'boolean',
        options: [
            { label: 'Ha, alohida bo\'lim bor', value: true },
            { label: 'Yo\'q, o\'zim yoki administrator sotadi', value: false }
        ]
    },
    {
        id: 'socialStatus',
        question: "Ijtimoiy tarmoqlaringiz holati? (Upakovka)",
        type: 'select',
        options: [
            { label: 'Zo\'r', value: 'great' },
            { label: 'O\'rtacha', value: 'average' },
            { label: 'Yomon / Yo\'q', value: 'poor' }
        ]
    },
    {
        id: 'industry',
        question: "Biznesingiz qaysi sohada?",
        type: 'text',
        placeholder: "Masalan: O'quv markazi, Kiyim do'koni..."
    },
    {
        id: 'adPlatform',
        question: "Asosiy reklama platformangiz?",
        type: 'select',
        options: [
            { label: 'Instagram / Facebook', value: 'instagram' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Google / YouTube', value: 'google' },
            { label: 'Boshqa', value: 'other' }
        ]
    },
    {
        id: 'monthlyIncomeGoal',
        question: "Oylik DAROMAD maqsadingiz?",
        type: 'number',
        prefix: '$',
        placeholder: '10000'
    },
    {
        id: 'averageCheck',
        question: "O'rtacha chek qancha?",
        subtext: "Bitta mijoz o'rtacha qancha pul tashlab ketadi?",
        type: 'number',
        prefix: '$',
        placeholder: '60'
    },
    {
        id: 'salesConversion',
        question: "Sotuv konversiyasi necha foiz?",
        subtext: "Murojaat qilganlarning necha foizi sotib oladi? (Taxminan)",
        type: 'number',
        suffix: '%',
        placeholder: '30'
    }
];

export default function Wizard({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [direction, setDirection] = useState(1);

    const handleAnswer = (value) => {
        const question = questions[currentStep];
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        if (currentStep < questions.length - 1) {
            setDirection(1);
            setTimeout(() => setCurrentStep(currentStep + 1), 250); // Small delay for interaction feel
        } else {
            onComplete(newAnswers);
        }
    };

    const currentQ = questions[currentStep];

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep) / questions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <p className="text-slate-400 text-sm mt-2 text-right">
                    {currentStep + 1} / {questions.length}
                </p>
            </div>

            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">{currentQ.question}</h2>
                    {currentQ.subtext && <p className="text-slate-400 mb-6">{currentQ.subtext}</p>}

                    <div className="space-y-4">
                        {currentQ.type === 'boolean' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQ.options.map((opt) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="p-6 text-left border border-slate-700 rounded-xl hover:bg-blue-600/20 hover:border-blue-500 transition-all group"
                                    >
                                        <span className="block text-lg font-medium text-white group-hover:text-blue-400">
                                            {opt.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.type === 'select' && (
                            <div className="grid grid-cols-1 gap-3">
                                {currentQ.options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="p-4 text-left border border-slate-700 rounded-xl hover:bg-blue-600/20 hover:border-blue-500 transition-all flex items-center justify-between group"
                                    >
                                        <span className="text-lg font-medium text-white group-hover:text-blue-400">
                                            {opt.label}
                                        </span>
                                        <ChevronRight className="text-slate-500 group-hover:text-blue-400" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {(currentQ.type === 'text' || currentQ.type === 'number') && (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const val = e.target.elements.input.value;
                                    if (val) handleAnswer(val);
                                }}
                                className="flex flex-col gap-4"
                            >
                                <div className="relative">
                                    {currentQ.prefix && (
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-medium">
                                            {currentQ.prefix}
                                        </span>
                                    )}
                                    <input
                                        name="input"
                                        type={currentQ.type}
                                        autoFocus
                                        placeholder={currentQ.placeholder}
                                        className={`w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentQ.prefix ? 'pl-10' : ''}`}
                                    />
                                    {currentQ.suffix && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-medium">
                                            {currentQ.suffix}
                                        </span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4"
                                >
                                    Keyingisi <ArrowRight />
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
