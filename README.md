# Comparativa Angular vs Vue — App de usuarios

App pequeña que consulta `https://jsonplaceholder.typicode.com/users` y muestra cada usuario en una tarjeta (nombre, correo, ciudad), con busqueda por nombre, boton favorito contador de favoritos, estado cargando y mensaje de error con reintento.


## Angular
```bash
cd angular-users
npm install
npx ng serve                  
npx ng test --watch=false     # prueba unitaria
```

## Vue
```bash
cd vue-users
npm install
npm run dev             
npx vitest run                # prueba unitaria
```
