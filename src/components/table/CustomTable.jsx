


import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import {  getColumnLabel } from "../../pages/dashboard/index.jsx";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Checkbox,
  alpha,
  Menu,
  styled,
  LinearProgress,
  linearProgressClasses,
  IconButton,
  MenuItem,
  Paper,
  Tooltip,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";
import { setSearch } from "../../redux/searchSlice";
import { setTableData } from "../../redux/tableSlice";
import { useTranslation } from 'react-i18next';

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 999,
  backgroundColor: "hsl(var(--muted))",
  "& .MuiLinearProgress-bar": {
    borderRadius: 999,
    background: "var(--gradient-accent)",
  },
}));


const getColor = (value) => {
  if (value === 0) return "red";
  if (value < 75) return "yellow";
  if (value >= 75) return "green";
  return "red";
};

// Get JSON diff circle color based on percentage
const getJsonDiffColor = (diffValue) => {
  if (diffValue === null || diffValue === undefined) return "#808080"; // grey for null values

  const diffPercentage = parseFloat(diffValue) * 100;

  if (diffPercentage === 0) return "green";
  if (diffPercentage > 0 && diffPercentage <= 10) return "yellow";
  if (diffPercentage > 10 && diffPercentage <= 20) return "orange";
  return "red";
};

// Styled table cell for the header
const StyledTableCell = styled(TableCell)(() => ({
  background: "hsl(var(--secondary))",
  color: "hsl(var(--foreground))",
  fontWeight: 600,
  borderBottom: "1px solid hsl(var(--border))",
}));

// const EnhancedTableHead = ({
//   onSelectAllClick,
//   order,
//   orderBy,
//   numSelected,
//   rowCount,
//   onRequestSort,
//   visibleColumns,
//   setVisibleColumns,
//   headCells
// }) => {
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };
  // const { t } = useTranslation('dashboard');
  // const handleRemoveColumn = (columnId) => {
  //   setVisibleColumns((prev) => prev.filter((col) => col !== columnId));
  // };

  // const originalColumns = headCells.map((cell) => cell.id);

//   return (
//     <TableHead className="overflow-y-auto max-h-[100vh]">
//       <TableRow>
//         <StyledTableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{ "aria-label": "select all" }}
//           />
//         </StyledTableCell>
//         {visibleColumns.map((columnId) => (
//           <StyledTableCell
//             key={columnId}
//             align="left"
//             padding="normal"
//             sortDirection={orderBy === columnId ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === columnId}
//               direction={orderBy === columnId ? order : "asc"}
//               onClick={createSortHandler(columnId)}
//               className="uppercase"
//             >
//               {getColumnLabel(columnId, headCells)}
//               {orderBy === columnId ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//             {!originalColumns.includes(columnId) && (
//               <IconButton
//                 size="small"
//                 onClick={() => handleRemoveColumn(columnId)}
//                 sx={{ marginLeft: 1 }}
//               >
//                 <IoMdClose />
//               </IconButton>
//             )}
//           </StyledTableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// };

// EnhancedTableHead.propTypes = {
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.string.isRequired,
//   orderBy: PropTypes.string.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   rowCount: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
//   setVisibleColumns: PropTypes.func.isRequired,
//   headCells: PropTypes.array.isRequired,
// };

// export default function CustomTable({
//   selected,
//   setSelected,
//   handleApprove,
//   visibleColumns,
//   setVisibleColumns,
//   headCells,
// }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const searchState = useSelector((state) => state.search);
//   const { t } = useTranslation('dashboard');
//   const { data, totalItemCount } = useSelector((state) => state.table);

//   const [order, setOrder] = useState("asc");
//   const [orderBy, setOrderBy] = useState("");

//   // For Menu
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [menuRowId, setMenuRowId] = useState(null);

//   const handleMenuOpen = (event, rowId) => {
//     setAnchorEl(event.currentTarget);
//     setMenuRowId(rowId);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setMenuRowId(null);
//   };

//   // Static
//   const availablePageSizes = [10, 20, 50, 100];

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = data.map((n) => n.InstanceID);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     if (!selected.includes(id)) setSelected((prev) => [...prev, id]);
//     else {
//       const values = selected.filter((item) => item !== id);
//       setSelected(values);
//     }
//   };

