
import React from 'react';
import { calculateAudit } from '../utils/calculations';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AlertTriangle, CheckCircle, TrendingUp, DollarSign, Users, Target, RefreshCw } from 'lucide-react';

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
        <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <motion.div
                className="text-center space-y-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    MARKETING & BUDJET AUDITI
                </h1>
                <p className="text-slate-400">Sizning biznesingiz uchun maxsus hisobot</p>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Biznes Holati */}
                <motion.div variants={item} className="bg-slate-900 border border-slate-700/50 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="text-blue-500" /> Biznes holati
                    </h2>
                    <div className="space-y-3">
                        <StatusItem label="CRM Tizimi" value={data.hasCrm} />
                        <StatusItem label="Sotuv bo'limi" value={data.hasSalesTeam} />
                        <div className="flex justify-between items-center py-2 border-t border-slate-700/50 mt-4">
                            <span className="text-slate-400">Xavf darajasi</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${risk.level === 'CRITICAL' ? 'bg-red-500/20 text-red-500' :
                                risk.level === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                                }`}>
                                {risk.level === 'CRITICAL' ? '🔴 Yuqori' : risk.level === 'MEDIUM' ? '🟡 O\'rtacha' : '🟢 Past'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Moliyaviy Maqsad */}
                <motion.div variants={item} className="bg-slate-900 border border-slate-700/50 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="text-emerald-500" /> Moliyaviy maqsad
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Oylik daromad</span>
                            <span className="text-white font-mono text-lg">${financials.goal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">O'rtacha chek</span>
                            <span className="text-white font-mono text-lg">${financials.check}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-700/50">
                            <span className="text-slate-400">Kerakli mijozlar</span>
                            <span className="text-emerald-400 font-bold text-lg">{financials.requiredClients} ta</span>
                        </div>
                    </div>
                </motion.div>

                {/* Funnel */}
                <motion.div variants={item} className="bg-slate-900 border border-slate-700/50 p-6 rounded-2xl">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <Users className="text-purple-500" /> Funnel hisob-kitobi
                    </h2>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Sotuv konversiyasi</span>
                            <span className="text-white font-bold">{financials.conversionRate}%</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-700/50">
                            <span className="text-slate-400">Kerakli LIDLAR</span>
                            <span className="text-purple-400 font-bold text-2xl">{financials.requiredLeads} ta</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Formula: ${financials.goal} / ${financials.check} / {financials.conversionRate}%
                        </p>
                    </div>
                </motion.div>

                {/* Budget */}
                <motion.div variants={item} className="bg-slate-900 border border-slate-700/50 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        Reklama byudjeti
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Lid narxi (Benchmark)</span>
                            <span className="text-white">$0.8 - $1.5</span>
                        </div>
                        <div className="pt-4 border-t border-slate-700/50">
                            <p className="text-slate-400 text-sm mb-1">Optimal Byudjet (oylik)</p>
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                ${Math.round(budget.real.min)} - ${Math.round(budget.real.max)}
                            </div>
                            {budget.penaltyPercentage > 0 && (
                                <p className="text-red-400 text-xs mt-2 flex items-center gap-1">
                                    <AlertTriangle size={12} />
                                    Samaradorlik jarimasi qo'shilgan: +{budget.penaltyPercentage}%
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Warnings & Recommendations */}
            <motion.div
                variants={item}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
                <h3 className="text-xl font-bold text-white mb-4">⚠️ Muhim ogohlantirishlar & Tavsiyalar</h3>

                <div className="space-y-4">
                    {!data.hasCrm && (
                        <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                            <div>
                                <p className="text-red-200 font-medium">CRM Tizimi yo'q (+20% yo'qotish)</p>
                                <p className="text-slate-400 text-sm mt-1">
                                    Mijozlar bazasi bilan ishlamaslik marketing byudjetini havoga sovurish degani. AmoCRM yoki Bitrix24 o'rnating.
                                </p>
                            </div>
                        </div>
                    )}

                    {!data.hasSalesTeam && (
                        <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                            <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
                            <div>
                                <p className="text-red-200 font-medium">Sotuv bo'limi yo'q (+20% yo'qotish)</p>
                                <p className="text-slate-400 text-sm mt-1">
                                    Lidlar bilan ishlash uchun alohida inson kerak. O'zingiz sotsangiz, operatsion ishlar tufayli mijozlarni yo'qotasiz.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <CheckCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                        <div>
                            <p className="text-blue-200 font-medium">Reklama Strategiyasi</p>
                            <p className="text-slate-400 text-sm mt-1">
                                Reklamani kichik summa (Test) bilan boshlab, CPL (Lid narxi) ni aniqlang.
                                Byudjetni ${Math.round(budget.real.min)} dan kamaytirmaslik tavsiya etiladi.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="flex justify-center pb-8">
                <button
                    onClick={onRestart}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full transition-all"
                >
                    <RefreshCw size={18} /> Qayta hisoblash
                </button>
            </div>
        </div>
    );
}

function StatusItem({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-400">{label}</span>
            {value ? (
                <span className="text-green-500 flex items-center gap-1 font-medium"><CheckCircle size={14} /> Bor</span>
            ) : (
                <span className="text-red-500 flex items-center gap-1 font-medium"><AlertTriangle size={14} /> Yo'q</span>
            )}
        </div>
    );
}
