package com.uet.productionmove.entity;

/**
 * Trạng thái của sản phẩm
 */
public class ProductStatus {
    //  Vừa mới được sản xuất
    public static String NEWLY_PRODUCED = "Newly produced";
    // Đã đưa về đại lý
    public static String AGENCY = "Agency";
    //  Đã bán cho khách hàng
    public static String SOLD = "Sold";
    //  Lỗi, cần  bảo hành
    public static String ERROR_WARRANTY = "Error need warranty";
    //  Đang được bảo hành
    public static String UNDER_WARRANTY = "Under warranty";
    //  Đã bảo hành xong
    public static String DONE_WARRANTY = "Done warranty";
    //  Đã trả lại khách hàng sau khi bảo hành
    public static String RETURNED_WARRANTY = "Returned warranty";
    // Lỗi, cần trả về nhà máy
    public static String ERROR_FACTORY = "Error factory";
    //  Lỗi, đã đưa về cơ sở sản xuất
    public static String ERROR_RETURNED_FACTORY = "Error returned factory";
    //  Lỗi, cần triệu hồi
    public static String ERROR_SUMMON = "Error summon";
    //  Hết thời gian bảo hành
    public static String WARRANTY_EXPIRED = "Warranty expired";
    //  Trả lại cơ sở sản xuất
    public static String RETURNED_FACTORY = "Returned factory";
}
