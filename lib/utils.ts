import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WEB_PRICES, IA_PRICES, APP_PRICES } from "@/config/pricing";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCLP = (num: number) => {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(num).replace(/,/g, ".");
};

export interface QuoteState {
    category: "web" | "ia" | "app";
    type: string; // Subtipo (Web: pagina, ecommerce | IA: basica, intermedia, avanzada | App: mvp, pro, premium)
    subtype?: string; // Para ecommerce (mini, full) o presets de web (fastpage, focus, inmobiliaria)

    // Web common
    rubro: string;
    catalog: boolean;
    ads: boolean;
    products: string;
    inventory: boolean;
    hasLogo: boolean;
    hasHosting: boolean;

    // IA specific
    extraChannels: number;
    apiIntegrations: 'none' | '1' | '2-3';
    hasAgenda: boolean;
    hasAnalytics: boolean;

    // App specific
    appModules: string[];
    screensRange: '3-5' | '6-10' | '11-20';

    // Info Usuario
    name?: string;
    city?: string;
    instagram?: string;
    mainGoal: string;
    description?: string;
    hasClients: boolean;
}

export const recommendPlan = (state: QuoteState) => {
    let planName = "";
    let total = 0;
    let breakdown: { item: string; price: number }[] = [];
    let categoryLabel = "";

    if (state.category === "web") {
        categoryLabel = "Desarrollo Web";
        if (state.type === "ecommerce") {
            if (state.subtype === "ecommerce_full" || state.inventory || state.products !== "1–30") {
                planName = "E-commerce FULL";
                total = WEB_PRICES.ECOMMERCE_FULL;
                breakdown = [
                    { item: "Setup tienda premium + diseño", price: 149990 },
                    { item: "Carga masiva +1000 productos", price: 110000 },
                    { item: "Panel admin + inventario/catálogo", price: 60000 },
                    { item: "Integración de pagos", price: 29990 },
                ];
            } else {
                planName = "Mini ecommerce";
                total = WEB_PRICES.MINI_ECOMMERCE;
                breakdown = [
                    { item: "Setup tienda + diseño", price: 109990 },
                    { item: "Integración de pagos (Webpay/MP/PayPal)", price: 39990 },
                    { item: "Catálogo hasta 30 productos", price: 30000 },
                    { item: "Correos corporativos", price: 20000 },
                ];
            }
        } else {
            // Página Web Presets
            if (state.subtype === "inmobiliaria") {
                planName = "Sitio Inmobiliaria / Catálogo";
                total = WEB_PRICES.INMOBILIARIA;
                breakdown = [
                    { item: "Diseño multipágina premium + responsive", price: 119990 },
                    { item: "Módulo Catálogo/Galería autoadministrable", price: 60000 },
                    { item: "Formularios + WhatsApp + CTA estratégicos", price: 29990 },
                    { item: "Correos corporativos", price: 19990 },
                    { item: "SEO/velocidad base", price: 20030 },
                ];
            } else if (state.subtype === "landing_focus") {
                planName = "Landing Focus+";
                total = WEB_PRICES.LANDING_FOCUS;
                breakdown = [
                    { item: "Base Fastpage (Diseño + Estructura)", price: 149890 },
                    { item: "Copy + estructura de conversión", price: 30000 },
                    { item: "Configuración de 1 anuncio conectado", price: 20090 },
                ];
            } else {
                planName = "Fastpage";
                total = WEB_PRICES.FASTPAGE;
                breakdown = [
                    { item: "Diseño + estructura (1 página)", price: 89990 },
                    { item: "WhatsApp + redes + CTA", price: 19990 },
                    { item: "Correos corporativos", price: 19990 },
                    { item: "Dominio + hosting 1er año", price: 19920 },
                ];
            }
        }

        if (!state.hasLogo) breakdown.unshift({ item: "Diseño de Logo Profesional (Bonificado)", price: 0 });
        if (state.hasHosting) breakdown.push({ item: "Abono por Hosting/Dominio propio", price: WEB_PRICES.HOSTING_OFFSET });

    } else if (state.category === "ia") {
        categoryLabel = "Automatización IA";
        if (state.type === "avanzada") {
            planName = "IA Avanzada (Funnels)";
            total = IA_PRICES.AVANZADA;
            breakdown = [
                { item: "Diseño de flujos + Prompts avanzados", price: 600000 },
                { item: "Entrenamiento con base de datos propia", price: 490000 },
                { item: "Agentes autónomos + Multicanal", price: 500000 },
            ];
        } else if (state.type === "intermedia") {
            planName = "IA Intermedia (Agentes)";
            total = IA_PRICES.INTERMEDIA;
            breakdown = [
                { item: "Diseño de flujos + Agentes IA", price: 379980 },
                { item: "Entrenamiento personalizado", price: 250000 },
                { item: "Integración con canales", price: 150000 },
            ];
        } else {
            planName = "IA Básica (Chatbot)";
            total = IA_PRICES.BASICA;
            breakdown = [
                { item: "Setup Chatbot WhatsApp", price: 199990 },
                { item: "Entrenamiento con info básica", price: 100000 },
                { item: "Flujo de atención automática", price: 100000 },
            ];
        }

        if (state.extraChannels > 0) {
            breakdown.push({ item: `Canal extra (${state.extraChannels} canales)`, price: IA_PRICES.EXTRA_CHANNEL * state.extraChannels });
        }
        if (state.apiIntegrations === '1') {
            breakdown.push({ item: "Integración con 1 API", price: IA_PRICES.INTEGRATION_1_API });
        } else if (state.apiIntegrations === '2-3') {
            breakdown.push({ item: "Integración con 2-3 APIs", price: IA_PRICES.INTEGRATION_2_3_API });
        }
        if (state.hasAgenda) breakdown.push({ item: "Agenda / Derivación a humano", price: IA_PRICES.AGENDA_HUMAN });
        if (state.hasAnalytics) breakdown.push({ item: "Panel de analítica simple", price: IA_PRICES.ANALYTICS });

    } else if (state.category === "app") {
        categoryLabel = "Desarrollo App Móvil";
        let basePrice = 0;
        if (state.type === "premium") {
            planName = "App Premium";
            basePrice = APP_PRICES.BASE_PREMIUM;
        } else if (state.type === "pro") {
            planName = "App Profesional";
            basePrice = APP_PRICES.BASE_PRO;
        } else {
            planName = "App MVP";
            basePrice = APP_PRICES.BASE_MVP;
        }

        breakdown.push({ item: `Base ${planName} (Estimado)`, price: basePrice });

        if (state.appModules.includes('auth')) breakdown.push({ item: "Autenticación (Social Login)", price: APP_PRICES.MODULES.AUTH });
        if (state.appModules.includes('push')) breakdown.push({ item: "Notificaciones Push", price: APP_PRICES.MODULES.PUSH });
        if (state.appModules.includes('payments')) breakdown.push({ item: "Integración de Pagos", price: APP_PRICES.MODULES.PAYMENTS });
        if (state.appModules.includes('geo')) breakdown.push({ item: "Geolocalización", price: APP_PRICES.MODULES.GEOLOCALIZATION });
        if (state.appModules.includes('chat')) breakdown.push({ item: "Chat interno", price: APP_PRICES.MODULES.CHAT });
        if (state.appModules.includes('admin')) breakdown.push({ item: "Panel Admin Web", price: APP_PRICES.MODULES.ADMIN_PANEL });
        if (state.appModules.includes('stores')) breakdown.push({ item: "Publicación en Stores", price: APP_PRICES.MODULES.STORES_PUBLISHING });

        if (state.screensRange !== '3-5') {
            breakdown.push({ item: `Alcance: ${state.screensRange} pantallas`, price: APP_PRICES.SCREENS[state.screensRange] });
        }
    }

    const currentSum = breakdown.reduce((acc, curr) => acc + curr.price, 0);
    total = currentSum;

    return { planName, total, breakdown, categoryLabel };
};

