"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
    { name: "Carlos Mendoza", role: "Dueño Automotora Central", text: "Excelente servicio, mi página de catálogo quedó lista en menos de una semana. Muy profesional." },
    { name: "Lucía Torres", role: "Emprendedora", text: "La landing focus me trajo clientes desde el primer día. El diseño es muy moderno." },
    { name: "Andrés Silva", role: "Inmobiliaria AS", text: "Buscaba algo rápido y de calidad. NOWEB cumplió con todo. 100% recomendados." },
    { name: "Marta Gómez", role: "Tienda de Calzado", text: "Mi ecommerce quedó increíble. La integración con Webpay fue súper rápida." },
    { name: "Jorge Ramos", role: "Portafolio Artista", text: "El diseño es limpio y elegante. Justo lo que necesitaba para mostrar mi arte." },
    { name: "Sofía Rebolledo", role: "Centro Estético", text: "Me encantó el proceso. Son muy ordenados y claros con los plazos." },
    { name: "Roberto Peña", role: "Constructora RP", text: "Web corporativa impecable. Los mejores en precio-calidad en Chile." },
    { name: "Elena Rivas", role: "Startup Logística", text: "Muy buena atención. Entienden perfecto lo que uno necesita." },
    { name: "Cristian Soto", role: "Venta de Repuestos", text: "Subieron más de 500 productos a mi tienda en tiempo récord." },
    { name: "Valentina Luna", role: "Diseñadora Galería", text: "El soporte post-venta es excelente. Siempre responden rápido." },
];

export default function Reviews() {
    return (
        <section className="py-20 overflow-hidden bg-background">
            <div className="container mx-auto px-4 mb-12 text-center">
                <div className="flex justify-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="fill-primary text-primary" />)}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Lo que dicen en Google</h2>
                <p className="text-gray-400">Nuestros clientes avalan la calidad de NOWEB con +100 proyectos activos.</p>
            </div>

            <div className="relative">
                <div className="flex gap-6 animate-marquee-fast hover:pause">
                    {REVIEWS.concat(REVIEWS).map((rev, i) => (
                        <div key={i} className="flex-shrink-0 w-80 p-6 rounded-2xl border border-white/10 bg-white/5 relative group">
                            <Quote className="absolute top-4 right-4 text-primary/20 group-hover:text-primary transition-colors" size={32} />
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(j => <Star key={j} size={12} className="fill-primary text-primary" />)}
                            </div>
                            <p className="text-sm text-gray-300 italic mb-6 leading-relaxed">"{rev.text}"</p>
                            <div className="mt-auto">
                                <p className="font-bold text-white">{rev.name}</p>
                                <p className="text-xs text-primary font-medium">{rev.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <style jsx>{`
          .animate-marquee-fast {
            animation: marquee 40s linear infinite;
            display: flex;
            width: max-content;
          }
          .pause:hover {
            animation-play-state: paused;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            </div>
        </section>
    );
}
