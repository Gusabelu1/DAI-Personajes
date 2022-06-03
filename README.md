# Bienvenido a DAI Personajes

Bienvenido a nuestro TP de DAI Personajes, en este ReadMe vamos a detallar como correr y usar el programa.

## Autores
+ Octavio M. Guerra
+ Facundo Vilamowski
+ Santino Castro

# Dependencias
+ MSSQL
+ Node v16.15.x

# Como Usar
1. Clonar repositorio con `git clone https://github.com/Gusabelu1/DAI-Personajes.git`.
2. Abrir con algún editor de texto. Ej.: Visual Studio Code.
3. Crear la base de datos con el archivo provisto (CreateDatabase.sql)
4. Importar Requests con (CTRL + O) en Postman con el archivo provisto (DAI.postman_collection.json)
5. Instalar dependencias del proyecto con `npm i`.
6. Correr proyecto con `npm start`.
7. Copiar y Pegar el archivo **.env.bak**, remover el **.bak** y poner las variables requeridas.
8. Utilizar la API ;)

# End-Points

## Auth
### Login
En el endpoint `/auth/login` podrás obtener un Token que lo vas a poder reemplazar por una variable en Postman y te servirá para usar el resto de endpoints.

## Characters
Endpoints `/characters` correspondientes a las Request incluidas en Postman.
### GetAll [Get]
Te devuelve todos los personajes, se pueden filtrar por: 
+ Nombre
+ Edad
+ Peso
+ Serie

### GetById [Get]
Te devuelve el personaje con el Id especificado.

### Create [Post]
Enviando los parámetros necesarios, podrás crear un nuevo personaje en la base de datos. El Id no es necesario, es Auto-Incremental.

### Update [Post]
Podrás cambiar parámetros de un personaje mediante el Id especificado.

### Delete [Delete]
Podrás eliminar un personaje de la base de datos mediante el Id especificado.


## Series
Endpoints `/series` correspondientes a las Request incluidas en Postman.
### GetAll [Get]
Te devuelve todas las series, se pueden filtrar por: 
+ Titulo
+ Orden (Ascendiente o Descendiente)

### GetById [Get]
Te devuelve la serie con el Id especificado.

### Create [Post]
Enviando los parámetros necesarios, podrás crear una nueva serie en la base de datos. El Id no es necesario, es Auto-Incremental.

### Update [Post]
Podrás cambiar parámetros de una serie mediante el Id especificado.

### Delete [Delete]
Podrás eliminar una serie de la base de datos mediante el Id especificado.
