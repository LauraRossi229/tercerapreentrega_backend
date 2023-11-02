import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Products } from './components/Products'
import { NewProducts } from "./components/NewProducts"
import { Logout } from './components/Logout'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/products' element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path='/new-product' element={<NewProducts />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}