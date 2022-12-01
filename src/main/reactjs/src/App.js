import "./App.css";

// import Navbar from "./components/navigation/Navbar";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./components/Dashboard/pages/Home/Home";
import Location from "./components/pages/Location/Location";
import ProductLine from './components/Dashboard/pages/Product/ProductLine/ProductLine'
import CreateProductLine from "./components/Dashboard/pages/Product/ProductLine/Create/CreateProductLine";
// import CategoryEdit from "./components/pages/Category/Edit/CategoryEdit";


import Darshboard from "./components/Dashboard/Darshboard";
import Devices from "./components/Dashboard/pages/Product/Device/Devices";
import CreateDevice from "./components/Dashboard/pages/Product/Device/Create/CreateDevice";
// import ProductLine from "./components/pages/ProductLine/ProductLine";
// import ProductLineEdit from "./components/pages/ProductLine/Edit/ProductLineEdit";
// import ProductEdit from "./components/pages/Products/Edit/ProductEdit";

import ShowAcount from "./components/Dashboard/pages/Acount/ShowAcount/ShowAcount";
import CreateAcount from "./components/Dashboard/pages/Acount/CreateAcount/CreateAcount";
// import CreateAcount from "./components/pages/Acount/CreateAcount/CreateAcount";
// import EditAcount from "./components/pages/Acount/Edit/EditAcount";


// import Acount from "./components/Dashboard/pages/Acount/Acount";
// import ProductLine from "./components/Dashboard/pages/Product/ProductLine/ProductLine";
import Product from "./components/Dashboard/pages/Product/Products/Product";
import CreateProduct from "./components/Dashboard/pages/Product/Products/Create/CreateProducts";
// import Product from './components/Dashboard/pages/Products/Product'
// import Device from "./components/Dashboard/pages/Product/Device/Device";
import NoPage from "./components/Dashboard/pages/NoPage/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Darshboard />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Product */}
          <Route path="product/productLine" element={<ProductLine />}/>
          <Route 
          path="product/productLine/createProductLine" 
          element={<CreateProductLine />}
          />
          <Route path="product/product" element={<Product />} />
          <Route 
          path="product/product/createProduct" 
          element={<CreateProduct />}
          />
          <Route path="product/device" element={<Devices />} />
          <Route 
          path="product/device/createDevice" 
          element={<CreateDevice />}
          />

          {/* Acount */}
          <Route path="acount/listAcount" element={<ShowAcount />} />
          <Route 
          path="acount/listAcount/createAcount" 
          element={<CreateAcount />} 
          />

          {/* 404 */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
    </>
  );
}

export default App;
