import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { apiJsonRequest } from '@/lib/queryClient';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Verificar si el usuario ya está autenticado al cargar el componente
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiJsonRequest<{isAuthenticated: boolean}>({
          url: '/api/admin/check',
          method: 'GET',
        });
        
        setIsAuthenticated(response.isAuthenticated || false);
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Manejar inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  // Manejar cierre de sesión
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  
  // Mostrar un mensaje de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }
  
  // Mostrar el panel de administración o el formulario de inicio de sesión según el estado de autenticación
  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
};

export default AdminPanel;