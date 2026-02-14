


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

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  visibleColumns,
  setVisibleColumns,
  headCells
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
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </StyledTableCell>
        {visibleColumns.map((columnId) => (
          <StyledTableCell
            key={columnId}
            align="left"
            padding="normal"
            sortDirection={orderBy === columnId ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnId}
              direction={orderBy === columnId ? order : "asc"}
              onClick={createSortHandler(columnId)}
              className="uppercase"
            >
              {getColumnLabel(columnId, headCells)}
              {orderBy === columnId ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
            {!originalColumns.includes(columnId) && (
              <IconButton
                size="small"
                onClick={() => handleRemoveColumn(columnId)}
                sx={{ marginLeft: 1 }}
              >
                <IoMdClose />
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
  const { t } = useTranslation('dashboard');
  const { data, totalItemCount } = useSelector((state) => state.table);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  // For Menu
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

  // Static
  const availablePageSizes = [10, 20, 50, 100];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.InstanceID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    if (!selected.includes(id)) setSelected((prev) => [...prev, id]);
    else {
      const values = selected.filter((item) => item !== id);
      setSelected(values);
    }
  };

  const handleChangePage = (event, newPage) => {
    // Force immediate state update
    const updatedPageNumber = newPage + 1;

    // Update the Redux state
    dispatch(
      setSearch({
        ...searchState, // Preserve all other search parameters
        page_number: updatedPageNumber,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);

    // Update the page size in the search state and reset to first page
    dispatch(
      setSearch({
        page_size: newPageSize,
        page_number: 1,
      })
    );
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const renderCellContent = (columnId, row, index) => {
    const cellValue = row[columnId] != null ? row[columnId] : "N/A";
    switch (columnId) {
      case "InstanceName":
        return (
          <button
            type="button"  
            className="text-accent hover:underline font-medium transition"
            onClick={() => {
              // Store modalities in localStorage
              localStorage.setItem(
                "selectedModalities",
                JSON.stringify({
                  IPModality: row.IPModality,
                  OPModality: row.OPModality,
                })
              );

              // Original navigation logic
              dispatch(
                setTableData({
                  currentId: row.InstanceID,
                  currentStatus: row.ConfidenceFlag,
                  index,
                  serialId: row.SerialID,
                })
              );

              localStorage.setItem(
                "documentDetails",
                JSON.stringify({
                  SerialID: row.SerialID,
                })
              );

              navigate(`/documents`);
            }}
          >
            {cellValue}
          </button>
        );
      
        
      case "ProcessingStatus":
        // If processing status is 0, show a full red bar instead of empty progress bar
        if (Number(cellValue) === 0) {
          return (
            <div
              style={{
                height: "10px",
                width: "100%",
                backgroundColor: "red",
                borderRadius: "5px",
              }}
            />
          );
        }
        // Otherwise show normal progress bar
        return (
          <BorderLinearProgress
            variant="determinate"
            value={Number(cellValue)}
            sx={{
              "& .MuiLinearProgress-bar": {
                backgroundColor: getColor(Number(cellValue)),
              },
            }}
          />
        );
      case "ConfidenceFlag":
        return (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "20px",
              background: cellValue,
            }}
          />
        );
      case "JsonDiffs":
        // Handle null values for JsonDiffs
        if (
          cellValue === null ||
          cellValue === undefined ||
          cellValue === "N/A"
        ) {
          return (
            <Tooltip title="NULL" arrow>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "#808080", // Grey color for null values
                    marginRight: "8px",
                  }}
                />
                <span>NULL</span>
              </div>
            </Tooltip>
          );
        }

        // Handle regular values
        const diffValue = parseFloat(cellValue);
        const diffPercentage = (diffValue * 100).toFixed(2);
        const circleColor = getJsonDiffColor(diffValue);

        return (
          <Tooltip title={`${diffPercentage}%`} arrow>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: circleColor,
                  marginRight: "8px",
                }}
              />
              <span>{diffPercentage}%</span>
            </div>
          </Tooltip>
        );
      case "Action":
        return (
          <>
            <IconButton
              style={{ cursor: "pointer" }}
              disabled={selected.length > 0}
              onClick={(e) => handleMenuOpen(e, row.InstanceID)}
            >
              <HiDotsHorizontal />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && menuRowId === row.InstanceID}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={async () => {
                  await handleApprove(true, row.InstanceID);
                  handleMenuClose();
                }}
              >
                {t('btn_approve')}
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await handleApprove(false, row.InstanceID);
                  handleMenuClose();
                }}
              >
                {t('btn_reject')}
              </MenuItem>
            </Menu>
          </>
        );
      case "InstanceDate":
        return moment(cellValue).format("YYYY-MM-DD");
      case "DataType":
        return cellValue;
      // We're skipping all timestamp columns by not listing them here,
      // they'll fall through to the default case
      default:
        return cellValue;
    }
  };

  return (
    <div className="glass-card w-full ">

      <TableContainer
  sx={{ maxHeight: 630 }}
  className="rounded-xl"
>

        <Table
  stickyHeader
  sx={{
    background: "transparent",
  }}
>

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
            {stableSort(data || [], getComparator(order, orderBy)).map(
              (row, index) => {
                if (row.InstanceID !== undefined) {
                  const isItemSelected = isSelected(row.InstanceID);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
  "&:hover": {
    bgcolor: (theme) =>
      alpha(theme.palette.primary.main, 0.05),
  },
}}

                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          onClick={(event) =>
                            handleClick(event, row.InstanceID)
                          }
                        />
                      </TableCell>

                      {visibleColumns.map((columnId) => (
                        <TableCell key={columnId}>
                          {renderCellContent(columnId, row, index)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                }
                return null;
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={availablePageSizes}
        component="div"
        count={totalItemCount || 0}
        rowsPerPage={searchState.page_size || 10}
        page={Math.max(0, (searchState.page_number || 1) - 1)}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t('pagination_of')} ${count}` // Translate
        }
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
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