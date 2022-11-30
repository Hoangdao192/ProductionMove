import "./CreateAcount.css";
import React, { useState, useEffect } from "react";

import { typeAcounts } from "../AcountItems.js";
import {
  nameValidation,
  userValidation,
  passValidation,
  passAgainValidation,
  emailValidation,
  typeAcountValidation,
  avatartValidation,
} from "../Validation/ValidationFrom.js";

export default function CreateAcount(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [passAgain, setPassAgain] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [typeAcount, setTypeAcount] = useState(-1);
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState({
    name: null,
    user: null,
    pass: null,
    passAgain: null,
    email: null,
    typeAcount: null,
    avatar: null,
  });

  // Hiển thị trước avatar
  useEffect(() => {
    // effect
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  // Hiển thị trước avatar
  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (file) {
      file.preview = URL.createObjectURL(file);
      console.log(file.preview);
    }

    setAvatar(file);
  };

  // Thẩm định cuối
  function validationForm(event) {
    console.log("Validation!");
    const result = {};
    result.name = nameValidation(name);
    result.user = userValidation(user);
    result.pass = passValidation(pass);
    result.passAgain = passAgainValidation(pass, passAgain);
    result.email = emailValidation(email);
    result.typeAcount = typeAcountValidation(typeAcount);
    result.avatar = avatartValidation(avatar);

    setMessage(result);

    if (
      !(
        result.name.validation &&
        result.user.validation &&
        result.pass.validation &&
        result.passAgain.validation &&
        result.email.validation &&
        result.typeAcount.validation &&
        result.avatar.validation
      )
    ) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className="container">
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
          <div className="user">
            <div className="action">
              <label htmlFor="user">Tài khoản</label>
              <input
                type="text"
                name="user"
                id="user"
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
          <div className="email">
            <div className="action">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="alert">
              {message.email && !message.email.validation && (
                <p>{message.email.message}</p>
              )}
            </div>
          </div>
          <div className="type-acount">
            <div className="action">
              <label htmlFor="type-acount">Loại tài khoản</label>
              <select
                name="type-acount"
                id="type-acount"
                onChange={(e) => setTypeAcount(e.target.value)}
              >
                <option value="-1">Không chọn</option>
                {typeAcounts.map((item, index) => {
                  return (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="alert">
              {message.typeAcount && !message.typeAcount.validation && (
                <p>{message.typeAcount.message}</p>
              )}
            </div>
          </div>
          <div className="avatar">
            <div className="action">
              <label htmlFor="avatar">Ảnh đại diện</label>
              <input
                type="file"
                name=""
                id="avatar"
                accept=".png,.jpg"
                onChange={handleAvatar}
              />
            </div>
            <div className="alert">
              {message.avatar && !message.avatar.validation && (
                <p>{message.avatar.message}</p>
              )}
            </div>
          </div>
          <div className="avatar-view">
            {avatar && <img src={avatar.preview} alt="" width="80%" />}
          </div>
          <div className="button-summit">
            <button type="submit" onClick={(e) => validationForm(e)}>
              Tạo tài khoản
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
