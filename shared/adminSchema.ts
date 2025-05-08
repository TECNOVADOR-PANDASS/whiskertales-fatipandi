import { z } from "zod";
import { users } from "./schema";
import { createInsertSchema } from "drizzle-zod";

// Esquema para la tabla de administradores
export const adminCredentialsSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

export const adminLoginSchema = adminCredentialsSchema;

export type AdminCredentials = z.infer<typeof adminCredentialsSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;

// Para validar sesiones de administrador
export const adminSessionSchema = z.object({
  isAdmin: z.boolean(),
  username: z.string(),
});

export type AdminSession = z.infer<typeof adminSessionSchema>;