/* Trash */

function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

// Simulated Deleted Schedules DB
let deletedSchedules = []; 

function renderTrashTable() {
    const container = document.getElementById('trash-list-container');
    if (!container) return;

    // CHECK SI VACIO
    if (deletedSchedules.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="empty-icon">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <p class="opaque-text" data-i18n="trash_empty">No deleted schedules yet.</p>
            </div>
        `;
        return;
    }

    // SI HAY ELIMINADOS
    const tableHTML = `
        <table class="schedule-table">
            <thead>
                <tr>
                    <th data-i18n="table_id">ID</th>
                    <th data-i18n="table_name">Name</th>
                    <th data-i18n="table_date_deleted">Deleted Date</th>
                    <th data-i18n="table_actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${deletedSchedules.map(item => `
                    <tr>
                        <td>#${item.id}</td>
                        <td><strong>${item.name}</strong></td>
                        <td>${item.date}</td>
                        <td class="table-actions">
                            <button onclick="recoverSchedule(${item.id})" data-i18n="btn_recover_title" title="Recover Schedule">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#564AC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                <span data-i18n="btn_restore">Restore</span>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;

    // Aplicar traducción después de renderizar
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof applyTranslations === 'function') {
        applyTranslations(savedLang);
    }
}

function recoverSchedule(id) {
    const scheduleToRecover = deletedSchedules.find(s => s.id === id);
    if (scheduleToRecover) {
        // Usamos getTxt para la alerta bilingüe
        const msg = getTxt('alert_restore_success').replace('{{name}}', scheduleToRecover.name);
        alert(msg);
        
        deletedSchedules = deletedSchedules.filter(s => s.id !== id);
        renderTrashTable();
    }
}

document.addEventListener('DOMContentLoaded', renderTrashTable);