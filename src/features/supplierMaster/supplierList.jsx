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

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchItems = async () => {
    setIsLoading(true);
    const selected = selectOptions.find(opt => opt.name === selectedType);
    const cardType = selected ? selected.cardType : "";

    try {
      const _response = await axios.get(
        `http://localhost:5146/api/SapMaster/partners?cardType=${cardType}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      setData(_response.data.value || []);
      console.log(_response,"_response");
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
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
