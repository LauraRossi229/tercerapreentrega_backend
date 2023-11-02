import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Puedes utilizar axios para hacer solicitudes HTTP al backend

function Cart() {
    const [cart, setCart] = useState({});
    const [isLoading, setIsLoading] = useState(true);
  
    // Función para cargar el carrito desde el backend
    const loadCart = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/carts/:cid'); // Reemplaza con la URL correcta
        setCart(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      loadCart();
    }, []); // Llama a loadCart cuando se monta el componente
  
    if (isLoading) {
      return <p>Cargando carrito...</p>;
    }
  
    return (
      <div>
        <h1>Carrito de Compras</h1>
        <ul>
          {cart.products.map((product) => (
            <li key={product.id_prod}>
              <div>{product.name}</div>
              <div>Cantidad: {product.quantity}</div>
              <div>Precio: ${product.price}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Cart;
  