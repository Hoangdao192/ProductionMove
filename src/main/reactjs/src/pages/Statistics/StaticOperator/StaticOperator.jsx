import React, { useState, useEffect } from "react";
import styles from "./StaticOperator.module.css";

import {
    statusProduct,
    fatoryProduct,
    warrantyProduct,
    agencyProduct,
} from "./data";
import SingleBarChar from "./BarChar.js/SingleBarChar";
import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import { toast } from "react-toastify";

function StaticOperator() {
    const [sizeLabelStatusChart, setSizeLabelStatusChart] = useState(10);
    const [sizeTitle, setSizeTitle] = useState(18);

    const [productData, setProductData] = useState([]);
    const [factoryData, setFactoryData] = useState([]);
    const [warrantyData, setWarrantyData] = useState([]);
    const [distributorData, setDistributorData] = useState([]);

    const changeSizeLabelChart = () => {
        if (window.innerWidth <= 750 && sizeLabelStatusChart !== 8) {
            setSizeLabelStatusChart(8);
            setSizeTitle(12);
        }
    };

    const changeSizeLabelChart2 = () => {
        if (window.innerWidth > 750 && sizeLabelStatusChart !== 10) {
            setSizeLabelStatusChart(8);
            setSizeTitle(18);
        }
    };

    useEffect(() => {
        loadProductStatistic()
        loadFactoryStatistic()
        loadWarrantyStatistic()
        loadDistributorStatistic()
        const createEvent = () => {
            window.addEventListener("resize", changeSizeLabelChart);
            window.addEventListener("resize", changeSizeLabelChart2);
            return () => {
                window.removeEventListener("resize", changeSizeLabelChart);
                window.addEventListener("resize", changeSizeLabelChart2);
            };
        };
        createEvent();
        // eslint-disable-next-line
    }, []);

    function loadProductStatistic() {
        let url = config.server.api.product.statistic.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                setProductData([
                    { status: "Mới sản xuất", quantity: data["Newly produced"], color: "rgb(66, 194, 255)" },
                    { status: "Đang bán", quantity: data["Agency"], color: "rgb(150, 229, 209)" },
                    { status: "Đã bán", quantity: data["Sold"], color: "rgb(0, 8, 193)" },
                    { status: "Đang bảo hàng", quantity: data["Under warranty"], color: "rgb(128,188,210)" },
                    { status: "Cần trả về nhà máy", quantity: data["Error factory"], color: "rgb(225,255,238)" },
                    { status: "Đã trả bảo hành", quantity: data["Returned warranty"], color: "rgb(88,0,255)" },
                    { status: "Cần bảo hành", quantity: data["Error need warranty"], color: "rgb(1,255,246)" },
                    { status: "Đã trả về nhà máy", quantity: data["Returned factory"], color: "rgb(194,17,17)" },
                    { status: "Lỗi cần trả về nhà máy", quantity: data["Error returned factory"], color: "rgb(230,73,73)" },
                    { status: "Bảo hành xong", quantity: data["Done warranty"], color: "rgb(255,135,135)" },
                    { status: "Hết bảo hành", quantity: data["Warranty expired"], color: "rgb(56,229,77)" },
                    { status: "Không bán được", quantity: data["Cannot sale"], color: "rgb(74,80,61)" }
                  ])
            }
        })
    }

    function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
      }

    function loadFactoryStatistic() {
        let url = config.server.api.factory.stock.product.statistic.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                let factoryStatistic = [];
                for (let factory in data) {
                    console.log(factory);
                    factoryStatistic.push({
                        factory: factory,
                        quantity: data[factory],
                        color: `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)})`
                    })
                }
                setFactoryData(factoryStatistic)
            }
        })
    }

    function loadWarrantyStatistic() {
        let url = config.server.api.warranty.warranty.statistic.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                let warrantyStatistic = [];
                for (let warranty in data) {
                    console.log(warranty);
                    warrantyStatistic.push({
                        warranty: warranty,
                        quantity: data[warranty],
                        color: `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)})`
                    })
                }
                setWarrantyData(warrantyStatistic)
            }
        })
    }

    function loadDistributorStatistic() {
        let url = config.server.api.distributor.productStatistic.url;
        fetch(url, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                let distributorStatistic = [];
                for (let distributor in data) {
                    console.log(distributor);
                    distributorStatistic.push({
                        agency: distributor,
                        quantity: data[distributor],
                        color: `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)})`
                    })
                }
                setDistributorData(distributorStatistic)
            }
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.line_1}>
                <div className={styles.statusBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select></select>
                    </div>
                    <SingleBarChar
                        title={"Thống kê sản phẩm theo trạng thái"}
                        dataList={productData}
                        positionLabels={"right"}
                        sizeLabels={6}
                        sizeTitle={sizeTitle}
                        percent
                    />
                </div>
                <div className={styles.factoryBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select></select>
                    </div>
                    <SingleBarChar
                        title={"Thống kê sản xuất sản phẩm"}
                        dataList={factoryData}
                        positionLabels={"right"}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        percent
                    />
                </div>
            </div>
            <div className={styles.line_2}>
                <div className={styles.warrantyBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select></select>
                    </div>
                    <SingleBarChar
                        title={"Thống kê sản phẩm từng cơ sở bảo hành"}
                        dataList={warrantyData}
                        positionLabels={"right"}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        percent
                    />
                </div>
                <div className={styles.agencyBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select></select>
                    </div>
                    <SingleBarChar
                        title={"Thống kê sản phẩm từng đại lý"}
                        dataList={distributorData}
                        positionLabels={"right"}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        percent
                    />
                </div>
            </div>
        </div>
    );
}

export default StaticOperator;
