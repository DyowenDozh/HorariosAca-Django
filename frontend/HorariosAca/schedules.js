/* SCHEDULE MANAGEMENT */
let userSchedules = [
    { id: 1, name: "Spring Semester 2026", date: "2026-02-15", grade: "10-A" },
    { id: 2, name: "Extracurricular Activities", date: "2026-03-10", grade: "N/A" }
];

// Función auxiliar para obtener textos traducidos en JS
function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    return translations[lang][key] || key;
}

function renderScheduleTable() {
    const container = document.getElementById('schedule-list-container');
    if (!container) return;

    if (userSchedules.length === 0) {
        container.innerHTML = `<p data-i18n="no_schedules_msg">No schedules found. Click the + button to create one.</p>`;
        return;
    }
 /** TABLA DE GESTION DE HORARIOS, ID NOMBRE, FECHA, y las acciones, borrar editar duplicar etc */
    const tableHTML = `
        <table class="schedule-table">
            <thead>
                <tr>
                    <th data-i18n="table_id">ID</th>
                    <th data-i18n="table_name">Name</th>
                    <th data-i18n="table_date">Created Date</th>
                    <th data-i18n="table_actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${userSchedules.map(schedule => `
                    <tr>
                        <td>#${schedule.id}</td>
                        <td><strong>${schedule.name}</strong></td>
                        <td>${schedule.date}</td>
                        <td class="table-actions">
                            <button onclick="viewDetails(${schedule.id})" data-i18n="btn_view" title="View">👁️</button>
                            <button onclick="editSchedule(${schedule.id})" data-i18n="btn_edit" title="Edit">✏️</button>
                            <button onclick="duplicateSchedule(${schedule.id})" data-i18n="btn_duplicate" title="Duplicate">👯</button>
                            <button onclick="downloadOptions(${schedule.id})" data-i18n="btn_download" title="Download">📥</button>
                            <button onclick="confirmDelete(${schedule.id})" data-i18n="btn_delete" title="Delete" class="btn-delete">🗑️</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = tableHTML;

    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    if (typeof applyTranslations === 'function') {
        applyTranslations(savedLang);
    }
}

// --- ACCIONES, duplicar horario, editar, borrar ---

function duplicateSchedule(id) {
    const original = userSchedules.find(s => s.id === id);
    const copySuffix = getTxt('text_copy'); 
    const newName = prompt(getTxt('prompt_duplicate_name'), `${original.name} ${copySuffix}`);
    
    if (userSchedules.some(s => s.name === newName)) {
        alert(getTxt('alert_duplicate_exists'));
        return;
    }

    if (newName) {
        const newSchedule = { 
            ...original, 
            id: Date.now(),
            name: newName, 
            date: new Date().toISOString().split('T')[0] 
        };
        userSchedules.push(newSchedule);
        renderScheduleTable(); 
        alert(getTxt('alert_duplicate_success'));
    }
}

function editSchedule(id) {
    const userType = localStorage.getItem("user_type");
    
    if (userType !== "premium") {
        const upgrade = confirm(getTxt('confirm_upgrade_premium'));
        if (upgrade) window.location.href = "plans.html";
        return;
    }
    
    openManualEditor(id);
}

function confirmDelete(id) {
    if (confirm(getTxt('confirm_delete_schedule'))) {
        userSchedules = userSchedules.filter(s => s.id !== id);
        renderScheduleTable(); 
        alert(getTxt('alert_delete_success'));
    }
}

function downloadOptions(id) {
    const type = prompt(getTxt('prompt_download_type'));
    const format = prompt(getTxt('prompt_download_format'));
    
    if (format && ["PDF", "JPG"].includes(format.toUpperCase())) {
        alert(`${getTxt('alert_generating')} ${format.toUpperCase()}...`);
    } else if (format) {
        alert(getTxt('alert_invalid_format'));
    }
}

function createNewSchedule() {
    const name = prompt(getTxt('prompt_new_schedule_name'));
    if (name) {
        const newSchedule = {
            id: Date.now(), 
            name: name,
            date: new Date().toISOString().split('T')[0],
            grade: getTxt('text_not_assigned')
        };
        userSchedules.push(newSchedule);
        renderScheduleTable(); 
    }
}

function generateSchedule() {
    if (localStorage.getItem("user_type") !== "premium") {
        alert(getTxt('alert_premium_only'));
        return;
    }
    alert(getTxt('alert_starting_engine'));
}

document.addEventListener('DOMContentLoaded', renderScheduleTable);