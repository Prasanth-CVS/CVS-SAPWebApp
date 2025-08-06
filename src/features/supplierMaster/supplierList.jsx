import React, { useState, useEffect } from "react";
import CustomListTable from "../../utils/customListTable";
import { TableContainer } from "@mui/material";
import axios from "axios";

const selectOptions = [
  { name: "Customer", cardType: "cCustomer" },
  { name: "Supplier", cardType: "cSupplier" },
  { name: "Lead", cardType: "cLid" }
];

const SupplierListPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(50);
  const [selectedType, setSelectedType] = useState(""); // Stores the selected type string

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, [selectedType, pageNumber]);

  const handleSearchGroup = (value) => {
    if (value) {
      setSelectedType(value);
      setPageNumber(0);
    }
  };

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
    { name: "Card Code", selector: row => row.CardCode, sortable: true },
    { name: "Card Name", selector: row => row.CardName, sortable: true },
    { name: "Group Code", selector: row => row.GroupCode, sortable: true },
    { name: "Address", selector: row => row.Address, sortable: true },
  ];

  const uniqueTypes = selectOptions.map(opt => opt.name);

  return (
    <TableContainer>
      <CustomListTable
        columns={columns}
        data={data}
        uniqueTypes={uniqueTypes}
        filterKeys={["supCode", "supName"]}
        searchQuery={searchQuery}
        onSearchChange={handleSearchInputChange}
        onSearchGroup={handleSearchGroup}
        selectedType={selectedType}
        isItem={false}
        isLoading={isLoading}
      />
    </TableContainer>
  );
};

export default SupplierListPage;
