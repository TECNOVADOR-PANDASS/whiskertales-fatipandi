import { Router, Request, Response } from 'express';
import { adminAuth } from './adminAuth';
import { AdminCredentials, AdminLogin } from '../shared/adminSchema';

const router = Router();

// Middleware para verificar si el usuario está autenticado como administrador
export const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.session && req.session.adminUser) {
    return next();
  }
  res.status(401).json({ error: 'No autorizado' });
};

// Ruta para inicio de sesión de administrador
router.post('/login', async (req: Request, res: Response) => {
  try {
    const credentials: AdminLogin = req.body;
    const isValid = await adminAuth.verifyAdmin(credentials);
    
    if (isValid) {
      // Guardar sesión de administrador
      req.session.adminUser = {
        username: credentials.username,
        isAdmin: true
      };
      
      return res.status(200).json({ 
        success: true, 
        message: 'Inicio de sesión exitoso',
        user: {
          username: credentials.username
        }
      });
    }
    
    return res.status(401).json({ 
      success: false, 
      message: 'Credenciales inválidas' 
    });
  } catch (error) {
    console.error('Error en inicio de sesión de administrador:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Ruta para registrar un nuevo administrador (protegida)
router.post('/register', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const newAdmin: AdminCredentials = req.body;
    const created = await adminAuth.registerAdmin(newAdmin);
    
    if (created) {
      return res.status(201).json({ 
        success: true, 
        message: 'Administrador registrado exitosamente' 
      });
    }
    
    return res.status(400).json({ 
      success: false, 
      message: 'No se pudo crear el administrador. El nombre de usuario ya existe.' 
    });
  } catch (error) {
    console.error('Error al registrar administrador:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Error al cerrar sesión' 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        message: 'Sesión cerrada exitosamente' 
      });
    });
  } else {
    res.status(200).json({ 
      success: true, 
      message: 'No hay sesión activa' 
    });
  }
});

// Ruta para verificar si el usuario está autenticado como administrador
router.get('/check', (req: Request, res: Response) => {
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

// Ruta para obtener lista de administradores (protegida)
router.get('/users', isAuthenticated, (req: Request, res: Response) => {
  try {
    const users = adminAuth.getAdminUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error al obtener usuarios administradores:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error en el servidor' 
    });
  }
});

export default router;