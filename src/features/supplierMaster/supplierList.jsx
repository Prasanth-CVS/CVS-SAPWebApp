import React, { useState, useEffect } from "react";

import SupplierListData from "../supplierMaster/supplierHeaderData.json";
import CustomListTable from "../../utils/customListTable";
import { TableContainer } from "@mui/material";

const SupplierListPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("SupplierListData", SupplierListData);

  useEffect(() => {
    setData(SupplierListData);
  }, []);

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
      sortable: true,
    },
    {
      name: "MaxQty",
      selector: (row) => row.maxQty,
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
        filterKeys={["supCode", "supName"]}
        searchQuery={searchQuery}
        onSearchChange={(e) => handleSearchInputChange(e.target.value)}
        isItem={true}
      />
    </TableContainer>
  );
};

export default SupplierListPage;
