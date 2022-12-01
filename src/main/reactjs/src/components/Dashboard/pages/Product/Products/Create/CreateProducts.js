import './CreateProducts.css'
import React, { useState, useEffect} from 'react';

import { category } from '../ProductItems';
import {
  productValidation,
  productLineValidation,
  avatartValidation,
} from '../Validation/Validation'

const CreateProduct = () => {
  const [avatar, setAvatar] = useState("")
  const [productNew, setProductNew] = useState("")
  const [productLineNew, setProductLineNew] = useState(-1)
  const [message, setMessage] = useState({
   product: null,
   productLine: null,
   avatar: null
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

  // Kiểm tra lân cuối
  function validationForm(event) {
    console.log("Validation!");

    const result = {};
    result.productLine = productLineValidation(productLineNew)
    result.product = productValidation(productNew)
    result.avatar = avatartValidation(avatar)

    setMessage(result);

    if (
      !(
        result.productLine.validation &&
        result.product.validation &&
        result.avatar
      )
    ) {
      console.log(message)
      event.preventDefault();
    }
  }

  return (
    <div className="CreateProducts">
      <h2 className="title">Tạo sản phẩm</h2>
      <form action="" method="post">
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
        <div className="name">
          <div className="action">
            <label htmlFor="name">Dòng sản phẩm</label>
            <select
              name="category"
              id="category"
              value={productLineNew}
              onChange={(e) => {
                console.log(e.target.value);
                setProductLineNew(e.target.value);
              }}
            >
              <option value={-1}>Chọn dòng sản phẩm</option>
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
              {message.avatar && !message.avatar.validation && (
                <p>{message.avatar.message}</p>
              )}
            </div>
          </div>
          <div className="avatar-view">
            {avatar && <img src={avatar.preview} alt="" width="80%" />}
          </div>
        <div className="button-summit">
            <button type="submit" 
            onClick={(e) => validationForm(e)}
            >
              Tạo sản phẩm
            </button>
          </div>
      </form>
    </div>
  );
}

export default CreateProduct;
