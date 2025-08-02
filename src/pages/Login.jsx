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
} from "@mui/material";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import cvsBckImage from "../assets/logo/kanban_screen.png";
import cvsBckImage1 from "../assets/logo/kanban_screen1.png";
import cvsBckImage2 from "../assets/logo/kanban_screen2.jpg";
import cvsBckImage3 from "../assets/logo/original.png";
import cvsBckImage4 from "../assets/logo/4th image.png";
import { useNavigate } from "react-router-dom";

const KanbanLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ emailID: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const roundedTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
    },
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailID");
    const storedPassword = localStorage.getItem("password");
    const expiry = localStorage.getItem("loginExpiry");
    if (
      storedEmail &&
      storedPassword &&
      expiry &&
      Date.now() < parseInt(expiry)
    ) {
      setFormData({ emailID: storedEmail, password: storedPassword });
      setRememberMe(true);
    } else {
      localStorage.removeItem("emailID");
      localStorage.removeItem("password");
      localStorage.removeItem("loginExpiry");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e) => {
    const checked = e.target.checked;
    setRememberMe(checked);
    if (!checked) {
      localStorage.removeItem("emailID");
      localStorage.removeItem("password");
      localStorage.removeItem("loginExpiry");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emailID || !formData.password) {
      setAlert({
        open: true,
        message: "Please enter Email and Password",
        severity: "error",
      });
      return;
    }
    if (rememberMe) {
      const expiryTime = Date.now() + 5 * 60 * 1000;
      localStorage.setItem("emailID", formData.emailID);
      localStorage.setItem("password", formData.password);
      localStorage.setItem("loginExpiry", expiryTime.toString());
    }
    setAlert({ open: true, message: "Login Successful", severity: "success" });
    setTimeout(() => {
      navigate("/app/home");
    }, 1000);
  };

  return (
    <Box>
      <Box>
        <img
          src={cvsBckImage}
          alt="Logo"
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
          }}
        />
      </Box>
      <Box sx={{ height: "100vh" }}>
        {/* Right fixed login box */}
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
            opacity: 1, // Opacity for the right box
          }}
        >
          <Paper
            elevation={5}
            sx={{
              p: 3,
              width: "100%",
              mx: 2,
              position: "relative",
              opacity: 0.85, // Set opacity of the CardView (Paper)
              backgroundColor: "white", // White background under opacity
            }}
          >
            <AccountCircle
              sx={{
                width: 70,
                height: 70,
                position: "absolute",
                top: -38,
                left: "calc(50% - 35px)",
                color: "#58709aff",
              }}
            />
            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailID"
                value={formData.emailID}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                  style: { fontSize: "14px" },
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontSize: "14px",
                    "& input": {
                      height: "45px",
                      padding: "0 8px",
                      roundedTextField,
                    },
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
                    roundedTextField,
                    "& input": {
                      height: "45px",
                      padding: "0 8px",
                    },
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
