import React, { useState } from "react";
import { Box, Card, TableContainer, TextField } from "@mui/material";
import CustomListTable from "../../utils/customListTable";
import SalesOrderHeaderPage from "./partHeader"; // Adjust the import path if needed
import TabSelectionScreen from "./partTab"; // Adjust the import path if needed
const SalesOrderPage = () => {
  return (
    <Card sx={{ marginTop: 1, marginLeft: 1 }}>
      <Box>
        <SalesOrderHeaderPage />
        <TabSelectionScreen />
      </Box>
    </Card>
  );
};

export default SalesOrderPage;
