// import {
import {
  Box,
  IconButton,
  Popover,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Radio,
  Divider,
  Button,
} from "@mui/material";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SnackbarAlert from "../../../components/shared/SnackbarAlert";
import { useSelector } from "react-redux";

const EntitySelector = ({
  anchorEl,
  handleClose,
  entityData,
  setEntityData,
  snackOpen,
  handleSnackClose,
  message,
}) => {
  const { branchList } = useSelector((state) => state.branch);

  const open = Boolean(anchorEl);

  // ✅ Handles checkbox toggle for selection
  const handleCheckboxChange = (item) => {
    const exists = entityData?.some((e) => e.entityName === item.entityName);
    let updatedEntities;

    if (exists) {
      updatedEntities = entityData.filter(
        (e) => e.entityName !== item.entityName
      );
    } else {
      updatedEntities = [
        ...entityData,
        { entityName: item.entityName, entityDefWhs: false },
      ];
    }

    setEntityData(updatedEntities);
  };

  // ✅ Handles single default selection using radio
  const handleRadioChange = (item) => {
    const updatedEntities = entityData.map((entity) => {
      if (entity.entityName === item.entityName) {
        return { ...entity, entityDefWhs: true };
      } else {
        return { ...entity, entityDefWhs: false };
      }
    });

    // Add new if not already selected
    if (!updatedEntities.some((e) => e.entityName === item.entityName)) {
      updatedEntities.push({
        entityName: item.entityName,
        entityDefWhs: true,
      });
    }

    setEntityData(updatedEntities);
  };

  const handleConfirm = () => {
    handleClose();
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ mt: 1 }}
      >
        <Box p={2} sx={{ position: "relative", minWidth: 250 }}>
          {/* ❌ Close Button */}
          <IconButton
            onClick={handleClose}
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
            Select Entities
          </Typography>

          {/* ✅ Table of Entities */}
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" padding="none">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", padding: "4px" }}>
                    Entity
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Select
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Default
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {branchList.map((item) => (
                  <TableRow key={item.entityId}>
                    <TableCell sx={{ padding: "4px", fontSize: "0.85rem" }}>
                      {item.entityName}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={entityData?.some(
                          (e) => e.entityName === item.entityName
                        )}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Radio
                        size="small"
                        checked={
                          entityData?.find(
                            (e) => e.entityName === item.entityName
                          )?.entityDefWhs === true
                        }
                        onChange={() => handleRadioChange(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ mt: 1, mb: 1 }} />

          {/* Confirm Button */}
          <Box display="flex" justifyContent="flex-end">
            <Button size="small" variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Snackbar Notification */}
      <SnackbarAlert
        open={snackOpen}
        handleClose={handleSnackClose}
        severity="success"
        message={message}
      />
    </>
  );
};

export default EntitySelector;
