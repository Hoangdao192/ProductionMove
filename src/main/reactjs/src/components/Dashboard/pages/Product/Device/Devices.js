import "./Devices.css";
import React, { useState } from "react";
import DeviceEdit from "./Edit/DeviceEdit";

import {
  getItems,
  status,
  factory,
  category,
  agency,
  insuarance,
  productLine,
} from "./DevicesItems";

import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Devices() {
  const data = getItems();

  const [products, setProducts] = useState(data);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });
  const [isSearchFactory, setIsSearchFactory] = useState(false);
  const [isSearchAgency, setIsSearchAgency] = useState(false);
  const [isSearchIsuarance, setIsSearchIsuarance] = useState(false);

  const [edit, setEdit] = useState({
    edit: false,
    deviceId: null
  })
  const [create, setCreate] = useState(false)

  // Xắp xếp theo tên
  function sortByName() {
    setSorted({ sorted: "name", reversed: !sorted.reversed });

    let productCopy = [...products];
    // productLine[item.productLineId].name
    productCopy.sort(function sortData(a, b) {
      console.log(
        productLine[a.productLineId].name.localeCompare(
          productLine[b.productLineId].name
        )
      );
      if (sorted.reversed) {
        return -productLine[a.productLineId].name.localeCompare(
          productLine[b.productLineId].name
        );
      }
      return productLine[a.productLineId].name.localeCompare(
        productLine[b.productLineId].name
      );
    });

    setProducts(productCopy);
  }

  // Xắp xếp theo loại
  function sortByCategory() {
    setSorted({ sorted: "category", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.category - b.category);
      if (sorted.reversed) {
        return -(a.category - b.category);
      }
      return a.category - b.category;
    });
    setProducts(productCopy);
  }

  // Xắp xếp theo trạng thái
  function sortByStatus() {
    setSorted({ sorted: "status", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.status - b.status);
      if (sorted.reversed) {
        return -(a.status - b.status);
      }
      return a.status - b.status;
    });
    setProducts(productCopy);
  }

  // Xắp xếp theo cơ sở sản xuất
  function sortByFactory() {
    setSorted({ sorted: "factory", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.factory - b.factory);
      if (sorted.reversed) {
        return -(a.factory - b.factory);
      }
      return a.factory - b.factory;
    });
    setProducts(productCopy);
  }

  // Xắp xếp theo trung tâm bảo hành
  function sortByAgency() {
    setSorted({ sorted: "agency", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.agency - b.agency);
      if (sorted.reversed) {
        return -(a.agency - b.agency);
      }
      return a.agency - b.agency;
    });
    setProducts(productCopy);
  }

  // Xắp xếp theo trung tâm bảo hành
  // insuarance
  function sortByInsuarance() {
    setSorted({ sorted: "insuarance", reversed: !sorted.reversed });

    let productCopy = [...products];
    productCopy.sort(function sortData(a, b) {
      console.log(a.insuarance - b.insuarance);
      if (sorted.reversed) {
        return -(a.insuarance - b.insuarance);
      }
      return a.insuarance - b.insuarance;
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
      return productLine[item.productLineId].name
        .toLowerCase()
        .includes(value.toLowerCase());
    });

    console.log(searchResult);
    setProducts(searchResult);
  }

  /**
   * Tìm kiếm chung
   * 1. Tìm kiếm loại máy
   * 2. TÌm kiếm trạng thái
   * 3. Tìm kiếm cơ sở sản xuất
   * 4. Tìm kiếm đại lý
   * 5. Tìm kiếm trung tâm bảo hành
   */

  // Tìm kiếm theo loại máy
  function searchByCategory(arr) {
    let categoryBar = document.querySelector("#category");
    let value = parseInt(categoryBar.value);
    console.log("category " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.category);
        return item.category === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Tìm kiếm theo trạng thái
  function searchByStatus(arr) {
    let statusBar = document.querySelector("#status");
    let value = parseInt(statusBar.value);
    console.log("status " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.status);
        return item.status === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Tìm kiếm theo cơ sở sản xuất
  function searchByFactory(arr) {
    let factoryBar = document.querySelector("#factory");
    let value = parseInt(factoryBar.value);
    console.log("factory " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.factory);
        return item.factory === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Tìm kiếm theo đại lý
  function searchByAgency(arr) {
    let agencyBar = document.querySelector("#agency");
    let value = parseInt(agencyBar.value);
    console.log("agency " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.agency);
        return item.agency === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Tìm kiếm trung tâm bảo hành
  function searchByInsuarance(arr) {
    let insuaranceBar = document.querySelector("#insuarance");
    let value = parseInt(insuaranceBar.value);
    console.log("insuarance " + value);
    if (!isNaN(value)) {
      let result = arr.filter((item) => {
        console.log(item.insuarance);
        return item.insuarance === value;
      });
      console.log(result);
      return result;
    } else {
      return arr;
    }
  }

  // Tìm kiếm chung

  function Search() {
    var result = [...data];
    result = searchByCategory(result);
    result = searchByStatus(result);
    result = searchByFactory(result);
    result = searchByAgency(result);
    result = searchByInsuarance(result);
    console.log(result);
    setProducts(result);
  }

  // Kiểm tra ẩn hiện tìm kiếm vị trí
  function checkPositionSearch(param) {
    let result = [];
    if (isSearchFactory) result.push("factory");
    if (isSearchAgency) result.push("agency");
    if (isSearchIsuarance) result.push("insuarance");

    if (result.length === 0) {
      return true;
    }

    if (result.includes(param)) {
      return true;
    } else {
      return false;
    }
  }

  // Xử lý dòng sản phẩm
  function handleDevice(page, deviceId) {
    if (page === 'show') {
      setEdit({
        edit: false,
        deviceId: null
      })
      setCreate(false)
    } else if (page === 'edit') {
      setEdit({
        edit: true,
        deviceId: deviceId
      })
    } else if (page === 'create') {
      setCreate(true)
    }
  }

  return (
    <>
      <div className={(!edit.edit && !create) ? "devices" : "hiddenPage"}>
        <div className="search">
          <div className="name-search">
            <input
              type="text"
              name="name-search"
              id="name-search"
              placeholder="Tìm kiếm tên sản phẩm"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="category-search">
            <label htmlFor="category">Dòng sản phẩm</label>
            <select name="category" id="category">
              <option value="">Không chọn</option>
              {category.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="status-search">
            <label htmlFor="status">Trạng thái</label>
            <select name="status" id="status">
              <option value="">Không chọn</option>
              {status.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={
              checkPositionSearch("factory")
                ? "factory-search"
                : "factory-search non-visibility"
            }
          >
            <label htmlFor="factory">Cơ sở sản xuất</label>

            <select
              name="factory"
              id="factory"
              onChange={(e) => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setIsSearchFactory(true);
                } else {
                  setIsSearchFactory(false);
                }
              }}
            >
              <option value="">Không chọn</option>
              {factory.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={
              checkPositionSearch("agency")
                ? "agency-search"
                : "agency-search non-visibility"
            }
          >
            <label htmlFor="agency">Đại lý</label>
            <select
              name="agency"
              id="agency"
              onChange={(e) => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setIsSearchAgency(true);
                } else {
                  setIsSearchAgency(false);
                }
              }}
            >
              <option value="">Không chọn</option>

              {agency.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div
            className={
              checkPositionSearch("insuarance")
                ? "insuarance-search"
                : "insuarance-search non-visibility"
            }
          >
            <label htmlFor="insuarance">Trung tâm bảo hành</label>
            <select
              name="insuarance"
              id="insuarance"
              onChange={(e) => {
                let value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  setIsSearchIsuarance(true);
                } else {
                  setIsSearchIsuarance(false);
                }
              }}
            >
              <option value="">Không chọn</option>
              {insuarance.map((item, index) => {
                return (
                  <option value={index} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="button-search">
            <button onClick={Search}>Tìm kiếm</button>
          </div>
        </div>

        <ul className="list_product">
          <li className="tb-head">
            <div className="col-1">ID</div>
            <div className="col-2 pointer" onClick={sortByName}>
              Tên {sorted.sorted === "name" ? renderArrow() : null}
            </div>
            <div className="col-3 pointer" onClick={sortByCategory}>
              Dòng sản phẩm {sorted.sorted === "category" ? renderArrow() : null}
            </div>
            <div className="col-4 pointer" onClick={sortByStatus}>
              Trạng thái {sorted.sorted === "status" ? renderArrow() : null}
            </div>
            <div className="col-5 pointer" onClick={sortByFactory}>
              Cơ sở sản xuất{" "}
              {sorted.sorted === "factory" ? renderArrow() : null}
            </div>
            <div className="col-6 pointer" onClick={sortByAgency}>
              Đại lý {sorted.sorted === "agency" ? renderArrow() : null}
            </div>
            <div className="col-7 pointer" onClick={sortByInsuarance}>
              Trung tâm bảo hành{" "}
              {sorted.sorted === "insuarance" ? renderArrow() : null}
            </div>
            <div className="col-8">Hoạt động</div>
          </li>
          {products.map((item, index) => {
            return (
              <li className="tb-row" key={index}>
                <div className="col-1" data-label="ID">
                  {item.productId}
                </div>
                <div className="col-2" data-label="Tên">
                  {productLine[item.productLineId].name}
                </div>
                <div className="col-3" data-label="Dòng sản phẩm">
                  {category[item.category]}
                </div>
                <div className="col-4" data-label="Trạng thái">
                  {status[item.status]}
                </div>
                <div className="col-5" data-label="Cơ sở sản xuất">
                  {item.factory >= 0 ? factory[item.factory] : "null"}
                </div>
                <div className="col-6" data-label="Đại lý">
                  {item.agency >= 0 ? agency[item.agency] : "null"}
                </div>
                <div className="col-7" data-label="Trung tâm bảo hành">
                  {item.insuarance >= 0 ? insuarance[item.insuarance] : "null"}
                </div>
                <div className="col-8" data-label="Hoạt động">
                  <MdEdit 
                    className="edit" 
                    title="Chỉnh sửa" 
                    onClick={() => handleDevice('edit', item.id)}
                  />
                  <MdDelete className="delete" title="Xóa" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={edit.edit ? "edit" : "hiddenPage"}>
        <DeviceEdit handleDevice={handleDevice} edit={edit}/>
      </div>
    </>
  );
}
