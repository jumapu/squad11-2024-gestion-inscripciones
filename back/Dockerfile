# Etapa de construcción
FROM maven:3.8.5-openjdk-17 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo pom.xml y descargar las dependencias
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR desde la etapa de construcción
COPY --from=build /app/target/tu-aplicacion.jar app.jar

# Exponer el puerto en el que tu aplicación escucha
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
