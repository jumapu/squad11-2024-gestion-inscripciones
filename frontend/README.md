## Table of Contents
1. [General Info] (#general-info)
2. [Technologies] (#technologies)
3. [Installation] (#installation)

### General Info
Sistema de Gestión del PoloIT - Squad 11

Es un sistema para Organizar, Acceder y Participar de toda la informacion del PoloIT. Tanto para los administradores como para los egresados invitados a participar y para los mentores que quieren anotarse.

## Tecnologias

Esta aplicación fue creada utilizando
# Node JS
https://nodejs.org/en/
Node.js v20.17.0

# React + Vite
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Agregamos librerias para los estilos:

# Tailwind
https://tailwindcss.com/docs/installation
Estos son los comandos:
npm install -D tailwindcss
npx tailwindcss init
Configuración:
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

# Material UI
https://mui.com/material-ui/getting-started/installation/

npm install @mui/material @emotion/react @emotion/styled

# Radix
https://www.radix-ui.com/themes/docs/overview/getting-started

npm install @radix-ui/themes

 Para comunicar con el backend usamos Axios
 # Axios
 https://axios-http.com/es/docs/intro

 $ npm install axios

 ## Instalación

 En cuanto al repositorio:

Crea una carpeta donde alojarlo en tu sistema
Luego clonas el repositorio:
 $ git clone https://github.com/Frere-Luz/squad1-inscripciones.git
 Una vez clonado te aseguras de estar parado en la carpeta correcta para descargar las dependencias y librerias. Y si es necesario te podes mover entre carpetas:

 cd ../camino-al-archivo-correspondiente

 Y para el resto:
 npm init // para iniciar Node
 npm install  // para instalar las dependencias
 npm run dev // para renderizarlas por pantalla
 npm run build // para crear las carpetas para pasar a producción
