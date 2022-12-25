const acounts = [
  {
    id: 0,
    user: "user_0",
    pass: "pass12345678",
    name: "Trần Đình Cường",
    email: "email@gmail.com",
    typeAcount: 0,
    avatar: "...",
  },
  {
    id: 1,
    user: "user_1",
    pass: "pass12345678",
    name: "Nguyễn Đăng Hoàng Đạo",
    email: "email@gmail.com",
    typeAcount: 1,
    avatar: "...",
  },
  {
    id: 2,
    user: "user_2",
    pass: "pass12345678",
    name: "Đinh Ngọc Đức ",
    email: "email@gmail.com",
    typeAcount: 2,
    avatar: "...",
  },
  {
    id: 3,
    user: "user_3",
    pass: "pass12345678",
    name: "Trần Thanh Hà",
    email: "email@gmail.com",
    typeAcount: 0,
    avatar: "...",
  },
  {
    id: 4,
    user: "user_4",
    pass: "pass12345678",
    name: "Vũ Văn Thanh",
    email: "email@gmail.com",
    typeAcount: 1,
    avatar: "../../../image/user.jpg",
  },
];

const typeAccounts = [
    { key: "Manufacture", value: "Cơ sở sản xuất"},
    { key: "Admin", value: "Ban quản lý"},
    { key: "Distributor", value: "Đại lý"},
    { key: "Warranty", value: "Trung tâm bảo hành"}
];
typeAccounts["Manufacture"] = "Cơ sở sản xuất";
typeAccounts["Admin"] = "Ban quản lý";
typeAccounts["Distributor"] = "Đại lý";
typeAccounts["Warranty"] = "Trung tâm bảo hành";


export { acounts, typeAccounts };
