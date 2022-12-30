import React, { useState, useEffect } from "react";
import styles from "./StaticFactory.module.css";

import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import ServerAPI from '../../../services/ServerAPI';

import {
    statusProduct,
    manufacturingProduct,
    sellProduct,
    errorProduct,
} from "./data";
import SingleBarChar from "./BarChar/SingleBarChar.js";
import { toast } from "react-toastify";

function StaticFactory() {
    const [optionMan, setOptionMan] = useState("mounth");
    const [optionWarranty, setOptionWarranty] = useState("mounth");
    const [optionErrorProduct, setOptionErrorProduct] = useState("productLine");
    const [sizeLabelStatusChart, setSizeLabelStatusChart] = useState(10);
    const [sizeTitle, setSizeTitle] = useState(18);

    const [productStatusData, setProductStatusData] = useState([]);
    const [productCreatedData, setProductCreatedData] = useState(manufacturingProduct);
    const [productErrorData, setProductErrorData] = useState(errorProduct);

    const user = Authentication.getCurrentUser();
    const [factory, setFactory] = useState({});

    const changeSizeLabelChart = () => {
        if (window.innerWidth <= 750 && sizeLabelStatusChart !== 6) {
            setSizeLabelStatusChart(6);
            setSizeTitle(12);
        }
    };

    const changeSizeLabelChart2 = () => {
        if (window.innerWidth > 750 && sizeLabelStatusChart !== 10) {
            setSizeLabelStatusChart(8);
            setSizeTitle(18);
        }
    };

    function random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

    function loadProductStatusStatistic(factoryId) {
        let url = config.server.api.factory.stock.product.statusStatistic.url;
        fetch(url + "?factoryId=" + factoryId , {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                setProductStatusData([
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

    function loadProductStatisticPerMonth(factoryId) {
        let url = config.server.api.factory.stock.product.statistic.perMonth.url;
        fetch(url + "?factoryId=" + factoryId + "&year=2022" , {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                setProductCreatedData({
                    ...productCreatedData,
                    mounth: [
                        { name: 1, quantity: data["1"], color: "rgb(66, 194, 255)" },
                        { name: 2, quantity: data["2"], color: "rgb(150, 229, 209)" },
                        { name: 3, quantity: data["3"], color: "rgb(0, 8, 193)" },
                        { name: 4, quantity: data["4"], color: "rgb(128,188,210)" },
                        { name: 5, quantity: data["5"], color: "rgb(225,255,238)" },
                        { name: 6, quantity: data["6"], color: "rgb(88,0,255)" },
                        { name: 7, quantity: data["7"], color: "rgb(1,255,246)" },
                        { name: 8, quantity: data["8"], color: "rgb(194,17,17)" },
                        { name: 9, quantity: data["9"], color: "rgb(230,73,73)" },
                        { name: 10, quantity: data["10"], color: "rgb(255,135,135)" },
                        { name: 11, quantity: data["11"], color: "rgb(56,229,77)" },
                        { name: 12, quantity: data["12"], color: "rgb(74,80,61)" },
                    ]
                })
            }
        })
    }

    function loadProductStatisticPerQuarter(factoryId) {
        let url = config.server.api.factory.stock.product.statistic.perQuarter.url;
        fetch(url + "?factoryId=" + factoryId + "&year=2022" , {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                setProductCreatedData({
                    ...productCreatedData,
                    quarter: [
                        { name: 1, quantity: data["1"], color: "rgb(66, 194, 255)" },
                        { name: 2, quantity: data["2"], color: "rgb(150, 229, 209)" },
                        { name: 3, quantity: data["3"], color: "rgb(0, 8, 193)" },
                        { name: 4, quantity: data["4"], color: "rgb(128,188,210)" }
                    ]
                })
            }
        })
    }

    function loadProductStatisticPerYear(factoryId) {
        let url = config.server.api.factory.stock.product.statistic.perYear.url;
        fetch(url + "?factoryId=" + factoryId, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                console.log(data)
                let yearData = [];
                for (let year in data) {
                    console.log(year)
                    yearData.push({
                        name: year.toString(),
                        quantity: data[year],
                        color: "rgb(255,203,67)"
                    })
                }
                console.log(yearData);
                setProductCreatedData({
                    ...productCreatedData,
                    year: yearData
                })
            }
        })
    }

    function loadProductErrorStatisticPerLine(factoryId) {
        let url = config.server.api.factory.stock.product.statistic.error.perLine.url;
        fetch(url + "?factoryId=" + factoryId, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                let statisticData = [];
                for (let productLine in data) {
                    statisticData.push({
                        name: productLine,
                        quantity: data[productLine],
                        color: `rgb(${random(0, 200)},${random(0, 200)},${random(0, 200)})`
                    })
                }
                setProductErrorData({
                    ...productErrorData,
                    productLine : statisticData
                })
            }
        })
    }

    function loadProductErrorStatisticPerWarranty(factoryId) {
        let url = config.server.api.factory.stock.product.statistic.error.perLine.url;
        fetch(url + "?factoryId=" + factoryId, {
            headers: {
                'Authorization': Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            if (response.status == 200) {
                return response.json();
            } else toast.error("Không thể tải dữ liệu sản phẩm")
        }).then((data) => {
            if (data != undefined) {
                let statisticData = [];
                for (let productLine in data) {
                    statisticData.push({
                        name: productLine,
                        quantity: data[productLine],
                        color: `rgb(${random(0, 200)},${random(0, 200)},${random(0, 200)})`
                    })
                }
                setProductErrorData({
                    ...productErrorData,
                    productLine : statisticData
                })
            }
        })
    }

    useEffect(() => {
        ServerAPI.getFactoryByUnitId(user.unit.id)
            .then((factory) => {
                setFactory(factory);
                loadProductStatusStatistic(factory.id);
                loadProductStatisticPerMonth(factory.id);
                loadProductErrorStatisticPerLine(factory.id);
                // loadProductStatisticPerQuarter(factory.id);
                // loadProductStatisticPerYear(factory.id)
            })
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

    return (
        <div className={styles.container}>
            <div className={styles.line_1}>
                <div className={styles.statusBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select></select>
                    </div>
                    <SingleBarChar
                        title={"Sản phẩm từng trạng thái"}
                        dataList={productStatusData}
                        positionLabels={"right"}
                        sizeLabels={6}
                        sizeTitle={sizeTitle}
                        percent
                    />
                </div>
                <div className={styles.factoryBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select
                            name="optionManufacturing"
                            id="opManufac"
                            value={optionMan}
                            onChange={(e) => {
                                setOptionMan(e.target.value);
                                if (e.target.value == "mounth") {
                                    loadProductStatisticPerMonth(factory.id);
                                }
                                if (e.target.value == "quarter") {
                                    loadProductStatisticPerQuarter(factory.id);
                                }
                                if (e.target.value == "year") {
                                    loadProductStatisticPerYear(factory.id);
                                }
                            }}
                        >
                            <option value="mounth">Tháng</option>
                            <option value="quarter">Quý</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                    <SingleBarChar
                        title={"Sản phẩm sản xuất"}
                        dataList={productCreatedData}
                        type={optionMan}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        positionLabels={"right"}
                        percent
                    />
                </div>
            </div>
            <div className={styles.line_2}>
                <div className={styles.warrantyBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        <select
                            name="optionWarranty"
                            id="optionWarranty"
                            value={optionWarranty}
                            onChange={(e) => {
                                setOptionWarranty(e.target.value);
                            }}
                        >
                            <option value="mounth">Tháng</option>
                            <option value="quarter">Quý</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                    <SingleBarChar
                        title={"Sản phẩm đã bán"}
                        dataList={sellProduct}
                        type={optionWarranty}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        positionLabels={"right"}
                        percent
                    />
                </div>
                <div className={styles.agencyBarChart}>
                    <div className={styles.tbOption}>
                        {/* <label htmlFor="op">Tùy chọn</label> */}
                        {/* <select
                            name="optionErrorProduct"
                            id="optionErrorProduct"
                            value={optionErrorProduct}
                            onChange={(e) => {
                                setOptionErrorProduct(e.target.value);
                            }}
                        >
                            <option value="productLine">Dòng sản phẩm</option>
                            <option value="factory">Nhà sản xuất</option>
                            <option value="agency">Nhà phân phối</option>
                        </select> */}
                    </div>
                    <SingleBarChar
                        title={"Sản phẩm lỗi"}
                        dataList={productErrorData}
                        type={optionErrorProduct}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        positionLabels={"right"}
                        percent
                    />
                </div>
            </div>
        </div>
    );
}

export default StaticFactory;
