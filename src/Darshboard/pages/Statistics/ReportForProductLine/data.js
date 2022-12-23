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

// 2022-12-23T13:06:21.928Z
const headDataProductByLine = {
  status: [
    "STT",
    "ProductId",
    "Name",
    "status 0",
    "status 1",
    "status 2",
    "status 3",
    "status 4",
    "status 5",
    "status 6",
    "status 7",
    "status 8",
    "status 9",
    "status 10",
    "status 11",
    "Tổng sản phẩm",
  ],
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
  year: [
    "STT",
    "ProductId",
    "Name",
    "11",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
    "Tổng sản phẩm",
  ],
};
const dataProductByLine = [
  {
    id: 0,
    productId: 0,
    name: "product line 0",
    status: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    mounth: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    year: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    quantity: {
      status: 120,
      mounth: 120,
      year: 1200,
    },
  },
  {
    id: 1,
    productId: 1,
    name: "product line 1",
    status: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    mounth: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    year: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    quantity: {
      status: 120,
      mounth: 120,
      year: 1200,
    },
  },
  {
    id: 2,
    productId: 2,
    name: "product line 2",
    status: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    mounth: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    year: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    quantity: {
      status: 120,
      mounth: 120,
      year: 1200,
    },
  },
];

export { navData, headDataProductByLine, dataProductByLine };
