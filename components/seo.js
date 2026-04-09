/**
 * SoftBridge Labs - Modular SEO & Meta Injector
 * Usage: <script src="/components/seo.js" data-title="..." data-desc="..." data-url="..." data-type="..."></script>
 * 
 * Automatically injects: canonical, OG tags, Twitter cards, theme-color, robots
 */
(function () {
    const script = document.currentScript;
    if (!script) return;

    const BASE_URL = 'https://softbridgelabs.in';
    const DEFAULT_IMAGE = BASE_URL + '/assets/og-image.jpg';
    const SITE_NAME = 'SoftBridge Labs';
    const TWITTER_HANDLE = '@softbridgelabs';
    const GA_ID = 'G-REJY59WGSQ';

    const title = script.dataset.title || SITE_NAME;
    const desc = script.dataset.desc || 'SoftBridge Labs builds high-performance software, AI experiences, and developer tools.';
    const url = script.dataset.url ? BASE_URL + script.dataset.url : BASE_URL + window.location.pathname;
    const type = script.dataset.type || 'website';
    const image = script.dataset.image ? BASE_URL + script.dataset.image : DEFAULT_IMAGE;
    const robots = script.dataset.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    const keywords = script.dataset.keywords || 'SoftBridge Labs, software engineering, mobile apps, developer tools, AI software, India';

    const head = document.head;

    function meta(attrs) {
        const el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        head.appendChild(el);
    }

    function link(attrs) {
        const el = document.createElement('link');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        head.appendChild(el);
    }

    // Set document title
    document.title = title;

    // Core meta
    meta({ name: 'description', content: desc });
    meta({ name: 'keywords', content: keywords });
    meta({ name: 'author', content: SITE_NAME });
    meta({ name: 'robots', content: robots });
    meta({ name: 'theme-color', content: '#4f46e5' });

    // Canonical
    link({ rel: 'canonical', href: url });

    // Open Graph
    meta({ property: 'og:type', content: type });
    meta({ property: 'og:site_name', content: SITE_NAME });
    meta({ property: 'og:url', content: url });
    meta({ property: 'og:title', content: title });
    meta({ property: 'og:description', content: desc });
    meta({ property: 'og:image', content: image });
    meta({ property: 'og:image:width', content: '1200' });
    meta({ property: 'og:image:height', content: '630' });
    meta({ property: 'og:image:alt', content: title });
    meta({ property: 'og:locale', content: 'en_IN' });

    // Twitter
    meta({ name: 'twitter:card', content: 'summary_large_image' });
    meta({ name: 'twitter:site', content: TWITTER_HANDLE });
    meta({ name: 'twitter:url', content: url });
    meta({ name: 'twitter:title', content: title });
    meta({ name: 'twitter:description', content: desc });
    meta({ name: 'twitter:image', content: image });
    meta({ name: 'twitter:image:alt', content: title });

    // Structured data injector
    window.SBL = window.SBL || {};
    window.SBL.injectSchema = function (schema) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.textContent = JSON.stringify(schema);
        head.appendChild(s);
    };

    // Organization schema (always present)
    window.SBL.injectSchema({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SoftBridge Labs",
        "alternateName": ["SoftBridge", "SoftBridge Labs India", "ProTec Games"],
        "url": BASE_URL,
        "logo": BASE_URL + "/assets/favicon.ico",
        "image": DEFAULT_IMAGE,
        "description": "SoftBridge Labs is a software engineering laboratory specializing in high-performance mobile apps, AI-powered developer tools, and open-source ecosystems.",
        "foundingDate": "2020",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Professor Colony",
            "addressLocality": "Etawah",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "206001",
            "addressCountry": "IN"
        },
        "identifier": {
            "@type": "PropertyValue",
            "name": "MSME Udyam Registration",
            "value": "UDYAM-UP-23-0029248"
        },
        "sameAs": [
            "https://www.facebook.com/softbridge.labs",
            "https://www.instagram.com/softbridge.labs/",
            "https://www.linkedin.com/company/softbridge-labs",
            "https://www.x.com/softbridge.labs",
            "https://www.youtube.com/@softbridge-labs",
            "https://github.com/softbridge-labs"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@softbridgelabs.in",
            "contactType": "customer support",
            "availableLanguage": ["English", "Hindi"]
        }
    });

    // BreadcrumbList injector
    window.SBL.breadcrumb = function (items) {
        window.SBL.injectSchema({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items.map((item, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "name": item.name,
                "item": BASE_URL + item.url
            }))
        });
    };

    // Google Analytics (deferred)
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    head.appendChild(gaScript);
})();
