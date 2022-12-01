// Thẩm dòng sản phẩm
function productLineValidation(productLine) {
  if (productLine === -1) {
    return {
      validation: false,
      message: "Dòng sản phẩm không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Dòng sản phẩm chọn thành công",
    };
  }
}

// Thẩm định loại sản phẩm
function productValidation(product) {

  if (product === -1) {
    return {
      validation: false,
      message: "Loại sản phẩm không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Loại sản phẩm chọn thành công",
    };
  }
}

// Thẩm định loại sản phẩm
function statusValidation(status) {
  if (status === -1) {
    return {
      validation: false,
      message: "Trạng thái sản phẩm không được để trống",
    };
  } else {
    return {
      validation: true,
      message: "Trạng thái sản phẩm chọn thành công",
    };
  }
}

// Thẩm định vị trí sản phẩm
function positionValidation(position) {

  // return {
  //   validation: true,
  //   message: "Vị trí sản phẩm chọn thành công",
  // }

  console.log(position)

  if (
    position.factory === true || 
    position.agency === true || 
    position.insuarance === true
    ) {
    return {
      validation: true,
      message: "Vị trí sản phẩm chọn thành công",
    };
  } else {
    return {
      validation: false,
      message: "Vị trí sản phẩm không được để trống",
    };
  }
}



export {
  productLineValidation,
  productValidation,
  statusValidation,
  positionValidation
};
