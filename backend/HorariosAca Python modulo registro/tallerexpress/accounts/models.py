from django.db import models

class Usuario(models.Model):
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=255)
    nombre = models.CharField(max_length=100)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        return self.email