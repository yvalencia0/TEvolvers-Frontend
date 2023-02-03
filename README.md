# Aplicación angular – Frontend

Enlace la aplicación desplegada https://tevolversapi.netlify.app/  


Esta aplicación esta desarrollada con el framework Angular, para la apariencia se utiliza Angular Material y por motivos de pruebas se utilizó json-server. Se implementa el patrón de arquitectura MVC y se separan las funcionalidades por componentes; adicionalmente se utiliza un servicio para consumir nuestro backend y hacer uso de las rutas dispuestas para impactar la base de datos.

## Puntos a tener en cuenta

Antes de empezar con el proceso de clonación del repositorio, debemos tener en cuenta los siguientes requisitos.
- Editor de texto para trabajar Angular(libre elección, se recomienda usar Visual Studio Code).
- Node.
- Angular cli.


Creamos una aplicación angular vacía a la que le habilitaremos el routing y utilizaremos scss para los estilos, posteriormente empezamos a clonar el repositorio en esa aplicación.

Instalamos Angular Material con la ayuda del comando **ng add @angular/material**

Ejecutamos la aplicación del Backend y visualizamos cual es el puerto que nos brinda en el navegador para consumir nuestra API y procedemos a modificar el archivo person.service.ts que se encuentra en la carpeta **services**. Ejemplo, si nuestra API se abre en el navegador con la URL **https://localhost:71010/swagger/index.html** en cada uno de los métodos en el archivo **person.service.ts** debemos reemplazar el **https://localhost:44348/api/People** por **https://localhost:71010/api/People**.

Ahora podemos ejecutar nuestra aplicación angular con la ayuda del comando **ng serve**
