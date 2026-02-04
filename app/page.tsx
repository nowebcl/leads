"use client";

import React from 'react';
import {
    CheckCircle,
    Clock,
    ShieldCheck,
    Smartphone,
    Zap,
    Instagram,
    Mail,
    Phone,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import QuoteWizard from '@/components/QuoteWizard';
import NowebWorkGallery from '@/components/NowebWorkGallery';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';

const BENEFITS = [
    { icon: <Zap className="text-primary" />, title: "Entrega Express", desc: "Fastpages listas en 48hs hábiles. Tu negocio no puede esperar." },
    { icon: <Smartphone className="text-primary" />, title: "Mobile First", desc: "El 90% de tus clientes vienen del celular. Diseñamos para ellos." },
    { icon: <ShieldCheck className="text-primary" />, title: "Garantía Real", desc: "3 meses de soporte técnico por cualquier falla. No te dejamos solo." },
    { icon: <CheckCircle className="text-primary" />, title: "Pago Único", desc: "Olvídate de las mensualidades eternas. Tú eres el dueño de tu web." },
    { icon: <Clock className="text-primary" />, title: "Dominio Incluido", desc: "Te regalamos el primer año de hosting y dominio .cl o .com." },
    { icon: <CheckCircle className="text-primary" />, title: "Listas para Vender", desc: "Botón de WhatsApp directo y CTAs optimizados para conversión." },
];

export default function Home() {
    return (
        <main className="min-h-screen">
            {/* Landing Content */}
            <section className="relative pt-20 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-bounce-slow">
                        <span className="flex h-2 w-2 rounded-full bg-primary" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Cupos limitados para Febrero 2026</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight leading-none">
                        Tu Web lista en <br /><span className="text-primary">48 Horas.</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Diseñamos sitios que cargan rápido, se ven increíbles en el celular y están optimizados para vender.
                        <span className="block font-bold mt-2 text-white italic">Desde $149.890 • Sin mensualidades.</span>
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <a
                            href="#quote-section"
                            className="w-full md:w-auto bg-primary text-black font-black px-10 py-5 rounded-2xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(0,255,242,0.4)]"
                        >
                            COMENZAR COTIZACIÓN <ArrowRight size={20} />
                        </a>
                        <a
                            href="#portfolio"
                            className="w-full md:w-auto glass px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all"
                        >
                            VER TRABAJOS
                        </a>
                    </div>

                    {/* Social Proof Stats */}
                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/5 pt-12">
                        <div>
                            <div className="text-3xl font-black text-primary">+150</div>
                            <div className="text-xs text-gray-500 uppercase font-bold mt-1">Sitios Entregados</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-primary">2 Días</div>
                            <div className="text-xs text-gray-500 uppercase font-bold mt-1">Tiempo de Entrega</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-primary">3 Meses</div>
                            <div className="text-xs text-gray-500 uppercase font-bold mt-1">Garantía Técnica</div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-primary">No</div>
                            <div className="text-xs text-gray-500 uppercase font-bold mt-1">Cobros Mensuales</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Block */}
            <QuoteWizard />

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-background relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">¿Por qué elegir NOWEB?</h2>
                        <p className="text-gray-400">Eliminamos la complejidad técnica para que te enfoques en vender.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className="glass p-8 rounded-3xl group hover:border-primary/50 transition-all">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {b.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-20 bg-black/30 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">NOWEB vs <span className="text-gray-500">Shopify / Wix</span></h2>
                            <p className="text-gray-400">Por qué un desarrollo profesional es la mejor inversión para tu negocio.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass p-8 rounded-3xl border-red-500/20 relative overflow-hidden group">
                                <div className="absolute top-4 right-4 text-xs font-bold text-red-500 uppercase tracking-widest px-2 py-1 bg-red-500/10 rounded">Plataformas de Alquiler</div>
                                <h3 className="text-2xl font-bold mb-6 text-gray-300">Shopify / Otros</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-sm text-gray-500 line-through decoration-red-500/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <span>Mensualidades eternas (Desde $25k/mes)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-500 line-through decoration-red-500/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <span>Comisiones por cada venta que hagas</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-500 line-through decoration-red-500/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <span>Si dejas de pagar, tu sitio desaparece</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm text-gray-500 line-through decoration-red-500/50">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <span>Tú no eres dueño del código ni del diseño</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass p-8 rounded-3xl border-primary/40 relative overflow-hidden glow-primary group">
                                <div className="absolute top-4 right-4 text-xs font-bold text-primary uppercase tracking-widest px-2 py-1 bg-primary/10 rounded">Tu Activo Digital</div>
                                <h3 className="text-2xl font-bold mb-6">Modelo NOWEB</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-sm font-bold">
                                        <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                                        <span>Pago Único. Tu sitio es tuyo para siempre.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold">
                                        <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                                        <span>Cero Comisiones por venta. Todo es para ti.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold">
                                        <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                                        <span>Velocidad de carga superior (Mejor SEO).</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold">
                                        <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                                        <span>Integraciones chilenas nativas incluidas.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio">
                <NowebWorkGallery />
            </section>

            {/* Process Section */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Así Construimos tu Éxito</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { n: "01", t: "Cotización", d: "Crea tu pack a medida y reserva tu cupo." },
                            { n: "02", t: "Briefing", d: "Nos envías fotos, textos y logo por WhatsApp/Email." },
                            { n: "03", t: "Armado", d: "Desarrollamos tu sitio en tiempo récord (2-5 días)." },
                            { n: "04", t: "Lanzamiento", d: "Revisamos detalles juntos y publicamos." },
                        ].map((s, i) => (
                            <div key={i} className="relative">
                                <div className="text-6xl font-black text-primary/10 absolute -top-10 -left-4">{s.n}</div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <ChevronRight className="text-primary" size={20} /> {s.t}
                                    </h4>
                                    <p className="text-gray-400 text-sm">{s.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ & Reviews */}
            <section id="faq">
                <FAQ />
            </section>

            <Reviews />

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8">¿Listo para dar el salto?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Únete a las decenas de negocios que ya transformaron su presencia digital con NOWEB.
                    </p>
                    <a
                        href="#quote-section"
                        className="inline-flex items-center gap-3 bg-primary text-black font-black px-12 py-6 rounded-2xl text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(0,255,242,0.4)]"
                    >
                        QUIERO MI PÁGINA <ArrowRight />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/5 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <img src="/logo.png" alt="NOWEB Logo" className="h-10 w-auto" />
                                <span className="font-black text-xl tracking-tighter uppercase">NOWEB</span>
                            </div>
                            <p className="text-gray-500 text-sm max-w-xs">
                                Desarrollo web moderno para negocios que buscan resultados reales. Sin mensualidades, sin complicaciones.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Contacto</h4>
                            <ul className="space-y-4 text-sm text-gray-400">
                                <li className="flex items-center gap-2">
                                    <Phone size={16} className="text-primary" /> +56 9 8784 3957
                                </li>
                                <li className="flex items-center gap-2">
                                    <Mail size={16} className="text-primary" /> hola@noweb.cl
                                </li>
                                <li className="flex items-center gap-2">
                                    <Instagram size={16} className="text-primary" /> @noweb.labs
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs">Ubicación</h4>
                            <p className="text-sm text-gray-400">Puerto Montt, Chile. <br />Atención a todo el país y el mundo.</p>
                            <div className="mt-6 flex gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                                        <Instagram size={18} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                        © 2026 NOWEB.CL • DISEÑO Y ALTO RENDIMIENTO • TODOS LOS DERECHOS RESERVADOS
                    </div>
                </div>
            </footer>
        </main>
    );
}
