// SalesOrderPage.jsx
import React from "react";
import { Box, Card, Grid } from "@mui/material";
import AppBreadcrumbs from "../../components/shared/breadCrumb";
import SalesOrderHeaderPage from "./partHeader"; // Right side form
import TabSelectionScreen from "./partTab"; // Left side list/table

const SalesOrderPage = () => {
  return (
    <Card sx={{ marginTop: 1, marginLeft: 1, p: 2 }}>
      <Box>
        {/* Breadcrumbs */}
        <AppBreadcrumbs
          links={[
            { label: "Home", path: "/" },
            { label: "Part Master", path: "/part-master" },
          ]}
        />

        {/* Grid Layout: Left=9, Right=3 */}
        <Grid container spacing={2}>
          {/* LEFT SIDE: Table/List */}
          <Grid item xs={12} sm={9}>
            <TabSelectionScreen />
          </Grid>

          {/* RIGHT SIDE: Form */}
          <Grid item xs={12} sm={3}>
            <SalesOrderHeaderPage />
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default SalesOrderPage;
