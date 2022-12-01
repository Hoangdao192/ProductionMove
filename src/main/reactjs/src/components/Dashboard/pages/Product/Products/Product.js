import "./Product.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getItems, category } from "./ProductItems";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { UilFilePlusAlt } from '@iconscout/react-unicons'

import ProductEdit from "./Edit/ProductEdit";

export default function Product() {
  const data = getItems();

  const [products, setProducts] = useState(data);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });
  const [edit, setEdit] = useState({
    edit: false,
    productId: null
  })
  const [create, setCreate] = useState(false)

  // Xắp xếp theo tên
  function sortByName() {
    setSorted({ sorted: "name", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.name.localeCompare(b.name));
      if (sorted.reversed) {
        return -a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });

    setProducts(productCopy);
  }

  // Xắp xếp theo loại
  function sortByCategory() {
    setSorted({ sorted: "category", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(category[a.category].localeCompare(category[b.category]));
      if (sorted.reversed) {
        return -category[a.category].localeCompare(category[b.category]);
      }
      return category[a.category].localeCompare(category[b.category]);
    });
    setProducts(productCopy);
  }

  // In mũi tên
  function renderArrow() {
    if (sorted.reversed) {
      return <FaArrowUp />;
    } else {
      return <FaArrowDown />;
    }
  }

  // Tìm kiếm
  function handleSearch(e) {
    setSorted({ sorted: "", reversed: false });

    let value = e.target.value;

    let searchResult = data.filter((item) => {
      return item.name.toLowerCase().includes(value.toLowerCase());
    });

    console.log(searchResult);
    setProducts(searchResult);
  }

  // Xử lý loại sản phẩm
  function handleProduct(page, productId) {
    if (page === 'show') {
      setEdit({
        edit: false,
        productId: null
      })
      setCreate(false)
    } else if (page === 'edit') {
      setEdit({
        edit: true,
        productId: productId
      })
    } else if (page === 'create') {
      setCreate(true)
    }
  }

  return (
    <>
      <div className={(!edit.edit && !create) ? "product" : "hiddenPage"}>
        <Link to="createProduct">
          <UilFilePlusAlt className="creatButton"/>
        </Link>
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Tìm kiếm tên dòng sản phẩm"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <ul className="list_product">
          <li className="tb-head">
            <div className="col-1" onClick={sortByName}>
              ID
            </div>
            <div className="col-2 pointer" onClick={sortByName}>
              Tên {sorted.sorted === "name" ? renderArrow() : null}
            </div>
            <div className="col-3">Hình ảnh</div>
            <div className="col-4 pointer" onClick={sortByCategory}>
              Dòng sản phẩm {sorted.sorted === "category" ? renderArrow() : null}
            </div>
            <div className="col-5">Hành động</div>
          </li>
          {products.map((item, index) => {
            return (
              <li className="tb-row" key={index}>
                <div className="col-1" data-label="ID">
                  {item.id}
                </div>
                <div className="col-2" data-label="Tên">
                  {item.name}
                </div>
                <div className="col-3" data-label="Hình ảnh">
                  <img src={require("../../../../../image/pc_sample.png")} alt="" />
                </div>
                <div className="col-4" data-label="Dòng sản phẩm">
                  {category[item.category]}
                </div>
                <div className="col-5" data-label="Hành động">
                  <MdEdit 
                    className="edit" 
                    title="Chỉnh sửa" 
                    onClick={() => handleProduct('edit', item.id)}
                  />
                  <MdDelete className="delete" title="Xóa" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={edit.edit ? "edit" : "hiddenPage"}>
        <ProductEdit handleProduct={handleProduct} edit={edit}/>
      </div>
    </>
  );
}
