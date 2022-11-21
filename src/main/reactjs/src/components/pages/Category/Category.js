import "./Category.css";
import React, { useState } from "react";
import { category } from "./CategoryItems";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Category() {
  const data = category;

  const [products, setProducts] = useState([...data]);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });

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

  return (
    <>
      <div className="category">
        <div className="search">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Tìm kiếm loại sản phẩm"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <ul className="list_product">
          <li className="tb-head">
            <div className="col-1">ID</div>
            <div className="col-2 pointer" onClick={sortByName}>
              Loại sản phẩm {sorted.sorted === "name" ? renderArrow() : null}
            </div>
            <div className="col-3">Hành động</div>
          </li>
          {products.map((item, index) => {
            return (
              <li className="tb-row" key={index}>
                <div className="col-1" data-label="ID">
                  {item.id}
                </div>
                <div className="col-2" data-label="Loại sản phẩm">
                  {item.name}
                </div>
                <div className="col-3" data-label="Hành động">
                  <MdEdit className="edit" title="Chỉnh sửa" />
                  <MdDelete className="delete" title="Xóa" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