export const buildWhatsappLink = (state: QuoteState, result: any) => {
    let specificInfo = "";
    if (state.category === "web") {
        specificInfo = `- Tipo: ${state.type === 'pagina' ? 'Página Web' : 'Tienda Online'}\n${state.type === 'pagina' ? `- Rubro: ${state.rubro}` : `- Productos: ${state.products}`}`;
    } else if (state.category === "ia") {
        specificInfo = `- Nivel IA: ${result.planName}\n- Canales: ${1 + (state.extraChannels || 0)}\n- Integraciones: ${state.apiIntegrations}`;
    } else if (state.category === "app") {
        specificInfo = `- Nivel App: ${result.planName}\n- Pantallas: ${state.screensRange}\n- Módulos: ${(state.appModules || []).join(', ')}`;
    }

    const message = `Hola NOWEB! 👋 Vengo de la web y me interesa: *${result.planName}* (${result.categoryLabel})

*Detalles de mi proyecto:*
${specificInfo}
- Nombre/Negocio: ${state.name || 'No especificado'}
- Ciudad: ${state.city || 'No especificado'}
- Objetivo: ${state.mainGoal}
- ¿Ya tiene clientes?: ${state.hasClients ? 'SÍ' : 'Aún no'}

*Descripción del proyecto:*
"${state.description || 'Sin descripción adicional'}"

*Total Cotizado: ${formatCLP(result.total)}*

¿Cómo podemos empezar?`;

    return `https://wa.me/56987843957?text=${encodeURIComponent(message)}`;
};
