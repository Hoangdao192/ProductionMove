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

const dataProductError = {
  totalProducts: 2000,
  totalErrorProducts: 15,
  products: {
    productLine: [
      "product line 0",
      "product line 1",
      "product line 2",
      "product line 3",
    ],
    total: [500, 500, 500, 500],
    error: [3, 3, 4, 5],
  },
  factory: {
    facories: ["factory 0", "factory 1", "factory 2", "factory 3"],
    total: [200, 300, 400, 100],
    totalProducts: 1000,
    error: [1, 1, 2, 2],
    totalErrorProducts: 6,
  },
  distributor: {
    distributors: [
      "distributor 0",
      "distributor 1",
      "distributor 2",
      "distributor 3",
    ],
    total: [250, 250, 250, 250],
    totalProducts: 1000,
    error: [2, 2, 4, 1],
    totalErrorProducts: 9,
  },
};

export { dataProductError, navData };
