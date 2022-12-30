import React, { useState, useEffect } from "react";
import styles from "./StaticAgency.module.css";

import { statusProduct, sellProduct, sellProductByLine } from "./data";
import SingleBarChar from "./BarChar.js/SingleBarChar";
import LineChartSingle from "./LineChartSingle/LineChartSingle";

import config from '../../../config.json';
import Authentication from '../../../services/Authentication/Authentication';
import ServerAPI from '../../../services/ServerAPI';

import { toast } from "react-toastify";

function StaticAgency() {
    // const [optionMan, setOptionMan] = useState("mounth");
    const [optionWarranty, setOptionWarranty] = useState("mounth");
    const [optionQuantityProductLine, setOptionQuantityProductLine] =
        useState("mounth");
    const [sizeLabelStatusChart, setSizeLabelStatusChart] = useState(10);
    const [sizeTitle, setSizeTitle] = useState(18);
    const [positionLabelChartLine] = useState("right");

    const [productStatusData, setProductStatusData] = useState(statusProduct);
    const [saleData, setSaleData] = useState(sellProduct);
    const user = Authentication.getCurrentUser();
    const [distributor, setDistributor] = useState({})

    const changeSizeLabelChart = () => {
        if (window.innerWidth <= 750 && sizeLabelStatusChart !== 6) {
            setSizeLabelStatusChart(10);
            setSizeTitle(12);
        }
    };

    const changeSizeLabelChart2 = () => {
        if (window.innerWidth > 750 && sizeLabelStatusChart !== 10) {
            setSizeLabelStatusChart(10);
            setSizeTitle(18);
        }
    };

    function loadProductStatusStatistic(distributorId) {
        let url = config.server.api.distributor.productStatistic.status.url;
        fetch(url + "?distributorId=" + distributorId, {
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
                    { status: "Cần trả về nhà máy", quantity: data["Error factory"], color: "rgb(0,0,238)" },
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

    function loadSoldProductStatisticPerMonth(distributorId) {
        let url = config.server.api.distributor.saleStatistic.perMonth.url;
        fetch(url + "?distributorId=" + distributorId + "&year=2022", {
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
                let quarterStatistic = [
                    { name: "1", quantity: 0, color: "rgb(0, 8, 193)"},
                    { name: "2", quantity: 0, color: "rgb(0, 8, 193)"},
                    { name: "3", quantity: 0, color: "rgb(0, 8, 193)"},
                    { name: "4", quantity: 0, color: "rgb(0, 8, 193)"}                    
                ];

                for (let month in data) {
                    if (parseInt(month) >= 1 && parseInt(month) <= 3) {
                        quarterStatistic[0].quantity += data[month]
                    } else if (parseInt(month) >= 4 && parseInt(month) <= 6) {
                        quarterStatistic[1].quantity += data[month]
                    } else if (parseInt(month) >= 7 && parseInt(month) <= 9) {
                        quarterStatistic[2].quantity += data[month]
                    } else if (parseInt(month) >= 10 && parseInt(month) <= 12) {
                        quarterStatistic[3].quantity += data[month]
                    }
                    statisticData.push({
                        name: month,
                        quantity: data[month],
                        color: "rgb(1,255,246)"
                    })
                }
                setSaleData({
                    ...saleData,
                    mounth: statisticData,
                    quarter: quarterStatistic
                })
            }
        })
    }

    function loadSoldProductStatisticPerYear(distributorId) {
        let url = config.server.api.distributor.saleStatistic.perYear.url;
        fetch(url + "?distributorId=" + distributorId, {
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

                for (let year in data) {
                    statisticData.push({
                        name: year,
                        quantity: data[year],
                        color: "rgb(1,255,246)"
                    })
                }
                setSaleData({
                    ...saleData,
                    year: statisticData
                })
            }
        })
    }

    useEffect(() => {
        ServerAPI.getDistributorByUnitId(user.unit.id)
            .then((distributor) => {
                setDistributor(distributor);
                loadProductStatusStatistic(distributor.id);
                loadSoldProductStatisticPerMonth(distributor.id);
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
                        <select
                            name="optionWarranty"
                            id="optionWarranty"
                            value={optionWarranty}
                            onChange={(e) => {
                                setOptionWarranty(e.target.value);
                                if (e.target.value == "mounth") {
                                    loadSoldProductStatisticPerMonth(distributor.id)
                                } else if (e.target.value == "year") {
                                    loadSoldProductStatisticPerYear(distributor.id)
                                }
                            }}
                        >
                            <option value="mounth">Tháng</option>
                            <option value="quarter">Quý</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                    <SingleBarChar
                        title={"Sản phẩm đã bán"}
                        dataList={saleData}
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
                        <select
                            name="optionQuantityProductLine"
                            id="optionQuantityProductLine"
                            value={optionQuantityProductLine}
                            onChange={(e) => {
                                setOptionQuantityProductLine(e.target.value);
                            }}
                        >
                            <option value="mounth">Tháng</option>
                            <option value="quarter">Quý</option>
                            <option value="year">Năm</option>
                        </select>
                    </div>
                    {/* {console.log(optionQuantityProductLine)} */}
                    <LineChartSingle
                        title={"Sản phẩm bán theo từng dòng"}
                        dataList={sellProductByLine}
                        type={optionQuantityProductLine}
                        sizeLabels={sizeLabelStatusChart}
                        sizeTitle={sizeTitle}
                        positionLabels={positionLabelChartLine}
                    />
                </div>
            </div>
        </div>
    );
}

export default StaticAgency;