//   const handleChangePage = (event, newPage) => {
//     // Force immediate state update
//     const updatedPageNumber = newPage + 1;

//     // Update the Redux state
//     dispatch(
//       setSearch({
//         ...searchState, // Preserve all other search parameters
//         page_number: updatedPageNumber,
//       })
//     );
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newPageSize = parseInt(event.target.value, 10);

//     // Update the page size in the search state and reset to first page
//     dispatch(
//       setSearch({
//         page_size: newPageSize,
//         page_number: 1,
//       })
//     );
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   const renderCellContent = (columnId, row, index) => {
//     const cellValue = row[columnId] != null ? row[columnId] : "N/A";
//     switch (columnId) {
//       case "InstanceName":
//         return (
//           <button
//             type="button"  
//             className="text-accent hover:underline font-medium transition"
//             onClick={() => {
//               // Store modalities in localStorage
//               localStorage.setItem(
//                 "selectedModalities",
//                 JSON.stringify({
//                   IPModality: row.IPModality,
//                   OPModality: row.OPModality,
//                 })
//               );

//               // Original navigation logic
//               dispatch(
//                 setTableData({
//                   currentId: row.InstanceID,
//                   currentStatus: row.ConfidenceFlag,
//                   index,
//                   serialId: row.SerialID,
//                 })
//               );

//               localStorage.setItem(
//                 "documentDetails",
//                 JSON.stringify({
//                   SerialID: row.SerialID,
//                 })
//               );

//               navigate(`/documents`);
//             }}
//           >
//             {cellValue}
//           </button>
//         );
      
        
//       case "ProcessingStatus":
//         // If processing status is 0, show a full red bar instead of empty progress bar
//         if (Number(cellValue) === 0) {
//           return (
//             <div
//               style={{
//                 height: "10px",
//                 width: "100%",
//                 backgroundColor: "red",
//                 borderRadius: "5px",
//               }}
//             />
//           );
//         }
//         // Otherwise show normal progress bar
//         return (
//           <BorderLinearProgress
//             variant="determinate"
//             value={Number(cellValue)}
//             sx={{
//               "& .MuiLinearProgress-bar": {
//                 backgroundColor: getColor(Number(cellValue)),
//               },
//             }}
//           />
//         );
//       case "ConfidenceFlag":
//         return (
//           <div
//             style={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "20px",
//               background: cellValue,
//             }}
//           />
//         );
//       case "JsonDiffs":
//         // Handle null values for JsonDiffs
//         if (
//           cellValue === null ||
//           cellValue === undefined ||
//           cellValue === "N/A"
//         ) {
//           return (
//             <Tooltip title="NULL" arrow>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     borderRadius: "50%",
//                     background: "#808080", // Grey color for null values
//                     marginRight: "8px",
//                   }}
//                 />
//                 <span>NULL</span>
//               </div>
//             </Tooltip>
//           );
//         }

//         // Handle regular values
//         const diffValue = parseFloat(cellValue);
//         const diffPercentage = (diffValue * 100).toFixed(2);
//         const circleColor = getJsonDiffColor(diffValue);

//         return (
//           <Tooltip title={`${diffPercentage}%`} arrow>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <div
//                 style={{
//                   width: "12px",
//                   height: "12px",
//                   borderRadius: "50%",
//                   background: circleColor,
//                   marginRight: "8px",
//                 }}
//               />
//               <span>{diffPercentage}%</span>
//             </div>
//           </Tooltip>
//         );
//       case "Action":
//         return (
//           <>
//             <IconButton
//               style={{ cursor: "pointer" }}
//               disabled={selected.length > 0}
//               onClick={(e) => handleMenuOpen(e, row.InstanceID)}
//             >
//               <HiDotsHorizontal />
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               keepMounted
//               open={Boolean(anchorEl) && menuRowId === row.InstanceID}
//               onClose={handleMenuClose}
//             >
//               <MenuItem
//                 onClick={async () => {
//                   await handleApprove(true, row.InstanceID);
//                   handleMenuClose();
//                 }}
//               >
//                 {t('btn_approve')}
//               </MenuItem>
//               <MenuItem
//                 onClick={async () => {
//                   await handleApprove(false, row.InstanceID);
//                   handleMenuClose();
//                 }}
//               >
//                 {t('btn_reject')}
//               </MenuItem>
//             </Menu>
//           </>
//         );
//       case "InstanceDate":
//         return moment(cellValue).format("YYYY-MM-DD");
//       case "DataType":
//         return cellValue;
//       // We're skipping all timestamp columns by not listing them here,
//       // they'll fall through to the default case
//       default:
//         return cellValue;
//     }
//   };

//   return (
//     <div className="glass-card w-full ">

//       <TableContainer
//   sx={{ maxHeight: 630 }}
//   className="rounded-xl"
// >

//         <Table
//   stickyHeader
//   sx={{
//     background: "transparent",
//   }}
// >

//           <EnhancedTableHead
//             numSelected={selected.length}
//             order={order}
//             orderBy={orderBy}
//             onSelectAllClick={handleSelectAllClick}
//             onRequestSort={handleRequestSort}
//             rowCount={data?.length || 0}
//             visibleColumns={visibleColumns}
//             setVisibleColumns={setVisibleColumns}
//             headCells={headCells}
//           />

//           <TableBody>
//             {stableSort(data || [], getComparator(order, orderBy)).map(
//               (row, index) => {
//                 if (row.InstanceID !== undefined) {
//                   const isItemSelected = isSelected(row.InstanceID);
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={index}
//                       selected={isItemSelected}
//                       sx={{
//   "&:hover": {
//     bgcolor: (theme) =>
//       alpha(theme.palette.primary.main, 0.05),
//   },
// }}

//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           onClick={(event) =>
//                             handleClick(event, row.InstanceID)
//                           }
//                         />
//                       </TableCell>

//                       {visibleColumns.map((columnId) => (
//                         <TableCell key={columnId}>
//                           {renderCellContent(columnId, row, index)}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   );
//                 }
//                 return null;
//               }
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={availablePageSizes}
//         component="div"
//         count={totalItemCount || 0}
//         rowsPerPage={searchState.page_size || 10}
//         page={Math.max(0, (searchState.page_number || 1) - 1)}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         labelDisplayedRows={({ from, to, count }) =>
//           `${from}-${to} ${t('pagination_of')} ${count}` // Translate
//         }
//         SelectProps={{
//           inputProps: { "aria-label": "rows per page" },
//           native: true,
//         }}
//       />
//     </div>
//   );
// }

// CustomTable.propTypes = {
//   selected: PropTypes.arrayOf(PropTypes.string).isRequired,
//   setSelected: PropTypes.func.isRequired,
//   handleApprove: PropTypes.func.isRequired,
//   visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
//   setVisibleColumns: PropTypes.func.isRequired,
//   headCells: PropTypes.array.isRequired,
// };


// CustomTable.jsx — Improved layout, responsive, cleaner visual hierarchy

// ─── EnhancedTableHead ──────────────────────────────────────────────────────
 const EnhancedTableHead = ({
 
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    visibleColumns,
    setVisibleColumns,
    headCells,

 }) => {

   const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { t } = useTranslation('dashboard');
  const handleRemoveColumn = (columnId) => {
    setVisibleColumns((prev) => prev.filter((col) => col !== columnId));
  };

  const originalColumns = headCells.map((cell) => cell.id);


  return (
    <TableHead>
      <TableRow sx={{ background: "#f8fafc" }}>
        {/* Checkbox */}
        <StyledTableCell padding="checkbox" sx={{ background: "#f8fafc" }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
            size="small"
          />
        </StyledTableCell>

        {visibleColumns.map((columnId) => (
          <StyledTableCell
            key={columnId}
            align="left"
            padding="normal"
            sortDirection={orderBy === columnId ? order : false}
            sx={{
              background: "#f8fafc",
              fontSize: "11px",
              fontWeight: 700,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              whiteSpace: "nowrap",
              py: 1.25,
            }}
          >
            <TableSortLabel
              active={orderBy === columnId}
              direction={orderBy === columnId ? order : "asc"}
              onClick={createSortHandler(columnId)}
              sx={{
                "&.Mui-active": { color: "#0f172a" },
                "&:hover": { color: "#334155" },
              }}
            >
              {getColumnLabel(columnId, headCells)}
              {orderBy === columnId ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>

            {/* Remove button for dynamic columns */}
            {!originalColumns.includes(columnId) && (
              <IconButton
                size="small"
                onClick={() => handleRemoveColumn(columnId)}
                sx={{ ml: 0.5, color: "#cbd5e1", "&:hover": { color: "#ef4444" } }}
              >
                <IoMdClose size={13} />
              </IconButton>
            )}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVisibleColumns: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired,
};

// ─── CustomTable ─────────────────────────────────────────────────────────────
export default function CustomTable({
  selected,
  setSelected,
  handleApprove,
  visibleColumns,
  setVisibleColumns,
  headCells,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchState = useSelector((state) => state.search);
  const { t } = useTranslation("dashboard");
  const { data, totalItemCount } = useSelector((state) => state.table);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRowId, setMenuRowId] = useState(null);

  const handleMenuOpen = (event, rowId) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const availablePageSizes = [10, 20, 50, 100];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data.map((n) => n.InstanceID));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if (!selected.includes(id)) setSelected((prev) => [...prev, id]);
    else setSelected(selected.filter((item) => item !== id));
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setSearch({ ...searchState, page_number: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setSearch({ page_size: parseInt(event.target.value, 10), page_number: 1 }));
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // ── Cell renderers (all logic unchanged) ──────────────────────────────────
  const renderCellContent = (columnId, row, index) => {
    const cellValue = row[columnId] != null ? row[columnId] : "N/A";

    switch (columnId) {
      case "InstanceName":
        return (
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#0ea5e9",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
              textAlign: "left",
            }}
            onClick={() => {
              localStorage.setItem(
                "selectedModalities",
                JSON.stringify({ IPModality: row.IPModality, OPModality: row.OPModality })
              );
              dispatch(
                setTableData({
                  currentId: row.InstanceID,
                  currentStatus: row.ConfidenceFlag,
                  index,
                  serialId: row.SerialID,
                })
              );
              localStorage.setItem("documentDetails", JSON.stringify({ SerialID: row.SerialID }));
              navigate("/documents");
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            {cellValue}
          </button>
        );

      case "ProcessingStatus":
        if (Number(cellValue) === 0) {
          return (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 7,
                  borderRadius: 99,
                  background: "#ef4444",
                  minWidth: 80,
                }}
              />
              <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, minWidth: 30 }}>
                ERR
              </span>
            </div>
          );
        }
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BorderLinearProgress
              variant="determinate"
              value={Number(cellValue)}
              sx={{
                flex: 1,
                minWidth: 80,
                height: 7,
                borderRadius: 99,
                backgroundColor: "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getColor(Number(cellValue)),
                  borderRadius: 99,
                },
              }}
            />
            <span style={{ fontSize: 11, color: "#64748b", minWidth: 30 }}>
              {cellValue}%
            </span>
          </div>
        );

      case "ConfidenceFlag": {
        const flagStyles = {
          GREEN: { bg: "#dcfce7", color: "#16a34a", dot: "#16a34a" },
          RED:   { bg: "#fee2e2", color: "#dc2626", dot: "#dc2626" },
        };
        const s = flagStyles[cellValue] || { bg: "#f1f5f9", color: "#64748b", dot: "#94a3b8" };
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              background: s.bg,
              color: s.color,
              borderRadius: 20,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: s.dot,
                display: "inline-block",
              }}
            />
            {cellValue}
          </span>
        );
      }

      case "JsonDiffs": {
        if (cellValue === null || cellValue === undefined || cellValue === "N/A") {
          return (
            <Tooltip title="NULL" arrow>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#94a3b8",
                  }}
                />
                <span style={{ fontSize: 12, color: "#94a3b8" }}>NULL</span>
              </div>
            </Tooltip>
          );
        }
        const diffValue = parseFloat(cellValue);
        const diffPercentage = (diffValue * 100).toFixed(2);
        const circleColor = getJsonDiffColor(diffValue);
        return (
          <Tooltip title={`${diffPercentage}%`} arrow>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: circleColor,
                }}
              />
              <span style={{ fontSize: 12.5, color: "#334155" }}>{diffPercentage}%</span>
            </div>
          </Tooltip>
        );
      }

      case "Action":
        return (
          <>
            <IconButton
              size="small"
              disabled={selected.length > 0}
              onClick={(e) => handleMenuOpen(e, row.InstanceID)}
              sx={{
                border: "1.5px solid #e2e8f0",
                borderRadius: "7px",
                width: 28,
                height: 28,
                color: "#64748b",
                "&:hover": { background: "#f8fafc", borderColor: "#cbd5e1" },
                "&:disabled": { opacity: 0.4 },
              }}
            >
              <HiDotsHorizontal size={14} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && menuRowId === row.InstanceID}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 8px 24px rgba(0,0,0,.1)",
                  minWidth: 130,
                },
              }}
            >
              <MenuItem
                onClick={async () => {
                  await handleApprove(true, row.InstanceID);
                  handleMenuClose();
                }}
                sx={{ fontSize: 13, fontWeight: 500, gap: 1 }}
              >
                {t("btn_approve")}
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await handleApprove(false, row.InstanceID);
                  handleMenuClose();
                }}
                sx={{ fontSize: 13, fontWeight: 500, color: "#dc2626", gap: 1 }}
              >
                {t("btn_reject")}
              </MenuItem>
            </Menu>
          </>
        );

      case "InstanceDate":
        return (
          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b" }}>
            {moment(cellValue).format("YYYY-MM-DD")}
          </span>
        );

      case "SerialID":
        return (
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              color: "#64748b",
              background: "#f1f5f9",
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            #{cellValue}
          </span>
        );

      case "DataType":
        return (
          <span
            style={{
              background: "#f0f9ff",
              color: "#0369a1",
              padding: "2px 8px",
              borderRadius: 6,
              fontSize: 11.5,
              fontWeight: 600,
            }}
          >
            {cellValue}
          </span>
        );

      default:
        return <span style={{ fontSize: 13, color: "#334155" }}>{cellValue}</span>;
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.04)",
        width: "100%",
      }}
    >
      {/* Table with sticky header + vertical scroll */}
      <TableContainer sx={{ maxHeight: "calc(100vh - 260px)", minHeight: 200 }}>
        <Table stickyHeader sx={{ background: "transparent" }}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data?.length || 0}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            headCells={headCells}
          />

          <TableBody>
            {stableSort(data || [], getComparator(order, orderBy)).map((row, index) => {
              if (row.InstanceID === undefined) return null;

              const isItemSelected = isSelected(row.InstanceID);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                  sx={{
                    "&:last-child td": { borderBottom: "none" },
                    "&:hover td": { background: "#f8fafc" },
                    "&.Mui-selected td": { background: "#eff6ff" },
                    "&.Mui-selected:hover td": { background: "#dbeafe" },
                    transition: "background 0.12s",
                  }}
                >
                  {/* Checkbox cell */}
                  <TableCell
                    padding="checkbox"
                    sx={{ borderBottom: "1px solid #f1f5f9", py: 1 }}
                  >
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(event) => handleClick(event, row.InstanceID)}
                      size="small"
                    />
                  </TableCell>

                  {/* Data cells */}
                  {visibleColumns.map((columnId) => (
                    <TableCell
                      key={columnId}
                      sx={{
                        borderBottom: "1px solid #f1f5f9",
                        py: 1,
                        px: 1.75,
                        fontSize: 13,
                        verticalAlign: "middle",
                      }}
                    >
                      {renderCellContent(columnId, row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ── Pagination ── */}
      <TablePagination
        rowsPerPageOptions={availablePageSizes}
        component="div"
        count={totalItemCount || 0}
        rowsPerPage={searchState.page_size || 10}
        page={Math.max(0, (searchState.page_number || 1) - 1)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} ${t("pagination_of")} ${count}`
        }
        SelectProps={{ inputProps: { "aria-label": "rows per page" }, native: true }}
        sx={{
          borderTop: "1px solid #f1f5f9",
          "& .MuiTablePagination-toolbar": { minHeight: 48, px: 2 },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
            fontSize: 12.5,
            color: "#64748b",
          },
          "& .MuiTablePagination-actions button": {
            border: "1.5px solid #e2e8f0",
            borderRadius: "7px",
            margin: "0 2px",
            "&:hover": { background: "#f8fafc" },
          },
        }}
      />
    </div>
  );
}

CustomTable.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
  handleApprove: PropTypes.func.isRequired,
  visibleColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setVisibleColumns: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired,
};