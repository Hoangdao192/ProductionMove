import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function PaymentForm() {
    const [details, setDetails] = React.useState({
        customerId: "",
        deviceId: "",
    });

    console.log(details);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Điền thông tin của bạn
            </Typography>
            <Grid container spacing={6}>
                <Grid item xs={12} md={10}>
                    <TextField
                        required
                        label="Mã khách hàng"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setDetails({ ...details, customerId: e.target.value });
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={10}>
                    <TextField
                        required
                        label="Mã sản phẩm"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setDetails({ ...details, deviceId: e.target.value });
                        }}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
