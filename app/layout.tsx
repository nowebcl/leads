import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NOWEB | Cotizador Dinámico de Proyectos Web",
    description: "Crea tu sitio web profesional con NOWEB. Pago único, sin mensualidades. Cotiza en vivo y comienza hoy.",
    keywords: "desarrollo web, ecommerce, landing page, chile, cotizador web, noweb",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <body className={`${inter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
