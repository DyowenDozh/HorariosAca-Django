import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from .models import Usuario

@csrf_exempt
def register(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    nombre = data.get('nombre', email.split('@')[0])

    if Usuario.objects.filter(email=email).exists():
        return JsonResponse({'error': 'Este email ya está registrado'}, status=409)

    Usuario.objects.create(
        email=email,
        password=make_password(password),
        nombre=nombre
    )
    return JsonResponse({'mensaje': 'Usuario creado correctamente'})

@csrf_exempt
def login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')

    try:
        usuario = Usuario.objects.get(email=email)
        if check_password(password, usuario.password):
            return JsonResponse({
                'user_name': usuario.nombre,
                'user_id': usuario.id
            })
        return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Email o contraseña incorrectos'}, status=401)