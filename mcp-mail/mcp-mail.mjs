import dotenv from "dotenv";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import nodemailer from "nodemailer";

// Cargar variables de entorno
dotenv.config();

// Crear servidor MCP
const server = new Server(
  {
    name: "mail-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Configuración de las cuentas de correo
const cuentasCorreo = {
  cuenta1: {
    nombre: "enviar_correo_cuenta1",
    email: process.env["Cuenta1-Morujo"],
    descripcion: "Enviar correo desde cuenta principal (Morujo)",
  },
  cuenta2: {
    nombre: "enviar_correo_cuenta2",
    email: process.env["Cuenta2-Diaz"],
    descripcion: "Enviar correo desde segunda cuenta (Diaz)",
  },
  cuenta3: {
    nombre: "enviar_correo_cuenta3",
    email: process.env["Cuenta3-LoolBeh"],
    descripcion: "Enviar correo desde tercera cuenta (LoolBeh)",
  },
};

// Handler para listar las herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: Object.values(cuentasCorreo).map((cuenta) => ({
      name: cuenta.nombre,
      description: `${cuenta.descripcion} (${cuenta.email})`,
      inputSchema: {
        type: "object",
        properties: {
          para: {
            type: "string",
            description: "Dirección de correo del destinatario",
          },
          asunto: {
            type: "string",
            description: "Asunto del correo electrónico",
          },
          mensaje: {
            type: "string",
            description: "Contenido del mensaje",
          },
        },
        required: ["para", "asunto", "mensaje"],
      },
    })),
  };
});

// Handler para ejecutar las herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  // Encontrar la cuenta correspondiente
  const cuenta = Object.values(cuentasCorreo).find((c) => c.nombre === name);

  if (!cuenta) {
    return {
      content: [
        {
          type: "text",
          text: `Error: Herramienta '${name}' no encontrada`,
        },
      ],
      isError: true,
    };
  }

  const { para, asunto, mensaje } = args;

  try {
    // Validar que exista la contraseña
    if (!process.env.PASSWORD_KEY) {
      throw new Error(
        "PASSWORD_KEY no está configurada en las variables de entorno"
      );
    }

    // Validar que exista el email de la cuenta
    if (!cuenta.email) {
      throw new Error(
        `Email no configurado para ${cuenta.nombre}. Verifica las variables de entorno.`
      );
    }

    // Crear transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: cuenta.email,
        pass: process.env.PASSWORD_KEY,
      },
    });

    // Enviar el correo
    const info = await transporter.sendMail({
      from: cuenta.email,
      to: para,
      subject: asunto,
      text: mensaje,
      html: `<p>${mensaje.replace(/\n/g, "<br>")}</p>`,
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              ok: true,
              mensaje: "Correo enviado correctamente",
              detalles: {
                de: cuenta.email,
                para: para,
                asunto: asunto,
                messageId: info.messageId,
                respuesta: info.response,
              },
            },
            null,
            2
          ),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              ok: false,
              error: error.message,
              detalles: {
                cuenta: cuenta.nombre,
                email: cuenta.email,
                para: para,
              },
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

// Iniciar el servidor con transporte stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("Servidor MCP-MAIL iniciado correctamente");
  console.error("Cuentas configuradas:");
  Object.values(cuentasCorreo).forEach((cuenta) => {
    console.error(`  - ${cuenta.nombre}: ${cuenta.email || "NO CONFIGURADO"}`);
  });
}

main().catch((error) => {
  console.error("Error al iniciar el servidor:", error);
  process.exit(1);
});
