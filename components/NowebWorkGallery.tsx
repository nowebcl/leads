"use client";

import React, { useEffect, useRef } from 'react';

const WORK_ITEMS = [
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-12.webp", alt: "Trabajo Noweb 1" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-13.webp", alt: "Trabajo Noweb 2" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-14.webp", alt: "Trabajo Noweb 3" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-15.webp", alt: "Trabajo Noweb 4" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-16.webp", alt: "Trabajo Noweb 5" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-17.webp", alt: "Trabajo Noweb 6" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-5.webp", alt: "Trabajo Noweb 7" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-6.webp", alt: "Trabajo Noweb 8" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-7.webp", alt: "Trabajo Noweb 9" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-8.webp", alt: "Trabajo Noweb 10" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-9.webp", alt: "Trabajo Noweb 11" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-10.webp", alt: "Trabajo Noweb 12" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/Recurso-11.webp", alt: "Trabajo Noweb 13" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/WEB-PAGINAS.webp", alt: "Trabajo Noweb 14" },
    { src: "https://noweb.cl/wp-content/uploads/2025/10/WEB-PAG.webp", alt: "Trabajo Noweb 15" }
];

export default function NowebWorkGallery() {
    const scroll1Ref = useRef<HTMLDivElement>(null);
    const scroll2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateScrollWidth = () => {
            [scroll1Ref, scroll2Ref].forEach(ref => {
                if (ref.current) {
                    const content = ref.current.children[0] as HTMLElement;
                    if (content) {
                        const width = content.offsetWidth;
                        ref.current.style.setProperty('--shift', `-${width}px`);

                        // Adjust duration based on speed (approx 50px per second)
                        const duration = width / 50;
                        ref.current.style.setProperty('--duration', `${duration}s`);
                    }
                }
            });
        };

        window.addEventListener('load', updateScrollWidth);
        window.addEventListener('resize', updateScrollWidth);
        // Call immediately since some images might be cached
        setTimeout(updateScrollWidth, 500);

        return () => {
            window.removeEventListener('load', updateScrollWidth);
            window.removeEventListener('resize', updateScrollWidth);
        };
    }, []);

    const mid = Math.ceil(WORK_ITEMS.length / 2);
    const row1 = WORK_ITEMS.slice(0, mid);
    const row2 = WORK_ITEMS.slice(mid);

    return (
        <div id="noweb-work-gallery" className="py-20 relative overflow-hidden bg-background">
            <style jsx>{`
        #noweb-work-gallery {
          --gap: 20px;
          --duration: 40s;
        }
        .nw-row {
          display: flex;
          gap: var(--gap);
          margin-bottom: var(--gap);
          width: max-content;
        }
        .nw-scroll {
          display: flex;
          animation: nw-marquee var(--duration) linear infinite;
        }
        .nw-scroll:hover {
          animation-play-state: paused;
        }
        .nw-scroll-reverse {
          animation-direction: reverse;
        }
        @keyframes nw-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(var(--shift, -50%)); }
        }
        .nw-card {
          width: 280px;
          height: 180px;
          flex-shrink: 0;
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .nw-card:hover {
          transform: translateY(-5px);
          border-color: #00fff2;
        }
        .nw-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 768px) {
          .nw-card { width: 200px; height: 130px; }
          #noweb-work-gallery { --gap: 12px; }
        }
      `}</style>

            <div className="container mx-auto px-4 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Nuestro Portfolio</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Resultados que hablan por sí solos. Proyectos diseñados para convertir y destacar.
                </p>
            </div>

            <div className="nw-wrap">
                {/* Row 1 */}
                <div className="nw-row" ref={scroll1Ref}>
                    <div className="nw-scroll">
                        {row1.concat(row1).map((item, idx) => (
                            <div key={idx} className="nw-card mx-2">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 */}
                <div className="nw-row" ref={scroll2Ref}>
                    <div className="nw-scroll nw-scroll-reverse">
                        {row2.concat(row2).map((item, idx) => (
                            <div key={idx} className="nw-card mx-2">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gradients to hide edges */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 hidden md:block" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 hidden md:block" />
        </div>
    );
}
