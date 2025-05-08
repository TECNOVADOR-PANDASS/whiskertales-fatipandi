import { Request } from 'express';
import { AdminSession } from '../shared/adminSchema';
import 'express-session';

// Extender la interfaz de Session para incluir propiedades de admin
declare module 'express-session' {
  interface SessionData {
    adminUser?: AdminSession;
  }
}