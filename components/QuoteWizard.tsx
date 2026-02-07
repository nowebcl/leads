"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    ShoppingCart,
    ArrowRight,
    ArrowLeft,
    Check,
    Zap,
    CreditCard,
    ChevronRight,
    Send,
    Building2,
    Image as ImageIcon,
    Rocket,
    ShieldCheck,
    Package,
    Users,
    Target,
    MessageSquare,
    Bot,
    Cpu,
    Smartphone,
    Layout,
    Layers,
    Settings,
    Database,
    Bell,
    Wallet,
    MapPin,
    MessageCircle,
    Infinity
} from 'lucide-react';
import { cn, formatCLP, recommendPlan, buildWhatsappLink, type QuoteState } from '@/lib/utils';

const STEPS = [
    "Categoría",
    "Tipo de Plan",
    "Personalización",
    "Tu Visión",
    "Tus Datos",
    "Resumen Final"
];

export default function QuoteWizard() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<QuoteState>({
        category: 'web',
        type: 'pagina',
        subtype: 'fastpage',
        rubro: 'Otro',
        catalog: false,
        ads: false,
        products: '1–30',
        inventory: false,
        name: '',
        city: '',
        instagram: '',
        hasLogo: false,
        hasHosting: false,
        hasClients: false,
        mainGoal: 'Imagen Profesional',
        description: '',
        extraChannels: 0,
        apiIntegrations: 'none',
        hasAgenda: false,
        hasAnalytics: false,
        appModules: [],
        screensRange: '3-5'
    });

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('noweb_quote');
        if (saved) {
            try {
                setFormData(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading quote", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('noweb_quote', JSON.stringify(formData));
    }, [formData]);

    const result = useMemo(() => recommendPlan(formData), [formData]);

    const updateForm = (key: keyof QuoteState, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1);
            window.scrollTo({ top: document.getElementById('quote-section')?.offsetTop ?? 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleWhatsApp = () => {
        const link = buildWhatsappLink(formData, result);
        window.open(link, '_blank');
    };

    return (
        <section id="quote-section" className="py-20 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">

                    <div className="mb-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Crea tu Presupuesto <span className="text-primary italic">a medida</span>
                        </h2>
                        <p className="text-gray-400">
                            Obtén una recomendación perfecta basada en tus necesidades reales.
                            <span className="text-primary block font-medium mt-2">Pago único • Sin mensualidades</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Wizard */}
                        <div className="lg:col-span-2">
                            <div className="glass rounded-3xl p-6 md:p-10 min-h-[500px] flex flex-col">

                                {/* Progress Bar */}
                                <div className="mb-10">
                                    <div className="flex justify-between mb-2">
                                        {STEPS.map((s, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "w-full h-1.5 rounded-full mx-1 transition-all duration-500",
                                                    step >= i ? "bg-primary glow-primary" : "bg-white/10"
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">
                                        <span>Inicio</span>
                                        <span>Final</span>
                                    </div>
                                </div>

                                {/* Step Content */}
                                <div className="flex-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={step}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {step === 0 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">¿Qué quieres cotizar hoy?</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <button
                                                            onClick={() => { updateForm('category', 'web'); updateForm('type', 'pagina'); nextStep(); }}
                                                            className={cn(
                                                                "flex flex-col items-center p-6 rounded-2xl border-2 transition-all group",
                                                                formData.category === 'web' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <Globe className="text-primary" size={28} />
                                                            </div>
                                                            <span className="font-bold text-base text-center">Desarrollo Web</span>
                                                            <p className="text-xs text-gray-400 text-center mt-2">Páginas, E-commerce y Landings.</p>
                                                        </button>
                                                        <button
                                                            onClick={() => { updateForm('category', 'ia'); updateForm('type', 'basica'); nextStep(); }}
                                                            className={cn(
                                                                "flex flex-col items-center p-6 rounded-2xl border-2 transition-all group",
                                                                formData.category === 'ia' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <Bot className="text-accent" size={28} />
                                                            </div>
                                                            <span className="font-bold text-base text-center">Automatización IA</span>
                                                            <p className="text-xs text-gray-400 text-center mt-2">Chatbots, agentes y funnels.</p>
                                                        </button>
                                                        <button
                                                            onClick={() => { updateForm('category', 'app'); updateForm('type', 'mvp'); nextStep(); }}
                                                            className={cn(
                                                                "flex flex-col items-center p-6 rounded-2xl border-2 transition-all group",
                                                                formData.category === 'app' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <Smartphone className="text-blue-500" size={28} />
                                                            </div>
                                                            <span className="font-bold text-base text-center">App Móvil</span>
                                                            <p className="text-xs text-gray-400 text-center mt-2">iOS, Android y Huawei.</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 1 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">Elige un nivel de partida</h3>
                                                    {formData.category === 'web' && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <button
                                                                onClick={() => { updateForm('type', 'pagina'); updateForm('subtype', 'fastpage'); nextStep(); }}
                                                                className={cn("p-6 rounded-2xl border-2 transition-all text-left", formData.type === 'pagina' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5")}
                                                            >
                                                                <Globe className="text-primary mb-3" size={24} />
                                                                <p className="font-bold text-lg">Página Web</p>
                                                                <p className="text-sm text-gray-400 mt-1">Institucional, Servicios o Landing Page.</p>
                                                            </button>
                                                            <button
                                                                onClick={() => { updateForm('type', 'ecommerce'); updateForm('subtype', 'mini_ecommerce'); nextStep(); }}
                                                                className={cn("p-6 rounded-2xl border-2 transition-all text-left", formData.type === 'ecommerce' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5")}
                                                            >
                                                                <ShoppingCart className="text-primary mb-3" size={24} />
                                                                <p className="font-bold text-lg">E-commerce</p>
                                                                <p className="text-sm text-gray-400 mt-1">Vende online con carro y pagos.</p>
                                                            </button>
                                                        </div>
                                                    )}
                                                    {formData.category === 'ia' && (
                                                        <div className="space-y-3">
                                                            {[
                                                                { id: 'basica', name: 'IA Básica', desc: 'Chatbot WhatsApp para atención inicial.', price: '$399.990' },
                                                                { id: 'intermedia', name: 'IA Intermedia', desc: 'Agentes inteligentes + conexión API.', price: '$779.980' },
                                                                { id: 'avanzada', name: 'IA Avanzada', desc: 'Funnels automatizados y CM IA.', price: '$1.590.000' }
                                                            ].map(plan => (
                                                                <button
                                                                    key={plan.id}
                                                                    onClick={() => { updateForm('type', plan.id); nextStep(); }}
                                                                    className={cn(
                                                                        "w-full p-4 rounded-xl border transition-all flex items-center justify-between text-left",
                                                                        formData.type === plan.id ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div>
                                                                        <p className="font-bold">{plan.name}</p>
                                                                        <p className="text-xs text-gray-400">{plan.desc}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-primary font-bold">{plan.price}</p>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {formData.category === 'app' && (
                                                        <div className="space-y-3">
                                                            {[
                                                                { id: 'mvp', name: 'App MVP', desc: 'Funcionalidades esenciales para validar.', price: 'Desde $0' },
                                                                { id: 'pro', name: 'App Profesional', desc: 'Escalable con módulos avanzados.', price: 'Desde $0' },
                                                                { id: 'premium', name: 'App Premium', desc: 'Sistemas complejos a gran escala.', price: 'Desde $0' }
                                                            ].map(plan => (
                                                                <button
                                                                    key={plan.id}
                                                                    onClick={() => { updateForm('type', plan.id); nextStep(); }}
                                                                    className={cn(
                                                                        "w-full p-4 rounded-xl border transition-all flex items-center justify-between text-left",
                                                                        formData.type === plan.id ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div>
                                                                        <p className="font-bold">{plan.name}</p>
                                                                        <p className="text-xs text-gray-400">{plan.desc}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-primary font-bold">{plan.price}</p>
                                                                    </div>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">Personaliza tu solución</h3>
                                                    {formData.category === 'web' && (
                                                        <div className="space-y-4">
                                                            {formData.type === 'pagina' ? (
                                                                <div className="grid grid-cols-1 gap-3">
                                                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Presets Recomendados</p>
                                                                    {[
                                                                        { id: 'fastpage', name: 'Fastpage Base', price: '$149.890', desc: 'Lo esencial para partir hoy mismo.' },
                                                                        { id: 'landing_focus', name: 'Landing Focus+', price: '$199.980', desc: 'Diseñada para convertir visitas en ventas.' },
                                                                        { id: 'inmobiliaria', name: 'Inmobiliaria / Catálogo', price: '$249.980', desc: 'Gestión de propiedades o productos.' }
                                                                    ].map(p => (
                                                                        <button
                                                                            key={p.id}
                                                                            onClick={() => updateForm('subtype', p.id)}
                                                                            className={cn("p-4 rounded-xl border transition-all text-left flex justify-between items-center", formData.subtype === p.id ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                        >
                                                                            <div>
                                                                                <p className="font-bold">{p.name}</p>
                                                                                <p className="text-xs text-gray-400">{p.desc}</p>
                                                                            </div>
                                                                            <p className="font-bold text-primary">{p.price}</p>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 gap-3">
                                                                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Escala de Ventas</p>
                                                                    {[
                                                                        { id: 'mini_ecommerce', name: 'Mini ecommerce', price: '$199.980', desc: 'Hasta 30 productos, ideal emprendedores.' },
                                                                        { id: 'ecommerce_full', name: 'E-commerce FULL', price: '$349.980', desc: 'Sin límites, inventario y panel robusto.' }
                                                                    ].map(p => (
                                                                        <button
                                                                            key={p.id}
                                                                            onClick={() => updateForm('subtype', p.id)}
                                                                            className={cn("p-4 rounded-xl border transition-all text-left flex justify-between items-center", formData.subtype === p.id ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                        >
                                                                            <div>
                                                                                <p className="font-bold">{p.name}</p>
                                                                                <p className="text-xs text-gray-400">{p.desc}</p>
                                                                            </div>
                                                                            <p className="font-bold text-primary">{p.price}</p>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {formData.category === 'ia' && (
                                                        <div className="space-y-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                                                                    <p className="text-xs text-gray-400 font-bold uppercase mb-3">Canales Extra (+$79.990)</p>
                                                                    <div className="flex items-center gap-4">
                                                                        <button onClick={() => updateForm('extraChannels', Math.max(0, formData.extraChannels - 1))} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">-</button>
                                                                        <span className="font-bold text-xl">{formData.extraChannels}</span>
                                                                        <button onClick={() => updateForm('extraChannels', formData.extraChannels + 1)} className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">+</button>
                                                                    </div>
                                                                </div>
                                                                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                                                                    <p className="text-xs text-gray-400 font-bold uppercase mb-3">Integraciones API</p>
                                                                    <select
                                                                        value={formData.apiIntegrations}
                                                                        onChange={(e) => updateForm('apiIntegrations', e.target.value)}
                                                                        className="w-full bg-transparent outline-none text-sm font-bold"
                                                                    >
                                                                        <option value="none" className="bg-background">Solo Chatbot (Sin APIs)</option>
                                                                        <option value="1" className="bg-background">1 API (Sheets, CRM, etc)</option>
                                                                        <option value="2-3" className="bg-background">2-3 APIs (Sistemas propios)</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                <button
                                                                    onClick={() => updateForm('hasAgenda', !formData.hasAgenda)}
                                                                    className={cn("p-4 rounded-xl border transition-all flex justify-between items-center", formData.hasAgenda ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                >
                                                                    <span className="text-sm font-bold">Agenda / Derivación Human</span>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasAgenda ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasAgenda && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={() => updateForm('hasAnalytics', !formData.hasAnalytics)}
                                                                    className={cn("p-4 rounded-xl border transition-all flex justify-between items-center", formData.hasAnalytics ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                >
                                                                    <span className="text-sm font-bold">Panel Analítica Simple</span>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasAnalytics ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasAnalytics && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {formData.category === 'app' && (
                                                        <div className="space-y-4">
                                                            <p className="text-xs text-gray-400 font-bold uppercase">Módulos avanzados (Suma por módulo)</p>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                                {[
                                                                    { id: 'auth', name: 'Login Social' },
                                                                    { id: 'push', name: 'Push Notif.' },
                                                                    { id: 'payments', name: 'Pagos online' },
                                                                    { id: 'geo', name: 'Geolocalización' },
                                                                    { id: 'chat', name: 'Chat Interno' },
                                                                    { id: 'admin', name: 'Panel Admin' },
                                                                    { id: 'stores', name: 'Lanzamiento' }
                                                                ].map(m => (
                                                                    <button
                                                                        key={m.id}
                                                                        onClick={() => {
                                                                            const newModules = formData.appModules.includes(m.id)
                                                                                ? formData.appModules.filter(x => x !== m.id)
                                                                                : [...formData.appModules, m.id];
                                                                            updateForm('appModules', newModules);
                                                                        }}
                                                                        className={cn(
                                                                            "p-3 rounded-lg border text-[10px] md:text-xs font-bold transition-all text-center",
                                                                            formData.appModules.includes(m.id) ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5"
                                                                        )}
                                                                    >
                                                                        {m.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            <div className="pt-4">
                                                                <p className="text-xs text-gray-400 font-bold uppercase mb-3">Cantidad de pantallas</p>
                                                                <div className="grid grid-cols-3 gap-2">
                                                                    {['3-5', '6-10', '11-20'].map(range => (
                                                                        <button
                                                                            key={range}
                                                                            onClick={() => updateForm('screensRange', range)}
                                                                            className={cn(
                                                                                "p-3 rounded-lg border text-sm font-bold transition-all",
                                                                                formData.screensRange === range ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5"
                                                                            )}
                                                                        >
                                                                            {range}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div className="space-y-6">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-1">Tu Visión</h3>
                                                        <p className="text-gray-400 text-sm">¿Qué buscas lograr con este proyecto?</p>
                                                    </div>

                                                    <div className="space-y-6">
                                                        {formData.category === 'web' && (
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <button
                                                                    onClick={() => updateForm('hasLogo', !formData.hasLogo)}
                                                                    className={cn("p-4 rounded-xl border text-left flex justify-between items-center transition-all", formData.hasLogo ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold">¿Tienes Logo?</span>
                                                                        <span className="text-[10px] text-primary">{formData.hasLogo ? 'Usaremos el tuyo' : 'REGALO: Logo base'}</span>
                                                                    </div>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasLogo ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasLogo && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={() => updateForm('hasHosting', !formData.hasHosting)}
                                                                    className={cn("p-4 rounded-xl border text-left flex justify-between items-center transition-all", formData.hasHosting ? "border-primary bg-primary/5" : "border-white/10 bg-white/5")}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold">¿Tienes Hosting?</span>
                                                                        <span className="text-[10px] text-primary">{formData.hasHosting ? 'Abono aplicado' : 'INCLUIDO (1 año)'}</span>
                                                                    </div>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasHosting ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasHosting && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        )}

                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-medium text-gray-400">Objetivo principal</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                {[
                                                                    { label: 'Imagen Pro', icon: <Target size={16} /> },
                                                                    { label: 'Ventas', icon: <ShoppingCart size={16} /> },
                                                                    { label: 'Leads', icon: <Users size={16} /> }
                                                                ].map(g => (
                                                                    <button
                                                                        key={g.label}
                                                                        onClick={() => updateForm('mainGoal', g.label)}
                                                                        className={cn(
                                                                            "p-4 rounded-xl border text-xs transition-all flex items-center justify-center gap-2",
                                                                            formData.mainGoal === g.label ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                        )}
                                                                    >
                                                                        {g.icon}
                                                                        <span>{g.label}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-medium text-gray-400">¿Ya tienes clientes?</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[
                                                                    { label: 'Sí, ya vendo', value: true },
                                                                    { label: 'Recién partiendo', value: false }
                                                                ].map(opt => (
                                                                    <button
                                                                        key={opt.label}
                                                                        onClick={() => updateForm('hasClients', opt.value)}
                                                                        className={cn(
                                                                            "p-4 rounded-xl border text-sm transition-all text-center",
                                                                            formData.hasClients === opt.value ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                        )}
                                                                    >
                                                                        {opt.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <textarea
                                                                value={formData.description}
                                                                onChange={(e) => updateForm('description', e.target.value)}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-all min-h-[100px] resize-none text-sm"
                                                                placeholder="Cuéntanos más de tu idea... (puedes quitar ítems después para ajustar el precio)"
                                                            />
                                                        </div>
                                                        <p className="text-[10px] text-gray-500 text-center italic">"Tú armas tu pack: súmalo si lo necesitas o quítalo para bajar el total."</p>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 4 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">Casi listo, ¿con quién hablaremos?</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-gray-400">Tu Nombre o Negocio</label>
                                                            <input
                                                                type="text"
                                                                value={formData.name}
                                                                onChange={(e) => updateForm('name', e.target.value)}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                                                                placeholder="Ej: Juan Pérez o Mi Empresa"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-gray-400">Ciudad</label>
                                                            <input
                                                                type="text"
                                                                value={formData.city}
                                                                onChange={(e) => updateForm('city', e.target.value)}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                                                                placeholder="Ej: Santiago"
                                                            />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-sm text-gray-400">Instagram o Web actual (Opcional)</label>
                                                            <input
                                                                type="text"
                                                                value={formData.instagram}
                                                                onChange={(e) => updateForm('instagram', e.target.value)}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                                                                placeholder="@tucuenta"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 5 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">¡Tu plan está listo!</h3>
                                                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                                                        <p className="text-sm text-primary uppercase tracking-widest font-bold mb-2">Plan Recomendado</p>
                                                        <h4 className="text-3xl font-black mb-4">{result.planName}</h4>
                                                        <div className="text-5xl font-black mb-2">{formatCLP(result.total)}</div>
                                                        <p className="text-gray-400 text-sm">
                                                            {formData.category === 'web'
                                                                ? (formData.hasHosting ? "Precio ajustado con abono por hosting propio." : "Pago único. Dominio y hosting incluidos primer año.")
                                                                : "Cotización estimada para pago único. Consultar por integraciones específicas."}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                                                            <Check size={16} /> <span>Entrega en 2-5 días hábiles</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                                                            <Check size={16} /> <span>Garantía de 3 meses</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                                                            <Check size={16} /> <span>Autoadministrable</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-emerald-400 font-bold">
                                                            <Check size={16} /> <span>Sin comisiones ni mensualidades (Vs Shopify)</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handleWhatsApp}
                                                        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-xl"
                                                    >
                                                        <Send size={20} />
                                                        COTIZAR POR WHATSAPP
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Footer Buttons */}
                                <div className="mt-10 flex justify-between gap-4">
                                    <button
                                        onClick={prevStep}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all",
                                            step === 0 && "opacity-0 pointer-events-none"
                                        )}
                                    >
                                        <ArrowLeft size={18} /> Atrás
                                    </button>
                                    {step < 5 && (
                                        <button
                                            onClick={nextStep}
                                            disabled={
                                                (step === 4 && !formData.name)
                                            }
                                            className="bg-primary text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                                        >
                                            Continuar <ChevronRight size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Summary Sticky */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 glass rounded-3xl p-6 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full" />

                                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Package className="text-primary" size={20} /> Resumen de Pack
                                </h4>

                                <div className="space-y-4 mb-8">
                                    {result.breakdown.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-start text-sm">
                                            <span className="text-gray-400 flex-1 pr-4">• {item.item}</span>
                                            <span className="font-mono text-gray-300">
                                                {item.price > 0 ? '+' : ''}{formatCLP(item.price)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs text-gray-500 uppercase font-bold">Total estimado</span>
                                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">PAGO ÚNICO</span>
                                    </div>
                                    <div className="text-4xl font-black text-white glow-text">
                                        {formatCLP(result.total)}
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-2">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Tipo</p>
                                        <p className="text-xs font-bold truncate">{result.categoryLabel}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Alcance</p>
                                        <p className="text-xs font-bold truncate">{result.planName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full glass p-4 z-50 flex items-center justify-between border-t border-white/10 animate-in fade-in slide-in-from-bottom-5">
                <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Total Cotizado</p>
                    <p className="text-xl font-black text-primary">{formatCLP(result.total)}</p>
                </div>
                <button
                    onClick={step === 5 ? handleWhatsApp : nextStep}
                    className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm"
                >
                    {step === 5 ? (
                        <>WhatsApp <Send size={16} /></>
                    ) : (
                        <>Continuar <ChevronRight size={16} /></>
                    )}
                </button>
            </div>
        </section >
    );
}
