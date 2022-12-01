import "./DeviceEdit.css";
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

export default function DeviceEdit(props) {
  const data = getItems();
  let productOld = data.filter((item, index) => {
    return item.deviceId === props.edit.deviceId
  })[0];

  // { deviceItems
  //   deviceId: 0,
    // productId: 0,
    // productLine: 0,
    // status: 0,
    // factory: -1,
    // agency: 1,
    // insuarance: -1,
  // },

  // { product
  //   productId: 8,
  //   name: "Laptop Dell Vostro 5320 V3I7005W",
  //   image: "../../../image/pc_sample.png",
  //   productLine: "Dell Vostro",
  // },

  const [products, setProducts] = useState([...data])
  const [productNew, setProductNew] = useState("");
  const [productLineNew, setProductLineNew] = useState("");
  const [statusNew, setStatusNew] = useState("");
  const [factoryNew, setFactoryNew] = useState("");
  const [agencyNew, setAgencyNew] = useState("");
  const [insuaranceNew, setInsuaranceNew] = useState("");
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
    result.productLine = productLineValidation(parseInt(productLineNew))
    result.product = productValidation(parseInt(productNew))
    result.status = statusValidation(parseInt(statusNew))
    result.position = positionValidation(position)

    console.log(statusNew)
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
    else {
      console.log(message)
      event.preventDefault();
    }
  }

  // Khởi tạo
  useEffect(() => {
    if (productOld) {
      setProductNew(productOld.productId)
      setProductLineNew(productOld.productLine)
      setStatusNew(productOld.status)
      setFactoryNew(productOld.factory)
      if(productOld.factory > -1) setPosition({...position, factory: true})
      setAgencyNew(productOld.agency)
      if(productOld.agency > -1) setPosition({...position, agency: true})
      setInsuaranceNew(productOld.insuarance)
      if(productOld.insuarance > -1) setPosition({...position, insuarance: true})
      selectProductsByProductLine(productOld.productLine)
      console.log(productOld.factory)
      console.log("factory: " + factoryNew + " agency: " + agencyNew + " insuarance " + insuaranceNew)
      console.log(position)
    }
  },[productOld]);

  console.log(productOld);

  return (
    <>
      <div className="deviceEdit">
        <h2 className="title">Sửa thiết bị</h2>
        <form action="" method="post">
          <div className="id">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              name=""
              id="id"
              value={productOld && productOld.deviceId}
              readOnly
            />
          </div>
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
                setProductNew(-1)
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
                console.log("Name: " + 
                (e.target.value > -1 ? product[e.target.value].name : ""));
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
          checkPositionSetting("factory") ? "factory" : "hiddenFile"}
          >
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
        <div 
        className={
          // "hiddenFile"
          checkPositionSetting("insuarance") ? "insuarance" : "hiddenFile"
        }
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
          <div className="image">
            <label htmlFor="image">Hình ảnh</label>
            <input type="file" name="" id="" accept=".png,.jpg" />
          </div>
          <div className="image-view">
            <img src={require("../../../../../../image/pc_sample.png")} alt="" />
          </div>
          <div className="summit-button">
            {/* <input type="submit" value="Sửa" /> */}
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