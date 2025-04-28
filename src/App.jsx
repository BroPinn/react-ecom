import { Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Feature from "./pages/Feature";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import ShippingInformation from "./components/ShippingInformation";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
   <>
   <ToastContainer />
    <Header/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/feature' element={<Feature/>}/>
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/blog' element={<Blog/>} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/about' element={<About/>} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
     </Routes>
     <ShippingInformation/>
     <Footer/>
     </>
  )
}

export default App;
