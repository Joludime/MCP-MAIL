import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import nodemailer from "nodemailer";

dotenv.config();

// Crear servidor MCP
const server = new McpServer({
  name: "mail-mcp",
  version: "1.0.0",
});

// Función auxiliar para crear una herramienta de envío de correo
function crearHerramientaCorreo(nombreHerramienta, correoEnv) {
  server.tool(nombreHerramienta, {
    description: `Enviar un correo desde ${process.env[correoEnv]}`,
    inputSchema: {
      type: "object",
      properties: {
        para: { type: "string" },
        asunto: { type: "string" },
        mensaje: { type: "string" }
      },
      required: ["para", "asunto", "mensaje"]
    },

    handler: async ({ para, asunto, mensaje }) => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env[correoEnv],
            pass: process.env.PASSWORD_KEY,
          },
        });

        await transporter.sendMail({
          from: process.env[correoEnv],
          to: para,
          subject: asunto,
          text: mensaje,
        });

        return { ok: true, mensaje: "Correo enviado correctamente" };

      } catch (error) {
        return { ok: false, error: error.message };
      }
    }
  });
}

// Registrar herramientas para cada cuenta de correo
crearHerramientaCorreo("enviar_correo_cuenta1", "Cuenta1-Morujo");
crearHerramientaCorreo("enviar_correo_cuenta2", "Cuenta2-Diaz");
crearHerramientaCorreo("enviar_correo_cuenta3", "Cuenta3-LoolBeh");

// Iniciar servidor MCP usando stdio transport
const transport = new StdioServerTransport(process.stdin, process.stdout);
await server.connect(transport);


