import React from "react";
import { Box, Grid, TextField, Paper } from "@mui/material";
import "./Style/partHeaderPage.css";

const SalesOrderHeaderPage = ({ headerData = {} }) => {
  return (
    <Box sx={{ padding: 1 }}>
      {/* First Row */}
      <Grid container spacing={2} mb={2} md={12}>
        <Grid xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Doc Num"
            value={headerData.docNum || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Part No"
            value={headerData.partNo || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="FG Item Code"
            value={headerData.fgItemCode || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Card Code"
            value={headerData.custCode || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Doc Date"
            value={headerData.docDate || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Assembly Required"
            value={headerData.assemblyRequired || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="FG Item Name"
            value={headerData.fgItemName || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Card Name"
            value={headerData.custName || ""}
            InputProps={{ readOnly: false }}
            className="rounded-textfield"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesOrderHeaderPage;
