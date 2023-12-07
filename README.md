# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


++++++++++++++PASOS PARA INSTALAR EL PROYECTO DE REACT++++++++++++++++++++++++

1.- Tener instalado Node JS v20.8.0

2.- Descargar el Repositorio de Git Hub

3.- Ingresar a la carpeta del proyecto descargado e ingresar a la carpeta con el nombre React y dentro de esta ingresamos a la carpeta llama examenreact

4.- Dentro de la carpeta abrimos una terminal y ejecutamos el comando npm install para instalar todas las dependencias

5.- Y para ejecutar el servidor colocamos el siguiente comando npm run dev y en la misma terminal nos la pagina en la cual nos mostrara los datos

NOTA: En caso de que el proyecto se ejecute en otro puerto que no sea el 5173 tendremos que ir a la carpeta de la api "Node_api" y en el archivo app.js 
tendremos que cambiar el cors:

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

en especifico en esta linea de codigo donde dice localhost:5173 se cambiara el 5173 por el puerto en el que se inicio react y por ultimo guardamos y reiniciamos el servidor
para asegurarnos que los cambios fueron echos exitosamente