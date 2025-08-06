import React, { useState, useEffect } from "react";

import stockStatusData from "../stockStatus/stockStatus.json";
import CustomListTable from "../../utils/customListTable";
import { TableContainer } from "@mui/material";

const StockStatus = () => {
  const [data, setData] = useState([]);
  console.log("StockStatusData", stockStatusData);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setData(stockStatusData);
  }, []);

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
  };

  const columns = [
    {
      name: "Item Code",
      selector: (row) => row.itemCode,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "item Group",
      selector: (row) => row.itemGroup,
      sortable: true,
    },
    {
      name: "Min Qty",
      selector: (row) => row.minQty,
      sortable: true,
    },
    {
      name: "Safety Stock",
      selector: (row) => row.safetyStock,
      sortable: true,
    },
    {
      name: "UOM",
      selector: (row) => row.uom,
      sortable: true,
    },
  ];

  return (
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
  );
};

export default StockStatus;
