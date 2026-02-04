"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        q: "¿El pago es único o mensual?",
        a: "¡Es pago único! No cobramos mensualidades por el diseño ni por el mantenimiento base. El único costo recurrente que tendrás es la renovación de tu dominio y hosting (aprox. $45.000 anuales) a partir del segundo año."
    },
    {
        q: "¿Qué incluye el hosting y dominio?",
        a: "Incluimos el registro de tu dominio .cl o .com por el primer año y un hosting profesional de alta velocidad optimizado para WordPress/Next.js."
    },
    {
        q: "¿Puedo editar yo mismo el contenido?",
        a: "Sí, todos nuestros sitios son autoadministrables. Te entregamos un panel fácil de usar donde podrás cambiar textos, imágenes y subir productos sin depender de nosotros."
    },
    {
        q: "¿Cuánto demoran en entregar?",
        a: "Una Fastpage o Landing Focus+ se entrega en 2 días hábiles una vez recibida la información. Proyectos de Catálogo o Ecommerce demoran entre 5 a 10 días hábiles según la complejidad."
    },
    {
        q: "¿Tienen garantía?",
        a: "Absolutamente. Ofrecemos 3 meses de garantía técnica por cualquier error o falla que pueda presentar el sitio."
    },
    {
        q: "¿Viene configurado para Google?",
        a: "Sí, realizamos un SEO base que incluye la indexación en Google Search Console, optimización de velocidad (Core Web Vitals) y etiquetas meta básicas."
    },
    {
        q: "¿Qué métodos de pago aceptan?",
        a: "Aceptamos transferencia bancaria, tarjetas de débito y crédito vía Webpay o MercadoPago."
    },
    {
        q: "¿Cómo es el proceso de trabajo?",
        a: "Es simple: 1. Eliges tu plan. 2. Realizas el pago (50% inicio / 50% entrega). 3. Nos envías tu info. 4. Desarrollamos. 5. Revisas y lanzamos."
    }
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-20 bg-black/50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                    {FAQS.map((faq, i) => (
                        <div key={i} className="border border-white/10 rounded-2xl overflow-hidden glass transition-all duration-300">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full p-6 text-left flex justify-between items-center transition-colors hover:bg-white/5"
                            >
                                <span className="font-bold pr-8">{faq.q}</span>
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
