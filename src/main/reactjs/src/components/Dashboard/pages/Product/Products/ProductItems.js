var productLine = [
  {
    id: 0,
    name: "Laptop Dell Inspiron T7420 N4I5021W",
    image: "../../../image/pc_sample.png",
    category: 0,
  },
  {
    id: 1,
    name: "Laptop Dell Vostro 3405",
    image: "../../../image/pc_sample.png",
    category: 1,
  },
  {
    id: 2,
    name: "Laptop Dell Inspiron 16 5625 99VP91",
    image: "../../../image/pc_sample.png",
    category: 0,
  },
  {
    id: 3,
    name: "Laptop Dell XPS 13 Plus 9320 5CG56",
    image: "../../../image/pc_sample.png",
    category: 2,
  },
  {
    id: 4,
    name: "Laptop Dell XPS 15 9520 70295790",
    image: "../../../image/pc_sample.png",
    category: 2,
  },
  {
    id: 5,
    name: "Laptop Dell XPS 13 9320 70295789",
    image: "../../../image/pc_sample.png",
    category: 2,
  },
  {
    id: 6,
    name: "Dell Inspiron 5620 N6I7110W1",
    image: "../../../image/pc_sample.png",
    category: 0,
  },
  {
    id: 7,
    name: "Laptop Dell Vostro 13 5320 M32DH1",
    image: "../../../image/pc_sample.png",
    category: 1,
  },
  {
    id: 8,
    name: "Laptop Dell Vostro 5320 V3I7005W",
    image: "../../../image/pc_sample.png",
    category: 1,
  },
];

function getItems() {
  return productLine;
}

function setItems(newItems) {
  productLine = newItems;
}

const category = ["Dell Inspiron", "Dell Vostro", "Dell XPS"];

export { getItems, setItems, category };
