import {
  UilEstate,
  // UilClipboardAlt,
  UilUser,
  UilPackage,
  // UilChart,
} from "@iconscout/react-unicons";

export const SiderData = [
  {
      icon: UilEstate,
      heading: "Trang chủ",
      link: '',
  },
  {
      icon: UilUser,
      heading: "Tài khoản",
      link: 'acount',
      children: [
        {
          icon: UilPackage,
          heading: "Danh sách tài khoản",
          link: 'listAcount',
        }
      ]
  },
  {
      icon: UilPackage,
      heading: "Sản phẩm",
      link: 'product',
      children: [
        {
          icon: UilPackage,
          heading: "Dòng sản phẩm",
          link: 'productLine',
        },
        {
          icon: UilPackage,
          heading: "Loại sản phẩm",
          link: 'product',
        },
        {
          icon: UilPackage,
          heading: "Thiết bị",
          link: 'device',
        },
      ]
  },
  // {
  //   icon: UilClipboardAlt,
  //   heading: "Orders"
  // },
  // {
  //     icon: UilChart,
  //     heading: "Analytics"
  // },  
];

export const InfoUser = {
  avatar: require('../../../image/user.jpg'),
  firstName: "Cường",
  lastName: "Trần Đình"
}
