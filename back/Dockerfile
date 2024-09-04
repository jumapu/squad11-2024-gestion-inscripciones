FROM amazoncorretto:21-alpine-jdk

# Instalar MySQL y otras utilidades
RUN apk --no-cache add mysql mysql-client

# Directorio de trabajo
WORKDIR /app

# Copia el archivo JAR  aplicación
COPY GestionDeInscripciones-0.0.1.jar /app/app.jar

# Exponer puertos
#EXPOSE  8080

# script de inicialización
COPY init.sh /app/init.sh
RUN chmod +x /app/init.sh

init.sh
CMD ["/app/init.sh"]
