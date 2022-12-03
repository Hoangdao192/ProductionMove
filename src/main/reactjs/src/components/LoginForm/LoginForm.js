import React, { useState } from "react";
import Authentication from "../../services/Authentication/Authentication";
import "./LoginForm.css";
import img1 from "../img/log.svg";

function LoginForm() {
    const [details, setDetails] = useState({ name: "", password: "" });

    const submitHandler = e => {
        e.preventDefault();
        Authentication.login(details.name, details.password)
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <div className="forms-container">
                    <div className="signin-signup">
                        <div action="#" className="sign-in-form">
                            <h2 className="title">Đăng nhập</h2>
                            {/*/!* Error *!/*/}
                            {/*{(error !== "") ? (<div className="error">{error}</div>) : ""}*/}
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" name="name" id="name" placeholder="Tên tài khoản" onChange={e => {
                                    // setError('');
                                    setDetails({ ...details, name: e.target.value })
                                }} value={details.name} />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" name="password" id="password" placeholder="Mật khẩu" onChange={e =>
                                    setDetails({ ...details, password: e.target.value })
                                }
                                       value={details.password} />
                            </div>
                            <input type="submit" value="Đăng nhập" className="btn solid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>BigCorp</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                        </p>
                    </div>
                    <img src={img1} className="image" alt="" />
                </div>
            </div>
        </form>
    )
}


export default LoginForm