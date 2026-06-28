/* Plan Selection */

function getTxt(key) {
    const lang = localStorage.getItem("preferred_lang") || 'en';
    return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

function activatePlan(planType) {
    if (planType === 'premium') {
        const proceed = confirm(getTxt('confirm_premium_checkout'));
        
        if (proceed) {
            alert(getTxt('alert_payment_success'));
            localStorage.setItem("user_type", "premium");
            window.location.href = "dashboard.html";
        } else {
            alert(getTxt('alert_upgrade_cancelled'));
        }
    } else {
        localStorage.setItem("user_type", "basic");
        alert(getTxt('alert_basic_active'));
        window.location.href = "dashboard.html";
    }
}

function showPremiumDetails() {
    const details = getTxt('premium_details_title') + "\n\n" +
                  "1. " + getTxt('premium_feat_1') + "\n" +
                  "2. " + getTxt('premium_feat_2') + "\n" +
                  "3. " + getTxt('premium_feat_3');
    
    alert(details);
    /**creo que este es sencillo de entender, solo es la seleccioin de plan, pago y demas */
}