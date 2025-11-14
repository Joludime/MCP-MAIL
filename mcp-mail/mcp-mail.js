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

// HERRAMIENTA: enviar correo
server.tool("enviar_correo", {
  description: "Enviar un correo desde mi cuenta Gmail",
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
          user: process.env.MI_CORREO,
          pass: process.env.PASSWORD_KEY,
        },
      });

      await transporter.sendMail({
        from: process.env.MI_CORREO,
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

// Iniciar servidor MCP usando stdio transport
const transport = new StdioServerTransport(process.stdin, process.stdout);
await server.connect(transport);

