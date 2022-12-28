import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";

const customers = [
  {
    id: "12345",
    name: "Nguyen A",
    phone: "0987654321",
    addressId: "47 Ngo 66 ho tung mau, Cau Giay, Ha Noi, VN",
  },
];

const products = [
  { deviceId: "DGM15", mdsp: "GM", tdsp: "Dell Gaming G15", date: "15/11/2022" },
];

export default function Review() {
  return (
    <React.Fragment>
      <Grid container>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Thông tin khách hàng
        </Typography>
        <List disablePadding>
          {customers.map((customer) => (
            <React.Fragment key={customer.id}>
              <ListItem sx={{ mb: 0 }}>
                Mã khách hàng:
                <Typography sx={{ ml: 2 }}>{customer.id}</Typography>
              </ListItem>
              <ListItem sx={{ mb: 0 }}>
                Số điện thoại:
                <Typography sx={{ ml: 2 }}>{customer.phone}</Typography>
              </ListItem>
              <ListItem sx={{ mb: 1 }}>
                Địa chỉ:
                <Typography sx={{ ml: 2 }}>{customer.addressId}</Typography>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Thông tin sản phẩm
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <List key={product.deviceId}>
            <ListItem sx={{ mb: 0 }}>
              Mã sản phẩm:
              <Typography sx={{ ml: 2 }}>{product.deviceId}</Typography>
            </ListItem>
            <ListItem sx={{ mb: 0 }}>
              Mã dòng sản phẩm:
              <Typography sx={{ ml: 2 }}>{product.mdsp}</Typography>
            </ListItem>
            <ListItem sx={{ mb: 0 }}>
              Tên dòng sản phẩm:
              <Typography sx={{ ml: 2 }}>{product.tdsp}</Typography>
            </ListItem>
            <ListItem sx={{ mb: 0 }}>
              Ngày kích hoạt:
              <Typography sx={{ ml: 2 }}>{product.date}</Typography>
            </ListItem>
          </List>
        ))}
      </List>
    </React.Fragment>
  );
}
