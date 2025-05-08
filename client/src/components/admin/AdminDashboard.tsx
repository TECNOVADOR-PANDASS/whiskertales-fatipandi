import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FormContainer } from '@/components/ui/form-container';
import { apiJsonRequest } from '@/lib/queryClient';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [adminUsers, setAdminUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Cargar la lista de administradores al montar el componente
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await apiJsonRequest<{users: string[]}>({
          url: '/api/admin/users',
          method: 'GET',
        });
        
        if (response.users) {
          setAdminUsers(response.users);
        }
      } catch (err: any) {
        setError('Error al cargar la lista de administradores');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAdminUsers();
  }, []);
  
  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await apiJsonRequest<{success: boolean}>({
        url: '/api/admin/logout',
        method: 'POST',
      });
      
      onLogout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };
  
  return (
    <FormContainer className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Panel de Administración
        </h1>
        
        <Button variant="outline" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Administradores</h2>
        
        {isLoading ? (
          <p>Cargando usuarios administradores...</p>
        ) : (
          <ul className="bg-muted p-4 rounded">
            {adminUsers.length > 0 ? (
              adminUsers.map((username, index) => (
                <li key={index} className="py-2 border-b last:border-b-0">
                  {username}
                </li>
              ))
            ) : (
              <p>No hay administradores registrados.</p>
            )}
          </ul>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Historias generadas</p>
          </div>
          <div className="bg-secondary/10 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Usuarios activos</p>
          </div>
          <div className="bg-accent/10 p-6 rounded-lg text-center">
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Animales populares</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Configuración</h2>
        <p className="text-muted-foreground mb-4">
          La configuración de administrador está actualmente en desarrollo.
        </p>
        <Button disabled>Configuración Avanzada</Button>
      </div>
    </FormContainer>
  );
};

export default AdminDashboard;