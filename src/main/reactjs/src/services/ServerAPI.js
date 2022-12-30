import { toast } from "react-toastify";
import config from '../config.json';
import Authentication from "./Authentication/Authentication";

class ServerAPI {
    getFactoryByUnitId(unitId) {
        return new Promise((resolve, reject) => {
            let url = config.server.api.factory.get.url + "?unitId=" + unitId;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    reject("Không thể tải dữ liệu")
                }
            }).then((factory) => {
                if (factory != undefined) {
                    resolve(factory);
                }
            })
        })
    }

    getDistributorByUnitId(unitId) {
        return new Promise((resolve, reject) => {
            let url = config.server.api.distributor.get.url + "?unitId=" + unitId;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else reject("Không thể tải dữ liệu")
            }).then((distributor) => {
                if (distributor != undefined) {
                    resolve(distributor);
                }
            })
        })
    }

    getStockByUnitId(unitId) {
        return new Promise((resolve, reject) => {
            let url = config.server.api.stock.get.url + "?unitId=" + unitId;
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': Authentication.generateAuthorizationHeader()
                }
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else reject("Không thể tải dữ liệu")
            }).then((stock) => {
                if (stock != undefined) {
                    resolve(stock);
                }
            })
        })
    }
}

export default new ServerAPI();