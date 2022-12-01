import React, { useState } from 'react';

import { productLineValidation } from '../Validation/Validation'

const CreateProductLine = () => {
  const [productLine, setProductLine] = useState("")
  const [message, setMessage] = useState({
    productLine: null
  });

  // Kiểm tra lân cuối
  function validationForm(event) {
    console.log("Validation!");

    const result = {};
    result.productLine = productLineValidation(productLine)

    setMessage(result);

    if (
      !(
        result.productLine.validation
      )
    ) {
      console.log(message)
      event.preventDefault();
    }
  }

  return (
    <div className="CreateProductLine">
      <h2 className="title">Tạo dòng sản phẩm</h2>
      <form action="" method="post">
      <div className="name">
          <div className="action">
            <label htmlFor="name">Tên dòng sản phẩm</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Tên dòng sản phẩm"
              value={productLine}
              onChange={(e) => setProductLine(e.target.value)}
            />
          </div>
          <div className="alert">
            {message.productLine && !message.productLine.validation && (
              <p>{message.productLine.message}</p>
            )}
          </div>
        </div>
        <div className="button-summit">
            <button type="submit" 
            onClick={(e) => validationForm(e)}
            >
              Tạo dòng sản phẩm
            </button>
          </div>
      </form>
    </div>
  );
}

export default CreateProductLine;
