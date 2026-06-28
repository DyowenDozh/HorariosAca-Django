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


@csrf_exempt
def get_usuario(request, usuario_id):
    if request.method != 'GET':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        usuario = Usuario.objects.get(id=usuario_id)
        return JsonResponse({
            'id': str(usuario.id),
            'nombre': usuario.nombre,
            'email': usuario.email,
            'fecha_creacion': usuario.fecha_creacion.strftime('%Y-%m-%d %H:%M:%S')
        })
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)


@csrf_exempt
def update_usuario(request, usuario_id):
    if request.method != 'PUT':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        usuario = Usuario.objects.get(id=usuario_id)
        data = json.loads(request.body)
        nombre = data.get('nombre')
        new_password = data.get('password')
        if nombre:
            usuario.nombre = nombre
        if new_password:
            usuario.password = make_password(new_password)
        usuario.save()
        return JsonResponse({'mensaje': 'Datos actualizados correctamente'})
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)


@csrf_exempt
def delete_usuario(request, usuario_id):
    if request.method != 'DELETE':
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    try:
        usuario = Usuario.objects.get(id=usuario_id)
        usuario.delete()
        return JsonResponse({'mensaje': 'Cuenta eliminada correctamente'})
    except Usuario.DoesNotExist:
        return JsonResponse({'error': 'Usuario no encontrado'}, status=404)