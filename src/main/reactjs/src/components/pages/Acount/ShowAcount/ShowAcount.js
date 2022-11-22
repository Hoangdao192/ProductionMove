import "./ShowAcount.css";
import React, { useState } from "react";
import { acounts, typeAcounts } from "../AcountItems.js";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function ShowAcount() {
  const data = acounts;

  const [products, setProducts] = useState([...data]);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });

  // Xắp xếp theo tên
  function sortByName() {
    setSorted({ sorted: "name", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.user.localeCompare(b.user));
      if (sorted.reversed) {
        return -a.user.localeCompare(b.user);
      }
      return a.user.localeCompare(b.user);
    });

    setProducts(productCopy);
  }

  // Xắp xếp theo loại tài khoản
  function sortByTypeAcount() {
    setSorted({ sorted: "type-acount", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.typeAcount - b.typeAcount);
      if (sorted.reversed) {
        return -(a.typeAcount - b.typeAcount);
      }
      return a.typeAcount - b.typeAcount;
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

  // Tìm kiếm theo tên
  function handleSearch(e) {
    setSorted({ sorted: "", reversed: false });

    let value = e.target.value;

    let searchResult = data.filter((item) => {
      return item.user.toLowerCase().includes(value.toLowerCase());
    });

    console.log(searchResult);
    setProducts(searchResult);
  }

  // Tìm kiếm theo loại tài khoản
  function searchByTypeAcount(arr) {
    let typeAcountBar = document.querySelector("#type-acount");
    let value = parseInt(typeAcountBar.value);
    console.log("type-acount " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.typeAcount);
        return item.typeAcount === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Xử lý tìm kiếm chung (nút tìm kiếm)
  function hadleClickSearch() {
    let result = [...data];
    result = searchByTypeAcount(result);
    setProducts(result);
  }

  return (
    <div>
      <div className="category">
        <div className="search">
          <div className="search-name">
            <input
              type="text"
              name="search-name"
              id="search-name"
              placeholder="Tìm kiếm tên tài khoản"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="type-acount-search">
            <label htmlFor="type-acount">Loại tài khoản</label>
            <select name="type-acount" id="type-acount">
              <option value="">Không chọn</option>
              {typeAcounts.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="btn-search">
            <button onClick={hadleClickSearch}>Tìm kiếm</button>
          </div>
        </div>

        <ul className="list_product">
          <li className="tb-head">
            <div className="col-1" onClick={sortByName}>
              ID
            </div>
            <div className="col-2 pointer" onClick={sortByName}>
              Tài khoản {sorted.sorted === "name" ? renderArrow() : null}
            </div>
            <div className="col-3">Hình ảnh</div>
            <div className="col-4 pointer" onClick={sortByTypeAcount}>
              Loại tài khoản{" "}
              {sorted.sorted === "type-acount" ? renderArrow() : null}
            </div>
            <div className="col-5">Hành động</div>
          </li>
          {products.map((item, index) => {
            return (
              <li className="tb-row" key={index}>
                <div className="col-1" data-label="ID">
                  {item.id}
                </div>
                <div className="col-2" data-label="Tài khoản">
                  {item.user}
                </div>
                <div className="col-3" data-label="Hình ảnh">
                  <img src={require("../../../../image/user.jpg")} alt="" />
                </div>
                <div className="col-4" data-label="Tài khoản">
                  {typeAcounts[item.typeAcount]}
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
    </div>
  );
}
