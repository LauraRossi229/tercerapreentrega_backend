import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [cartId, setCartId] = useState(null); // Agrega el estado para cartId
  const navigate = useNavigate();

  useEffect(() => {
    // Realiza una solicitud GET a la API de productos para obtener los detalles de un producto específico.
    fetch(`http://localhost:8080/api/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setProduct(data);
        } else {
          console.error('Producto no encontrado');
        }
      })
      .catch((error) => console.error('Error fetching product details: ', error));
  }, [productId]);

  useEffect(() => {
    // Lógica para obtener el cartId. Puedes hacer esto en otro componente o en una función de utilidad.
    // Ejemplo: Almacenar el cartId en el estado cuando el usuario inicie sesión.
    const obtenerCartId = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/carts/cartId'); // Reemplaza con la URL correcta
        const data = await response.json();
        setCartId(data.cartId); // Almacena el cartId en el estado
      } catch (error) {
        console.error('Error al obtener el cartId: ', error);
      }
    };

    obtenerCartId();
  }, []); // Esta solicitud se realiza una vez al cargar la página

  const handleAddToCart = async () => {
    try {
      if (!cartId) {
        console.error('CartId no definido. Asegúrate de obtenerlo antes de agregar un producto al carrito.');
        return;
      }

      // Realiza una solicitud POST a la API del carrito para agregar el producto.
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // Puedes enviar más información si es necesario, como la cantidad.
        // body: JSON.stringify({ quantity: 1 }),
      });

      if (response.status === 200) {
        // El producto se agregó exitosamente al carrito.
        // Puedes navegar al usuario a la página del carrito o mostrar un mensaje de confirmación.
        navigate('/cart'); // Navega a la página del carrito
      } else {
        console.error('Error al agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito: ', error);
    }
  };

  if (!product) {
    return <div>Cargando detalles del producto...</div>;
  }

  return (
    <div className="container text-center">
      <h1 className="my-4">Detalles del Producto</h1>
      <div className="card bg-info text-white rounded">
        <img src={product.imageUrl} className="card-img top" alt={product.title} />
        <div className="card-body">
          <h5 className="card-title text-center">{product.title}</h5>
          <p className="card-text">{product.description}</p>
          <p className="card-text">Precio: ${product.price}</p>
          <p className="card-text">Stock: {product.stock}</p>
          <p className="card-text">Categoría: {product.category}</p>
          <p className="card-text">
            Estado: {product.stock > 0 ? 'Disponible' : 'No disponible'}
          </p>
          <button onClick={handleAddToCart} className="btn btn-danger">
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
