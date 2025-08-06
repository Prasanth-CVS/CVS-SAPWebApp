import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Autocomplete,
  InputAdornment,
  Typography,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SnackbarAlert from "../../../components/shared/SnackbarAlert";
import { useSelector } from "react-redux";
import EntitySelector from "../components/entitySelector";
import { Height, InfoOutlined } from "@mui/icons-material";
import { useState } from "react";
import ButtonActions from "../../../components/events/Buttons";

const UserDialog = ({
  open,
  btnText,
  handleClose,
  handleSubmit,
  formData,
  setFormData,
  handleChange,
  userRole,
  supplierData,
  entityData = [],
  setEntityData,
  snackOpen,
  handleSnackClose,
  severity,
  message,
  settingsName,
  isUpdateMode,
  fetchSupplierInfo,
}) => {
  const isSupplier =
    userRole.find((r) => r.roleID.toString() === formData.roleName)
      ?.roleName === "Supplier";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const roundedTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
    },
  };

  // Corrected: Show entityName of the default entity, not entityDefWhs
  const defaultEntityName =
    entityData?.find((e) => e.entityDefWhs)?.entityName || "";

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          maxHeight: "none",
          maxWidth: "270px",
          width: "100%",
          borderRadius: "4px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ fontSize: "13px" }}>
          {btnText === "Submit" ? "Create New User" : "Update User"}
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ color: "red", position: "absolute", top: 8, right: 20, p: 0.7 }}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText />
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box display="flex" flexDirection="column" gap={1.2}>
            {/* Role Selection */}
            <Autocomplete
              size="small"
              options={userRole}
              getOptionLabel={(option) => option.roleName}
              value={
                formData.roleName
                  ? userRole.find(
                      (item) => item.roleID.toString() === formData.roleName
                    )
                  : null
              }
              onChange={(event, value) => {
                setFormData({
                  ...formData,
                  roleName: value?.roleID?.toString() || "",
                });
                if (value?.roleName === "Supplier") fetchSupplierInfo();
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  variant="outlined"
                  fullWidth
                  sx={roundedTextField}
                />
              )}
            />

            {/* User Name */}
            {isSupplier ? (
              <Autocomplete
                size="small"
                options={supplierData}
                getOptionLabel={(option) => option.supName}
                value={
                  formData.userName
                    ? supplierData.find(
                        (item) => item.supCode.toString() === formData.userName
                      )
                    : null
                }
                onChange={(event, value) => {
                  setFormData({
                    ...formData,
                    userName: value?.supCode?.toString() || "",
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    sx={roundedTextField}
                  />
                )}
              />
            ) : (
              <TextField
                size="small"
                fullWidth
                label="User Name"
                name="userName"
                value={formData.userName}
                sx={roundedTextField}
                onChange={handleChange}
                variant="outlined"
              />
            )}

            {/* Email */}
            <TextField
              size="small"
              fullWidth
              sx={roundedTextField}
              label="Email ID"
              name="emailID"
              value={formData.emailID}
              onChange={handleChange}
            />

            {/* Company */}
            <TextField
              size="small"
              fullWidth
              sx={roundedTextField}
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />

            {/* Password */}
            {!isUpdateMode && (
              <TextField
                size="small"
                type="password"
                fullWidth
                sx={roundedTextField}
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            )}

            {/* Entity Name Field with Info Icon */}
            <TextField
              size="small"
              label="Entity Name"
              variant="outlined"
              sx={roundedTextField}
              fullWidth
              value={defaultEntityName}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleInfoClick}>
                      <InfoOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Embedded EntitySelector Popover */}
            <EntitySelector
              anchorEl={anchorEl}
              handleClose={handlePopoverClose}
              entityData={entityData}
              setEntityData={setEntityData}
              snackOpen={snackOpen}
              handleSnackClose={handleSnackClose}
              message={message}
            />

            {/* Status Radio */}
            {isUpdateMode && (
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  row
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Y"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="N"
                    control={<Radio />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              {btnText}
            </Button>

            <ButtonActions type="submit" variant="contained">
              {btnText}
            </ButtonActions>
          </Box>
        </form>
      </DialogContent>

      {/* Snackbar for other feedback */}
      <SnackbarAlert
        open={snackOpen}
        handleClose={handleSnackClose}
        severity={severity}
        message={message}
      />

      <DialogActions />
    </Dialog>
  );
};

export default UserDialog;
