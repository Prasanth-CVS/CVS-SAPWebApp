import React, { useState } from "react";
import { Box, Card, TableContainer, TextField } from "@mui/material";
import CustomListTable from "../../utils/customListTable";
import SalesOrderHeaderPage from "../salesOrder/salesOrderHeader"; // Adjust the import path if needed
import TabSelectionScreen from "../salesOrder/salesTab"; // Adjust the import path if needed
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
