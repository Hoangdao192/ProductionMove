import "./ProductEdit.css";
import React, { useState, useEffect } from "react";
import { getItems, category } from "../ProductItems";

import {
  productValidation,
  productLineValidation,
  avatartValidation,
} from '../Validation/Validation'

export default function ProductEdit(props) {
  const data = getItems();

  let productOld = data[props.edit.productId];

  const [products, setProducts] = useState([...data]);
  const [productNew, setProductNew] = useState("");
  const [productLineNew, setProductLineNew] = useState(-1);
  const [avatar, setAvatar] = useState("")
  const [message, setMessage] = useState({
    product: null,
    productLine: null
   });

  // Hiển thị trước avatar
  useEffect(() => {
    // effect
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  // Hiển thị trước avatar
  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (file) {
      file.preview = URL.createObjectURL(file);
      console.log(file.preview);
    }

    setAvatar(file);
  };

  function selectProducts(cat) {
    const copyProducts = [...data];
    const result = copyProducts.filter((item, index) => {
      return item.category === parseInt(cat);
    });

    console.log(productLineNew);
    console.log(copyProducts);
    console.log(result);
    setProducts(result);
    return result;
  }

  // Kiểm tra lân cuối
  function validationForm(event) {
    console.log("Validation!");

    const result = {};
    result.productLine = productLineValidation(parseInt(productLineNew))
    result.product = productValidation(productNew)

    console.log(productLineNew)

    setMessage(result);

    if (
      !(
        result.productLine.validation &&
        result.product.validation 
      )
    ) {
      console.log(message)
      event.preventDefault();
    } 
    // else {
    //   console.log(message)
    //   event.preventDefault();
    // }
  }

  // Khởi tạo
  useEffect(() => {
    if (productOld) {
      setProductNew(productOld.name)
      setProductLineNew(productOld.category)
      selectProducts(productOld.category)
    }
  },[productOld]);

  console.log(productOld);

  return (
    <>
      {console.log(props.edit)}
      <div className="productEdit">
        <h2 className="title">Sửa sản phẩm</h2>
        <form action="" method="post">
          <div className="id">
            <div className="action">
              <label htmlFor="id">ID sản phẩm</label>
              <input
                type="number"
                name=""
                id="id"
                value={productOld ? productOld.id : ""}
                readOnly
              />
            </div>
          </div>
          <div className="category">
            <div className="action">
              <label htmlFor="category">Dòng sản phẩm</label>
              <select
                name="category"
                id="category"
                value={productLineNew}
                onChange={(e) => {
                  console.log(e.target.value);
                  setProductLineNew(e.target.value);
                  // selectProducts(e.target.value);
                }}
              >
                <option value={-1}></option>
                {category.map((item, index) => {
                  return productLineNew === index ? (
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
            <div className="alert">
              {message.productLine && !message.productLine.validation && (
                <p>{message.productLine.message}</p>
              )}
            </div>
          </div>
          <div className="name">
            <div className="action">
              <label htmlFor="name">Tên sản phẩm</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Tên sản phẩm"
                value={productNew}
                onChange={(e) => setProductNew(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.product && !message.product.validation && (
                <p>{message.product.message}</p>
              )}
            </div>
          </div>
          <div className="avatar">
            <div className="action">
              <label htmlFor="avatar">Ảnh đại diện</label>
              <input
                type="file"
                name=""
                id="avatar"
                accept=".png,.jpg"
                onChange={handleAvatar}
              />
            </div>
            <div className="alert">
              {/* {message.avatar && !message.avatar.validation && (
                <p>{message.avatar.message}</p>
              )} */}
            </div>
          </div>
          <div className="avatar-view">
            {avatar ? (<img src={avatar.preview} alt="" width="80%" />)
            : (<img src={require('../../../../../../image/pc_sample.png')} alt="" width="80%" />)}
          </div>
          <div className="summit-button">
            <button type="submit"
             onClick={(e) => validationForm(e)}
            >
              Sửa
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
