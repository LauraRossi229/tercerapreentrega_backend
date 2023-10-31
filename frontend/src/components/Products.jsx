import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la API de productos para obtener la lista de productos.
    fetch('http://localhost:8080/api/products')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.payload)) {
          setProducts(data.payload);
        } else {
          // Si la respuesta no contiene un arreglo válido de productos, manejar el error o hacer algo apropiado aquí.
          console.error('La respuesta no contiene un arreglo válido de productos', data);
        }
      })
      .catch((error) => console.error('Error fetching products: ', error));
  }, []);

  const handleAddToCart = (productId) => {
    // Aquí puedes implementar la lógica para agregar el producto al carrito.
    // Puedes usar un estado para realizar un seguimiento de los productos en el carrito.
    // Por ejemplo, puedes tener un estado "cart" y agregar el producto seleccionado a ese estado.
  };

  return (
    <div className="container text-center">
      <h1 className="my-4">Lista de Productos</h1>
      
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="col-md-3 mb-4">
            <div className="card bg-info text-white rounded">
              <img src={product.imageUrl} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title text-center">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Precio: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <p className="card-text">Categoría: {product.category}</p>
                <p className="card-text">Estado: {product.status ? 'Disponible' : 'No disponible'}</p>
                <button onClick={() => handleAddToCart(product._id)} className="btn btn-danger">Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export const Products = () => {
    return (
      <div>
        <ProductList />
      </div>
    );
  };