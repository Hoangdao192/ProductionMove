import './CreateDevice.css'
import React, { useState, useEffect } from "react";
import {
  getItems,
  setItems,
  product,
  status,
  agency,
  productLine,
  factory,
  insuarance,
} from "../DevicesItems";

import {
  productLineValidation,
  productValidation,
  statusValidation,
  positionValidation
} from '../Validation/Validation'

const CreateDevice = () => {
  const data = getItems();

  const [products, setProducts] = useState([...data])
  const [productNew, setProductNew] = useState(-1);
  const [productLineNew, setProductLineNew] = useState(-1);
  const [statusNew, setStatusNew] = useState(-1);
  const [factoryNew, setFactoryNew] = useState(-1);
  const [agencyNew, setAgencyNew] = useState(-1);
  const [insuaranceNew, setInsuaranceNew] = useState(-1);
  const [position, setPosition] = useState({
    factory: false,
    agency: false,
    insuarance: false
  })
  const [message, setMessage] = useState({
    productLine: null,
    product: null,
    status: null,
    position: null
  });


  // Chọn sản phẩm dựa theo category
  function selectProductsByProductLine(productLine) {
    const copyProducts = [...product];
    const result = copyProducts.filter((item, index) => {
      console.log(productLine)
      console.log(productLine[parseInt(productLine)] + " và " + productLine)
      return item.productLine === parseInt(productLine)
    });

    console.log(productLineNew);
    console.log(copyProducts);
    console.log(result);
    setProducts(result);
    return result;
  }

  // Kiểm tra ẩn lựa chọn vị trí
  function checkPositionSetting(param) {
    let result = [];
    if (position.factory) result.push("factory");
    if (position.agency) result.push("agency");
    if (position.insuarance) result.push("insuarance");

    if (result.length === 0) {
      return true;
    }

    if (result.includes(param)) {
      return true;
    } else {
      return false;
    }
  }

  // Kiểm tra lân cuối
  function validationForm(event) {
    console.log("Validation!");

    const result = {};
    result.productLine = productLineValidation(productLineNew)
    result.product = productValidation(productNew)
    result.status = statusValidation(statusNew)
    result.position = positionValidation(position)

    setMessage(result);

    if (
      !(
        result.productLine.validation &&
        result.product.validation &&
        result.status.validation &&
        result.position.validation
      )
    ) {
      console.log(message)
      event.preventDefault();
    }
  }

  // Khởi tạo ban đầu lựa chọn product
  useEffect(() => {
    selectProductsByProductLine(-1)
  },[]);

  return (
    <div className="CreateDevice">
      <h2 className="title">Tạo thiết bị</h2>
      <form action="" method="post">
      <div className="productLine">
          <div className="action">
            <label htmlFor="productLine">Dòng sản phẩm</label>
            <select
              name="category"
              id="category"
              value={productLineNew}
              onChange={(e) => {
                console.log(e.target.value);
                setProductLineNew(e.target.value);
                selectProductsByProductLine(e.target.value);
              }}
            >
              <option value={-1}>Chọn dòng sản phẩm</option>
              {productLine.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {message.productLine && !message.productLine.validation && (
              <p>{message.productLine.message}</p>
            )}
          </div>
        </div>
        <div className="product">
          <div className="action">
            <label htmlFor="product">Loại sản phẩm</label>
            <select
              name="name"
              id="name"
              value={productNew}
              onChange={(e) => {
                console.log("Name: " + product[e.target.value].name);
                setProductNew(e.target.value);
              }}
            >
              <option value={-1}>Chọn loại sản phẩm</option>
              {products && products.map((item, index) => {
                return (
                  <option value={item.productId} key={index}>
                    {product[item.productId].name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {message.product && !message.product.validation && (
              <p>{message.product.message}</p>
            )}
          </div>
        </div>
        <div className="status">
          <div className="action">
            <label htmlFor="status">Trạng thái</label>
            <select
              name="status"
              id="status"
              value={statusNew}
              onChange={(e) => {
                console.log(e.target.value);
                setStatusNew(e.target.value)
              }}
            >
              <option value={-1}>NULL</option>
              {status.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {message.status && !message.status.validation && (
              <p>{message.status.message}</p>
            )}
          </div>
        </div>
        <div 
        className={
          checkPositionSetting("factory") ? "factory" : "hiddenFile"}>
          <div className="action">
            <label htmlFor="factory">Cơ sở sản xuất</label>
            <select
              name="factory"
              id="factory"
              value={factoryNew}
              onChange={(e) => {
                console.log(e.target.value);
                setFactoryNew(e.target.value)
                console.log("factory: " + factoryNew)
                parseInt(e.target.value) !== -1 
                ? setPosition({...position, factory: true})
                : setPosition({...position, factory: false})
                console.log(position)
              }}
            >
              <option value={-1}>NULL</option>
              {factory.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {/* {message.name && !message.name.validation && (
              <p>{message.name.message}</p>
            )} */}
          </div>
        </div>
        <div 
          className={checkPositionSetting("agency") ? "agency" : "hiddenFile"}
          >
          <div className="action">
            <label htmlFor="agency">Đại lý</label>
            <select
              name="agency"
              id="agency"
              value={agencyNew}
              onChange={(e) => {
                console.log(e.target.value);
                setAgencyNew(e.target.value)
                parseInt(e.target.value) !== -1 
                ? setPosition({...position, agency: true})
                : setPosition({...position, agency: false})
                console.log(position)
              }}
            >
              <option value={-1}>NULL</option>
              {agency.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {/* {message.name && !message.name.validation && (
              <p>{message.name.message}</p>
            )} */}
          </div>
        </div>
        <div className={
          checkPositionSetting("insuarance") ? "insuarance" : "hiddenFile"}
          >
          <div className="action">
            <label htmlFor="insuarance">Trung tâm bảo hành</label>
            <select
              name="insuarance"
              id="insuarance"
              value={insuaranceNew}
              onChange={(e) => {
                console.log(e.target.value);
                setInsuaranceNew(e.target.value)
                parseInt(e.target.value) !== -1 
                ? setPosition({...position, insuarance: true})
                : setPosition({...position, insuarance: false})
                console.log(position)
              }}
            >
              <option value={-1}>NULL</option>
              {insuarance.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="alert">
            {/* {message.name && !message.name.validation && (
              <p>{message.name.message}</p>
            )} */}
          </div>
        </div>
        <div className='position'>
          <div className="alert">
            {
             message.position && !message.position.validation
             && <p>{message.position.message}</p>
            }
          </div>
        </div>
        <div className="button-summit">
            <button type="submit" 
            onClick={(e) => validationForm(e)}
            // onClick={(e) => {
            //   console.log({
            //     productNew: productNew,
            //     productLineNew: productLineNew,
            //     statusNew: statusNew,
            //     factoryNew: factoryNew,
            //     agencyNew: agencyNew,
            //     insuaranceNew: insuaranceNew
            //   })
            //   e.prevenDefault()
            // }
            // }
            >
              Tạo thiết bị
            </button>
          </div>
      </form>
    </div>
  );
}

export default CreateDevice;
