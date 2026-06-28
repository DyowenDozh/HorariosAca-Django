// Referencias a elementos del formulario en el HTML
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const globalMessage = document.getElementById("globalMessage");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

loginForm.addEventListener("submit", async function(e) {
    e.preventDefault(); 

    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    let isValid = true;

    clearErrors();

    if (!emailRegex.test(emailValue)) {
        showError("email", "Invalid email address format");
        isValid = false;
    }

    if (passwordValue.length < 1) {
        showError("password", "Password is required");
        isValid = false;
    }

    if (isValid) {
        try {
            const res = await fetch("http://localhost:8000/api/auth/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                localStorage.setItem("user_name", data.user_name);
                localStorage.setItem("user_id", data.user_id);
                globalMessage.innerText = "Authenticating...";
                globalMessage.style.color = "green";
                setTimeout(() => window.location.href = "/dashboard/", 1500);
    
            } else {
                globalMessage.innerText = data.error || "Invalid email or password.";
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