import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WarrantyForm from "./WarrantyForm";
import Review from "./Review";

const steps = ["Nhập thông tin", "Tạo yêu cầu bảo hành"];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <WarrantyForm />;
        case 1:
            return <Review />;
        default:
            throw new Error("Unknown step");
    }
}

const theme = createTheme();

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <div className="contain">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper
                        variant="outlined"
                        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 4 }}
                    >
                        <Typography component="h1" variant="h4" align="center">
                            Tạo yêu cầu bảo hành
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Tạo yêu cầu bảo hành thành công.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Yêu cầu bảo hành sản phẩm đã được tạo thành công. Chúng tôi sẽ
                                    liên hệ để nhận sản phẩm và bảo hành trong thời gian sớm nhất.
                                </Typography>

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Trang chủ
                                    </Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Quay lại
                                        </Button>
                                    )}

                                    <Button
                                        variant="contained"
                                        onClick={() => handleNext()}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        {activeStep === steps.length - 1 ? "Yêu cầu" : "Tiếp theo"}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Paper>
                </Container>
            </ThemeProvider>
        </div>
    );
}
