const statusProduct = [
  { status: "NEW", quantity: 300, color: "rgb(66, 194, 255)" },
  { status: "AGENCY", quantity: 80, color: "rgb(150, 229, 209)" },
  { status: "SOLD", quantity: 200, color: "rgb(0, 8, 193)" },
  { status: "ERROR_INSURANCE", quantity: 20, color: "rgb(128,188,210)" },
  { status: "FIXING", quantity: 25, color: "rgb(225,255,238)" },
  { status: "REFURBISHED", quantity: 50, color: "rgb(88,0,255)" },
  { status: "RETURN_CUSTOMER", quantity: 50, color: "rgb(1,255,246)" },
  { status: "ERROR_FACTORY", quantity: 10, color: "rgb(194,17,17)" },
  { status: "ERROR_RETURN_FACTORY", quantity: 10, color: "rgb(230,73,73)" },
  { status: "ERROR_WIDE", quantity: 15, color: "rgb(255,135,135)" },
  { status: "OUT_OF_WARRANTY", quantity: 100, color: "rgb(56,229,77)" },
  { status: "CANNOT_SELL", quantity: 10, color: "rgb(74,80,61)" },
];

const fatoryProduct = [
  { factory: "factory_0", quantity: 100, color: "rgb(255,135,135)" },
  { factory: "factory_1", quantity: 150, color: "rgb(34,146,255)" },
  { factory: "factory_2", quantity: 120, color: "rgb(240,255,67)" },
  { factory: "factory_3", quantity: 170, color: "rgb(204,214,166)" },
];

const warrantyProduct = [
  { warranty: "warranty_0", quantity: 10, color: "rgb(171,217,255)" },
  { warranty: "warranty_1", quantity: 15, color: "rgb(165,241,233)" },
  { warranty: "warranty_2", quantity: 18, color: "rgb(255,238,175)" },
  { warranty: "warranty_3", quantity: 13, color: "rgb(255,203,67)" },
];

const agencyProduct = [
  { agency: "agency_0", quantity: 110, color: "rgb(230,73,73)" },
  { agency: "agency_1", quantity: 130, color: "rgb(255,222,180)" },
  { agency: "agency_2", quantity: 100, color: "rgb(59,180,242)" },
  { agency: "agency_3", quantity: 150, color: "rgb(178,164,255)" },
];

export { statusProduct, fatoryProduct, warrantyProduct, agencyProduct };
