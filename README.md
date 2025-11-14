# 📧 MCP-MAIL

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue.svg)](https://modelcontextprotocol.io)
[![Made with ❤️](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F-red.svg)](https://github.com/Joludime)

**Servidor MCP para envío de correos electrónicos integrado con Claude Desktop**

[Instalación](#-instalación) • [Configuración](#-configuración) • [Uso](#-uso) • [Documentación](#-estructura-del-proyecto)

</div>

---

## 🎯 ¿Qué es MCP-MAIL?

MCP-MAIL es un servidor basado en el **Model Context Protocol (MCP)** que permite a Claude AI enviar correos electrónicos de manera programática desde múltiples cuentas configuradas. Ideal para automatización de comunicaciones, notificaciones y flujos de trabajo.

### ✨ Características Principales

- 📨 **Multi-cuenta**: Soporte para múltiples cuentas de correo Gmail
- 🔐 **Seguro**: Configuración mediante variables de entorno
- 🤖 **Integración Claude**: Funciona directamente con Claude Desktop
- ⚡ **Rápido**: Envío instantáneo de correos desde conversaciones con IA
- 🛠️ **Fácil configuración**: Setup en minutos

## 📋 Requisitos

- Node.js >= 18.0.0
- npm o yarn
- Claude Desktop instalado
- Cuentas de Gmail con contraseñas de aplicación habilitadas

## 🚀 Instalación

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/Joludime/MCP-MAIL.git
cd MCP-MAIL/mcp-mail
```

### Paso 2: Instalar dependencias

```bash
npm install
```

### Paso 3: Configurar variables de entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
Cuenta1-Morujo=tu_correo@gmail.com
PASSWORD_KEY=tu_contraseña_app
Cuenta2-Diaz=segundo_correo@gmail.com
Cuenta3-LoolBeh=tercer_correo@gmail.com
```

## ⚙️ Configuración

### Obtener Contraseña de Aplicación de Gmail

1. 🔗 Visita [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. 📧 Selecciona "Mail" como aplicación
3. 💻 Elige tu sistema operativo
4. 🔑 Google generará una contraseña de 16 caracteres
5. ✅ Copia esta contraseña en tu archivo `.env` como `PASSWORD_KEY`

### Configurar Claude Desktop

Abre tu archivo de configuración de Claude:
- **macOS/Linux**: `~/.claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

Agrega la siguiente configuración:

```json
{
  "mcpServers": {
    "mail-mcp": {
      "command": "node",
      "args": ["/ruta/completa/a/MCP-MAIL/mcp-mail/mcp-mail.mjs"],
      "env": {
        "Cuenta1-Morujo": "tu_correo@gmail.com",
        "PASSWORD_KEY": "tu_contraseña_app",
        "Cuenta2-Diaz": "segundo_correo@gmail.com",
        "Cuenta3-LoolBeh": "tercer_correo@gmail.com"
      }
    }
  }
}
```

> ⚠️ **Importante**: Reemplaza `/ruta/completa/a/MCP-MAIL` con la ruta absoluta a tu instalación.

## 🎮 Uso

### Iniciar el servidor (modo desarrollo)

```bash
npm start
```

### Usar con Claude Desktop

Una vez configurado y con Claude Desktop reiniciado, tendrás acceso a estas herramientas:

| Herramienta | Descripción |
|------------|-------------|
| `enviar_correo_cuenta1` | Envía emails desde tu cuenta principal |
| `enviar_correo_cuenta2` | Envía emails desde tu segunda cuenta |
| `enviar_correo_cuenta3` | Envía emails desde tu tercera cuenta |

### Ejemplo de comando en Claude

```
Envía un correo desde la cuenta 1 a contacto@example.com 
con el asunto "Reunión de proyecto" 
y el mensaje "Hola, ¿podemos agendar una reunión para la próxima semana?"
```

## 📁 Estructura del Proyecto

```
MCP-MAIL/
└── mcp-mail/
    ├── mcp-mail.mjs          # Servidor MCP principal (ESM)
    ├── mcp-mail.js           # Alternativa CommonJS
    ├── package.json          # Dependencias
    ├── .env.example          # Template de configuración
    ├── .gitignore            # Archivos ignorados
    └── README.md             # Documentación completa
```

## 📦 Tecnologías

- **[@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)** - SDK oficial de MCP
- **[Nodemailer](https://nodemailer.com/)** - Cliente de envío de emails para Node.js
- **[dotenv](https://github.com/motdotla/dotenv)** - Gestión de variables de entorno

## 🔒 Seguridad

<div align="center">

| ⚠️ ADVERTENCIAS DE SEGURIDAD |
|------------------------------|
| ❌ **NUNCA** subas el archivo `.env` a Git |
| ✅ Usa contraseñas de aplicación, NO tu contraseña de Gmail |
| 🔐 Las credenciales están protegidas por `.gitignore` |
| 🛡️ Mantén actualizado Node.js y las dependencias |

</div>

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. 🍴 Fork el repositorio
2. 🌿 Crea una rama (`git checkout -b feature/MiNuevaCaracteristica`)
3. ✍️ Commit tus cambios (`git commit -m 'Agrego nueva característica'`)
4. 📤 Push a la rama (`git push origin feature/MiNuevaCaracteristica`)
5. 🔃 Abre un Pull Request

## 🐛 Solución de Problemas

### El servidor no se conecta

- Verifica que Node.js >= 18 está instalado: `node --version`
- Comprueba que la ruta en `claude_desktop_config.json` es correcta
- Revisa los logs de Claude en `~/Library/Logs/Claude/`

### Error de autenticación

- Asegúrate de usar una **contraseña de aplicación**, no tu contraseña normal
- Verifica que las variables de entorno estén correctamente configuradas
- Confirma que la autenticación de dos factores está activada en Gmail

### Claude no detecta las herramientas

- Reinicia completamente Claude Desktop
- Verifica la sintaxis JSON de tu configuración
- Comprueba que no hay espacios extra en las rutas

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**José Luis Díaz Mendoza**
- GitHub: [@Joludime](https://github.com/Joludime)
- Email: joludime291076@gmail.com

## ⭐ Muestra tu apoyo

¡Dale una ⭐ si este proyecto te ayudó!

---

<div align="center">

**Hecho con ❤️ y Node.js**

[⬆ Volver arriba](#-mcp-mail)

</div>
