import React from "react";
import { Box, Grid, TextField } from "@mui/material";

const SalesOrderHeaderPage = ({ headerData = {} }) => {
  const roundedTextField = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
    },
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
      {/* First Row - 4 Fields */}
      <Grid container spacing={2} mb={1.2}>
        <Grid item>
          <TextField
            size="small"
            value={headerData.docNum || ""}
            label="Doc Num"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.partNo || ""}
            label="Part No"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.fgItemCode || ""}
            label="FG Item Code"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.custCode || ""}
            label="Card Code"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
      </Grid>

      {/* Second Row - 4 Fields */}
      <Grid container spacing={2}>
        <Grid item>
          <TextField
            size="small"
            value={headerData.docDate || ""}
            label="Doc Date"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.assemblyRequired || ""}
            label="Assembly Required"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.fgItemName || ""}
            label="FG Item Name"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            value={headerData.custName || ""}
            label="Card Name"
            InputProps={{ readOnly: false }}
            sx={{ width: 200, ...roundedTextField }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesOrderHeaderPage;
