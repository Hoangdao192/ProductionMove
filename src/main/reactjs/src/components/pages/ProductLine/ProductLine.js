import "./ProductLine.css";
import React, { useState } from "react";
import { getItems, category } from "./ProductLineItems";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ProductLine() {
  const data = getItems();

  const [products, setProducts] = useState(data);
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

  return (
    <>
      <div className="category">
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
              Loại máy {sorted.sorted === "category" ? renderArrow() : null}
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
                  <img src={require("../../../image/pc_sample.png")} alt="" />
                </div>
                <div className="col-4" data-label="Loại máy">
                  {category[item.category]}
                </div>
                <div className="col-5" data-label="Hành động">
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
