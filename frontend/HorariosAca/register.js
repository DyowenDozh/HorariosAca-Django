// Referencias a elementos del formulario en el HTML
const registerForm = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const globalMessage = document.getElementById("globalMessage");


// Expresión regular corregida (requiere extensión de dominio válida, ej: .com, .org)
const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const upperRegex = /[A-Z]/;
const lowerRegex = /[a-z]/;
const symbolRegex = /[^A-Za-z0-9]/;

// Alternar visibilidad de las contraseñas
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const inputField = document.getElementById(targetId);
        const eyeIcon = this.querySelector('.eye-icon');
        
        if (inputField.type === "password") {
            inputField.type = "text";
            eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`;
        } else {
            inputField.type = "password";
            eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
        }
    });
});

// Evento de envío de formulario
registerForm.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const emailValue = emailInput.value.trim().toLowerCase();
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();
    let isValid = true;

    clearErrors();

    // 1. Validación estricta de formato de correo
    if (!emailRegex.test(emailValue)) {
        showError("email", getTxt("error_invalid_email") || "Invalid email address format");
        isValid = false;
    } 

    // 3. Validación de la complejidad de la contraseña
    if (passwordValue.length < 12) {
        showError("password", getTxt("error_password_length") || "Password must be at least 12 characters long");
        isValid = false;
    } else if (!upperRegex.test(passwordValue)) {
        showError("password", getTxt("error_password_uppercase") || "Password must include at least one uppercase letter");
        isValid = false;
    } else if (!lowerRegex.test(passwordValue)) {
        showError("password", getTxt("error_password_lowercase") || "Password must include at least one lowercase letter");
        isValid = false;
    } else if (!symbolRegex.test(passwordValue)) {
        showError("password", getTxt("error_password_symbol") || "Password must include at least one special character");
        isValid = false;
    }

    // 4. Validación de coincidencia de contraseñas
    if (passwordValue !== confirmPasswordValue) {
        showError("confirm-password", getTxt("error_password_mismatch") || "Passwords do not match");
        isValid = false;
    }

    if (isValid) {
        globalMessage.innerText = getTxt("msg_registering") || "Creating account...";
        globalMessage.style.color = "green";
    
        try {
            const res = await fetch("http://localhost:8000/api/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue,
                    nombre: emailValue.split('@')[0]
                })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                globalMessage.innerText = "Account created! Redirecting...";
                globalMessage.style.color = "green";
                setTimeout(() => window.location.href = "login.html", 1500);
    
            } else if (res.status === 409) {
                // Email ya registrado
                showError("email", data.error || "This email is already registered");
                globalMessage.innerText = "";
    
            } else {
                globalMessage.innerText = "Something went wrong. Try again.";
                globalMessage.style.color = "red";
            }
    
        } catch (err) {
            globalMessage.innerText = "Could not connect to server.";
            globalMessage.style.color = "red";
        }
    }
});

function showError(fieldId, message) { 
    const errorSpan = document.getElementById(`${fieldId}-error`);
    const inputField = document.getElementById(fieldId);
    
    if (errorSpan) {
        errorSpan.innerText = message;
        errorSpan.classList.add("visible");
    }
    if (inputField) {
        inputField.classList.add("input-error");
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-msg');
    const inputs = document.querySelectorAll('input');
    
    errorMessages.forEach(msg => msg.classList.remove('visible'));
    inputs.forEach(input => input.classList.remove('input-error'));
    globalMessage.innerText = "";
}