// Thẩm định tên dòng sản phẩm

function productLineValidation(productLine) {
  if (productLine.length === 0) {
    return {
      validation: false,
      message: "Tên dòng sản phẩm không để trống",
    };
  }

  if (productLine.length < 8) {
    return {
      validation: false,
      message: "Tên dòng sản phẩm ít nhất 8 ký tự",
    };
  } else {
    return {
      validation: true,
      message: "Tên dòng sản phẩm nhập thành công",
    };
  }
}

export { productLineValidation };
