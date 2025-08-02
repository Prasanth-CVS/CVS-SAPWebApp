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
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Reorder from "@mui/icons-material/Reorder";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranchList,
  setSelectedBranch,
} from "../store/actions/branchAction";
// Replace with your actual Snackbar alert component!
import SnackbarAlert from "../components/shared/SnackbarAlert";

const Header = ({
  toggleDrawer,
  toggleDrawerClose,
  rendorIcon = false,
  drawerWidth = 230,
  isSideIcon = false,
  userName = "User",
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Popover state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Entity/branch state
  const { selectedBranchId, branchList } = useSelector((state) => state.branch);
  const [defaultEntityId, setDefaultEntityId] = useState(null);

  // Find selected entity for display
  const defaultEntity = branchList?.find((e) => e.entityId === defaultEntityId);

  useEffect(() => {
    dispatch(fetchBranchList());
  }, [dispatch]);

  // Handler functions for Popover
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  // Radio handler: set as default
  const handleRadioChange = (item) => {
    setDefaultEntityId(item.entityId);
  };

  // Confirm selection
  const handleConfirm = () => {
    handleClosePopover();
    setMessage("Default entity updated!");
    setSnackOpen(true);
    // Optionally dispatch to Redux
    if (defaultEntityId) {
      // dispatch(setSelectedBranch(defaultEntityId)); // If your Redux expects this
    }
  };
  const handleSnackClose = () => setSnackOpen(false);

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
              <Box sx={iconButtonStyle} onClick={toggleDrawer}>
                <MenuOpenIcon />
              </Box>
            ) : (
              <Box sx={iconButtonStyle} onClick={toggleDrawerClose}>
                <Reorder />
              </Box>
            )}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            {/* Notifications */}
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
              <Badge badgeContent={5} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>

            {/* Entity selection (opens pop) */}
            <Box
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={handleOpenPopover}
            >
              <PlaceOutlinedIcon />
              <Typography
                variant="body2"
                sx={{
                  ml: 0.5,
                  fontWeight: 600,
                  color: "#050e60",
                  textTransform: "capitalize",
                }}
              >
                {defaultEntity ? defaultEntity.entityName : ""}
              </Typography>
            </Box>

            {/* User Avatar */}
            <Avatar
              sx={{
                bgcolor: "transparent",
                border: "2px solid #050e60",
                color: "#050e60",
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
              <MenuItem>Logout</MenuItem>
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
    </>
  );
};

export default Header;
