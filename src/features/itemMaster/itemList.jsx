import React, { useState, useEffect } from "react";
import ItemListData from "../itemMaster/itemData.json";
import CustomListTable from "../../utils/customListTable";
import { TableContainer, Box } from "@mui/material";

const ItemListPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setData(ItemListData);
  }, []);

  // Handle search input change
  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  // Table columns
  const columns = [
    { name: "Item Group", selector: (row) => row.itemGroup, sortable: true },
    { name: "Item Code", selector: (row) => row.itemCode, sortable: true },
    { name: "Item Name", selector: (row) => row.itemName, sortable: true },
    { name: "UOM", selector: (row) => row.uom, sortable: true },
    {
      name: "Safety Stock",
      selector: (row) => row.safetyStock,
      sortable: true,
    },
    { name: "ROL", selector: (row) => row.rol, sortable: true },
    { name: "Max Stock", selector: (row) => row.maxQty, sortable: true },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer>
        <CustomListTable
          columns={columns}
          data={data}
          filterKeys={["itemCode", "itemName"]}
          searchQuery={searchQuery}
          onSearchChange={(e) => handleSearchInputChange(e.target.value)}
          isItem={true}
        />
      </TableContainer>
    </Box>
  );
};

export default ItemListPage;
