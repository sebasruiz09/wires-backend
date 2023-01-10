# **Backend technical test**

## **Lenguages**

-   typescript ✓
-   https://www.typescriptlang.org/

## **Frameworks**

-   nestjs ✓
-   https://nestjs.com/

## **Librerias**

Posee libertad de agregar librerias que ayuden al desarrollo de la aplicacion,
sin embargo debe sustentar su uso especificando las razones por la cual se usan esas librerias

# **Social Wires Backend**

Social wires es una red social en la cual las personas publican mensajes , y las demas personas podran reaccionar a estos, asi como tambien podran comentar a estas publicaciones

Para lo cual se disponen 3 modulos en la aplicacion

```bash

- app
├── common
├── messages
└── auth
```

### **Estructura de modulos**

se recomienda usar la siguiente estructura en cada uno de sus modulos, posee libertad de elegir otra sin embargo debe sustentar las razones por las cuales usar dicha estructura

```bash
-module
├── interfaces
├── types
├── guards
├── pipes
├── decorators
├── helpers
├── dto
├── services
├── app.module.ts
└── app.controller.ts
```

### **Contruccion de base de datos**

Para la construccion de base de datos , se debera contruir en un archivo `docker.compose ` y guardar el volumen en el directorio raiz del proyecto

```bash
- ./postgres:/var/lib/postgresql/data
```

se recomienda el uso de postgres , pero puede usar la de su preferencia tanto `SQL` como `NO-SQL`

<br />
<br/>

# **Auth module**

En este modulo se gestionara todo lo relacionado a los usuarios y permisos de autenticacion

## **signup**

_POST - wires/auth/signup_

**Body**:

-   username : string,
-   email : string,
-   password : string,
-   fullname : string

<br/>

adicional debe manejar la columna _`created_at`_ a nivel de base de datos de tipo timestamp , en lo posible con zona horaria `timestamptz` la cual al
momento de crear un registro guarde la fecha exacta en que fue registrado. `Esto para todas las entidades`

**Request**

```
http://example.com/wires/auth/signup
```

**Response**

```bash
{
  "id": "e207fee6-7542-4311-8646-d12e1fde3baa",
  "username": "example",
  "email": "example@gmail.com",
  "fullname": "exam example"
}
```

<br />

## **signin**

_POST - wires/auth/signin_

**Body**:

-   username : string
-   password : string

**Request**

```
http://example.com/wires/auth/signin
```

**Response**:

```bash
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImV4YW1wbGUiLCJ1c2VySWQiOiJlMjA3ZmVlNi03NTQyLTQzMTEtODY0Ni1kMTJlMWZkZTNiYWEiLCJpYXQiOjE2NzMzNjE5ODMsImV4cCI6MTY3MzQ0ODM4M30.W5h2VzR3UlHSQDNX8ktJmOzoD0fhZyUuD85XrDQpt7g",
    "expires_in": "1d",
    "message": "Successfully logged in",
    "status": true
}
```

se debe manejar un token de autorizacion para los demas endpoints, el cual debe tener un tiempo de expiracion **definido** y debe ser pasada como **bearer** token autorization en cada peticion

<br />
<br />

# **Messages Module**

En este modulo se gestionara todo lo relacionado a los mensajes escritos por los usuarios,y demas funcionalidades con respecto a estos

## **Create Message**

_POST wires/messages_

**Body**:

-   title : string
-   content : string

se le pasara el id del usuario interceptando la peticion , e inyectando el campo obtenido por medio del usuario autorizado para la peticion

**Request**

```
http://example.com/wires/messages
```

**Response**:

```bash
{
    "id": "3",
    "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
    "title": "new messages",
    "text": "this is a desc message",
    "comments" : [],
    "reactions" : [],
    "createdAt": "2023-01-10",
}
```

<br />

## **Get all messages**

_GET wires/messages_

retorna un arreglo de todos los mensajes registrados en social wires

**Request**

```
http://example.com/wires/messages
```

**Response**:

```bash
[
    {
        "id": "3",
        "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
        "title": "new messages",
        "text": "this is a desc message",
        "comments" : [],
        "reactions" : [],
        "createdAt": "2023-01-10",
    }
]
```

<br />

## **Get my messages**

_GET wires/messages/me_

retona un arreglo de los mensajes enviados por el usuario autorizado

**Request**

```
http://example.com/wires/messages/me
```

**Response**:

```bash
[
    {
        "id": "4",
        "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
        "title": "my messages",
        "text": "this is a desc for my message",
        "comments" : [],
        "reactions" : [],
        "createdAt": "2023-01-11",
    }
]
```

<br />

## **Get only message by id**

_GET wires/messages/me/${id}_

**Params**:

-   id : number

retorna un mensaje encontrado por su id

**Request**

```
http://example.com/wires/messages/4
```

Response\*\*

```bash
{
    "id": "4",
    "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
    "title": "my messages",
    "text": "this is a desc for my message",
    "comments" : [],
    "reactions" : [],
    "createdAt": "2023-01-11",
}
```

<br />

## **Delete me message**

_DELETE wires/messages/${id}_

**Params:**

-   id : number

retornar un estado de eliminacion **solo se puede eliminar mensajes de propia autoria**

**Request**

```
http://example/wires/messages/4
```

**Response**

```bash
{
    "delete" : true,
    "status" : "OK"
}
```

<br />

## **Create Reaction**

_PATCH wires/messages/reaction/${id}_

**Params:**
-id : number

**Body:**

-   reaction : string
-   author : string

debe retornar el mensaje con la actulizacion del comentario **no se puede hacer comentarios en mensajes de su propia autoria**

Funcion : Debe realizar una funcion que convierta los emojis en su codigo ascii antes de ser insertados en la DB

**Request**

```
http://example/wires/messages/comment/${id}
```

**Response**

```bash
{
    "id": "4",
    "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
    "title": "my messages",
    "text": "this is a desc for my message",
    "comments" : [],
    "reactions" : [{
        "reaction" : "U+1F600" , "author" : "5c91874d-e8f2-4119-9a80-8e3d8f23dfee"
    }],
    "createdAt": "2023-01-11",
}
```

<br />

## **Create Comment**

_PATCH wires/messages/comment/${id}_

**Params:**
-id : number

**Body:**

-   comment : string
-   author : string

debe retornar el mensaje con la actulizacion del comentario **no se puede hacer comentarios en mensajes de su propia autoria**

**Request**

```
http://example/wires/messages/comment/${id}
```

**Response**

```bash
{
    "id": "4",
    "user": "5c91874d-e8f2-4119-9a80-8e3d8f23dfee",
    "title": "my messages",
    "text": "this is a desc for my message",
    "comments" : [{
        "comment" : "this is a comment" , "author" : "5c91874d-e8f2-4119-9a80-8e3d8f23dfee"
    }],
    "reactions" : [],
    "createdAt": "2023-01-11",
}
```

<br />

# **Adicional**


-   desarrollo Plus , Realiza una funcionalidad extra la cual sea de aporte a la finalidad de social wires, la cual nos permita conocer un poco mas tus habilidades

-   Debe contener un archivo `Readme.md` con

    -   .env , script de ejecucion , inicializacion de proyecto
    -   Descripcion y sustento de funcionalidad adicional
    -   Informacion adicional que consideres pertinente o de valor

-   Debe contener su respectiva postman collection

-   Calificacion
    reto 1 : 70%,
    Reto 2 : 30%,

<br />
<hr />

<div align=center>

## **exitos 😁👌**
</div>
