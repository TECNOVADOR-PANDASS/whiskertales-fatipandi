// server/index.ts
import express2 from "express";
import session from "express-session";

// server/routes.ts
import { createServer } from "http";
async function registerRoutes(app2) {
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import glsl from "vite-plugin-glsl";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    glsl()
    // Add GLSL shader support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  // Add support for large models and audio files
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp3", "**/*.ogg", "**/*.wav"]
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/adminRoutes.ts
import { Router } from "express";

// server/adminAuth.ts
import bcrypt from "bcryptjs";
var adminUsers = [];
var initDefaultAdmin = () => {
  if (adminUsers.length === 0) {
    const passwordHash = bcrypt.hashSync("admin123", 10);
    adminUsers.push({
      username: "admin",
      passwordHash
    });
    console.log("Admin default user created");
  }
};
initDefaultAdmin();
var adminAuth = {
  // Verificar credenciales de administrador
  verifyAdmin: async (credentials) => {
    const { username, password } = credentials;
    const admin = adminUsers.find((a) => a.username === username);
    if (!admin) {
      return false;
    }
    return bcrypt.compareSync(password, admin.passwordHash);
  },
  // Registrar un nuevo administrador (solo otro admin puede hacerlo)
  registerAdmin: async (credentials) => {
    const { username, password } = credentials;
    if (adminUsers.some((a) => a.username === username)) {
      return false;
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    adminUsers.push({
      username,
      passwordHash
    });
    return true;
  },
  // Obtener lista de usuarios administradores (solo nombres, sin contraseñas)
  getAdminUsers: () => {
    return adminUsers.map((a) => a.username);
  }
};

// server/adminRoutes.ts
var router = Router();
var isAuthenticated = (req, res, next) => {
  if (req.session && req.session.adminUser) {
    return next();
  }
  res.status(401).json({ error: "No autorizado" });
};
router.post("/login", async (req, res) => {
  try {
    const credentials = req.body;
    const isValid = await adminAuth.verifyAdmin(credentials);
    if (isValid) {
      req.session.adminUser = {
        username: credentials.username,
        isAdmin: true
      };
      return res.status(200).json({
        success: true,
        message: "Inicio de sesi\xF3n exitoso",
        user: {
          username: credentials.username
        }
      });
    }
    return res.status(401).json({
      success: false,
      message: "Credenciales inv\xE1lidas"
    });
  } catch (error) {
    console.error("Error en inicio de sesi\xF3n de administrador:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor"
    });
  }
});
router.post("/register", isAuthenticated, async (req, res) => {
  try {
    const newAdmin = req.body;
    const created = await adminAuth.registerAdmin(newAdmin);
    if (created) {
      return res.status(201).json({
        success: true,
        message: "Administrador registrado exitosamente"
      });
    }
    return res.status(400).json({
      success: false,
      message: "No se pudo crear el administrador. El nombre de usuario ya existe."
    });
  } catch (error) {
    console.error("Error al registrar administrador:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor"
    });
  }
});
router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al cerrar sesi\xF3n"
        });
      }
      res.status(200).json({
        success: true,
        message: "Sesi\xF3n cerrada exitosamente"
      });
    });
  } else {
    res.status(200).json({
      success: true,
      message: "No hay sesi\xF3n activa"
    });
  }
});
router.get("/check", (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.status(200).json({
      isAuthenticated: true,
      user: {
        username: req.session.adminUser.username
      }
    });
  }
  res.status(200).json({
    isAuthenticated: false
  });
});
router.get("/users", isAuthenticated, (req, res) => {
  try {
    const users = adminAuth.getAdminUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error al obtener usuarios administradores:", error);
    res.status(500).json({
      success: false,
      message: "Error en el servidor"
    });
  }
});
var adminRoutes_default = router;

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(session({
  secret: "dreamy-tales-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1e3
    // 1 día
  }
}));
app.use("/api/admin", adminRoutes_default);
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
