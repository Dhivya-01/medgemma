import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { axChecker } from "../config/axios.config";
import { appConfig } from "../config/app.config";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { TableSortLabel, Box, TextField } from "@mui/material";
import { FaHistory } from "react-icons/fa";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { enUS, ja } from 'date-fns/locale';


// Sorting helper functions remain the same
const descendingComparator = (a, b, orderBy) => {
  if (orderBy === "InstanceTimeStamp") {
    return new Date(b[orderBy]) - new Date(a[orderBy]);
  }
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

const UploadPage = () => {
  const { t,i18n } = useTranslation('admin');
  const navigate = useNavigate();

  const localeMap = {
    en: enUS,
    ja: ja,
  };
  const currentLocale = localeMap[i18n.language] || enUS;


  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("InstanceID");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const rowsPerPage = 20;

  // Date range picker state
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);
  const [state, setState] = useState([
    {
      startDate: moment().startOf("day").toDate(),
      endDate: moment().endOf("day").toDate(),
      key: "selection",
    },
  ]);

   useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  // Create a searchState to store the formatted dates
  const [searchState, setSearchState] = useState({
    start_date: moment().startOf("day").toDate(),
    end_date: moment().endOf("day").toDate(),
    page_number: 1,
  });

const columns = [
  { id: "UploadIDs", label: t('table_upload_id'), sortable: true },
  { id: "IECompletion", label: t('table_extraction_status'), sortable: false },
  { id: "PostProcessCompletion", label: t('table_postprocess_status'), sortable: false },
  { id: "PreProcessCompletion", label: t('table_preprocess_status'), sortable: false },
  { id: "TranscribeCompletion", label: t('table_transcribe_status'), sortable: false },
  { id: "InstanceTimeStamp", label: t('table_upload_date'), sortable: true },
  { id: "DataType", label: t('table_data_type'), sortable: false },
];


  // Handle click outside for date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Fetch data when searchState changes
  useEffect(() => {
    fetchTableData();
  }, [searchState]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const formatStatus = (status) => {
    if (status === null || status === undefined) return "Not Available";
    if (typeof status === "object") {
      if (status.type || status.msg) {
        return "Processing";
      }
      return "Processing";
    }
    return String(status);
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('status_not_available');
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (e) {
      return t('date_invalid');
    }
  };

  const checkAndRefreshToken = async () => {
    const token = sessionStorage.getItem("secondAuthToken");
    if (!token) {
      toast.error(t('toast_login_again'));
      navigate("/");
      return false;
    }
    return true;
  };

  const handleRefresh = () => {
    fetchTableData();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSearchState((prev) => ({
      ...prev,
      page_number: newPage,
    }));
  };

  const fetchTableData = async () => {
    try {
      if (!(await checkAndRefreshToken())) return;

      setRefreshing(true);

      const token = sessionStorage.getItem("secondAuthToken");
      const selectedProject = localStorage.getItem("selectedProject");
      const projectId = selectedProject ? JSON.parse(selectedProject).id : "";
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      const requestBody = {
        start_date: moment(searchState.start_date).format("YYYY-MM-DD"),
        end_date: moment(searchState.end_date).format("YYYY-MM-DD"),

        page_number: searchState.page_number,
        page_size: rowsPerPage,

        project_id: projectId,
        user_id: selecteduser,
      };

      const response = await axChecker.post(
        `/checker/fetch_upload`,
        requestBody,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      let responseData =
        typeof response.data === "string"
          ? JSON.parse(response.data)
          : response.data;

      if (
        responseData?.details?.data &&
        Array.isArray(responseData.details.data)
      ) {
        const processedData = responseData.details.data.map((item) => ({
          UploadIDs: item.UploadIDs,
          IECompletion: item.IECompletion,
          PostProcessCompletion: item.PostProcessCompletion,
          PreProcessCompletion: item.PreProcessCompletion,
          TranscribeCompletion: item.TranscribeCompletion,
          InstanceTimeStamp: item.InstanceTimeStamp,
          ProcessingStatus: item.ProcessingStatus,
          InstanceName: item.InstanceName,
          DataType: item.DataType,
        }));
        setTableData(processedData);
        setTotalItems(responseData.details.TotalItemCount || 0);
        setError("");
      } else {
        throw new Error("No data available");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (error.response?.data?.detail) {
        errorMessage =
          typeof error.response.data.detail === "object"
            ? JSON.stringify(error.response.data.detail)
            : error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);

      if (error.response?.status === 401) {
        navigate("/");
      }
    } finally {
      setRefreshing(false);
    }
  };

  // Rest of the component remains the same
  return (
    <div className="mt-10 bg-white rounded-lg shadow-md p-6  ">
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}    // Important!
        pauseOnFocusLoss={false} // Important!
        closeOnClick={true}
        draggable={true}
      /> */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{t('dashboard_title')}</h2>
        <div className="flex items-center gap-4">
          {/* Date Picker */}
          <div ref={datePickerRef} className="relative">
            <div className="flex items-center gap-2">
              <label>{t('label_date_range')}:</label>
              <TextField
                type="text"
                value={`${moment(searchState.start_date).format(
                  "D MMM YYYY"
                )} ~ ${moment(searchState.end_date).format("D MMM YYYY")}`}
                onClick={() => setIsOpen(!isOpen)}
                placeholder={t('placeholder_select_date')}
                size="small"
                style={{ cursor: "pointer" }}
                autoComplete="off"
                InputProps={{ readOnly: true }}
              />
            </div>
            {isOpen && (
              <div className="absolute right-0 z-50 mt-2 shadow-lg">
                <DateRangePicker
                  onChange={(item) => {
                    setState([item.selection]);
                    const start_date = item.selection.startDate;
                    const end_date = item.selection.endDate;
                    setSearchState((prev) => ({
                      ...prev,
                      start_date,
                      end_date,
                      page_number: 1, // Reset page number when changing dates
                    }));
                    setCurrentPage(1); // Reset the current page display
                    if (item.selection.startDate !== item.selection.endDate)
                      setIsOpen(false);
                  }}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                  className="bg-white"
                  locale={currentLocale}
                />
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <FaHistory
            size={20}
            className={`cursor-pointer transition-all duration-300 ease-in-out ${
              refreshing
                ? "animate-spin text-blue-500"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={handleRefresh}
          />
        </div>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full border-collapse table-fixed max-h-120 overflow-y-auto">
          <thead>
            <tr
              className="text-black"
              style={{ backgroundColor: appConfig.color.primary }}
            >
              {columns.map((headCell) => (
                <th key={headCell.id} className="border p-2 w-1/5">
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => handleRequestSort(headCell.id)}
                      className="uppercase whitespace-nowrap overflow-hidden text-ellipsis"
                      sx={{
                        "&.MuiTableSortLabel-root": {
                          color: "inherit",
                        },
                        "&.MuiTableSortLabel-root:hover": {
                          color: "inherit",
                        },
                        "&.Mui-active": {
                          color: "inherit",
                        },
                        "& .MuiTableSortLabel-icon": {
                          color: "inherit !important",
                        },
                      }}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? t('sorted_descending')
                            : t('sorted_ascending')}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    <span className="uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                      {headCell.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              stableSort(tableData, getComparator(order, orderBy)).map(
                (item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.UploadIDs}
                    </td>
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.IECompletion}
                    </td>
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.PostProcessCompletion}
                    </td>
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.PreProcessCompletion}
                    </td>
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.TranscribeCompletion}
                    </td>
                    <td className="border p-2 whitespace-nowrap overflow-hidden text-ellipsis">
                      {formatDate(item.InstanceTimeStamp)}
                    </td>
                    <td className="border p-2">
                      {item.DataType || "Not Available"}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  {error || t('error_no_data')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex justify-end mt-4">
          <div className="text-md text-gray-600">
            {currentPage * rowsPerPage - rowsPerPage + 1}–
            {Math.min(currentPage * rowsPerPage, totalItems)} of {totalItems}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`ml-2 px-2 text-2xl ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              &lt;
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage * rowsPerPage >= totalItems}
              className={`px-2 text-2xl ${
                currentPage * rowsPerPage >= totalItems
                  ? "text-gray-300"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
};

export default UploadPage;
