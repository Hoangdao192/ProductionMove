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

// Thẩm định loại tài khoản
function roleValidation(role) {
  if (parseInt(role) === -1) {
    return {
      validation: false,
      message: "Vai trò không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Vai trò đã được chọn",
    };
  }
}

// Thẩm định địa chỉ
function addressValidation(address) {
  if (address === -1) {
    return {
      validation: false,
      message: "Địa chỉ nhập không chính xác",
    };
  } else {
    return {
      validation: true,
      message: "Địa chỉ nhập chính xác",
    };
  }
}

// Thẩm định số điện thoại
function phoneValidation(checkPhone) {
  if (checkPhone) {
    return {
      validation: true,
      message: "Số điện thoại hợp lệ",
    };
  } else {
    return {
      validation: false,
      message: "Số điện thoại không hợp lệ",
    };
  }
}

export {
  nameValidation,
  userValidation,
  passValidation,
  passAgainValidation,
  roleValidation,
  addressValidation,
  phoneValidation,
};
