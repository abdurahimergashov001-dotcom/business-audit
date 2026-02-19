import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const questions = [
    {
        id: 'isOwner',
        question: "Siz biznes egasimisiz?",
        type: 'boolean',
        options: [
            { label: 'Ha, biznes egasiman', value: true },
            { label: "Yo'q, menejerman/mutaxassisman", value: false }
        ]
    },
    {
        id: 'hasCrm',
        question: "Sizda CRM tizimi mavjudmi?",
        subtext: "Mijozlar bazasi elektron shaklda yuritiladimi?",
        type: 'boolean',
        options: [
            { label: 'Ha, bor (AmoCRM, Bitrix va h.k)', value: true },
            { label: "Yo'q, Excel yoki daftarda", value: false }
        ]
    },
    {
        id: 'hasSalesTeam',
        question: "Alohida sotuv bo'limi (Menejerlar) bormi?",
        type: 'boolean',
        options: [
            { label: "Ha, alohida bo'lim bor", value: true },
            { label: "Yo'q, o'zim yoki administrator sotadi", value: false }
        ]
    },
    {
        id: 'socialStatus',
        question: "Ijtimoiy tarmoqlaringiz holati? (Upakovka)",
        type: 'select',
        options: [
            { label: "Zo'r", value: 'great' },
            { label: "O'rtacha", value: 'average' },
            { label: "Yomon / Yo'q", value: 'poor' }
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
    const [inputValue, setInputValue] = useState("");

    const handleAnswer = (value) => {
        const question = questions[currentStep];
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);
        setInputValue("");

        if (currentStep < questions.length - 1) {
            setDirection(1);
            setTimeout(() => setCurrentStep(currentStep + 1), 250);
        } else {
            onComplete(newAnswers);
        }
    };

    const currentQ = questions[currentStep];
    const progress = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="w-full">
            <div className="mb-8 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    <span>Progress</span>
                    <span>{currentStep + 1} / {questions.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={currentStep}
                    custom={direction}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="border-muted bg-card/50 backdrop-blur-sm shadow-xl">
                        <CardHeader className="space-y-4 pb-2">
                            <div className="space-y-2">
                                <Badge variant="secondary" className="w-fit mb-2">Savol {currentStep + 1}</Badge>
                                <CardTitle className="text-3xl font-bold tracking-tight">{currentQ.question}</CardTitle>
                                {currentQ.subtext && <CardDescription className="text-lg">{currentQ.subtext}</CardDescription>}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {(currentQ.type === 'boolean' || currentQ.type === 'select') && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {currentQ.options.map((opt) => (
                                            <Button
                                                key={opt.value}
                                                variant="outline"
                                                className="h-auto py-5 px-6 justify-between text-left text-lg hover:border-primary hover:bg-primary/5 transition-all group"
                                                onClick={() => handleAnswer(opt.value)}
                                            >
                                                <span className="font-medium group-hover:text-primary transition-colors">{opt.label}</span>
                                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </Button>
                                        ))}
                                    </div>
                                )}

                                {(currentQ.type === 'text' || currentQ.type === 'number') && (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            if (inputValue) handleAnswer(inputValue);
                                        }}
                                        className="space-y-6"
                                    >
                                        <div className="relative">
                                            {currentQ.prefix && (
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl font-medium">
                                                    {currentQ.prefix}
                                                </span>
                                            )}
                                            <Input
                                                autoFocus
                                                type={currentQ.type}
                                                placeholder={currentQ.placeholder}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                className={cn(
                                                    "h-16 text-2xl px-6 bg-background/50",
                                                    currentQ.prefix && "pl-10",
                                                    currentQ.suffix && "pr-10"
                                                )}
                                            />
                                            {currentQ.suffix && (
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xl font-medium">
                                                    {currentQ.suffix}
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="w-full h-14 text-lg font-bold"
                                            disabled={!inputValue}
                                        >
                                            Keyingisi <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
