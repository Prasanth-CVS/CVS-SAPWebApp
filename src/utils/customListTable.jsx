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
  console.log(data,"JJJJJJJJJJJJJJJJJJJJJJJJJJJJJ")
  const tableRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState("60vh");
  const [currentPage, setCurrentPage] = useState(1);

  // --- Filtered Data ---
  const filteredData = useMemo(() => {
    let filtered = data;
    if (searchQuery && filterKeys.length > 0) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        filterKeys.some((key) =>
          item[key]?.toString().toLowerCase().includes(q)
        )
      );
    }

    // Filter by group/type
    if (selectedType) {
      const typeName =
        typeof selectedType === "string"
          ? selectedType
          : selectedType?.name || "";
      if (typeName) {
        filtered = filtered.filter(
          (item) =>
            item.group === typeName || item.type === typeName // adjust keys as needed
        );
      }
    }

    return filtered;
  }, [data, filterKeys, searchQuery, selectedType]);

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
    <Box padding={2}>
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
            <Box sx={{ minWidth: 180 }}>
              <Autocomplete
                id="item-group-filter"
                options={uniqueTypes}
                size="small"
                autoComplete="off"
                getOptionLabel={(option) => {
                  if (typeof option === "string") return option;
                  if (option && typeof option === "object" && option.name)
                    return option.name;
                  return "";
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Group"
                    variant="outlined"
                    fullWidth
                  />
                )}
                value={selectedType || ""}
                onChange={(event, newValue) => {
                  onSearchGroup(newValue || "");
                  setCurrentPage(1); // Reset to first page on filter change
                }}
                disableClearable
              />
            </Box>
          )}

          <Box sx={{ minWidth: 180 }}>
            <TextField
              size="small"
              fullWidth
              label="Search"
              name="Search"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e);
                setCurrentPage(1); // Reset page on search
              }}
            />
          </Box>
        </Box>

        {/* Data Table */}
        <DataTable
          title={title}
          columns={columns}
          data={paginatedData}
          highlightOnHover
          progressPending={isLoading}
          fixedHeader
          fixedHeaderScrollHeight={scrollHeight}
          customStyles={customStyles}
        />

        {/* Pagination */}
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={paginatedData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </Box>
  );
};

export default CustomListTable;
