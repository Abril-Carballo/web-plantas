# 🔐 FullStack Authentication

Aplicación web full-stack desarrollada con Angular y NestJS que implementa un sistema completo de autenticación de usuarios. El proyecto incluye funcionalidades como registro, inicio de sesión, verificación de correo electrónico y recuperación de contraseña, utilizando PostgreSQL como base de datos y Docker para facilitar el despliegue del entorno.

> Proyecto realizado como trabajo práctico integrador.

---

## 📌 Descripción

El proyecto consiste en extender una aplicación base incorporando un flujo completo de autenticación.

Entre las funcionalidades implementadas se encuentran:

- Registro de usuarios.
- Inicio de sesión.
- Verificación de cuenta mediante correo electrónico.
- Recuperación de contraseña mediante enlace enviado por email.
- Protección de rutas mediante autenticación.
- Comunicación entre frontend y backend mediante una API REST.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Backend

- NestJS
- Node.js
- TypeScript

### Base de datos

- PostgreSQL

### Herramientas

- Docker
- Git
- GitHub

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura Cliente-Servidor.

```
Angular
    │
    │ HTTP
    ▼
NestJS (API REST)
    │
    ▼
PostgreSQL
```

---

## 📁 Estructura del proyecto

```
.
├── back/      # Backend desarrollado en NestJS
├── front/     # Frontend desarrollado en Angular
└── README.md
```

## ✨ Funcionalidades

- Registro de usuarios.
- Inicio de sesión.
- Verificación de email.
- Recuperación de contraseña.
- Restablecimiento de contraseña mediante token.
- Protección de rutas.
- API REST desarrollada con NestJS.
- Persistencia de datos en PostgreSQL.

---

## 📚 Objetivo académico

Este proyecto fue desarrollado como trabajo práctico integrador con el objetivo de aplicar conceptos de desarrollo full-stack utilizando Angular, NestJS y PostgreSQL, implementando un sistema de autenticación seguro y un flujo completo de gestión de usuarios.

---

## 👥 Autores

- **Abril Carballo**
  - GitHub: https://github.com/Abril-Carballo
- **Mateo Manera**
- **Valentina Luna Ruffini**
