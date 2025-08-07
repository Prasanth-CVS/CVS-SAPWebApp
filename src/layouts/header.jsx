import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  Typography,
  Popover,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Divider,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  colors,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchBranchList,
//   setSelectedBranch,
// } from "../store/actions/branchAction";
import SnackbarAlert from "../components/shared/SnackbarAlert";
import { useNavigate } from "react-router-dom";

const Header = ({
  toggleDrawer,
  toggleDrawerClose,
  rendorIcon = false,
  drawerWidth = 230,
  isSideIcon = false,
  userName,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifAnchor, setNotifAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { selectedBranchId, branchList } = useSelector((state) => state.branch);
  const [defaultEntityId, setDefaultEntityId] = useState(null);

  const defaultEntity = branchList?.find((e) => e.entityId === defaultEntityId);

  // useEffect(() => {
  //   dispatch(fetchBranchList());
  // }, [dispatch]);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleRadioChange = (item) => {
    setDefaultEntityId(item.entityId);
  };

  const handleConfirm = () => {
    handleClosePopover();
    setMessage("Default entity updated!");
    setSnackOpen(true);
    // If Redux store is to be updated:
    // dispatch(setSelectedBranch(defaultEntityId));
  };

  const handleSnackClose = () => setSnackOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("loginSession");
    localStorage.removeItem("loginSession");
    setLogoutDialogOpen(false);
    navigate("/");
  };

  const iconButtonStyle = {
    p: 1,
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#e0e0e0", color: "#050e60" },
  };

  const drawerIconWidth = 75;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm: `calc(100% - ${isSideIcon ? drawerIconWidth : drawerWidth}px)`,
          },
          ml: { sm: `${isSideIcon ? drawerIconWidth : drawerWidth}px` },
          backgroundColor: "#fff",
          color: "#050e60",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          pt: { xs: 1, sm: 1 },
          "& > .main-layout-toolbar-spacer": theme.mixins.toolbar,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            {!rendorIcon ? (
              <Box sx={iconButtonStyle} color="#059DA3" onClick={toggleDrawer}>
                <MenuOpenIcon />
              </Box>
            ) : (
              <Box
                sx={iconButtonStyle}
                color="#059DA3"
                onClick={toggleDrawerClose}
              >
                <MenuIcon />
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
              <Badge badgeContent={5} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            <Avatar
              sx={{
                bgcolor: "transparent",
                border: "2px solid #059DA3",
                color: "#059DA3",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                width: "25px",
                height: "25px",
              }}
              onClick={(e) => setMenuAnchor(e.currentTarget)}
            >
              {userName?.charAt(0)?.toUpperCase() || ""}
            </Avatar>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={() => setLogoutDialogOpen(true)}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Entity Selection Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{ mt: 1 }}
      >
        <Box p={2} sx={{ position: "relative", minWidth: 250 }}>
          <IconButton
            onClick={handleClosePopover}
            sx={{
              color: "red",
              position: "absolute",
              top: 8,
              right: 8,
              p: 0.5,
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
          <Typography variant="h6" align="left" mb={1}>
            Select Entity
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" padding="none">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", padding: "4px" }}>
                    Entity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Default
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branchList?.map((item) => (
                  <TableRow key={item.entityId}>
                    <TableCell sx={{ padding: "4px", fontSize: "0.85rem" }}>
                      {item.entityName}
                    </TableCell>
                    <TableCell align="center">
                      <Radio
                        size="small"
                        checked={item.entityId === defaultEntityId}
                        onChange={() => handleRadioChange(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Snackbar */}
      <SnackbarAlert
        open={snackOpen}
        handleClose={handleSnackClose}
        severity="success"
        message={message}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
