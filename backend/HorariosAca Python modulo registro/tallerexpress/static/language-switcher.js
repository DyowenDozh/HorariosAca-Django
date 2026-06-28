function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    return key;
}

/* Procesa el cambio de idioma y actualiza */
function setLanguage(lang) {
    localStorage.setItem("preferred_lang", lang);
    applyTranslations(lang);
    
    const dropdown = document.getElementById('lang-dropdown');
    if (dropdown) dropdown.classList.add('dropdown-hidden');
}

/* Recorre el DOM para traducir elementos con atributos data-i18n */
/* data-i18n debe ser anadido a todo lo que va a ser traducido */
function applyTranslations(lang) {
    if (typeof translations === 'undefined') {
        console.error("El archivo translations.js no ha sido cargado.");
        return;
    }

    // Traducir textos internos y TItulos
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Casos raros Elementos que usan 'title' (como el botn + o el de ayuda)
            if (el.id === 'add-schedule-btn' || el.id === 'main-support-btn' || el.hasAttribute('title')) {
                el.setAttribute('title', translations[lang][key]);
                const span = el.querySelector('span');
                if (span) span.innerText = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    // Traduce Placeholders de formularios INPUTs y TEXTAREAs
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Actualizar el texto del botn selector de idioma
    const btnText = document.getElementById('current-lang-text');
    if (btnText) {
        btnText.innerText = lang === 'en' ? 'English' : 'Español';
    }
}

/* Manejo de eventos para el menú desplegable */
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('lang-dropdown');
    if (!dropdown) return;

    // Si hace click en el switch, alterna la visibilidad
    if (e.target.closest('#lang-switch')) {
        dropdown.classList.toggle('dropdown-hidden');
    } else {
        // Si hace click fuera, cierra el menú
        dropdown.classList.add('dropdown-hidden');
    }
});

/*Inicialización al cargar el DOM */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    applyTranslations(savedLang);
});