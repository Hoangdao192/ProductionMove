import "./ProductLineEdit.css";
import React, { useState, useEffect } from "react";
import { category } from "../ProductLineItems";

import { productLineValidation } from "../Validation/Validation.js";

export default function ProductLineEdit(props) {

  let data = category[props.edit.productLineId];

  const [nameNew, setNameNew] = useState("");
  const [message, setMessage] = useState({
    name: null,
  });

  console.log(data);

  function formValidation(event) {
    let result = {};
    result.name = productLineValidation(nameNew);

    setMessage(result);

    if (!result.name.validation) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    if (data) {
      setNameNew(data.name)
    }
  },[data]);

  return (
    <>
      <div className="productLineEdit">
        <h2 className="title">Sửa loại sản phẩm</h2>
        <form action="" method="post">
          <div className="id">
            <div className="action">
              <label htmlFor="id">ID dòng sản phẩm</label>
              <input
                type="number"
                name=""
                id="id"
                value={data ? data.id : null}
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
