import "./DeviceEdit.css";
import React, { useState } from "react";
import {
  getItems,
  // setItems,
  productLine,
  status,
  agency,
  category,
  factory,
  insuarance,
} from "../DevicesItems";
// import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function DeviceEdit(props) {
  const data = getItems();

  let product = data[0];

  // {
  //   productId: 0,
  //   productLineId: 0,
  //   category: 0,
  //   status: 0,
  //   factory: -1,
  //   agency: 1,
  //   insuarance: -1,
  // },

  // {
  //   productLineId: 0,
  //   name: "Laptop Dell Inspiron T7420 N4I5021W",
  //   image: "../../../image/pc_sample.png",
  //   category: "Dell Inspiron",
  // },

  const [nameNew, setNameNew] = useState(
    productLine[product.productLineId].name
  );
  // const [image, setImage] = useState("");
  const [categoryNew, setCategoryNew] = useState(category[product.category]);
  const [statusNew, setStatusNew] = useState(status[product.status]);
  const [factoryNew, setFactoryNew] = useState(
    product.factory >= 0 ? factory[product.factory] : "NULL"
  );
  const [agencyNew, setAgencyNew] = useState(
    product.agency >= 0 ? agency[product.agency] : "NULL"
  );
  const [insuaranceNew, setInsuaranceNew] = useState(
    product.insuarance >= 0 ? insuarance[product.insuarance] : "NULL"
  );

  // {product.factory >= 0 ? factory[product.factory] : 'null'}

  // let Id = props.Id;

  console.log(product);

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
              value={product.productId}
              readOnly
            />
          </div>
          <div className="name">
            <label htmlFor="name">Loại sản phẩm</label>
            <input
              type="text"
              name=""
              id="name"
              value={nameNew}
              onChange={(e) => setNameNew(e.target.value)}
            />
          </div>
          <div className="product-line">
            <label htmlFor="category">Dòng sản phẩm</label>
            <input
              type="text"
              name=""
              id="category"
              value={categoryNew}
              onChange={(e) => setCategoryNew(e.target.value)}
            />
          </div>
          <div className="status">
            <label htmlFor="status">Trạng thái</label>
            <input
              type="text"
              name=""
              id="status"
              value={statusNew}
              onChange={(e) => setStatusNew(e.target.value)}
            />
          </div>
          <div className="factory">
            <label htmlFor="factory">Cơ sở sản xuất</label>
            <input
              type="text"
              name=""
              id="factory"
              value={factoryNew}
              onChange={(e) => setFactoryNew(e.target.value)}
            />
          </div>
          <div className="agency">
            <label htmlFor="agency">Đại lý</label>
            <input
              type="text"
              name=""
              id="agency"
              value={agencyNew}
              onChange={(e) => setAgencyNew(e.target.value)}
            />
          </div>
          <div className="insuarance">
            <label htmlFor="insuarance">Trung tâm bảo hành</label>
            <input
              type="text"
              name=""
              id="insuarance"
              value={insuaranceNew}
              onChange={(e) => setInsuaranceNew(e.target.value)}
            />
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
