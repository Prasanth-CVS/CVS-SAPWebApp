import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Autocomplete,
  Grid,
  TableContainer,
  Typography,
} from "@mui/material";
import CustomListTable from "../../utils/customListTable";

const SupplierListPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const cardTypeOptions = [
    { name: "Customer", cardType: "cCustomer" },
    { name: "Supplier", cardType: "cSupplier" },
    { name: "Lead", cardType: "cLid" },
  ];

  const fetchData = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:5146/api/SapMaster/partners?cardType=${type}&pageSize=10&pageNumber=1`
      );
      const formatted = response.data?.value.map((item) => ({
        supCode: item.CardCode,
        supName: item.CardName,
        minQty: "", // You can update these based on actual data or remove them
        maxQty: "",
        safetyStock: "",
        uom: "",
        address: item.Address,
      }));
      setData(formatted);
    } catch (error) {
      console.error("API fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedType);
  }, [selectedType]);

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  const columns = [
    {
      name: "Supplier Code",
      selector: (row) => row.supCode,
      sortable: true,
    },
    {
      name: "Supplier Name",
      selector: (row) => row.supName,
      sortable: true,
    },
    {
      name: "MinQty",
      selector: (row) => row.minQty,
    },
    {
      name: "MaxQty",
      selector: (row) => row.maxQty,
    },
    {
      name: "Safety Stock",
      selector: (row) => row.safetyStock,
    },
    {
      name: "UOM",
      selector: (row) => row.uom,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
  ];

  return (
    <Box p={2}>
      {/* <Typography variant="h6" gutterBottom>
        Supplier / Customer / Lead List
      </Typography>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search"
            fullWidth
            value={searchQuery}
            onChange={(e) => handleSearchInputChange(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={cardTypeOptions}
            getOptionLabel={(option) => option.name}
            value={cardTypeOptions.find((o) => o.cardType === selectedType)}
            onChange={(e, newValue) => {
              if (newValue) {
                setSelectedType(newValue.cardType);
              }
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select Card Type" fullWidth />
            )}
          />
        </Grid>
      </Grid> */}

      <TableContainer>
        <CustomListTable
          columns={columns}
          data={data.filter(
            (row) =>
              row.supCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.supName.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          filterKeys={["supCode", "supName"]}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchInputChange(e.target.value)}
          isItem={false}
        />
      </TableContainer>
    </Box>
  );
};

export default SupplierListPage;
