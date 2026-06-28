/**
 SUPPORT WHATSAPP & EMAIL
 */

// Función auxiliar
function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

function renderSupportWidget() {
    const body = document.body;
    // caracteristicas y links a donde llevan
    const widgetHTML = `
        <div id="support-wrapper">
            <div id="support-options" class="hidden">
                <a href="https://wa.me/573218878123" target="_blank" class="support-item whatsapp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
                    <span data-i18n="support_whatsapp">WhatsApp Chat</span>
                </a>
                <button id="email-support-btn" class="support-item email">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <span data-i18n="support_email_btn">Email Support</span>
                </button>
            </div>
            
            <button id="main-support-btn" data-i18n="support_help_btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span data-i18n="support_help_text">Help</span>
            </button>
        </div>

        <div id="support-modal" class="modal-hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 data-i18n="support_modal_title">Contact Support</h3>
                    <button id="close-modal">&times;</button>
                </div>
                <form id="support-form">
                    <input type="text" id="support-name" placeholder="Full Name" data-i18n-placeholder="support_ph_name" required>
                    <input type="email" id="support-email" placeholder="Email Address" data-i18n-placeholder="support_ph_email" required>
                    <input type="text" id="support-subject" placeholder="Subject" data-i18n-placeholder="support_ph_subject" required>
                    <textarea id="support-description" placeholder="Describe your problem..." data-i18n-placeholder="support_ph_desc" rows="4" required></textarea>
                    <div class="file-input">
                        <label for="support-attachment" data-i18n="support_attachments">Attachments (optional):</label>
                        <input type="file" id="support-attachment">
                    </div>
                    <button type="submit" id="send-support" data-i18n="support_btn_send">Send Request</button>
                </form>
            </div>
        </div>
    `;

    body.insertAdjacentHTML('beforeend', widgetHTML);
    setupSupportLogic();

    // Aplicar traducción inmediatamente después de inyectar
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof applyTranslations === 'function') {
        applyTranslations(savedLang);
    }
}

function setupSupportLogic() {
    const mainBtn = document.getElementById('main-support-btn');
    const options = document.getElementById('support-options');
    const emailBtn = document.getElementById('email-support-btn');
    const modal = document.getElementById('support-modal');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('support-form');

    mainBtn.addEventListener('click', () => options.classList.toggle('hidden'));

    emailBtn.addEventListener('click', () => {
        modal.classList.remove('modal-hidden');
        options.classList.add('hidden');
    });

    closeBtn.addEventListener('click', () => modal.classList.add('modal-hidden'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('send-support');
        const nameInput = document.getElementById('support-name').value.trim();
        
        submitBtn.innerText = getTxt('support_sending');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Mensaje de éxito traducido con el nombre del usuario
            const successMsg = getTxt('support_alert_success').replace('{{name}}', nameInput);
            alert(successMsg);
            
            form.reset();
            modal.classList.add('modal-hidden');
            submitBtn.innerText = getTxt('support_btn_send');
            submitBtn.disabled = false;
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', renderSupportWidget);