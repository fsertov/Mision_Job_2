Readme mision-job-users

1.0 Creacion app en Heroku: mision-job-users

Host
ec2-34-193-113-223.compute-1.amazonaws.com

Database
d8oiko0kc5fnn

User
hngfxpsktyzcub

Port
5432

Password
85b0cf839a0fcbc2241125d7c3113ab93ec77d604f6fc2c8aea7248e7b1d011c

URI
postgres://hngfxpsktyzcub:85b0cf839a0fcbc2241125d7c3113ab93ec77d604f6fc2c8aea7248e7b1d011c@ec2-34-193-113-223.compute-1.amazonaws.com:5432/d8oiko0kc5fnn

Heroku CLI
heroku pg:psql postgresql-transparent-68533 --app mision-job-users


2.0 Cliente local de base de datos Postgres

* Se instalará TablePlus.
* Se crea la conexion con la base de datos en Heroku


3.0 Crear Proyecto

Crear entorno virtual en Python   python -m venv env
Activar el entorno: env\Scripts\activate

*Instalar: 
pip install django 
pip install djangorestframework

* Crear Proyecto
django-admin startproject "projectName"

* Insertar DjangoREST framework como una app instalada del proyecto, añadiendo:
 'rest_framework' a la lista de Installed _apps en settings
 
4.0 Crear App

* django-admin startapp appName

* Configurar el proyecto para que reconozca la app y pueda mapear una URL a su funcionalidad en el 
archivo urls.py. 
en el archivo settings.py dentro de la carpeta usersProject y debe editar la lista INSTALLED APPS:
añadiendo esta vez la cadena ‘usersApp’

5.0 Ejecutar el microservico

python manage.py runserver

6.0 Base de datos

Eliminar: db.sqlite3  que se crea por defecto

* instalar el paquete psycopg2, el cual se encarga de administrar la conexión con la bd. 
Para su instalación se utiliza el comando pip install psycopg2

* configurar el proyecto. Para ello, en el archivo settings.py
dentro de la carpeta usersProject, se busca la variable DATABASES:

* siempre que se haga un cambio en el modelo de los datos del proyecto, se deben utilizar dos comandos
 para actualizar la base de datos: 
 python manage.py makemigrations
 python manage.py migrate
 Ya que esta es la primera conexión con la base de datos y no se ha hecho ningún cambio en el modelo
 de datos, solo por esta vez, se va a utilizar únicamente el comando 
 python manage.py migrate
 en futuros cambios, siempre se van a utilizar ambos comandos, uno seguido por el otro:

7.0 CORRER NUEVAMENTE EL PROYECTO

8.0 Instalación y configuración de Simple JWT

	pip install djangorestframework-simplejwt

En settings:

* importar la librería timedelta:
	from datetime import timedelta

* Configurar de los tokens que utilizará el microservicio. Para ello, se
crea la variable SIMPLE_JWT

SIMPLE_JWT = {
	'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
	'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
	'ROTATE_REFRESH_TOKENS': False,
	'BLACKLIST_AFTER_ROTATION': True,
	'UPDATE_LAST_LOGIN': False,
	'ALGORITHM': 'HS256',
	'USER_ID_FIELD': 'id',
	'USER_ID_CLAIM': 'user_id',
}

* indicar al proyecto Django REST framewor que utilice Simple JWT dentro de su sistema de autenticación. 
se crea la variable REST_FRAMEWORK y se asigna como valor un diccionario que configura las clases que se utilizan para
autenticar a los usuarios:

REST_FRAMEWORK = {
	'DEFAULT_PERMISSION_CLASSES': (
		'rest_framework.permissions.AllowAny',
	),
	'DEFAULT_AUTHENTICATION_CLASSES': (
		'rest_framework_simplejwt.authentication.JWTAuthentication',
	)
}

9.0 Implementación y registro del modelo

En el archivo models.py dentro de la carpeta usersApp

10.0 
Una vez se ha creado el modelo a utilizar, este se debe registrar para que Django REST framework lo utilice
como el modelo de usuario del sistema de autenticación que provee. Dicho registro consiste en 2 procesos, el
primero es 
registrarlo en la aplicación usersApp

	from django.contrib import admin
	from .models import misionJobUser

	admin.site.register(misionJobUser)

