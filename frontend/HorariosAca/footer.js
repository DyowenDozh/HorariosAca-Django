/* FOOTER MODULAR */
function renderFooter() {
    const footerContainer = document.getElementById('main-footer');
    if (!footerContainer) return;

    const footerHTML = `
        <div class="footer-content">
            <p>&copy; 2026 HorariosAca. <span data-i18n="footer_rights">All rights reserved.</span> 
               <a href="terms.html" class="footer-link" data-i18n="terms_main_title">Terms and Conditions</a>
            </p>
        </div>
    `;

    footerContainer.innerHTML = footerHTML;

    // TRANSLATE
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof applyTranslations === "function") {
        applyTranslations(savedLang); 
    }
}

document.addEventListener('DOMContentLoaded', renderFooter);