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
    MessageSquare
} from 'lucide-react';
import { cn, formatCLP, recommendPlan, buildWhatsappLink, type QuoteState } from '@/lib/utils';

const STEPS = [
    "Tipo de Proyecto",
    "Tu Negocio",
    "Funcionalidades",
    "Tu Visión",
    "Tus Datos",
    "Resumen Final"
];

export default function QuoteWizard() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<QuoteState>({
        type: 'web',
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
        description: ''
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
                                                    <h3 className="text-2xl font-bold">¿Qué necesitas construir?</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => { updateForm('type', 'web'); nextStep(); }}
                                                            className={cn(
                                                                "flex flex-col items-center p-8 rounded-2xl border-2 transition-all group",
                                                                formData.type === 'web' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <Globe className="text-primary" size={32} />
                                                            </div>
                                                            <span className="font-bold text-lg">Página Web</span>
                                                            <p className="text-sm text-gray-400 text-center mt-2">Para captar clientes y mostrar tus servicios.</p>
                                                        </button>
                                                        <button
                                                            onClick={() => { updateForm('type', 'ecommerce'); nextStep(); }}
                                                            className={cn(
                                                                "flex flex-col items-center p-8 rounded-2xl border-2 transition-all group",
                                                                formData.type === 'ecommerce' ? "border-primary bg-primary/5" : "border-white/5 bg-white/5 hover:border-white/20"
                                                            )}
                                                        >
                                                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <ShoppingCart className="text-accent" size={32} />
                                                            </div>
                                                            <span className="font-bold text-lg">Tienda Online</span>
                                                            <p className="text-sm text-gray-400 text-center mt-2">Para vender tus productos con pagos online.</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 1 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">Cuéntanos más del alcance</h3>
                                                    {formData.type === 'web' ? (
                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-medium text-gray-400">Rubro del negocio</label>
                                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                                {["Automotora", "Inmobiliaria", "Portafolio profesional", "Servicios", "Construcción"].map(r => (
                                                                    <button
                                                                        key={r}
                                                                        onClick={() => updateForm('rubro', r)}
                                                                        className={cn(
                                                                            "p-3 rounded-xl border text-sm transition-all text-center",
                                                                            formData.rubro === r ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                        )}
                                                                    >
                                                                        {r}
                                                                    </button>
                                                                ))}
                                                                <button
                                                                    onClick={() => updateForm('rubro', 'Otro')}
                                                                    className={cn(
                                                                        "p-3 rounded-xl border text-sm transition-all text-center",
                                                                        (formData.rubro === 'Otro' || !["Automotora", "Inmobiliaria", "Portafolio profesional", "Servicios", "Construcción"].includes(formData.rubro)) ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                    )}
                                                                >
                                                                    Otro
                                                                </button>
                                                            </div>
                                                            {(formData.rubro === 'Otro' || !["Automotora", "Inmobiliaria", "Portafolio profesional", "Servicios", "Construcción"].includes(formData.rubro)) && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: -10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="mt-4"
                                                                >
                                                                    <label className="text-xs text-gray-500 mb-2 block uppercase font-bold">Especifica tu rubro</label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Ej: Tienda de Mascotas, Repuestos, etc."
                                                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                                                                        value={formData.rubro === 'Otro' ? '' : formData.rubro}
                                                                        onChange={(e) => updateForm('rubro', e.target.value)}
                                                                        autoFocus
                                                                    />
                                                                </motion.div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-medium text-gray-400">Cantidad de productos aproximada</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {["1–30", "31–200", "200–1000", "1000+"].map(p => (
                                                                    <button
                                                                        key={p}
                                                                        onClick={() => updateForm('products', p)}
                                                                        className={cn(
                                                                            "p-4 rounded-xl border text-sm transition-all flex items-center justify-between",
                                                                            formData.products === p ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-white/5 hover:bg-white/10"
                                                                        )}
                                                                    >
                                                                        <span>{p} productos</span>
                                                                        {formData.products === p && <Check size={16} />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-6">
                                                    <h3 className="text-2xl font-bold">Funcionalidades clave</h3>
                                                    <div className="space-y-4">
                                                        {formData.type === 'web' ? (
                                                            <>
                                                                <button
                                                                    onClick={() => updateForm('catalog', !formData.catalog)}
                                                                    className={cn(
                                                                        "w-full p-5 rounded-2xl border transition-all flex items-center gap-4 text-left",
                                                                        formData.catalog ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", formData.catalog ? "bg-primary/20" : "bg-white/10")}>
                                                                        <ImageIcon className={formData.catalog ? "text-primary" : "text-gray-500"} />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="font-bold">Catálogo o Galería Autoadministrable</p>
                                                                        <p className="text-xs text-gray-400">Podrás subir y editar tus propios trabajos/productos.</p>
                                                                    </div>
                                                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", formData.catalog ? "border-primary bg-primary" : "border-white/20")}>
                                                                        {formData.catalog && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={() => updateForm('ads', !formData.ads)}
                                                                    className={cn(
                                                                        "w-full p-5 rounded-2xl border transition-all flex items-center gap-4 text-left",
                                                                        formData.ads ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", formData.ads ? "bg-primary/20" : "bg-white/10")}>
                                                                        <Rocket className={formData.ads ? "text-primary" : "text-gray-500"} />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="font-bold">Pack Conversión Focus+</p>
                                                                        <p className="text-xs text-gray-400">Incluye Copywriting persuasivo + 1 Anuncio conectado.</p>
                                                                    </div>
                                                                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", formData.ads ? "border-primary bg-primary" : "border-white/20")}>
                                                                        {formData.ads && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => updateForm('inventory', !formData.inventory)}
                                                                className={cn(
                                                                    "w-full p-5 rounded-2xl border transition-all flex items-center gap-4 text-left",
                                                                    formData.inventory ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                )}
                                                            >
                                                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", formData.inventory ? "bg-primary/20" : "bg-white/10")}>
                                                                    <ShieldCheck className={formData.inventory ? "text-primary" : "text-gray-500"} />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-bold">Inventario y Panel Robusto</p>
                                                                    <p className="text-xs text-gray-400">Control de stock, avisos automáticos y gestión pro de productos.</p>
                                                                </div>
                                                                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", formData.inventory ? "border-primary bg-primary" : "border-white/20")}>
                                                                    {formData.inventory && <Check size={12} className="text-black" />}
                                                                </div>
                                                            </button>
                                                        )}

                                                        <div className="pt-4 border-t border-white/5 mt-4 space-y-4">
                                                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Activos Disponibles</p>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <button
                                                                    onClick={() => updateForm('hasLogo', !formData.hasLogo)}
                                                                    className={cn(
                                                                        "p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                                                                        formData.hasLogo ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold">¿Ya tienes Logotipo?</span>
                                                                        <span className="text-[10px] text-primary">{formData.hasLogo ? 'Usaremos el tuyo' : 'BONIFICADO: Te lo regalamos'}</span>
                                                                    </div>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasLogo ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasLogo && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={() => updateForm('hasHosting', !formData.hasHosting)}
                                                                    className={cn(
                                                                        "p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                                                                        formData.hasHosting ? "border-primary bg-primary/5" : "border-white/10 bg-white/5"
                                                                    )}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold">¿Ya tienes hosting?</span>
                                                                        <span className="text-[10px] text-primary">{formData.hasHosting ? 'Descuento aplicado' : 'INCLUIDO (Primer año)'}</span>
                                                                    </div>
                                                                    <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", formData.hasHosting ? "bg-primary border-primary" : "border-white/20")}>
                                                                        {formData.hasHosting && <Check size={12} className="text-black" />}
                                                                    </div>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div className="space-y-8">
                                                    <div>
                                                        <h3 className="text-2xl font-bold mb-1">Cuéntanos tu visión</h3>
                                                        <p className="text-gray-400 text-sm">Queremos entender qué buscas lograr con este proyecto.</p>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="space-y-4">
                                                            <label className="block text-sm font-medium text-gray-400">¿Cuál es tu objetivo principal?</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                {[
                                                                    { label: 'Imagen Profesional', icon: <Target size={16} /> },
                                                                    { label: 'Ventas Online', icon: <ShoppingCart size={16} /> },
                                                                    { label: 'Captar Leads', icon: <Users size={16} /> }
                                                                ].map(g => (
                                                                    <button
                                                                        key={g.label}
                                                                        onClick={() => updateForm('mainGoal', g.label)}
                                                                        className={cn(
                                                                            "p-4 rounded-xl border text-sm transition-all flex items-center justify-center gap-2",
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
                                                            <label className="block text-sm font-medium text-gray-400">¿Ya tienes clientes actualmente?</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                {[
                                                                    { label: 'Sí, ya vendo', value: true },
                                                                    { label: 'Aún no, estoy partiendo', value: false }
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
                                                            <label className="block text-sm font-medium text-gray-400">¿Algo más que debamos saber? (Opcional)</label>
                                                            <textarea
                                                                value={formData.description}
                                                                onChange={(e) => updateForm('description', e.target.value)}
                                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-all min-h-[120px] resize-none text-sm"
                                                                placeholder="Cuéntanos brevemente de qué trata tu negocio o qué te gustaría que tuviera tu web..."
                                                            />
                                                        </div>
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
                                                            {formData.hasHosting
                                                                ? "Precio ajustado con abono por hosting propio."
                                                                : "Pago único. Dominio y hosting incluidos primer año."}
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
                                                (step === 1 && formData.type === 'web' && (!formData.rubro || formData.rubro === 'Otro')) ||
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
                                        <p className="text-xs font-bold truncate">{formData.type === 'web' ? 'Pág. Web' : 'E-commerce'}</p>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Alcance</p>
                                        <p className="text-xs font-bold truncate">{formData.catalog || formData.inventory ? 'Dynamic' : 'Solo Base'}</p>
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
                    onClick={step === 4 ? handleWhatsApp : nextStep}
                    className="bg-[#25D366] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 text-sm"
                >
                    {step === 4 ? (
                        <>WhatsApp <Send size={16} /></>
                    ) : (
                        <>Continuar <ChevronRight size={16} /></>
                    )}
                </button>
            </div>
        </section >
    );
}