y el segundo es registrarlo en las configuraciones del proyecto. Settings

AUTH_USER_MODEL = 'usersApp.bankUser'

11.0 Actualizar las tablas de la base de datos

Con la creación y asignación del modelo que se hizo anteriormente, las tablas y relaciones de la bases de
datos del microservicio se ven modificadas. Por esta razón, es necesario actualizar las tablas de la base de
datos con los comandos makemigrations y migrate.
Normalmente, cuando se hace un cambio en los modelos de la base de datos, solo se deben utilizar los 2
comandos mencionados anteriormente. Sin embargo, en esta ocasión se hizo una modificación sobre las tablas
y relaciones creadas por defecto por Django REST framework. Por lo cual, para evitar errores futuros en el
almacenamiento de los datos, es necesario borrar las tablas en la base de datos y posteriormente actualizar
los cambios en la base de datos.

1. Borrar carpeta migrations en usersApp
2. Comentar 'django.contrib.admin' en settings.py y "path('admin/', admin.site.urls)" en urls.py
3. Ejecutar python -m manage migrate, 
python -m manage makemigrations
4. Descomentar las líneas del paso 2
5. Existen muchas formas de borrar la información de la base de datos, sin embargo, en este caso se utilizarán 4 comandos en 
consola que se encargan de ello. Estos comandos son:

1. python manage.py migrate admin zero
2. python manage.py migrate auth zero
3. python manage.py migrate contenttypes zero
4. python manage.py migrate sessions zero

Ahora, para registrar los cambios con los nuevos modelos se utilizan los comandos que normalmente se
utilizan: 
	python manage.py makemigrations usersApp
	python manage.py migrate
	

12.0 Implementación de las vistas y registro en el controlador

Una vez se ha terminado la configuración del modelo de usuario, ya se pueden utilizar en el controlador las
vistas que trae el paquete Simple JWT por defecto. Sin embargo, para el caso de estudio es necesario editar
una de estas vistas para que no solo indique si un access token es válido o no, sino para que en caso de que
este sea válido, devuelva el id del usuario al que pertenece dicho token.

13.0 Registar las vistas en el Controlador

para registrar las vistas del microservicio en el controlador, se debe dirigir al archivo urls.py que se
encuentra dentro de la carpeta usersProject.


14.0 Crear usuarios y probar el microservicio

	python manage.py createsuperuser
Ejecutar el servidor:  python manage.py runserver


DESPLIEGUE

1.0 Instalar Paquetes

pip install gunicorn
pip install django-heroku

2.0 Configuraciones

Al final del archivo settings.py se deben agregar las siguientes líneas de código:
	import django_heroku
	django_heroku.settings(locals())
La primera línea permite hacer uso del paquete y en la segunda, registra el proyecto para el proceso
de despliegue.

3.0 Crear Los requerimientos

4.0 Crear el dockerfile para cargar la imagen

5.0 Iniciar sesion en Heroku

heroku login

6.0 Creacion de la imagen

Docker se debe estar ejecutando, conectar la consola con el servicio de Docker de Heroku:
	heroku container:login

Crear imagen:
	heroku container:push web –-app nombre-app
	
Desplegar
	heroku container:release web --app nombre-app
	
Pruebas del Microservicio

https://mision-job-users.herokuapp.com/

Obtener Token: POST

https://mision-job-users.herokuapp.com/token/

	{
		"username": "Fernando Serrano",
		"password": "password"
	}

Validar Token: POST  

https://mision-job-users.herokuapp.com/token/verify

	{
	 "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4ODc0MzIwLCJqdGkiOiI0MTdkZTFkZTk3MmI0NTE4OTlhNzkzODc0OTk3NzUzZSIsInVzZXJfaWQiOjF9.bmmTc30CCy6E49EpIt8o5OkKnAu5Bw_ayVguURy9D6w"
	}

Refrescar Token: Post 

https://mision-job-users.herokuapp.com/token/refresh/

	 {
	 "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYyODk2MDQyMCwianRpIjoiZDBlZWM0ZjEwNTRhNDA0ZmExYTM3NjhhZTcyY2NjNzciLCJ1c2VyX2lkIjoxfQ.zqmikPUuInTiLllWqd2JWF1_IRzMJr26KT-CFWcmEvk"

	 } 

API GATEWAY


