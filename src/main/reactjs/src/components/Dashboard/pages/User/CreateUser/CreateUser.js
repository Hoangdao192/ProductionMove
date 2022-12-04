import styles from "./CreateUser.module.css";
import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { role } from "../UserItem";
import {
  nameValidation,
  userValidation,
  passValidation,
  passAgainValidation,
  roleValidation,
  addressValidation,
  phoneValidation,
} from "../Validation/Validaton";

export default function CreatUser() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [myRole, setMyRole] = useState(-1);
  const [address, setAddress] = useState(-1);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState({
    name: null,
    user: null,
    pass: null,
    passAgain: null,
    myRole: null,
    address: null,
    phone: null,
  });

  function validationForm(event) {
    console.log("Validation!");

    const result = {};
    result.name = nameValidation(name);
    result.user = userValidation(user);
    result.pass = passValidation(pass);
    result.passAgain = passAgainValidation(pass, passAgain);
    result.myRole = roleValidation(myRole);
    result.address = addressValidation(address);
    result.phone = phoneValidation(isValidPhoneNumber(phone));

    setMessage(result);

    if (
      !(
        result.name.validation &&
        result.user.validation &&
        result.pass.validation &&
        result.passAgain.validation &&
        result.myRole.validation &&
        result.address.validation &&
        result.phone.validation
      )
    ) {
      console.log(message);
      event.preventDefault();
    } else {
      // console.log(message);
      // event.preventDefault();
    }
  }

  return (
    <>
      <div className={styles.CreatUser}>
        <h2 className="title">Tạo tài khoản</h2>
        <form action="" method="post">
          <div className="name">
            <div className="action">
              <label htmlFor="name">Tên người dùng</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Trần Đình Cường"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.name && !message.name.validation && (
                <p>{message.name.message}</p>
              )}
            </div>
          </div>
          <div className="username">
            <div className="action">
              <label htmlFor="username">Tài khoản</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.user && !message.user.validation && (
                <p>{message.user.message}</p>
              )}
            </div>
          </div>
          <div className="pass">
            <div className="action">
              <label htmlFor="pass">Mật khẩu</label>
              <input
                type="password"
                name="pass"
                id="pass"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.pass && !message.pass.validation && (
                <p>{message.pass.message}</p>
              )}
            </div>
          </div>
          <div className="pass-again">
            <div className="action">
              <label htmlFor="pass-again">Xác nhận mật khẩu</label>
              <input
                type="password"
                name="pass-again"
                id="pass-again"
                value={passAgain}
                onChange={(e) => setPassAgain(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.passAgain && !message.passAgain.validation && (
                <p>{message.passAgain.message}</p>
              )}
            </div>
          </div>
          <div className="role">
            <div className="action">
              <label htmlFor="role">Vai trò</label>
              <select
                name="role"
                id="role"
                value={myRole}
                onChange={(e) => {
                  console.log(e.target.value);
                  setMyRole(e.target.value);
                  // selectProducts(e.target.value);
                }}
              >
                <option value={-1}></option>
                {role.map((item, index) => {
                  return (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="alert">
              {message.myRole && !message.myRole.validation && (
                <p>{message.myRole.message}</p>
              )}
            </div>
          </div>
          <div className="addressId">
            <div className="action">
              <label htmlFor="addressId">Địa chỉ</label>
              <input
                type="number"
                name="addressId"
                id="addressId"
                placeholder="addressId"
                value={address == -1 ? "" : address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.address && !message.address.validation && (
                <p>{message.address.message}</p>
              )}
            </div>
          </div>
          <div className={styles.phonenumber}>
            <div className="action">
              <label htmlFor="phonenumber">Số điện thoại</label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                defaultCountry="VN"
                id="phonenumber"
              />
            </div>
            <div className="alert">
              {message.phone && !message.phone.validation && (
                <p>{message.phone.message}</p>
              )}
            </div>
          </div>
          <div className="button-summit">
            <button type="submit" onClick={(e) => validationForm(e)}>
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
