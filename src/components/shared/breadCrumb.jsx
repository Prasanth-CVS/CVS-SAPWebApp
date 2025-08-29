import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppBreadcrumbs = ({ links }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {links.map((link, index) =>
        index < links.length - 1 ? (
          <Link
            key={link.label}
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </Link>
        ) : (
          <Typography key={link.label} color="text.primary">
            {link.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
