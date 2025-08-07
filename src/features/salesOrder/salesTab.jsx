import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Link,
  Paper,
} from "@mui/material";

const TabSelectionScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
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

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ mt: 1, mb: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col}>
                <strong>{col}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <Select defaultValue="">
                <MenuItem value="">Default/Drop Down</MenuItem>
              </Select>
            </TableCell>
            <TableCell>
              <Select defaultValue="Y">
                <MenuItem value="Y">Y</MenuItem>
                <MenuItem value="N">N</MenuItem>
              </Select>
            </TableCell>
            <TableCell>From Item Master</TableCell>
            <TableCell>From Item Master</TableCell>
            <TableCell>Link Screen</TableCell>
            <TableCell>
              <TextField size="small" placeholder="User Input" />
            </TableCell>
            <TableCell>
              <TextField size="small" placeholder="User Input" />
            </TableCell>
            <TableCell>From Item Master</TableCell>
            <TableCell>From Item Master</TableCell>
            <TableCell>Link Screen</TableCell>
            <TableCell>
              <Typography>Attachment</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: "100%", height: "40%", padding: 2 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Tabs">
        <Tab label="Process" />
        <Tab label="FG Packing" />
      </Tabs>

      <Box hidden={tabIndex !== 0}>{tabIndex === 0 && renderTable()}</Box>
      <Box hidden={tabIndex !== 1}>{tabIndex === 1 && renderTable()}</Box>
    </Box>
  );
};

export default TabSelectionScreen;
