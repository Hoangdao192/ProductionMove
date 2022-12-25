import { UilClipboardAlt, UilChart } from "@iconscout/react-unicons";

const navData = [
  {
    icon: UilClipboardAlt,
    title: "Thống kê",
  },
  {
    icon: UilChart,
    title: "Đồ thị",
  },
];

const headDataProduct = {
  mounth: [
    "STT",
    "ProductId",
    "Name",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "Tổng sản phẩm",
  ],
  quarter: ["STT", "ProductId", "Name", "1", "2", "3", "4", "Tổng sản phẩm"],
  year: ["STT", "ProductId", "Name", "1", "2", "3", "4", "5", "Tổng sản phẩm"],
};

const dataProduct = [
  {
    id: 0,
    productId: 0,
    name: "product line 0",
    quarter: [70, 40, 140, 110],
    mounth: [5, 17, 10, 13, 21, 5, 10, 4, 7, 10, 3, 15],
    year: [170, 70, 50, 180, 30],
    quantity: {
      quarter: 360,
      mounth: 120,
      year: 500,
    },
  },
  {
    id: 1,
    productId: 1,
    name: "product line 1",
    quarter: [30, 50, 130, 150],
    mounth: [1, 5, 4, 7, 2, 11, 9, 18, 13, 16, 15, 19],
    year: [150, 20, 100, 180, 50],
    quantity: {
      quarter: 360,
      mounth: 120,
      year: 500,
    },
  },
  {
    id: 2,
    productId: 2,
    name: "product line 2",
    quarter: [10, 60, 120, 170],
    mounth: [9, 7, 3, 10, 15, 19, 1, 5, 10, 17, 13, 11],
    year: [120, 80, 50, 170, 80],
    quantity: {
      quarter: 360,
      mounth: 120,
      year: 500,
    },
  },
];

export { navData, headDataProduct, dataProduct };
