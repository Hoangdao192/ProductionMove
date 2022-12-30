const statusProduct = [
  { status: "ERROR_INSURANCE", quantity: 20, color: "rgb(128,188,210)" },
  { status: "FIXING", quantity: 25, color: "rgb(225,255,238)" },
  { status: "REFURBISHED", quantity: 50, color: "rgb(88,0,255)" },
  { status: "RETURN_CUSTOMER", quantity: 50, color: "rgb(1,255,246)" },
  { status: "OUT_OF_WARRANTY", quantity: 100, color: "rgb(56,229,77)" },
];

const manufacturingProduct = {
  mounth: [
    { name: 1, quantity: 100, color: "rgb(66, 194, 255)" },
    { name: 2, quantity: 120, color: "rgb(150, 229, 209)" },
    { name: 3, quantity: 130, color: "rgb(0, 8, 193)" },
    { name: 4, quantity: 140, color: "rgb(128,188,210)" },
    { name: 5, quantity: 150, color: "rgb(225,255,238)" },
    { name: 6, quantity: 130, color: "rgb(88,0,255)" },
    { name: 7, quantity: 170, color: "rgb(1,255,246)" },
    { name: 8, quantity: 160, color: "rgb(194,17,17)" },
    { name: 9, quantity: 150, color: "rgb(230,73,73)" },
    { name: 10, quantity: 120, color: "rgb(255,135,135)" },
    { name: 11, quantity: 140, color: "rgb(56,229,77)" },
    { name: 12, quantity: 130, color: "rgb(74,80,61)" },
  ],
  quarter: [
    { name: 1, quantity: 400, color: "rgb(255,135,135)" },
    { name: 2, quantity: 500, color: "rgb(34,146,255)" },
    { name: 3, quantity: 600, color: "rgb(240,255,67)" },
    { name: 4, quantity: 450, color: "rgb(204,214,166)" },
  ],
  year: [
    { name: 1, quantity: 1600, color: "rgb(171,217,255)" },
    { name: 2, quantity: 2000, color: "rgb(165,241,233)" },
    { name: 3, quantity: 2400, color: "rgb(255,238,175)" },
    { name: 4, quantity: 1800, color: "rgb(255,203,67)" },
    { name: 5, quantity: 1600, color: "rgb(230,73,73)" },
  ],
};

const sellProduct = {
  mounth: [
    { name: 1, quantity: 100, color: "rgb(66, 194, 255)" },
    { name: 2, quantity: 120, color: "rgb(150, 229, 209)" },
    { name: 3, quantity: 130, color: "rgb(0, 8, 193)" },
    { name: 4, quantity: 140, color: "rgb(128,188,210)" },
    { name: 5, quantity: 150, color: "rgb(225,255,238)" },
    { name: 6, quantity: 130, color: "rgb(88,0,255)" },
    { name: 7, quantity: 170, color: "rgb(1,255,246)" },
    { name: 8, quantity: 160, color: "rgb(194,17,17)" },
    { name: 9, quantity: 150, color: "rgb(230,73,73)" },
    { name: 10, quantity: 120, color: "rgb(255,135,135)" },
    { name: 11, quantity: 140, color: "rgb(56,229,77)" },
    { name: 12, quantity: 130, color: "rgb(74,80,61)" },
  ],
  quarter: [
    { name: 1, quantity: 400, color: "rgb(255,135,135)" },
    { name: 2, quantity: 500, color: "rgb(34,146,255)" },
    { name: 3, quantity: 600, color: "rgb(240,255,67)" },
    { name: 4, quantity: 450, color: "rgb(204,214,166)" },
  ],
  year: [
    { name: 1, quantity: 1600, color: "rgb(171,217,255)" },
    { name: 2, quantity: 2000, color: "rgb(165,241,233)" },
    { name: 3, quantity: 2400, color: "rgb(255,238,175)" },
    { name: 4, quantity: 1800, color: "rgb(255,203,67)" },
    { name: 5, quantity: 1600, color: "rgb(230,73,73)" },
  ],
};

const errorProduct = {
  productLine: [
    { name: "product line 0", quantity: 3, color: "rgb(230,73,73)" },
    { name: "product line 1", quantity: 1, color: "rgb(255,222,180)" },
    { name: "product line 2", quantity: 2, color: "rgb(59,180,242)" },
    { name: "product line 3", quantity: 5, color: "rgb(178,164,255)" },
  ],
  factory: [
    { name: "factory 0", quantity: 2, color: "rgb(8,65,220)" },
    { name: "factory 1", quantity: 1, color: "rgb(8,179,251)" },
    { name: "factory 2", quantity: 3, color: "rgb(241,215,88)" },
    { name: "factory 3", quantity: 4, color: "rgb(241,70,73)" },
  ],
  agency: [
    { name: "agency 0", quantity: 1, color: "rgb(4,89,255)" },
    { name: "agency 1", quantity: 0, color: "rgb(243,147,27)" },
    { name: "agency 2", quantity: 2, color: "rgb(50,188,107)" },
    { name: "agency 3", quantity: 3, color: "rgb(255,187,12)" },
  ],
  quantityErrorProducts: 6,
  quantityProducts: 2000,
};

const warrantyProduct = {
  mounth: [
    { name: 1, quantity: 100, color: "rgb(66, 194, 255)" },
    { name: 2, quantity: 120, color: "rgb(150, 229, 209)" },
    { name: 3, quantity: 130, color: "rgb(0, 8, 193)" },
    { name: 4, quantity: 140, color: "rgb(128,188,210)" },
    { name: 5, quantity: 150, color: "rgb(225,255,238)" },
    { name: 6, quantity: 130, color: "rgb(88,0,255)" },
    { name: 7, quantity: 170, color: "rgb(1,255,246)" },
    { name: 8, quantity: 160, color: "rgb(194,17,17)" },
    { name: 9, quantity: 150, color: "rgb(230,73,73)" },
    { name: 10, quantity: 120, color: "rgb(255,135,135)" },
    { name: 11, quantity: 140, color: "rgb(56,229,77)" },
    { name: 12, quantity: 130, color: "rgb(74,80,61)" },
  ],
  quarter: [
    { name: 1, quantity: 400, color: "rgb(255,135,135)" },
    { name: 2, quantity: 500, color: "rgb(34,146,255)" },
    { name: 3, quantity: 600, color: "rgb(240,255,67)" },
    { name: 4, quantity: 450, color: "rgb(204,214,166)" },
  ],
  year: [
    { name: 1, quantity: 1600, color: "rgb(171,217,255)" },
    { name: 2, quantity: 2000, color: "rgb(165,241,233)" },
    { name: 3, quantity: 2400, color: "rgb(255,238,175)" },
    { name: 4, quantity: 1800, color: "rgb(255,203,67)" },
    { name: 5, quantity: 1600, color: "rgb(230,73,73)" },
  ],
};

export {
  statusProduct,
  manufacturingProduct,
  sellProduct,
  errorProduct,
  warrantyProduct,
};
