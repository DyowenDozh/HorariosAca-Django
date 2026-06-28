/* REVISA SI ESTAMOS LOGUEADOS*/

function checkAuth() {
    const user = localStorage.getItem("user_name");
    if (!user) {
        window.location.href = "login.html";
    }
}

checkAuth();