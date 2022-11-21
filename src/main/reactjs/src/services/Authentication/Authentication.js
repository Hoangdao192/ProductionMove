class Authentication {
    isUserAuthenticated() {
        let authToken = localStorage.getItem("authToken");
        if (authToken == null || authToken == undefined || authToken.length == 0) {
            return false;
        }
        return true;
    }

    login(username, password) {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:5000/api/login");
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                let response = JSON.parse(this.response);
                let authToken = response["accessToken"];
                let tokenType = response["tokenType"];
                if (authToken == undefined || authToken == null || authToken.length == 0) {
                    return false;
                }

                localStorage.setItem("authToken", authToken);
                localStorage.setItem("tokenType", tokenType);
                return true;
            }
        }
        request.send(JSON.stringify({
            username: username,
            password: password
        }))
    }

    logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenType");
    }
}

export default new Authentication();