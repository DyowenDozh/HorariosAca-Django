/* Account Settings */

function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

document.addEventListener('DOMContentLoaded', async () => {
    const savedLang = localStorage.getItem("preferred_lang") || 'en';
    setTimeout(() => {
        if (typeof applyTranslations === 'function') applyTranslations(savedLang);
    }, 50);

    await cargarDatosUsuario();

    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', manejarFormularioSettings);
    }
});

async function cargarDatosUsuario() {
    const userId = localStorage.getItem('user_id');

    try {
        const res = await fetch(`http://localhost:8000/api/auth/usuarios/${userId}/`);
        const data = await res.json();

        if (res.ok) {
            document.getElementById('user-id').value = data.id;
            document.getElementById('user-name').value = data.nombre;
            document.getElementById('user-email').value = data.email;
            document.getElementById('user-created-at').value = data.fecha_creacion;

            localStorage.setItem('user_name', data.nombre);
            localStorage.setItem('user_email', data.email);
        }
    } catch (err) {
        console.error('Error cargando datos del usuario:', err);
    }
}

async function manejarFormularioSettings(e) {
    e.preventDefault();

    const lang = localStorage.getItem("preferred_lang") || 'en';
    const userId = localStorage.getItem('user_id');
    const nuevoNombre = document.getElementById('user-name').value.trim();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
            alert(lang === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.');
            return;
        }
        if (newPassword.length < 12) {
            alert(lang === 'es' ? 'La contraseña debe tener al menos 12 caracteres.' : 'Password must be at least 12 characters.');
            return;
        }
    }

    const confirmar = confirm(lang === 'es'
        ? '¿Estás seguro de que deseas guardar los cambios?'
        : 'Are you sure you want to save the changes?');

    if (!confirmar) return;

    try {
        const res = await fetch(`http://localhost:8000/api/auth/usuarios/${userId}/update/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nuevoNombre,
                password: newPassword || null
            })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('user_name', nuevoNombre);
            alert(lang === 'es' ? 'Cambios guardados con éxito.' : 'Changes saved successfully.');
        } else {
            alert(data.error || 'Error al guardar cambios.');
        }
    } catch (err) {
        alert(lang === 'es' ? 'No se pudo conectar al servidor.' : 'Could not connect to server.');
    }
}

async function eliminarCuenta() {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    const userId = localStorage.getItem('user_id');
    const confirmar = confirm(lang === 'es'
        ? '¿Estás seguro de eliminar tu cuenta? Esta acción no se puede deshacer.'
        : 'Are you sure you want to delete your account? This cannot be undone.');

    if (!confirmar) return;

    try {
        const res = await fetch(`http://localhost:8000/api/auth/usuarios/${userId}/delete/`, {
        method: 'DELETE'
        });

        if (res.ok) {
            localStorage.clear();
            window.location.href = 'register.html';
        } else {
            alert(lang === 'es' ? 'Error al eliminar la cuenta.' : 'Error deleting account.');
        }
    } catch (err) {
        alert(lang === 'es' ? 'No se pudo conectar al servidor.' : 'Could not connect to server.');
    }
}