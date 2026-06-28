function renderSidebar() {
    const body = document.body;
    const currentPath = window.location.pathname.split("/").pop() || "dashboard.html";

    const arrowIcons = {
        expand: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
        collapse: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`
    };
/** A DONDE NOS LLEVA Y CARACTERISTICAS DE LOS BOTONES EN EL SIDEBAR */
    const sidebarHTML = `
        <aside id="main-sidebar" class="sidebar-expanded">
            <div class="sidebar-header">
                <span class="logo-text">HorariosAca</span>
                <button id="toggle-sidebar" title="Toggle Menu">${arrowIcons.collapse}</button>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li><a href="dashboard.html" class="${currentPath === 'dashboard.html' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        <span data-i18n="side_management">Schedules</span>
                    </a></li>
                    <li><a href="plans.html" class="${currentPath === 'plans.html' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span data-i18n="side_plans">Upgrade Plan</span>
                    </a></li>
                    <li><a href="tutorials.html" class="${currentPath === 'tutorials.html' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        <span data-i18n="nav_tutorials">Tutorials</span>
                    </a></li>
                    <li><a href="settings.html" class="${currentPath === 'settings.html' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        <span data-i18n="side_settings">Account Settings</span>
                    </a></li>
                    <li><a href="trash.html" class="${currentPath === 'trash.html' ? 'active' : ''}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                        <span data-i18n="side_trash">Trash bin</span>
                    </a></li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <button id="logout-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    <span data-i18n="side_logout">Logout</span>
                </button>
            </div>
        </aside>
    `;

    body.insertAdjacentHTML('afterbegin', sidebarHTML);
    setupSidebarLogic(arrowIcons);

    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    applyTranslations(savedLang);
}

/** COSAS DE ICONOS DEL SIDEABR */
function setupSidebarLogic(icons) {
    const sidebar = document.getElementById('main-sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = sidebar.classList.contains('sidebar-expanded');
            if (isExpanded) {
                sidebar.classList.replace('sidebar-expanded', 'sidebar-collapsed');
                toggleBtn.innerHTML = icons.expand; 
            } else {
                sidebar.classList.replace('sidebar-collapsed', 'sidebar-expanded');
                toggleBtn.innerHTML = icons.collapse; 
            }
        });
    }
/** BOTON DE LOGOUT */
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            //  Guardamos el idioma antes de borrar todo
            const currentLang = localStorage.getItem("preferred_lang");

            //  Limpiamos los datos de sesión (usuario, tipo de plan, etc.)
            localStorage.clear();

            //  Restauramos el idioma para que el Home no salga en el idioma equivocado
            if (currentLang) {
                localStorage.setItem("preferred_lang", currentLang);
            }

            //  Redirigimos al Home
            window.location.href = "index.html";
        });
    }
}

document.addEventListener('DOMContentLoaded', renderSidebar);