import "./ProductEdit.css";
import React, { useState } from "react";
import { getItems, category } from "../ProductItems";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function ProductEdit(props) {
  const data = getItems();

  let productOld = data[0];

  // const [products, setProducts] = useState([...data]);

  const [nameNew, setNameNew] = useState(productOld.name);
  // const [image, setImage] = useState("");
  const [categoryNew, setCategoryNew] = useState(productOld.category);

  // let Id = props.Id;

  function selectProducts(cat) {
    const copyProducts = [...data];
    const result = copyProducts.filter((item, index) => {
      return item.category === parseInt(cat);
    });

    console.log(categoryNew);
    console.log(copyProducts);
    console.log(result);
    setProducts(result);
    return result;
  }

  const [products, setProducts] = useState([...data]);
  // const [products, setProducts] = useState(selectProducts());

  console.log(productOld);

  return (
    <>
      <div className="productEdit">
        <h2 className="title">Sửa dòng sản phẩm</h2>
        <form action="" method="post">
          <div className="id">
            <label htmlFor="id">ID dòng sản phẩm</label>
            <input
              type="number"
              name=""
              id="id"
              value={productOld.id}
              readOnly
            />
          </div>
          <div className="category">
            <label htmlFor="category">Loại sản phẩm</label>
            <select
              name="category"
              id="category"
              value={categoryNew}
              onChange={(e) => {
                console.log(e.target.value);
                setCategoryNew(e.target.value);
                selectProducts(e.target.value);
              }}
            >
              <option value=""></option>
              {category.map((item, index) => {
                return categoryNew === index ? (
                  <option value={index} key={index}>
                    {item}
                  </option>
                ) : (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="name">
            <label htmlFor="name">Tên sản phẩm</label>
            <select
              name="name"
              id="name"
              value={nameNew}
              onChange={(e) => setNameNew(e.target.value)}
            >
              <option value=""></option>
              {products.map((item, index) => {
                return nameNew === item.name ? (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ) : (
                  <option value={index.name} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="image">
            <label htmlFor="image">Hình ảnh</label>
            <input type="file" name="" id="" accept=".png,.jpg" />
          </div>
          <div className="image-view">
            <img src={require("../../../../../../image/pc_sample.png")} alt="" />
          </div>
          <div className="summit-button">
            <input type="submit" value="Sửa" />
          </div>
        </form>
      </div>
    </>
  );
}
