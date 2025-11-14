# 📧 MCP Mail Server

Un servidor MCP (Model Context Protocol) que permite enviar correos desde múltiples cuentas de Gmail usando Claude Desktop.

## 🚀 Características

- ✅ Enviar correos desde múltiples cuentas de Gmail
- ✅ Integración con Claude Desktop
- ✅ Soporte para stdio transport
- ✅ Fácil configuración con variables de entorno

## 📋 Requisitos

- Node.js >= 18
- npm o yarn
- Cuentas de Gmail con contraseñas de aplicación

## 🔧 Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/tu-usuario/mcp-mail.git
cd mcp-mail
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Configura las variables de entorno:**
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```
Cuenta1-Morujo=tu_correo@gmail.com
PASSWORD_KEY=tu_contraseña_app

Cuenta2-Diaz=segundo_correo@gmail.com
Cuenta3-LoolBeh=tercer_correo@gmail.com
```

## 📱 Configuración en Claude Desktop

Abre `~/.claude_desktop_config.json` y agrega:

```json
{
  "mcpServers": {
    "mail-mcp": {
      "command": "node",
      "args": ["/ruta/al/mcp-mail/mcp-mail.mjs"],
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

## 🏃 Uso

### Ejecutar el servidor
```bash
npm start
```

### En Claude Desktop

Una vez conectado, tendrás disponibles 3 herramientas:
- `enviar_correo_cuenta1` - Envía desde Cuenta1-Morujo
- `enviar_correo_cuenta2` - Envía desde Cuenta2-Diaz
- `enviar_correo_cuenta3` - Envía desde Cuenta3-LoolBeh

Ejemplo de uso:
```
Envía un correo desde la cuenta 1 a contacto@example.com con asunto "Hola" y mensaje "Este es un test"
```

## 🔐 Obtener Contraseña de Aplicación en Gmail

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona "Mail" y "macOS" (o tu sistema operativo)
3. Google te generará una contraseña de 16 caracteres
4. Usa esa contraseña en `PASSWORD_KEY`

## 📁 Estructura del Proyecto

```
mcp-mail/
├── mcp-mail.mjs          # Servidor MCP principal (ESM)
├── mcp-mail.js           # Alternativa CommonJS
├── package.json          # Dependencias del proyecto
├── .env                  # Variables de entorno (NO subir a git)
├── .env.example          # Ejemplo de .env
├── .gitignore            # Archivos ignorados por git
└── README.md             # Este archivo
```

## 📦 Dependencias

- `@modelcontextprotocol/sdk` - SDK oficial de MCP
- `nodemailer` - Librería para enviar correos
- `dotenv` - Cargar variables de entorno

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Creado por [Tu Nombre]

## ⚠️ Seguridad

- **NUNCA** hagas commit del archivo `.env` 
- Las credenciales están protegidas por `.gitignore`
- Usa contraseñas de aplicación, no tu contraseña principal de Google

## 🐛 Problemas Conocidos

- El servidor se bloquea en stdin esperando cliente MCP (comportamiento normal)
- Solo funciona con GMail (aunque se puede adaptar a otros servicios)

## 📞 Soporte

Si encuentras problemas:
1. Verifica que Node.js >= 18 está instalado
2. Comprueba que las credenciales son correctas
3. Revisa los logs de Claude Desktop en `~/Library/Logs/Claude/`

---

**¡Disfruta tu servidor MCP! 🚀**
