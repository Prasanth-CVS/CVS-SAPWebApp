// src/pages/itemMaster/ItemListPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableContainer, Box, Button, Typography } from "@mui/material";
import CustomListTable from "../../utils/customListTable";

const ItemListPage = () => {
  const [data, setData] = useState([]); // store item list
  const [searchQuery, setSearchQuery] = useState(""); // for search
  const [pageNumber, setPageNumber] = useState(1); // current page
  const [pageSize] = useState(50); // items per page
  const [isLoading, setIsLoading] = useState(false); // loading indicator

  // 🔄 Fetch item list from API with pagination
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5146/api/SapMaster/items?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      console.log("log1",response)
      setData(response.data.value || []);
    } catch (error) {
      console.error("Error fetching item data:", error);
    } finally {
      setIsLoading(false);
    }
  };



  // 🚀 Fetch data whenever page number changes
  useEffect(() => {
    fetchItems();
  }, [pageNumber]);

  // 🔎 Handle search input change
  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  // ⏭ Handle page navigation
  const handleNextPage = () => setPageNumber((prev) => prev + 1);
  const handlePrevPage = () =>
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));

  // 📊 Define the table columns
  const columns = [
    {
      name: "Item Code",
      selector: (row) => row.ItemCode,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.ItemName,
      sortable: true,
    },
    {
      name: "Group Code",
      selector: (row) => row.ItemsGroupCode,
      sortable: true,
    },
    {
      name: "Item Type",
      selector: (row) => row.ItemType,
      sortable: true,
    },
    {
      name: "Material Type",
      selector: (row) => row.MaterialType,
      sortable: true,
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer>
        <CustomListTable
          columns={columns}
          data={data}
          filterKeys={["ItemCode", "ItemName"]}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchInputChange(e.target.value)}
          isItem={true}
          loading={isLoading}
        />
      </TableContainer>

      {/* Pagination Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={pageNumber === 1}>
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: "center" }}>
          Page {pageNumber}
        </Typography>
        <Button variant="contained" onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ItemListPage;
