import { productModel } from "../models/products.models.js";

//En controllers normalmente se hace metodo HTTP + Modelo para referirse al nombre del controlador
// GET para obtener productos con paginación, límite, ordenamiento y búsqueda

export const getProducts = async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;
    const options = {};
  
    if (sort === 'asc' || sort === 'desc') {
      options.sort = { price: sort };
    }
  
    const filter = query ? { category: query } : {};
  
    try {
      const products = await productModel.paginate(filter, {
        limit: parseInt(limit),
        page: parseInt(page),
        ...options,
      });
  
      res.json({
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevPage ? `/api/products?page=${products.prevPage}` : null,
        nextLink: products.nextPage ? `/api/products?page=${products.nextPage}` : null,
      });
       } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };

  export const getProductById = async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)

        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })

    } catch (error) {
        res.status(500).send({ error: `Error en consultar producto ${error}` })
    }
}

export const postProduct =  async (req, res) => {
    try {
      const { title, description, price, stock, category, code, thumbnails } = req.body;
      const newProduct = new productModel({
        title,
        description,
        price,
        stock,
        category,
        code,
        thumbnails
      });
      const savedProduct = await newProduct.save();
      res.status(201).json({ respuesta: 'OK', mensaje: savedProduct });
    } catch (error) {
      res.status(500).send({ respuesta: 'Error en agregar producto', mensaje: error.message });
    }
  };
  

  export const putProductById =  async (req, res) => {
    const { id } = req.params;
    const { title, description, stock, status, code, price, category } = req.body;
  
    try {
      const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category });
      if (prod)
        res.status(200).send({ respuesta: 'OK', mensaje: 'Producto actualizado' });
      else
        res.status(404).send({ respuesta: 'Error en actualizar Producto', mensaje: 'Not Found' });
    } catch (error) {
      res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error.message });
    }
  };

  export const deleteProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const prod = await productModel.findByIdAndDelete(id);
      if (prod)
        res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' });
      else
        res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' });
    } catch (error) {
      res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error.message });
    }
  };