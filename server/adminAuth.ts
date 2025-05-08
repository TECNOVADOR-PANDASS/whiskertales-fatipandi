import bcrypt from 'bcryptjs';
import { AdminCredentials, AdminLogin } from '../shared/adminSchema';

// Almacenamiento en memoria para credenciales de administrador
// En una aplicación real, esto estaría en una base de datos segura
const adminUsers: { username: string; passwordHash: string }[] = [];

// Agregar un administrador predeterminado para desarrollo
// Usuario: admin, Contraseña: admin123
const initDefaultAdmin = () => {
  if (adminUsers.length === 0) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    adminUsers.push({
      username: 'admin',
      passwordHash,
    });
    console.log('Admin default user created');
  }
};

// Inicializar admin por defecto
initDefaultAdmin();

export const adminAuth = {
  // Verificar credenciales de administrador
  verifyAdmin: async (credentials: AdminLogin): Promise<boolean> => {
    const { username, password } = credentials;
    const admin = adminUsers.find(a => a.username === username);
    
    if (!admin) {
      return false;
    }
    
    return bcrypt.compareSync(password, admin.passwordHash);
  },
  
  // Registrar un nuevo administrador (solo otro admin puede hacerlo)
  registerAdmin: async (credentials: AdminCredentials): Promise<boolean> => {
    const { username, password } = credentials;
    
    // Verificar si el usuario ya existe
    if (adminUsers.some(a => a.username === username)) {
      return false;
    }
    
    // Hashear la contraseña y guardar el usuario
    const passwordHash = bcrypt.hashSync(password, 10);
    adminUsers.push({
      username,
      passwordHash,
    });
    
    return true;
  },
  
  // Obtener lista de usuarios administradores (solo nombres, sin contraseñas)
  getAdminUsers: (): string[] => {
    return adminUsers.map(a => a.username);
  }
};