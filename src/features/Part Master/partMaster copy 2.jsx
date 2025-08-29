import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
} from "@mui/material";
import AppBreadcrumbs from "../../components/shared/breadCrumb";
import SalesOrderHeaderPage from "./partHeader"; // Right side form
import TabSelectionScreen from "./partTab"; // Left side list/table

const SalesOrderPage = () => {
  const [form, setForm] = useState({});

  const [tabIndex, setTabIndex] = useState(0);

  const [rows, setRows] = useState([
    {
      id: 1,
      col2: "",
      col3: "",
      col4: "",
      col5: "",
      inputItemData: { inputType: "", itemCode: "", itemName: "" },
      col7: "",
      col8: "",
      col9: "",
      col10: "",
      qualityInfo: {
        parameter: "",
        instrument: "",
        spec: "",
        min: "",
        max: "",
      },
      col12: "",
    },
  ]);

  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [inputDialogRowIndex, setInputDialogRowIndex] = useState(null);
  const [inputDialogData, setInputDialogData] = useState({
    inputType: "",
    itemCode: "",
    itemName: "",
  });

  const [qualityDialogOpen, setQualityDialogOpen] = useState(false);
  const [qualityDialogRowIndex, setQualityDialogRowIndex] = useState(null);
  const [qualityDialogData, setQualityDialogData] = useState({
    parameter: "",
    instrument: "",
    spec: "",
    min: "",
    max: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setInputDialogData((prev) => ({
        ...prev,
        inputType: "",
      }));
    }, 1000);
  }, [inputDialogOpen]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const handleInputChange = (value, rowIndex, field) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = value;
    setRows(updatedRows);

    if (rowIndex === rows.length - 1 && value !== "") {
      const newRow = {
        id: rows.length + 1,
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        inputItemData: { inputType: "", itemCode: "", itemName: "" },
        col7: "",
        col8: "",
        col9: "",
        col10: "",
        qualityInfo: {
          parameter: "",
          instrument: "",
          spec: "",
          min: "",
          max: "",
        },
        col12: "",
      };
      setRows((prev) => [...prev, newRow]);
    }
  };

  const handleOpenInputDialog = (rowIndex) => {
    setInputDialogRowIndex(rowIndex);
    setInputDialogData({ ...rows[rowIndex].inputItemData });
    setInputDialogOpen(true);
  };

  const handleCloseInputDialog = () => {
    setInputDialogOpen(false);
    setInputDialogRowIndex(null);
    setInputDialogData({ inputType: "", itemCode: "", itemName: "" });
  };

  const handleSaveInputDialog = () => {
    const updatedRows = [...rows];
    updatedRows[inputDialogRowIndex].inputItemData = { ...inputDialogData };
    setRows(updatedRows);
    handleCloseInputDialog();
  };

  const handleOpenQualityDialog = (rowIndex) => {
    setQualityDialogRowIndex(rowIndex);
    setQualityDialogData({ ...rows[rowIndex].qualityInfo });
    setQualityDialogOpen(true);
  };

  const handleCloseQualityDialog = () => {
    setQualityDialogOpen(false);
    setQualityDialogRowIndex(null);
    setQualityDialogData({
      parameter: "",
      instrument: "",
      spec: "",
      min: "",
      max: "",
    });
  };

  const handleSaveQualityDialog = () => {
    const updatedRows = [...rows];
    updatedRows[qualityDialogRowIndex].qualityInfo = { ...qualityDialogData };
    setRows(updatedRows);
    handleCloseQualityDialog();
  };

  const columns = [
    "Operation No",
    "Sub Part No.",
    "Assembly Item",
    "Operation Code",
    "Operation Name",
    "Input Item(s)",
    "Setting Time",
    "Process Time",
    "Machine Code",
    "Machine Name",
    "Quality Info.",
    "Drawing",
  ];

  const fields = [
    { label: "Document No", name: "documentNo" },
    { label: "Document Date", name: "documentDate" },
    { label: "Customer Name", name: "customerName" },
    { label: "Customer Code", name: "customerCode" },
    { label: "Part Number", name: "partNumber" },
    { label: "Type", name: "type" },
    { label: "FG Item Code", name: "fgItemCode" },
    { label: "FG Item Name", name: "fgItemName" },
    { label: "Assembly Required", name: "assemblyRequired" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <AppBreadcrumbs
          links={[
            { label: "Home", path: "/app/home" },
            { label: "Part Master", path: "/part-master" },
          ]}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid size={9}>
          {/* Content for the 9-column section */}
          <Card>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell
                        key={col}
                        sx={{
                          backgroundColor: "#f1f1f1",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          padding: "6px 8px",
                          lineHeight: "1.2rem",
                        }}
                      >
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={row.id}>
                      <TableCell sx={{ padding: "4px 8px" }}>
                        {row.id}
                      </TableCell>

                      {columns.slice(1).map((col, colIndex) => {
                        if (col === "Input Item(s)") {
                          return (
                            <TableCell
                              key={colIndex}
                              sx={{
                                padding: "4px 8px",
                                cursor: "pointer",
                                color: "info.main",
                                fontWeight: "500",
                                "&:hover": { backgroundColor: "#e3f2fd" },
                              }}
                              onClick={() => handleOpenInputDialog(rowIndex)}
                            >
                              {row.inputItemData.inputType ||
                              row.inputItemData.itemCode ||
                              row.inputItemData.itemName ? (
                                <Typography variant="body2" noWrap>
                                  {`[${row.inputItemData.inputType}] ${row.inputItemData.itemCode} - ${row.inputItemData.itemName}`}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Click to add
                                </Typography>
                              )}
                            </TableCell>
                          );
                        } else if (col === "Quality Info.") {
                          return (
                            <TableCell
                              key={colIndex}
                              sx={{
                                padding: "4px 8px",
                                cursor: "pointer",
                                color: "info.main",
                                fontWeight: "500",
                                "&:hover": { backgroundColor: "#e3f2fd" },
                              }}
                              onClick={() => handleOpenQualityDialog(rowIndex)}
                            >
                              {row.qualityInfo.parameter ||
                              row.qualityInfo.instrument ||
                              row.qualityInfo.spec ? (
                                <Typography variant="body2" noWrap>
                                  {`${row.qualityInfo.parameter} (${row.qualityInfo.instrument}) Spec: ${row.qualityInfo.spec}`}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Click to add
                                </Typography>
                              )}
                            </TableCell>
                          );
                        } else {
                          const field = `col${colIndex + 2}`;
                          return (
                            <TableCell key={col} sx={{ padding: "4px 8px" }}>
                              <TextField
                                size="small"
                                placeholder="Enter value"
                                fullWidth
                                value={row[field] || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    e.target.value,
                                    rowIndex,
                                    field
                                  )
                                }
                                sx={{
                                  "& .MuiInputBase-root": {
                                    padding: "2px 6px",
                                    fontSize: "0.85rem",
                                  },
                                }}
                              />
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Input Items Dialog */}
              <Dialog
                open={inputDialogOpen}
                onClose={handleCloseInputDialog}
                maxWidth="xs"
                fullWidth
              >
                <DialogTitle>Input Item Details</DialogTitle>
                <DialogContent dividers>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {/* Non-editable Input Type */}
                    <TextField
                      label="Input Type"
                      size="small"
                      fullWidth
                      value={inputDialogData.inputType}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Item Code"
                      size="small"
                      fullWidth
                      value={inputDialogData.itemCode}
                      onChange={(e) =>
                        setInputDialogData({
                          ...inputDialogData,
                          itemCode: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Item Name"
                      size="small"
                      fullWidth
                      value={inputDialogData.itemName}
                      onChange={(e) =>
                        setInputDialogData({
                          ...inputDialogData,
                          itemName: e.target.value,
                        })
                      }
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseInputDialog} color="secondary">
                    Close
                  </Button>
                  <Button
                    onClick={handleSaveInputDialog}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Quality Info Dialog */}
              <Dialog
                open={qualityDialogOpen}
                onClose={handleCloseQualityDialog}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Quality Info Details</DialogTitle>
                <DialogContent dividers>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Parameter"
                      size="small"
                      fullWidth
                      value={qualityDialogData.parameter}
                      onChange={(e) =>
                        setQualityDialogData({
                          ...qualityDialogData,
                          parameter: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Instrument"
                      size="small"
                      fullWidth
                      value={qualityDialogData.instrument}
                      onChange={(e) =>
                        setQualityDialogData({
                          ...qualityDialogData,
                          instrument: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Spec"
                      size="small"
                      fullWidth
                      value={qualityDialogData.spec}
                      onChange={(e) =>
                        setQualityDialogData({
                          ...qualityDialogData,
                          spec: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Min"
                      size="small"
                      fullWidth
                      value={qualityDialogData.min}
                      onChange={(e) =>
                        setQualityDialogData({
                          ...qualityDialogData,
                          min: e.target.value,
                        })
                      }
                    />
                    <TextField
                      label="Max"
                      size="small"
                      fullWidth
                      value={qualityDialogData.max}
                      onChange={(e) =>
                        setQualityDialogData({
                          ...qualityDialogData,
                          max: e.target.value,
                        })
                      }
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseQualityDialog} color="secondary">
                    Close
                  </Button>
                  <Button
                    onClick={handleSaveQualityDialog}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </TableContainer>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card >
            {fields.map((f) => (
              <Box key={f.name} m={1} mt={1.2}>
                <TextField
                  label={f.label}
                  name={f.name}
                  onChange={handleChange}
                  autoComplete="off"
                  size="small"
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: 0.5,
                    },
                  }}
                />
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesOrderPage;
