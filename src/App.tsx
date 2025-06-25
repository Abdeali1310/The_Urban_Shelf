import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Products from "./components/Products"
import ProductDetails from "./components/ProductDetails"

const App = () => {
  return (
    <div className="h-screen w-full font-space-grotesk">
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App