import "./App.css";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Location from "./components/pages/Location/Location";
import Category from "./components/pages/Category/Category";
import Products from "./components/pages/Products/Products";
// import ProductLine from "./components/pages/ProductLine/ProductLine";
// import ProductLineEdit from "./components/pages/ProductLine/Edit/ProductLineEdit";
// import ProductEdit from "./components/pages/Products/Edit/ProductEdit";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/location" element={<Location />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
