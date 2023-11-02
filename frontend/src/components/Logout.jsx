import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Realiza la lógica de cierre de sesión (como la eliminación de la sesión y la cookie).
      const response = await fetch('http://localhost:8080/api/sessions/logout', {
        method: 'GET',
      });

      if (response.status === 200) {
        // Cierre de sesión exitoso
        console.log('Sesión cerrada exitosamente');

        // Espera 2 segundos antes de redirigir
        setTimeout(() => {
          navigate('/products', { state: { message: 'Usuario desloguado' } });
        }, 2000); // 2000 milisegundos = 2 segundos
      } else {
        // Manejar errores de cierre de sesión
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  return (
    <div>
      <h1>Cierre de sesión</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};