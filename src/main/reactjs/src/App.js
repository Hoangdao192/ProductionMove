import "./App.css";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Location from "./components/pages/Location/Location";
import Category from "./components/pages/Category/Category";
import CategoryEdit from "./components/pages/Category/Edit/CategoryEdit";
// import Products from "./components/pages/Products/Products";
// import ProductLine from "./components/pages/ProductLine/ProductLine";
// import ProductLineEdit from "./components/pages/ProductLine/Edit/ProductLineEdit";
// import ProductEdit from "./components/pages/Products/Edit/ProductEdit";

// import ShowAcount from "./components/pages/Acount/ShowAcount/ShowAcount";
// import CreateAcount from "./components/pages/Acount/CreateAcount/CreateAcount";
// import EditAcount from "./components/pages/Acount/Edit/EditAcount";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<CategoryEdit />}></Route>
          <Route path="/location" element={<Location />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
