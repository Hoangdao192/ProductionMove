import "./CategoryEdit.css";
import React, { useState } from "react";
import { category } from "../CategoryItems";

import { nameCategoryValidation } from "../Validation/Validation.js";

export default function CategoryEdit(props) {
  const data = category;

  let productOld = data[0];

  const [nameNew, setNameNew] = useState(productOld.name);
  const [message, setMessage] = useState({
    name: null,
  });

  console.log(productOld);

  function formValidation(event) {
    let result = {};
    result.name = nameCategoryValidation(nameNew);

    setMessage(result);

    if (!result.name.validation) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="container">
        <h2 className="title">Sửa loại sản phẩm</h2>
        <form action="" method="post">
          <div className="id">
            <div className="action">
              <label htmlFor="id">ID dòng sản phẩm</label>
              <input
                type="number"
                name=""
                id="id"
                value={productOld.id}
                readOnly
              />
            </div>
          </div>
          <div className="name">
            <div className="action">
              <label htmlFor="name">Tên loại sản phẩm</label>
              <input
                type="text"
                name="name"
                id="name"
                value={nameNew}
                onChange={(e) => setNameNew(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.name && !message.name.validation && (
                <p>{message.name.message}</p>
              )}
            </div>
          </div>
          <div className="summit-button">
            <div className="action">
              <button type="submit" onClick={(e) => formValidation(e)}>
                Sửa
              </button>
              {/* <input
                type="submit"
                value="Sửa"
                onChange={(e) => formValidation(e)}
              /> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
