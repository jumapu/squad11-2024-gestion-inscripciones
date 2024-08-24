# Gestión de Inscripciones

Este proyecto es una aplicación para la gestión de inscripciones con Spring Boot.

## Requisitos Previos

- [Java 17]
- [intellij idea]

## Ejecución del Proyecto

### Configuración del Entorno

1. **Clona el Repositorio**

    ```bash
    git clone https://github.com/Frere-Luz/squad11-2024-gestion-inscripciones/new/develop-back-cristian?filename=README.md
    cd squad11-2024-gestion-inscripciones/back/
    ```

2. **Configura la Base de Datos DOCKER**

    Si usas Docker para MySQL, asegúrate de que el contenedor esté en funcionamiento:

    ```bash
    docker run --name mysql -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=squad -p 3306:3306 -d mysql:8
    ```

3. **Base de Datos LOCAL Configura el Archivo `application.properties`**

    Edita el archivo `src/main/resources/application.properties` o `application.yml` para asegurar que la URL de la base de datos y otras configuraciones sean correctas.

4. **Ejecuta la Aplicación**

    Usar intellij idea o ide de preferencia.
  
  
5. **Accede a la Aplicación**

    La aplicación debería estar disponible en `http://localhost:8080`.

   # Endpoints
   
    Autenticación y Registro

 
    Autenticación de usuario. Requiere un OBJECT(EMAIL,PASSWORD) en el cuerpo de la solicitud. Devuelve un JWT.
    

   ```bash
     POST /api/v1/auth/authentication 
    ```
    Registro de nuevo usuario. Requiere un OBJECT(EMAIL,PASSWORD,ROL(admin,student,mentor))  en el cuerpo de la solicitud. Devuelve un JWT.
   
    ```bash
      POST /api/v1/auth/register
    ```
    
    Acceso Basado en Roles

    Acceso para usuarios con el rol de administrador.
   
   ```bash
    GET /api/v1/admin
    ```

    Acceso para usuarios con el rol de mentor.
    
   ```bash
    GET /api/v1/mentor
    ```

    Acceso para usuarios con el rol de estudiante.

   ```bash
    GET /api/v1/student
    ```



# Registro de Administrador

```bash
/admin
```

**Guardar un Administrador**

 **POST**
 
 ```bash
 /admin/saveadmin
```

**Obtener Administrador**

**GET**
 
 ```bash
/admin/{username}
```

**Eliminar Administrador**

**DELETE**

```bash 
/admin/{id}
```

# Registro de Usuarios

```bash
/user
```

**Guardar un usuario.**

Por defecto se va a guardar como estudiante.

 **POST**
 
 ```bash
 /user/saveuser
```

**Obtener usuarios**

**GET**
 
 ```bash
/user/{username}
```

**Eliminar Usuarios**

**DELETE**

```bash 
/user/{id}
```

# Registro de Estudiantes

```bash
/student
```

**Guardar un Estudiante**

 **POST**
 
 ```bash
 /student/savestudent
```

**Obtener Estudiante**

**GET**
 
 ```bash
/student/{username}
```

**Eliminar Estudiante**

**DELETE**

```bash 
/student/{id}
```


# Registro de Mentor

```bash
/mentor
```

**Guardar un Mentor**

 **POST**
 
 ```bash
 /mentor/savementor
```

**Obtener Mentor**

**GET**
 
 ```bash
/mentor/{username}
```

**Eliminar Mentor**

**DELETE**

```bash 
/mentor/{id}
```
