import React from 'react';
import { calculateAudit } from '../utils/calculations';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, TrendingUp, Users, Target, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Report({ data, onRestart }) {
    const result = calculateAudit(data);
    const { financials, budget, risk } = result;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <Badge variant="outline" className="mb-4 text-xs font-mono uppercase tracking-widest border-primary/20 text-primary">
                        Audit Hisoboti
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Marketing & Budjet Auditi
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Sizning biznesingiz uchun maxsus tayyorlangan strategik tahlil va tavsiyalar.
                </p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Biznes Holati */}
                <motion.div variants={item}>
                    <Card className="h-full border-muted-foreground/10 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <TrendingUp className="w-5 h-5 text-blue-500" /> Biznes holati
                                </CardTitle>
                                {risk.level === 'CRITICAL' && <Badge variant="destructive">Yuqori Xavf</Badge>}
                                {risk.level === 'MEDIUM' && <Badge variant="warning">O'rtacha Xavf</Badge>}
                                {risk.level === 'LOW' && <Badge variant="success">Yaxshi</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <StatusItem label="CRM Tizimi" value={data.hasCrm} />
                            <Separator />
                            <StatusItem label="Sotuv bo'limi" value={data.hasSalesTeam} />
                            <Separator />
                            <div className="flex justify-between items-center py-2">
                                <span className="text-muted-foreground">Xavf darajasi</span>
                                <span className={`font-bold ${risk.level === 'CRITICAL' ? 'text-destructive' :
                                    risk.level === 'MEDIUM' ? 'text-yellow-500' : 'text-green-500'
                                    }`}>
                                    {risk.level === 'CRITICAL' ? 'Yuqori' : risk.level === 'MEDIUM' ? 'O\'rtacha' : 'Past'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Moliyaviy Maqsad */}
                <motion.div variants={item}>
                    <Card className="h-full border-muted-foreground/10 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Target className="w-5 h-5 text-emerald-500" /> Moliyaviy maqsad
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Oylik daromad</span>
                                <span className="font-mono text-xl font-bold">${financials.goal.toLocaleString()}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">O'rtacha chek</span>
                                <span className="font-mono text-xl">${financials.check}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-muted-foreground">Kerakli mijozlar</span>
                                <div className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full font-bold">
                                    {financials.requiredClients} ta
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Funnel */}
                <motion.div variants={item}>
                    <Card className="h-full border-muted-foreground/10 bg-card/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Users className="w-5 h-5 text-purple-500" /> Funnel hisob-kitobi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Sotuv konversiyasi</span>
                                <span className="font-bold">{financials.conversionRate}%</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-muted-foreground">Kerakli LIDLAR</span>
                                <div className="text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full font-bold text-xl">
                                    {financials.requiredLeads} ta
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Formula: ${financials.goal} / ${financials.check} / {financials.conversionRate}%
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Budget */}
                <motion.div variants={item}>
                    <Card className="h-full border-blue-500/20 bg-blue-500/5 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                Reklama byudjeti
                            </CardTitle>
                            <CardDescription>Oylik optimal reklama byudjeti</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4 relative z-10">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Lid narxi (Benchmark)</span>
                                <span>$0.8 - $1.5</span>
                            </div>
                            <Separator className="bg-blue-500/20" />
                            <div className="pt-2">
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    ${Math.round(budget.real.min)} - ${Math.round(budget.real.max)}
                                </div>
                                {budget.penaltyPercentage > 0 && (
                                    <div className="flex items-center gap-2 mt-2 text-destructive text-xs font-medium bg-destructive/10 px-2 py-1 rounded w-fit">
                                        <AlertTriangle size={12} />
                                        Samaradorlik jarimasi: +{budget.penaltyPercentage}%
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Warnings & Recommendations */}
            <motion.div
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <AlertTriangle className="text-yellow-500" /> Muhim ogohlantirishlar & Tavsiyalar
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!data.hasCrm && (
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                <AlertTriangle className="text-destructive mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-semibold text-destructive">CRM Tizimi yo'q (+20% yo'qotish)</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Mijozlar bazasi bilan ishlamaslik marketing byudjetini havoga sovurish degani. AmoCRM yoki Bitrix24 o'rnating.
                                    </p>
                                </div>
                            </div>
                        )}

                        {!data.hasSalesTeam && (
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                                <AlertTriangle className="text-destructive mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-semibold text-destructive">Sotuv bo'limi yo'q (+20% yo'qotish)</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Lidlar bilan ishlash uchun alohida inson kerak. O'zingiz sotsangiz, operatsion ishlar tufayli mijozlarni yo'qotasiz.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <CheckCircle className="text-blue-500 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-blue-500">Reklama Strategiyasi</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Reklamani kichik summa (Test) bilan boshlab, CPL (Lid narxi) ni aniqlang.
                                    Byudjetni ${Math.round(budget.real.min)} dan kamaytirmaslik tavsiya etiladi.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="flex justify-center pb-8">
                <Button
                    onClick={onRestart}
                    variant="secondary"
                    size="lg"
                    className="gap-2"
                >
                    <RefreshCw size={18} /> Qayta hisoblash
                </Button>
            </div>
        </div>
    );
}

function StatusItem({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{label}</span>
            {value ? (
                <div className="flex items-center gap-1.5 text-green-500 font-medium">
                    <CheckCircle size={16} /> <span>Bor</span>
                </div>
            ) : (
                <div className="flex items-center gap-1.5 text-destructive font-medium">
                    <AlertTriangle size={16} /> <span>Yo'q</span>
                </div>
            )}
        </div>
    );
}
