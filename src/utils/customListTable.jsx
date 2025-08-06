import React, { useState, useMemo, useLayoutEffect, useRef } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import DataTable from "react-data-table-component";
import Pagination from "../components/events/pagenation/pagenation";
import { customStyles } from "../styles/commanStyles";
import "../styles/covalsys.css";

const PageSize = 15;

const CustomListTable = ({
  title,
  data,
  columns,
  filterKeys = [],
  searchQuery,
  onSearchChange,
  uniqueTypes = [],
  onSearchGroup,
  selectedType,
  isItem,
  isLoading,
}) => {
  // --- filter ---
  const filtered = useMemo(() => {
    const q = (searchQuery || "").toLowerCase();
    if (!q) return data;
    return data.filter((item) =>
      filterKeys.some((key) => item[key]?.toString().toLowerCase().includes(q))
    );
  }, [data, filterKeys, searchQuery]);

  // --- Paginated Data ---
  const paginatedData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  console.log(paginatedData,"GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")

  // --- Responsive scroll height ---
  // useLayoutEffect(() => {
  //   function calcScrollHeight() {
  //     if (!tableRef.current) return;
  //     const top = tableRef.current.getBoundingClientRect().top;
  //     const available = window.innerHeight - top - 80;
  //     const h = Math.max(available, 300);
  //     setScrollHeight(`${h}px`);
  //   }
  //   calcScrollHeight();
  //   window.addEventListener("resize", calcScrollHeight);
  //   return () => window.removeEventListener("resize", calcScrollHeight);
  // }, []);

  return (
    <Box ref={tableRef}>
      {/* Filters Row */}
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={1}
        flexWrap="wrap"
        gap={1}
      >
        {!isItem && (
          <Box sx={{ minWidth: 200 }}>
            <Autocomplete
              id="item-group-filter"
              options={uniqueTypes}
              size="small"
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Item Group"
                  variant="outlined"
                  fullWidth
                />
              )}
              value={selectedType}
              onChange={onSearchGroup}
            />
          </Box>
        )}
        <Box sx={{ minWidth: 200 }}>
          <TextField
            size="small"
            fullWidth
            label="Search"
            name="Search"
            autoComplete="off"
            value={searchQuery}
            onChange={onSearchChange}
          />
        </Box>
      </Box>
      {/* Data Table */}
      <DataTable
        title={title}
        columns={columns}
        data={filtered}
        highlightOnHover
        pagination
        paginationPerPage={15}
        paginationRowsPerPageOptions={[15, 20, 30, 50, 100]}
        fixedHeader
        fixedHeaderScrollHeight={scrollHeight}
        customStyles={customStyles}
        persistTableHead
      />
    </Box>
    </Box>
  );
};

export default CustomListTable;
