import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Snackbar,
  Alert,
  Autocomplete,
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import image1 from "../assets/logo/image_1.png";
import { useNavigate } from "react-router-dom";

const KanbanLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    dbName: "",
    emailID: "",
    password: "",
  });

  const [companyOptions, setCompanyOptions] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const sessionData =
      sessionStorage.getItem("loginSession") ||
      localStorage.getItem("loginSession");

    if (sessionData) {
      try {
        const { timestamp } = JSON.parse(sessionData);
        const now = new Date().getTime();
        const maxAge = 3 * 60 * 1000; // 3 minutes

        if (now - timestamp < maxAge) {
          navigate("/app/home");
        } else {
          sessionStorage.removeItem("loginSession");
          localStorage.removeItem("loginSession");
        }
      } catch (err) {
        console.error("Invalid session data", err);
        sessionStorage.removeItem("loginSession");
        localStorage.removeItem("loginSession");
      }
    }

    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "http://localhost:5145/api/DBList/Database"
        );
        const result = await response.json();
        const dbNames = result.map((item) => item.dbName);
        setCompanyOptions(dbNames);
      } catch (error) {
        setAlert({
          open: true,
          message: "Company list fetch failed!",
          severity: "error",
        });
      }
    };

    fetchCompanies();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (event, value) => {
    setFormData({ ...formData, companyName: value, dbName: value });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { companyName, emailID, password } = formData;

    if (!companyName || !emailID || !password) {
      setAlert({
        open: true,
        message: "Please fill in all fields",
        severity: "error",
      });
      return;
    }

    try {
      const queryParams = new URLSearchParams({
        username: emailID,
        password: password,
        database: companyName,
      });

      const response = await fetch(
        `http://localhost:5145/api/DBList/CompanyLogin?${queryParams.toString()}`,
        {
          method: "GET",
        }
      );

      const resultText = await response.text();
      console.log("Login response:", resultText);

      if (resultText === "Success") {
        const sessionPayload = {
          email: emailID,
          company: companyName,
          timestamp: new Date().getTime(),
        };

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("loginSession", JSON.stringify(sessionPayload));

        setAlert({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/app/home");
        }, 1000);
      } else {
        setAlert({
          open: true,
          message: "Login failed!",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      setAlert({
        open: true,
        message: "Login failed! Try again later.",
        severity: "error",
      });
    }
  };

  return (
    <Box>
      <Box>
        <img
          src={image1}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
          }}
        />
      </Box>

      <Box sx={{ height: "100vh" }}>
        <Box
          sx={{
            position: "fixed",
            right: 20,
            top: 0,
            height: "100%",
            width: { xs: "100%", sm: "400px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              p: 3,
              width: "100%",
              mx: 2,
              position: "relative",
              opacity: 0.85,
              backgroundColor: "white",
            }}
          >
            <AccountCircle
              sx={{
                width: 70,
                height: 70,
                position: "absolute",
                top: -38,
                left: "calc(50% - 35px)",
                color: "#080008ff",
              }}
            />
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
              <Autocomplete
                fullWidth
                options={companyOptions}
                value={formData.companyName}
                onChange={handleCompanyChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Database Name"
                    margin="normal"
                    InputLabelProps={{ style: { fontSize: "14px" } }}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        height: "40px",
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
              />

              <TextField
                fullWidth
                label="Email ID"
                name="emailID"
                value={formData.emailID}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ style: { fontSize: "14px" } }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontSize: "14px",
                  },
                }}
              />

              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel sx={{ fontSize: "14px", top: "-6px" }}>
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  sx={{
                    height: "40px",
                    fontSize: "14px",
                  }}
                />
              </FormControl>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={handleRememberMe}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "14px" }}>
                      Remember Me
                    </Typography>
                  }
                />
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", fontSize: "12px" }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, fontSize: "14px", py: 1 }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Box>

        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={() => setAlert({ ...alert, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={alert.severity}
            onClose={() => setAlert({ ...alert, open: false })}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default KanbanLogin;
