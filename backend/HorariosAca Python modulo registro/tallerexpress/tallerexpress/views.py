from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def login_view(request):
    return render(request, 'login.html')

def register_view(request):
    return render(request, 'register.html')

def dashboard_view(request):
    return render(request, 'dashboard.html')

def settings_view(request):
    return render(request, 'settings.html')

def plans_view(request):
    return render(request, 'plans.html')

def terms_view(request):
    return render(request, 'terms.html')

def trash_view(request):
    return render(request, 'trash.html')