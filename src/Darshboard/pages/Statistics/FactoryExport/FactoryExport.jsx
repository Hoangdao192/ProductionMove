import React, { useState, useEffect } from "react";
import styles from "./FactoryExport.module.css";

import { productBatch } from "./data";
import { Title, Navigation } from "../../../components/common";
import { TbHead } from "../../../components/common/Table/TableReport";
import { UilFileExport } from "@iconscout/react-unicons";

function FactoryExport() {
  const [listData, setListData] = useState([]);
  const fullData = productBatch.map((item, index) => {
    return item.id;
  });
  useEffect(() => {
    console.log(listData);
  }, [listData]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Title
          icon={[{ icon: UilFileExport }]}
          title={"Xuất lô hàng cho cơ sở sản xuất"}
        />
      </div>

      <div className={styles.buttons}>
        <div
          className={styles.selectButton}
          onClick={() => {
            if (listData.length === fullData.length) {
              setListData([]);
            } else {
              setListData(fullData);
            }
          }}
        >
          Chọn đại lý
        </div>
        <div className={styles.exportButton}>Xuất hàng</div>
      </div>
      <div className={styles.table}>
        <div className={styles.titleTable}>
          Bảng 1. Danh sách lô hàng xuất đi
        </div>
        <table>
          <thead>
            <TbHead
              data={[
                "STT",
                "ID",
                "Id dòng sản phẩm",
                "Tên dòng sản phẩm",
                "Ngày sản xuất",
                "Tích",
              ]}
            />
          </thead>
          <tbody>
            {productBatch.map((item, index) => {
              if (listData.includes(item.id)) {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.id}</td>
                    <td>{item.idProductLine}</td>
                    <td>{item.nameProductLine}</td>
                    <td>{item.manufactoringDate}</td>
                    <td>
                      <input
                        type="checkbox"
                        name=""
                        checked={true}
                        id={item.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setListData((listData) => {
                              return [...listData, item.id];
                            });
                          } else {
                            const value = item.id;
                            const arr = [...listData];
                            setListData(
                              arr.filter((item, index) => item !== value)
                            );
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      {/* ///////////////////////////////////////////////////// */}
      <div className={styles.table}>
        <div className={styles.titleTable}>
          Bảng 2. Danh sách lô hàng trong kho
        </div>
        <table>
          <thead>
            <TbHead
              data={[
                "STT",
                "ID",
                "Id dòng sản phẩm",
                "Tên dòng sản phẩm",
                "Ngày sản xuất",
                "Tích",
              ]}
            />
          </thead>
          <tbody>
            {productBatch.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.id}</td>
                  <td>{item.idProductLine}</td>
                  <td>{item.nameProductLine}</td>
                  <td>{item.manufactoringDate}</td>
                  <td>
                    <input
                      type="checkbox"
                      name=""
                      checked={listData.includes(item.id) ? 1 : 0}
                      id={item.id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setListData((listData) => {
                            return [...listData, item.id];
                          });
                        } else {
                          const value = item.id;
                          const arr = [...listData];
                          setListData(
                            arr.filter((item, index) => item !== value)
                          );
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FactoryExport;
