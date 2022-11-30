// Thẩm định tên
function nameValidation(name) {
  if (name.length === 0) {
    return {
      validation: false,
      message: "Tên người dùng không được để trống",
    };
  } else if (name.length < 8) {
    return {
      validation: false,
      message: "Tên người dùng chứa ít nhất 8 ký tự",
    };
  } else {
    return {
      validation: true,
      message: "Tên người dùng nhập thành công",
    };
  }
}

// Thẩm định tài khoản
function userValidation(user) {
  const userformat = /[\w\d]+/;

  if (user.length === 0) {
    return {
      validation: false,
      message: "Tài khoản không được để trống",
    };
  }

  if (user.match(userformat)) {
    return {
      validation: true,
      message: "Tài khoản nhập thành công",
    };
  } else {
    return {
      validation: false,
      message: "Tài khoản chỉ chứa ký tự từ a-z, A-Z, 0-9",
    };
  }
}

// Thẩm định mật khẩu
function passValidation(pass) {
  if (pass.length < 8) {
    return {
      validation: false,
      message: "Mật khẩu phải chứa ít nhất 8 ký tự",
    };
  } else {
    return {
      validation: true,
      message: "Mật khẩu nhập thành công",
    };
  }
}

// Thẩm định lại mật khẩu
function passAgainValidation(pass, passAgain) {
  if (pass === passAgain) {
    return {
      validation: true,
      message: "Mật khẩu xác nhận chính xác",
    };
  } else {
    return {
      validation: false,
      message: "Mật khẩu xác nhận không chính xác",
    };
  }
}

// Thẩm định email
function emailValidation(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.length === 0) {
    return {
      validation: false,
      message: "Email không được để trống",
    };
  }

  if (email.match(mailformat)) {
    return {
      validation: true,
      message: "Email nhập thành công",
    };
  } else {
    return {
      validation: false,
      message: "Email không đúng định dạng",
    };
  }
}

// Thẩm định loại tài khoản
function typeAcountValidation(typeAcount) {
  if (parseInt(typeAcount) === -1) {
    return {
      validation: false,
      message: "Loại tài khoản không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Loại tài khoản đã được chọn",
    };
  }
}

// Thẩm định ảnh đại diện
function avatartValidation(avatar) {
  if (avatar) {
    return {
      validation: true,
      message: "Ảnh đại diện đã được chọn",
    };
  } else {
    return {
      validation: false,
      message: "Ảnh đại diện không được bỏ trống",
    };
  }
}

export {
  nameValidation,
  userValidation,
  passValidation,
  passAgainValidation,
  emailValidation,
  typeAcountValidation,
  avatartValidation,
};
