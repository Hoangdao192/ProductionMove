package com.uet.productionmove.entity;

public class ProductWarrantyStatus {
    //  Chờ xác nhận bảo hành
    public static final String WAITING = "Waiting";
    //  Đang bảo hành
    public static final String DOING = "Doing";
    //  Bảo hành xong
    public static final String DONE = "Done";
    //  Trả lại khách hàng
    public static final String RETURNED = "Returned";
    //  Không thể bảo hành
    public static final String CANNOT_WARRANTY = "Cannot warranty";
    //  Không thể bảo hành, đã trả về nhà máy
    public static final String ERROR_RETURNED_WARRANTY = "Error returned warranty";
}
