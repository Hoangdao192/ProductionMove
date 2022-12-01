// Thẩm định tên sản phẩm
function productValidation(product) {
  if (product.length === 0) {
    return {
      validation: false,
      message: "Tên sản phẩm không được để trống",
    };
  } else if (product.length < 8) {
    return {
      validation: false,
      message: "Tên sản phẩm chứa ít nhất 8 ký tự",
    };
  } else {
    return {
      validation: true,
      message: "Tên sản phẩm nhập thành công",
    };
  }
}

// Thẩm định dòng sản phẩm
function productLineValidation(productLine) {
 
  if (productLine === -1) {
    return {
      validation: false,
      message: "Dòng sản phẩm không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Dòng sản phẩm nhập thành công",
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
  productValidation,
  productLineValidation,
  avatartValidation,
};
