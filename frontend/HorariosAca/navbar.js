/**
 * NAVBAR MODULAR - HorariosAca
 */
function renderNavbar() {
    const navbarContainer = document.getElementById('main-navbar');
    if (!navbarContainer) return;

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    
    /*estos solo son iconos para no salirnos de los requerimientos que nos pidieron*/
    const icons = {
        home: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        register: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>`,
        login: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`,
        tutorials: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`
    };

    /** a donde nos lleva cada boton */
    const navHTML = `
        <nav class="nav-container">
            <div class="nav-logo">HorariosAca</div>
            <ul class="nav-links">
                <li><a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">${icons.home} <span data-i18n="nav_home">Home</span></a></li>
                <li><a href="register.html" class="${currentPath === 'register.html' ? 'active' : ''}">${icons.register} <span data-i18n="nav_register">Register</span></a></li>
                <li><a href="login.html" class="${currentPath === 'login.html' ? 'active' : ''}">${icons.login} <span data-i18n="nav_login">Login</span></a></li>
                <li><a href="tutorials.html" class="${currentPath === 'tutorials.html' ? 'active' : ''}">${icons.tutorials} <span data-i18n="nav_tutorials">Tutorials</span></a></li>
                
                <li class="lang-selector">
                    <button class="lang-btn" id="lang-switch">🌐 <span id="current-lang-text">ES / EN</span></button>
                    <div id="lang-dropdown" class="dropdown-hidden">
                        <button onclick="setLanguage('en')">English</button>
                        <button onclick="setLanguage('es')">Español</button>
                    </div>
                </li>
            </ul>
        </nav>
    `;

    navbarContainer.innerHTML = navHTML;
    
    // Sincronizar con el sistema de traducción
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof applyTranslations === "function") {
        applyTranslations(savedLang); 
    }
}

document.addEventListener('DOMContentLoaded', renderNavbar);