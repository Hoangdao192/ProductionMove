const users = [
  {
    id: 0,
    username: "cuong@gmail.com",
    password: "12345678",
    role: "ManfactureFactory",
  },
  {
    id: 1,
    username: "dao@gmail.com",
    password: "12345678",
    role: "Distributor",
  },
  {
    id: 2,
    username: "duc@gmail.com",
    password: "12345678",
    role: "WarrantyCenter",
  },
  {
    id: 3,
    username: "luyen@gmail.com",
    password: "12345678",
    role: "ManfactureFactory",
  },
  {
    id: 4,
    username: "khuyen@gmail.com",
    password: "12345678",
    role: "Distributor",
  },
  {
    id: 5,
    username: "thanh@gmail.com",
    password: "12345678",
    role: "WarrantyCenter",
  },
];

const manfactureFactory = [
  {
    id: 0,
    name: "Trần Đình Cường",
    addressId: 0,
    phoneNumber: "0862964913",
  },
  {
    id: 3,
    name: "Lê Văn Luyện",
    addressId: 1,
    phoneNumber: "0862964913",
  },
];

const distributor = [
  {
    id: 1,
    name: "Nguyễn Đăng Hoàng Đạo",
    addressId: 2,
    phoneNumber: "0862964913",
  },
  {
    id: 4,
    name: "Nguyễn Khuyến",
    addressId: 3,
    phoneNumber: "0862964913",
  },
];

const warrantyCenter = [
  {
    id: 2,
    name: "Đinh Ngọc Đức",
    addressId: 4,
    phoneNumber: "0862964913",
  },
  {
    id: 5,
    name: "Vũ Văn Thanh",
    addressId: 5,
    phoneNumber: "0862964913",
  },
];

const address = [
  {
    addressId: 0,
    address: "Hà Nam",
  },
  {
    addressId: 1,
    address: "Hà Nội",
  },
  {
    addressId: 2,
    address: "Nam Định",
  },
  {
    addressId: 3,
    address: "Hà Tĩnh",
  },
  {
    addressId: 4,
    address: "Quảng Nam",
  },
  {
    addressId: 5,
    address: "Quảng trị",
  },
];

const role = ["ManfactureFactory", "Distributor", "WarrantyCenter"];

export { users, manfactureFactory, distributor, warrantyCenter, address, role };
