import React, { useState } from "react";
import { Box, TextField, MenuItem, Grid } from "@mui/material";

export default function ResponsiveCustomerForm() {
  const [form, setForm] = useState({});

  // Dropdown options
  const typeOptions = [];

  const assemblyOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const fields = [
    { label: "Doc No", name: "documentNo", type: "text" },
    { label: "Doc Date", name: "documentDate", type: "text" },
    { label: "Customer Name", name: "customerName", type: "text" },
    { label: "Part Number", name: "partNumber", type: "text" },
    { label: "Type", name: "type", type: "select", options: typeOptions },
    { label: "FG Item Name", name: "fgItemName", type: "text" },
    {
      label: "Assembly Required",
      name: "assemblyRequired",
      type: "select",
      options: assemblyOptions,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={2}>
        {/* Doc No + Doc Date in same row */}
        {fields.slice(0, 2).map((f) => (
          <Grid size={6} xs={12} sm={6} key={f.name}>
            <TextField
              label={f.label}
              name={f.name}
              value={form[f.name] || ""}
              onChange={handleChange}
              autoComplete="off"
              size="small"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 0.5,
                  color: "text.secondary",
                },
              }}
            />
          </Grid>
        ))}

        {/* Remaining fields */}
        {fields.slice(2).map((f) => (
          <Grid size={12} xs={12} key={f.name}>
            {f.type === "select" ? (
              <TextField
                select
                label={f.label}
                name={f.name}
                value={form[f.name] || ""}
                onChange={handleChange}
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: 0.5,
                    color: "text.secondary",
                  },
                }}
              >
                {f.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                label={f.label}
                name={f.name}
                value={form[f.name] || ""}
                onChange={handleChange}
                autoComplete="off"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: 0.5,
                    color: "text.secondary",
                  },
                }}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
