import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCLP = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(num);
};

export interface QuoteState {
    type: "web" | "ecommerce";
    rubro: string;
    catalog: boolean;
    ads: boolean;
    products: string;
    inventory: boolean;
    name?: string;
    city?: string;
    instagram?: string;
    hasLogo: boolean;
    hasHosting: boolean;
    description?: string;
    hasClients: boolean;
    mainGoal: string;
}

export const PLAN_PRICES = {
    FASTPAGE: 149890,
    LANDING_FOCUS: 199980,
    CATALOGO_PRO: 249980,
    MINI_ECOMMERCE: 199980,
    ECOMMERCE_FULL: 349980,
};

export const recommendPlan = (state: QuoteState) => {
    let planKey = "FASTPAGE";
    let planName = "Fastpage";
    let total = PLAN_PRICES.FASTPAGE;
    let breakdown: { item: string; price: number }[] = [];

    if (state.type === "web") {
        const isSpecialRubro = ["Automotora", "Portafolio profesional", "Inmobiliaria"].includes(state.rubro);

        if (isSpecialRubro || state.catalog) {
            planKey = "CATALOGO_PRO";
            planName = "Sitio Catálogo Pro";
            total = PLAN_PRICES.CATALOGO_PRO;
            breakdown = [
                { item: "Diseño multipágina premium + responsive", price: 119990 },
                { item: "Módulo Catálogo/Galería autoadministrable", price: 60000 },
                { item: "Formularios + WhatsApp + CTA estratégicos", price: 29990 },
                { item: "Correos corporativos", price: 19990 },
                { item: "SEO/velocidad base", price: 20010 },
            ];
        } else if (state.ads) {
            planKey = "LANDING_FOCUS";
            planName = "Landing Focus+";
            total = PLAN_PRICES.LANDING_FOCUS;
            breakdown = [
                { item: "Base Fastpage (Diseño + Estructura)", price: 149890 },
                { item: "Copy + estructura de conversión", price: 30000 },
                { item: "Configuración de 1 anuncio conectado", price: 20090 },
            ];
        } else {
            planKey = "FASTPAGE";
            planName = "Fastpage";
            total = PLAN_PRICES.FASTPAGE;
            breakdown = [
                { item: "Diseño + estructura (1 página)", price: 89990 },
                { item: "WhatsApp + redes + CTA", price: 19990 },
                { item: "Correos corporativos", price: 19990 },
                { item: "Dominio + hosting 1er año", price: 19920 },
            ];
        }
    } else {
        // Ecommerce
        if (state.products === "1–30" && !state.inventory) {
            planKey = "MINI_ECOMMERCE";
            planName = "Mini ecommerce";
            total = PLAN_PRICES.MINI_ECOMMERCE;
            breakdown = [
                { item: "Setup tienda + diseño", price: 109990 },
                { item: "Integración de pagos (Webpay/MP/PayPal)", price: 39990 },
                { item: "Catálogo hasta 30 productos", price: 30000 },
                { item: "Correos corporativos", price: 20000 },
            ];
        } else {
            planKey = "ECOMMERCE_FULL";
            planName = "E-commerce FULL";
            total = PLAN_PRICES.ECOMMERCE_FULL;
            breakdown = [
                { item: "Setup tienda premium + diseño", price: 149990 },
                { item: "Carga masiva +1000 productos", price: 110000 },
                { item: "Panel admin + inventario/catálogo", price: 60000 },
                { item: "Integración de pagos", price: 29990 },
            ];
        }
    }

    // Add Logo Design as a separate item (Free value added)
    if (!state.hasLogo) {
        breakdown.unshift({ item: "Diseño de Logo Profesional (Bonificado)", price: 0 });
    }

    // Handle Hosting/Domain adjustment
    if (state.hasHosting) {
        breakdown.push({ item: "Abono por Hosting/Dominio propio", price: -19920 });
    }

    // Final check for adjustment to ensure total matches official plans
    const currentSum = breakdown.reduce((acc, curr) => acc + curr.price, 0);
    const finalTarget = state.hasHosting ? (total - 19920) : total;

    if (currentSum !== finalTarget) {
        breakdown.push({
            item: "Ajuste Pack NOWEB",
            price: finalTarget - currentSum,
        });
    }

    return { planKey, planName, total: finalTarget, breakdown };
};

export const buildWhatsappLink = (state: QuoteState, result: any) => {
    const message = `Hola NOWEB! 👋 Vengo de la web y me interesa el plan: *${result.planName}*

*Detalles de mi proyecto:*
- Tipo: ${state.type === 'web' ? 'Página Web' : 'Tienda Online'}
- Negocio: ${state.name || 'No especificado'}
- Ciudad: ${state.city || 'No especificado'}
- Instagram: ${state.instagram || 'No especificado'}
${state.type === 'web' ? `- Rubro: ${state.rubro}` : `- Productos: ${state.products}`}
- Objetivo: ${state.mainGoal}
- ¿Ya tiene clientes?: ${state.hasClients ? 'SÍ' : 'Aún no'}
- ¿Requiere Logo?: ${state.hasLogo ? 'Ya tiene' : 'SÍ (Gratis)'}
- ¿Tiene Hosting?: ${state.hasHosting ? 'SÍ (Abono aplicado)' : 'No (Incluido primer año)'}

*Descripción del proyecto:*
"${state.description || 'Sin descripción adicional'}"

*Total Cotizado: ${formatCLP(result.total)}*

¿Cómo podemos empezar?`;

    return `https://wa.me/56987843957?text=${encodeURIComponent(message)}`;
};
