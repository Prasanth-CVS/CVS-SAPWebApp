// src/components/Pagination/Pagination.jsx
import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  // Optional: Skip rendering if only 1 page
  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        siblingCount={siblingCount}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
};

export default Pagination;
