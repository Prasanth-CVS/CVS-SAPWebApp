import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";
import { usePagination,DOTS } from "../pagenation/usePagenation";

const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
  siblingCount = 1,
}) => {
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log("totalPages",totalPages);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // if (totalPages <= 1) return null; // No pagination needed

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
