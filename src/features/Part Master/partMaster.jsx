import React from "react";
import { Box, Card, Grid } from "@mui/material";
import AppBreadcrumbs from "../../components/shared/breadCrumb";
import SalesOrderHeaderPage from "./partHeader"; // Right side form
import TabSelectionScreen from "./partTab"; // Left side list/table

const SalesOrderPage = () => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* Breadcrumbs */}
        <AppBreadcrumbs
          links={[
            { label: "Home", path: "/app/home" },
            { label: "Part Master", path: "/part-master" },
          ]}
        />
      </Box>

      <Grid container spacing={1}>
        <Grid size={9} xs={12} md={9}>
          <Card sx={{ p: 2, mb: 1, boxShadow: 3 }}>
            <TabSelectionScreen />
          </Card>
        </Grid>

        {/* RIGHT SIDE: Sticky Form */}
        <Grid size={3} xs={12} md={3}>
          <Card sx={{ p: 2, ml: 1, boxShadow: 3 }}>
            <SalesOrderHeaderPage />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SalesOrderPage;
