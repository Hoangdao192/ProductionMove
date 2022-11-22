function nameCategoryValidation(name) {
  if (name.length === 0) {
    return {
      validation: false,
      message: "Tên loại sản phẩm không để trống",
    };
  }

  if (name.length < 8) {
    return {
      validation: false,
      message: "Tên loại sản phẩm ít nhất 8 ký tự",
    };
  } else {
    return {
      validation: true,
      message: "Tên loại sản phẩm nhập thành công",
    };
  }
}

export { nameCategoryValidation };
