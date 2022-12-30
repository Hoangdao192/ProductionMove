const ProductStatus = [
    { key: "Agency", value: "Đang bán"},
    { key: "Sole", value: "Đã bán"},
    { key: "Error need warranty", value: "Lỗi cần bảo hành"},
    { key: "Under warranty", value: "Đang bảo hành"},
    { key: "Returned warranty", value: "Đã trả lại khách hàng"},
    { key: "Error factory", value: "Lỗi cần đưa về nhà máy"},
    { key: "Error returned factory", value: "Lỗi, đã đưa về nhà máy"},
    { key: "Error summon", value: "Lỗi, cần triệu hồi"},
    { key: "Warranty expired", value: "Hết bảo hành"},
    { key: "Returned factory", value: "Đã trả lại nhà máy"},
    { key: "Cannot sale", value: "Không bán được"},
    { key: "Newly produced", value: "Mới sản xuất"},
    { key: "Admin", value: "Ban quản lý"},
    { key: "Distributor", value: "Đại lý"},
    { key: "Warranty", value: "Trung tâm bảo hành"}
];

ProductStatus["Newly produced"] = "Mới sản xuất";
ProductStatus["Agency"] = "Đang bán"
ProductStatus["Sole"] = "Đã bán"
ProductStatus["Error need warranty"] = "Lỗi cần bảo hành"
ProductStatus["Under warranty"] = "Đang bảo hành"
ProductStatus["Returned warranty"] = "Đã trả lại khách hàng"
ProductStatus["Error factory"] = "Lỗi cần đưa về nhà máy"
ProductStatus["Error returned factory"] = "Lỗi, đã đưa về nhà máy"
ProductStatus["Error summon"] = "Lỗi, cần triệu hồi"
ProductStatus["Warranty expired"] = "Hết bảo hành"
ProductStatus["Returned factory"] = "Đã trả lại nhà máy"
ProductStatus["Cannot sale"] = "Không bán được"
ProductStatus["Newly produced"] = "Mới sản xuất"
ProductStatus["Admin"] = "Ban quản lý"
ProductStatus["Distributor"] = "Đại lý"
ProductStatus["Warranty"] = "Trung tâm bảo hành"

export default ProductStatus;