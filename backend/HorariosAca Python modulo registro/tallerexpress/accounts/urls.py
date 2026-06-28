from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('usuarios/<int:usuario_id>/', views.get_usuario),
    path('usuarios/<int:usuario_id>/update/', views.update_usuario),
    path('usuarios/<int:usuario_id>/delete/', views.delete_usuario),
]