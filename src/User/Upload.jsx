



import { motion, AnimatePresence } from "framer-motion"
import React ,{ useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../redux/loadingSlice";
import { axChecker } from "../config/axios.config";
import { appConfig } from "../config/app.config";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import {
  TableSortLabel,
  Box,
  CircularProgress,
  TextField,
  Checkbox,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination, 
   
 
 

  
  Fab,
  IconButton,
  Chip
} from "@mui/material";
import { FaHistory, FaDownload, FaTrash, FaFileDownload ,

  
  FaChevronUp,
  FaChevronDown,
  FaUpload,
  FaTimes} from "react-icons/fa";
import moment from "moment";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import LoadingOverlay from "../components/LoadingOverlay";
import { useTranslation } from 'react-i18next';
import { enUS, ja } from 'date-fns/locale';


const ascendingComparator = (a, b, orderBy) => {
  // Special handling for InstanceTimeStamp
  if (orderBy === "InstanceTimeStamp") {
    const dateA = new Date(a[orderBy]);
    const dateB = new Date(b[orderBy]);

    // Check for invalid dates
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      return 0; // Handle invalid dates gracefully
    }

    const result = dateA.getTime() - dateB.getTime(); // For ascending order

    return result;
  }

  // For other fields, keep the original comparison
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "asc"
    ? (a, b) => ascendingComparator(a, b, orderBy)
    : (a, b) => -ascendingComparator(a, b, orderBy);
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

export default function Upload() {
  const { t, i18n } = useTranslation('upload');

   const localeMap = {
    en: enUS,
    ja: ja,
  };
  const currentLocale = localeMap[i18n.language] || enUS;

  // Set moment locale
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data_type, setDataType] = useState("");
  const [file_type, setFileType] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const location = useLocation();
  const toastShown = useRef(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("InstanceTimeStamp");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const rowsPerPage = 10;
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fileInputRef = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [dataTypes, setDataTypes] = useState([]);
  const [toastId, setToastId] = useState(null);
  const [customDataType, setCustomDataType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [dataTypesLoading, setDataTypesLoading] = useState(false);

  // New state variables for report download functionality
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [downloading, setDownloading] = useState(false);
const [reportDateRange, setReportDateRange] = useState([
  {
    startDate: moment().startOf("month").toDate(),
    endDate: moment().endOf("month").toDate(),
    key: "selection",
  },
]);
  const [state, setState] = useState([
    {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
      key: "selection",
    },
  ]);
  const datePickerRef = useRef(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [availablePageSizes] = useState([5, 10, 25, 50, 100, 200]);
  
  // Create a searchState to store the formatted dates
  const [searchState, setSearchState] = useState(() => {
    const savedSearchState = localStorage.getItem("uploadSearchState");
    if (savedSearchState) {
      const parsed = JSON.parse(savedSearchState);
      return {
        ...parsed,
        start_date: new Date(parsed.start_date),
        end_date: new Date(parsed.end_date),
        page_size: parsed.page_size || 10, // Add this line
      };
    }
    return {
      start_date: moment().startOf("month").toDate(),
      end_date: moment().endOf("month").toDate(),
      page_number: 0,
      page_size: 10, // Add this line
    };
  });

  const handleChangePage = (event, newPage) => {
    const newPageNumber = newPage + 1; // Convert to 1-based indexing
    setSearchState(prev => ({
      ...prev,
      page_number: newPageNumber
    }));
    fetchData(newPageNumber);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setSearchState(prev => ({
      ...prev,
      page_size: newPageSize,
      page_number: 1 // Reset to first page when changing page size
    }));
    fetchData(1);
  };


const handleDownloadReport = async () => {
  // Determine if upload IDs are selected
  const hasSelectedRows = selectedRows.length > 0;
  
  // Show confirmation toast based on selection
  if (!hasSelectedRows) {
    // Show warning that all upload IDs will be downloaded
    const confirmDownload = window.confirm(t('confirm_download_all'));
    
    if (!confirmDownload) {
      setOpenDatePicker(false);
      return;
    }
  } else if (selectedRows.length > 1) {
    // Multiple rows selected - show info message
    toast.info(`${selectedRows.length} ${t('toast_items_selected')}`);
  }

  // Close the dialog immediately
  setOpenDatePicker(false);
  setDownloading(true);
  
  // Show a toast notification that download started
   toast.info(t('toast_download_started'));
  
  try {
    const token = sessionStorage.getItem("secondAuthToken");
    const projectId = selectedProjectId || localStorage.getItem("selectedProjectId");
    const projectName = selectedProject?.name || localStorage.getItem("selectedProjectName");
    const selecteduser = localStorage.getItem("selectedProjectUserID");
    
    // Format date as YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const formattedStartDate = formatDate(reportDateRange[0].startDate);
    const formattedEndDate = formatDate(reportDateRange[0].endDate);

    // Prepare the request payload
    const payload = {
      project_id: projectId,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      upload_ids: hasSelectedRows ? selectedRows[0] : "",
      user_id: parseInt(selecteduser, 10)
    };
    
    
    // Call the download endpoint with proper headers for file download
    const response = await axChecker.post(
      '/checker/download_report/',
     payload,
      {
        headers: {
          'Accept': 'text/csv',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob' // Keep blob for CSV
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    const link = document.createElement('a');
    link.href = url;
    const fileName = `${projectName}_report_${formattedStartDate}_to_${formattedEndDate}.csv`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    toast.success(t('toast_csv_success'));
    
  } catch (error) {
    toast.error(`${t('toast_download_failed')}: ${error.response?.data?.message || error.message || ""}`); // Changed
  } finally {
    setDownloading(false);
  }
};


  // Save searchState to localStorage whenever it changes
  useEffect(() => {
    if (searchState.start_date && searchState.end_date) {
      localStorage.setItem(
        "uploadSearchState",
        JSON.stringify({
          ...searchState,
          start_date: searchState.start_date.toISOString(),
          end_date: searchState.end_date.toISOString(),
        })
      );
    }
  }, [searchState]);

  // Add this useEffect to trigger data fetch when searchState changes
  useEffect(() => {
    // Only call fetchData when selectedProjectId is available
    if (selectedProjectId) {
      fetchData(1); // Reset to page 1 when search criteria changes
    }
  }, [selectedProjectId, searchState]); // Now it will run when selectedProjectId or searchState changes

  useEffect(() => {
    const showWelcomeToast = () => {
      if (!toastShown.current && location.state?.toastMessage) {
        // Store the toast ID so we can dismiss it if needed
        const id = toast.success(location.state.toastMessage);
        setToastId(id);
        toastShown.current = true;
      }
    };

    const profile = JSON.parse(localStorage.getItem("profile"));
    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));

    if (!profile || !profile.user_email || !storedProject) {
      // navigate("/");
    } else {
      setUserEmail(profile.user_email);
      setUserName(profile.user_name || "User");
      setSelectedProject(storedProject);
      setSelectedProjectId(storedProject.id);
      setTimeout(showWelcomeToast, 10);
    }

    // Cleanup function - This will run when component unmounts
    return () => {
      // Dismiss any active toast when navigating away
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [navigate, location.state]);

 const columns = [
  { id: "UploadIDs", label: t('table_upload_id'), sortable: true },
  { id: "PostProcessCompletion", label: t('table_postprocess_status'), sortable: false },
  { id: "IECompletion", label: t('table_extraction_status'), sortable: false },
  { id: "TranscribeCompletion", label: t('table_transcribe_status'), sortable: false }, 
  { id: "PreProcessCompletion", label: t('table_preprocess_status'), sortable: false },
  { id: "InstanceTimeStamp", label: t('table_upload_date'), sortable: true },
  { id: "DataType", label: t('table_data_type'), sortable: false },
];


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

  const resetForm = () => {
    setDataType("");
    setFileType("");
    setFile(null);
    setCustomDataType("");
    setShowCustomInput(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const checkAndRefreshToken = async () => {
    const token = sessionStorage.getItem("secondAuthToken");
    if (!token) {
      toast.error("Please log in again");
      // navigate("/");
      return false;
    }

    // Optional: Add token expiration check here if you have token expiry
    return true;
  };
  
  const handlePageChange = (newPage) => {
    fetchData(newPage);
  };

  const handleRefresh = () => {
    fetchData();
  };

  const fetchData = async (pageNumber = 1) => {
    try {
      if (!(await checkAndRefreshToken())) return;

      setRefreshing(true);
      setLoading(true);
      setCurrentPage(pageNumber);

      const token = sessionStorage.getItem("secondAuthToken");
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      const requestBody = {
        user_id: selecteduser,
        project_id: selectedProjectId,
        start_date: moment(searchState.start_date).format("YYYY-MM-DD"), // Use selected start date
        end_date: moment(searchState.end_date).format("YYYY-MM-DD"), // Use selected end date
        page_number: Math.max(1, searchState?.page_number || 1),
        page_size: searchState?.page_size || 20,
      };

      const response = await axChecker.post(`/checker/fetch_upload`, requestBody, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let responseData;
      if (typeof response.data === "string") {
        responseData = JSON.parse(response.data);
      } else {
        responseData = response.data;
      }

      if (responseData?.status && responseData?.details?.data) {
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
          CompleteNotification: item.CompleteNotification,
        }));

        setTableData(processedData);
        setTotalItems(responseData.details.TotalItemCount);

        if (processedData.length === 0) {
          setError("No data available");
        } else {
          setError(null); // Clear any previous errors if data is successfully loaded
        }
      } else {
        setError("Invalid response format");
        toast.error("Invalid response format");
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const errorDetails = error.response?.data?.detail;

        // More specific error message based on validation failure
        const errorMessage = Array.isArray(errorDetails)
          ? errorDetails.map((e) => `${e.msg} for ${e.loc[1]}`).join(", ")
          : "Invalid request data";

        toast.error(errorMessage);
        setError(errorMessage);
      } else if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        // navigate("/");
      } else {
        const errorMessage =
          error.response?.data?.detail ||
          error.message ||
          "An error occurred while fetching data";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
const fetchDataTypes = async (reload = false) => {
    dispatch(setOnLoading());
    setDataTypesLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      if (!profile || !profile.user_email) {
        // navigate("/");
        return;
      }

      if (!storedProject || !storedProject.id) {
        toast.error(t('error_no_project'));
        return;
      }

      const token = sessionStorage.getItem("secondAuthToken");

      if (!token) {
        toast.error(t('error_auth'));
        return;
      }

      // Configure axios headers
      axChecker.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axChecker.defaults.headers.post["Content-Type"] = "application/json";
      axChecker.defaults.headers.post["Accept"] = "application/json";

      // Request body with reload parameter
      const requestBody = {
        project_id: storedProject.id,
        user_id: selecteduser,
        reload: reload
      };

      const response = await axChecker.post("/checker/get_data_types", requestBody);

      // Updated to match the actual API response structure
      if (
        response?.data?.status === true &&
        Array.isArray(response?.data?.details?.dataTypes)
      ) {
        const dataTypesWithOther = [...response.data.details.dataTypes, "Other"];
        setDataTypes(dataTypesWithOther);

        if (reload) {
          toast.success(t('toast_data_types_refreshed'));
        }
      } else {
        
        toast.error(t('error_invalid_data_format'));
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || t('error_upload');
      toast.error(errorMessage);
    } finally {
      dispatch(setOffLoading());
      setDataTypesLoading(false);
    }
};
    


  const handleRowSelect = (uploadId) => {
    setSelectedRows((prev) => {
      if (prev.includes(uploadId)) {
        return prev.filter((id) => id !== uploadId);
      } else {
        return [...prev, uploadId];
      }
    });
  };

const StatusBadge = ({ status }) => {
  if (!status || status === "Not Available") {
    return (
      <Chip
        label="Not Available"
        size="small"
        sx={{
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          fontWeight: 500
        }}
      />
    );
  }

  return (
    <Chip
      label={status}
      size="small"
      color="success"
      sx={{ fontWeight: 500 }}
    />
  );
};

  

  // Handle download
  const handleDownload = async () => {
    if (selectedRows.length === 0) {
        toast.warning(t('toast_select_rows'));
      return;
    }

    setDownloadLoading(true);
    try {
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const token = sessionStorage.getItem("secondAuthToken");
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      const payload = {
        instance_ids: ["string"], // This could be populated if needed
        project_id: selectedProjectId,
        user_id: selecteduser,
        upload_ids: selectedRows,
      };

      // Make the request with Axios
      const response = await axChecker.post(`/checker/fetch_excel_file`, payload, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        responseType: "blob", // Important for file downloads
      });

      // Check if the response is JSON (error message) instead of a file
      const contentType = response.headers["content-type"];

      if (contentType && contentType.includes("application/json")) {
        // It's a JSON response, likely an error
        // Convert blob to text to parse the JSON
        const reader = new FileReader();
        reader.onload = function () {
          try {
          const jsonData = JSON.parse(reader.result);
          if (!jsonData.status) {
            toast.warning(jsonData.string || t('toast_extraction_unavailable')); // Changed
          }
        } catch (e) {
          toast.error(t('toast_download_failed')); // Changed
        }
      };
      reader.readAsText(response.data);
      return;
    }

      // If we got here, it's a file download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(t('toast_download_success'));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDownloadLoading(false);
    }
  };
   const [isUploadExpanded, setIsUploadExpanded] = useState(true);
  const [isMobileUploadOpen, setIsMobileUploadOpen] = useState(false);

  // Check if mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const validateForm = () => {
    if (!data_type.trim()) {
      setErrorMessage("Data type is required.");
      return false;
    }
    if (
      !file_type.trim() ||
      ![
        "zip",
        "pdf",
        "txt",
        "png",
        "jpg",
        "wav",
        "mp3",
        "doc",
        "docx",
        "tif",
      ].includes(file_type.toLowerCase())
    ) {
      setErrorMessage("File type must be either 'zip' or 'pdf'.");
      return false;
    }
    if (!file) {
      setErrorMessage("Please select a file to upload.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!(await checkAndRefreshToken())) return;

    // Validate file exists
    if (!file) {
    setErrorMessage(t('toast_file_required')); // Changed
    toast.error(t('toast_file_required')); // Changed
    return;
  }

  if (data_type === "Other" && !customDataType.trim()) {
    setErrorMessage(t('toast_custom_type_required')); // Changed
    toast.error(t('toast_custom_type_required')); // Changed
    return;
  }

    setIsLoading(true);
    const token = sessionStorage.getItem("secondAuthToken");
    const selecteduser = localStorage.getItem("selectedProjectUserID");

    // Create FormData
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use custom data type if "Other" is selected, otherwise use selected data type
      const finalDataType = data_type === "Other" ? customDataType : data_type;

      // Create URL with proper encoding
      const baseURL = axChecker.defaults.baseURL || "";
      const uploadURL = `${baseURL}/file/upload_data/?data_type=${encodeURIComponent(
        finalDataType || "Default"
      )}&file_type=${encodeURIComponent(
        file_type || "zip"
      )}&project_id=${encodeURIComponent(
        selectedProject.id
      )}&user_id=${encodeURIComponent(selecteduser)}`;

      // Make the request
      const response = await fetch(uploadURL, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Check for HTTP error status
      if (!response.ok) {
      if (response.status === 422) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || t('error_upload'); // Changed
        setErrorMessage(errorMessage);
        toast.error(errorMessage);
      } else if (response.status === 401) {
        setErrorMessage(t('error_session_expired')); // Changed
        toast.error(t('error_session_expired')); // Changed
      } else {
        setErrorMessage(`Server error: ${response.status}`);
        toast.error(`Server error: ${response.status}`);
      }
      return;
    }

      // Parse successful response
      const responseData = await response.json();

      if (responseData.status) {
        fetchData();
        setSuccessMessage(responseData.string);
        setApiResponse(responseData);
        fetchData();
        resetForm();
        toast.success(t('toast_upload_success'));
      } else {
      setErrorMessage(responseData.string || t('toast_upload_failed')); // Changed
      toast.error(responseData.string || t('toast_upload_failed')); // Changed
    }
  } catch (error) {
    setErrorMessage(t('error_upload')); // Changed
    toast.error(t('error_upload')); // Changed
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchDataTypes();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      const token = sessionStorage.getItem("secondAuthToken");
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");


      if (!token) {
        throw new Error("Authentication token not found");
      }

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const payload = {
        project_id: storedProject.id,
        user_id: String(selecteduser),
        upload_ids: selectedRows, // Using selected rows
      };

      // Direct axios call with correct parameters
      const response = await axChecker.post(`/checker/delete_uploads`, payload, {
        headers: myHeaders,
      });

      if (response.data.status) {
        toast.success(response.data.string || t('toast_delete_success'));
        setSelectedRows([]); // Clear selected rows after successful deletion
        fetchData(currentPage); // Refresh the data
      } else {
         toast.error(response.data.string || t('toast_delete_failed'));
      }
    } catch (error) {
      toast.error(error.response?.data?.string || t('toast_delete_failed'));
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };


  // return (
  //   <div className=" relative overflow-y-auto max-h-[100vh]">
  //     {/* Loading Overlay */}
  //     <LoadingOverlay isLoading={loading} />

  //     {/* Animated Background Orbs */}
  //     <motion.div
  //       className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
  //       style={{
  //         background: "radial-gradient(circle, hsl(175 80% 40% / 0.3), transparent)",
  //       }}
  //       animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
  //       transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  //     />

  //     <motion.div
  //       className="absolute right-0 top-20 w-[300px] h-[300px] rounded-full opacity-15 pointer-events-none"
  //       style={{
  //         background: "radial-gradient(circle, hsl(215 90% 55% / 0.3), transparent)",
  //       }}
  //       animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
  //       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  //     />

  //     <div className="relative z-10 p-4 md:p-8 lg:p-12 space-y-6">
  //       {/* Welcome Header */}
  //       {userName && userEmail && (
  //         <motion.div
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="mb-6"
  //         >
  //           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
  //             {t('welcome_user')}, {userName}
  //           </h1>
  //         </motion.div>
  //       )}

  //       {/* DESKTOP: Collapsible Upload Section */}
  //       {!isMobile && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 "
  //         >
  //           {/* Header Bar - Always Visible */}
  //           <div
  //             className="flex items-center justify-between px-6 py-4  cursor-pointer"
  //             onClick={() => setIsUploadExpanded(!isUploadExpanded)}
  //           >
  //              <motion.div
  //       className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
  //     >
  //       <motion.div
  //         className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
  //         animate={{ x: ["-120%", "120%"] }}
  //         transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
  //       />
  //     </motion.div>
  //             <div className="flex items-center gap-3">
  //               <FaUpload className="text- text-xl" />
  //               <h2 className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-semibold text-lg">
  //                 Upload Data
  //               </h2>
  //               {!isUploadExpanded && file && (
  //                 <Chip
  //                   label={file.name}
  //                   size="small"
  //                   onDelete={() => setFile(null)}
  //                   className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent"
  //                 />
  //               )}
  //             </div>
  //             <motion.div
  //               animate={{ rotate: isUploadExpanded ? 180 : 0 }}
  //               transition={{ duration: 0.3 }}
  //             >
  //               <FaChevronDown className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text  text-xl" />
  //             </motion.div>
  //           </div>

  //           {/* Expandable Upload Form */}
  //           <AnimatePresence>
  //             {isUploadExpanded && (
  //               <motion.div
  //                 initial={{ height: 0, opacity: 0 }}
  //                 animate={{ height: "auto", opacity: 1 }}
  //                 exit={{ height: 0, opacity: 0 }}
  //                 transition={{ duration: 0.3 }}
  //               >
  //                 <form onSubmit={handleSubmit} className="p-6">
  //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  //                     {/* Data Type */}
  //                     <div className="space-y-2">
  //                       <label className="text-sm font-medium text-gray-700">
  //                         Data Type
  //                       </label>
  //                       <Autocomplete
  //                         id="data_type"
  //                         options={dataTypes}
  //                         value={data_type}
  //                         size="small"
  //                         onChange={(event, newValue) => {
  //                           setDataType(newValue);
  //                           if (newValue === "Other") {
  //                             setShowCustomInput(true);
  //                             setCustomDataType("");
  //                           } else {
  //                             setShowCustomInput(false);
  //                             setCustomDataType("");
  //                           }
  //                         }}
  //                         renderInput={(params) => (
  //                           <TextField
  //                             {...params}
  //                             placeholder="Select Data Type"
  //                             required
  //                           />
  //                         )}
  //                       />
  //                       {showCustomInput && (
  //                         <TextField
  //                           fullWidth
  //                           size="small"
  //                           value={customDataType}
  //                           onChange={(e) => setCustomDataType(e.target.value)}
  //                           placeholder={t('placeholder_custom_type')}
  //                           required={showCustomInput}
  //                         />
  //                       )}
  //                     </div>

  //                     {/* File Type */}
  //                     <div className="space-y-2">
  //                       <label className="text-sm font-medium text-gray-700">
  //                         File Type
  //                       </label>
  //                       <TextField
  //                         fullWidth
  //                         size="small"
  //                         value={file_type}
  //                         onChange={(e) => setFileType(e.target.value)}
  //                         pattern="^(zip|pdf|png|jpg|txt|wav|mp3|doc|docx)$"
  //                         placeholder="zip, pdf, png..."
  //                         required
  //                       />
  //                     </div>

  //                     {/* File Picker */}
  //                     <div className="space-y-2">
  //                       <label className="text-sm font-medium text-gray-700">
  //                         Choose File
  //                       </label>
  //                       <div className="relative">
  //                         <input
  //                           type="file"
  //                           ref={fileInputRef}
  //                           onChange={(e) => setFile(e.target.files[0])}
  //                           className="hidden"
  //                           id="file-upload"
  //                           required
  //                         />
  //                         <label
  //                           htmlFor="file-upload"
  //                           className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-teal-500 cursor-pointer transition-colors bg-gray-50"
  //                         >
  //                           <FaUpload className="text-gray-500" />
  //                           <span className="text-sm text-gray-600 truncate">
  //                             {file ? file.name : "Browse..."}
  //                           </span>
  //                         </label>
  //                       </div>
  //                     </div>

  //                     {/* Upload Button */}
  //                     <div className="space-y-2">
  //                       <label className="text-sm font-medium text-gray-700 invisible">
  //                         Action
  //                       </label>
  //                       <Button
  //                         type="submit"
  //                         variant="contained"
  //                         fullWidth
  //                         disabled={isLoading}
  //                         className="primary-btn text-white py-2"
  //                       >
  //                         {isLoading ? (
  //                           <>
  //                             <CircularProgress size={18} color="inherit" className="mr-2" />
  //                             Uploading...
  //                           </>
  //                         ) : (
  //                           <>
  //                             <FaUpload className="mr-2" />
  //                             Upload
  //                           </>
  //                         )}
  //                       </Button>
  //                     </div>
  //                   </div>

  //                   {/* Status Messages */}
  //                   {errorMessage && (
  //                     <motion.div
  //                       initial={{ opacity: 0, y: -10 }}
  //                       animate={{ opacity: 1, y: 0 }}
  //                       className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
  //                     >
  //                       {errorMessage}
  //                     </motion.div>
  //                   )}
  //                   {successMessage && (
  //                     <motion.div
  //                       initial={{ opacity: 0, y: -10 }}
  //                       animate={{ opacity: 1, y: 0 }}
  //                       className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
  //                     >
  //                       {successMessage}
  //                     </motion.div>
  //                   )}
  //                 </form>
  //               </motion.div>
  //             )}
  //           </AnimatePresence>
  //         </motion.div>
  //       )}

  //       {/* MOBILE: Floating Action Button */}
  //       {isMobile && (
  //         <>
  //           <Fab
  //             color="primary"
  //             aria-label="upload"
  //             onClick={() => setIsMobileUploadOpen(true)}
  //             sx={{
  //               position: 'fixed',
  //               bottom: 16,
  //               right: 16,
  //               zIndex: 1000,
  //               background: 'primary-btn',
  //             }}
  //           >
  //             <FaUpload />
  //           </Fab>

  //           {/* Mobile Upload Dialog */}
  //           <Dialog
  //             fullScreen
  //             open={isMobileUploadOpen}
  //             onClose={() => setIsMobileUploadOpen(false)}
  //           >
  //             <div className=" p-4 flex items-center justify-between">
  //               <h2 className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-bold text-xl">
  //                 Upload Data
  //               </h2>
  //               <IconButton onClick={() => setIsMobileUploadOpen(false)}>
  //                 <FaTimes className="text-white" />
  //               </IconButton>
  //             </div>
              
  //             <div className="p-6 space-y-4 bg-gray-50">
  //               <form onSubmit={(e) => {
  //                 handleSubmit(e);
  //                 setIsMobileUploadOpen(false);
  //               }} className="space-y-4">
  //                 {/* Data Type */}
  //                 <div className="space-y-2">
  //                   <label className="text-sm font-semibold text-gray-700">
  //                     Data Type *
  //                   </label>
  //                   <Autocomplete
  //                     options={dataTypes}
  //                     value={data_type}
  //                     onChange={(event, newValue) => {
  //                       setDataType(newValue);
  //                       if (newValue === "Other") {
  //                         setShowCustomInput(true);
  //                         setCustomDataType("");
  //                       } else {
  //                         setShowCustomInput(false);
  //                         setCustomDataType("");
  //                       }
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         placeholder="Select or Type"
  //                         required
  //                       />
  //                     )}
  //                   />
  //                   {showCustomInput && (
  //                     <TextField
  //                       fullWidth
  //                       value={customDataType}
  //                       onChange={(e) => setCustomDataType(e.target.value)}
  //                       placeholder="Custom Data Type"
  //                       required={showCustomInput}
  //                     />
  //                   )}
  //                 </div>

  //                 {/* File Type */}
  //                 <div className="space-y-2">
  //                   <label className="text-sm font-semibold text-gray-700">
  //                     File Type *
  //                   </label>
  //                   <TextField
  //                     fullWidth
  //                     value={file_type}
  //                     onChange={(e) => setFileType(e.target.value)}
  //                     pattern="^(zip|pdf|png|jpg|txt|wav|mp3|doc|docx)$"
  //                     placeholder="zip, pdf, png, jpg..."
  //                     required
  //                   />
  //                 </div>

  //                 {/* File Upload */}
  //                 <div className="space-y-2">
  //                   <label className="text-sm font-semibold text-gray-700">
  //                     Choose File *
  //                   </label>
  //                   <input
  //                     type="file"
  //                     ref={fileInputRef}
  //                     onChange={(e) => setFile(e.target.files[0])}
  //                     className="hidden"
  //                     id="mobile-file-upload"
  //                     required
  //                   />
  //                   <label
  //                     htmlFor="mobile-file-upload"
  //                     className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 cursor-pointer transition-all bg-white"
  //                   >
  //                     <FaUpload className="text-2xl text-gray-400" />
  //                     <div className="text-center">
  //                       <p className="text-sm font-medium text-gray-700">
  //                         {file ? file.name : "Tap to select file"}
  //                       </p>
  //                       <p className="text-xs text-gray-500 mt-1">
  //                         {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Max 100MB"}
  //                       </p>
  //                     </div>
  //                   </label>
  //                 </div>

  //                 {/* Upload Button */}
  //                 <Button
  //                   type="submit"
  //                   variant="contained"
  //                   fullWidth
  //                   size="large"
  //                   disabled={isLoading}
  //                   className="auth-btn text-white py-4 text-lg"
  //                 >
  //                   {isLoading ? (
  //                     <>
  //                       <CircularProgress size={24} color="inherit" className="mr-2" />
  //                       Uploading...
  //                     </>
  //                   ) : (
  //                     <>
  //                       <FaUpload className="mr-2" />
  //                       Upload File
  //                     </>
  //                   )}
  //                 </Button>

  //                 {/* Messages */}
  //                 {errorMessage && (
  //                   <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
  //                     {errorMessage}
  //                   </div>
  //                 )}
  //                 {successMessage && (
  //                   <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
  //                     {successMessage}
  //                   </div>
  //                 )}
  //               </form>
  //             </div>
  //           </Dialog>
  //         </>
  //       )}

  //       {/* Dashboard Section */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ delay: 0.2 }}
  //         className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 "
  //       >
  //         {/* Dashboard Header */}
  //         <div className="p-4 md:p-6 border-b border-gray-200">
  //           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
  //             <h2 className="text-xl md:text-2xl font-bold text-gray-800">
  //               {t('dashboard_title')}
  //             </h2>

  //             {/* Action Buttons - Responsive */}
  //             <div className="flex flex-wrap items-center gap-2 md:gap-3">
  //               {/* Download Selected */}
  //               <Button
  //                 onClick={handleDownload}
  //                 disabled={selectedRows.length === 0 || downloadLoading}
  //                 variant="contained"
  //                 size={isMobile ? "small" : "medium"}
  //                 startIcon={downloadLoading ? <CircularProgress size={16} /> : <FaDownload />}
  //                  className={`btn ${
  //   selectedRows.length === 0 || downloadLoading
  //     ? "btn-disabled"
  //     : "btn-primary"
  // }`}
  //               >
  //                 ({selectedRows.length})
  //               </Button>

  //               {/* Download Report */}
  //               <Button
  //                 onClick={() => setOpenDatePicker(true)}
  //                 disabled={downloading}
  //                 variant="outlined"
  //                 size={isMobile ? "small" : "medium"}
  //                  className={`btn ${downloading ? "btn-disabled" : "btn-secondary"}`}
  //                 startIcon={downloading ? <CircularProgress size={16} /> : <FaFileDownload />}
  //               >
  //               Report
  //               </Button>

  //               {/* Delete */}
  //               <Button
  //                 onClick={() => setDeleteDialogOpen(true)}
  //                 disabled={selectedRows.length === 0}
  //                 variant="contained"
  //                 size={isMobile ? "small" : "medium"}
  //                 color="error"
  //                 startIcon={<FaTrash />}
  //               >
  //              ({selectedRows.length})
  //               </Button>

  //               {/* Date Picker */}
  //               <div className="hidden md:block" ref={datePickerRef}>
  //                 <TextField
  //                   size="small"
  //                   value={`${moment(searchState.start_date).format("D MMM YY")} ~ ${moment(searchState.end_date).format("D MMM YY")}`}
  //                   onClick={() => setIsOpen(!isOpen)}
  //                   placeholder={t('placeholder_select_date')}
  //                   style={{ cursor: "pointer", minWidth: "200px" }}
  //                   InputProps={{ readOnly: true }}
  //                 />
  //                 {isOpen && (
  //                   <div className="absolute right-0 z-50 mt-2 shadow-lg bg-white">
  //                     <DateRangePicker
  //                       onChange={(item) => {
  //                         setState([item.selection]);
  //                         const start_date = item.selection.startDate;
  //                         const end_date = item.selection.endDate;
  //                         setSearchState((prev) => ({
  //                           ...prev,
  //                           start_date,
  //                           end_date,
  //                           page_number: 1,
  //                         }));
  //                         setCurrentPage(1);
  //                       }}
  //                       showSelectionPreview={true}
  //                       moveRangeOnFirstSelection={false}
  //                       months={2}
  //                       ranges={state}
  //                       direction="horizontal"
  //                       locale={currentLocale}
  //                     />
  //                     <div className="flex justify-end gap-2 p-3 border-t bg-white">
  //                       <Button onClick={() => setIsOpen(false)} size="small">
  //                         {t('btn_cancel')}
  //                       </Button>
  //                       <Button
  //                         onClick={() => {
  //                           setIsOpen(false);
  //                           fetchData(1);
  //                         }}
  //                         size="small"
  //                         variant="contained"
  //                       >
  //                         {t('btn_apply')}
  //                       </Button>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>

  //               {/* Refresh */}
  //               <IconButton
  //                 onClick={handleRefresh}
  //                 className={refreshing ? "animate-spin" : ""}
  //                 color="primary"
  //               >
  //                 <FaHistory />
  //               </IconButton>
  //             </div>
  //           </div>

  //           {/* Mobile Date Filter */}
  //           {isMobile && (
  //             <div className="mt-3">
  //               <TextField
  //                 fullWidth
  //                 size="small"
  //                 value={`${moment(searchState.start_date).format("D MMM")} ~ ${moment(searchState.end_date).format("D MMM")}`}
  //                 onClick={() => setIsOpen(!isOpen)}
  //                 placeholder="Select Date Range"
  //                 InputProps={{ readOnly: true }}
  //               />
  //             </div>
  //           )}
  //         </div>

  //         {/* Table Container - Improved Scrolling */}
  //         <div className="overflow-x-auto overflow-y-auto max-h-[100vh]">
  //           {error ? (
  //             <div className="text-center text-red-500 py-8">{error}</div>
  //           ) : (
  //             <div className="min-h-[300px] max-h-[500px] overflow-y-auto">
  //               <table className="w-full border-collapse">
  //                 <thead className="sticky top-0 z-10 primary-btn text-white">
  //                   <tr>
  //                     {columns.map((headCell) => (
  //                       <th
  //                         key={headCell.id}
  //                         className="border-b border-white/20 p-3 text-left text-xs md:text-sm font-semibold whitespace-nowrap"
  //                       >
  //                         {headCell.id === "select" ? (
  //                           <Checkbox
  //                             indeterminate={selectedRows.length > 0 && selectedRows.length < tableData.length}
  //                             checked={tableData.length > 0 && selectedRows.length === tableData.length}
  //                             onChange={(e) => {
  //                               if (e.target.checked) {
  //                                 setSelectedRows(tableData.map(item => item.UploadIDs));
  //                               } else {
  //                                 setSelectedRows([]);
  //                               }
  //                             }}
  //                             sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
  //                           />
  //                         ) : headCell.sortable ? (
  //                           <TableSortLabel
  //                             active={orderBy === headCell.id}
  //                             direction={orderBy === headCell.id ? order : "asc"}
  //                             onClick={() => handleRequestSort(headCell.id)}
  //                             sx={{
  //                               "&.MuiTableSortLabel-root": { color: "white" },
  //                               "&.MuiTableSortLabel-root:hover": { color: "white" },
  //                               "&.Mui-active": { color: "white" },
  //                               "& .MuiTableSortLabel-icon": { color: "white !important" },
  //                             }}
  //                           >
  //                             {headCell.label}
  //                           </TableSortLabel>
  //                         ) : (
  //                           headCell.label
  //                         )}
  //                       </th>
  //                     ))}
  //                   </tr>
  //                 </thead>
  //                 <tbody className="bg-white divide-y divide-gray-200">
  //                   {stableSort(tableData, getComparator(order, orderBy)).map(
  //                     (item, index) => (
  //                       <tr
  //                         key={index}
  //                         className={`hover:bg-blue-50 transition-colors ${
  //                           selectedRows.includes(item.UploadIDs) ? "bg-blue-50" : ""
  //                         } ${
  //                           item.CompleteNotification === 1 ? "bg-green-50" : ""
  //                         }`}
  //                       >
  //                         <td className="border-b p-3 text-sm">
  //                           <div className="flex items-center gap-2">
  //                             <Checkbox
  //                               checked={selectedRows.includes(item.UploadIDs)}
  //                               onChange={() => handleRowSelect(item.UploadIDs)}
  //                               size="small"
  //                             />
  //                             <span className="font-mono text-xs">
  //                               {item.UploadIDs || t('status_not_available')}
  //                             </span>
  //                           </div>
  //                         </td>
  //                         <td className="border-b p-3 text-sm">
  //                           <StatusBadge status={item.PostProcessCompletion} />
  //                         </td>
  //                         <td className="border-b p-3 text-sm">
  //                           <StatusBadge status={item.IECompletion} />
  //                         </td>
  //                         <td className="border-b p-3 text-sm">
  //                           <StatusBadge status={item.TranscribeCompletion} />
  //                         </td>
  //                         <td className="border-b p-3 text-sm">
  //                           <StatusBadge status={item.PreProcessCompletion} />
  //                         </td>
  //                         <td className="border-b p-3 text-sm whitespace-nowrap">
  //                           {item.InstanceTimeStamp || t('status_not_available')}
  //                         </td>
  //                         <td className="border-b p-3 text-sm">
  //                           <Chip
  //                             label={item.DataType || t('status_not_available')}
  //                             size="small"
  //                             color="primary"
  //                             variant="outlined"
  //                           />
  //                         </td>
  //                       </tr>
  //                     )
  //                   )}
  //                 </tbody>
  //               </table>

  //               {/* Pagination */}
  //               <TablePagination
  //                 rowsPerPageOptions={availablePageSizes}
  //                 component="div"
  //                 count={totalItems || 0}
  //                 rowsPerPage={searchState.page_size || 10}
  //                 page={Math.max(0, (searchState.page_number || 1) - 1)}
  //                 onPageChange={handleChangePage}
  //                 onRowsPerPageChange={handleChangeRowsPerPage}
  //                 labelDisplayedRows={({ from, to, count }) =>
  //                   `${from}-${to} ${t('pagination_of')} ${count}`
  //                 }
  //               />
  //             </div>
  //           )}
  //         </div>
  //       </motion.div>
  //     </div>

  //     {/* Dialogs - Keep existing dialogs */}
  //     <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
  //       <DialogTitle>{t('dialog_delete_title')}</DialogTitle>
  //       <DialogContent>
  //         {t('dialog_delete_confirm')} {selectedRows.length}{" "}
  //         {selectedRows.length !== 1 ? t('dialog_delete_items') : t('dialog_delete_selected')}?{" "}
  //         {t('dialog_delete_warning')}
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={handleDeleteCancel}>{t('btn_cancel')}</Button>
  //         <Button onClick={handleDeleteConfirm} color="error">
  //           {t('btn_delete')}
  //         </Button>
  //       </DialogActions>
  //     </Dialog>

  //     {/* Report Download Dialog */}
  //     <Dialog
  //       open={openDatePicker}
  //       onClose={() => setOpenDatePicker(false)}
  //       maxWidth="md"
  //       fullWidth
  //     >
  //       <DialogTitle>{t('dialog_report_download_title')}</DialogTitle>
  //       <DialogContent>
  //         <div className="mt-4">
  //           {selectedRows.length === 0 ? (
  //             <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
  //               <p className="text-sm text-yellow-800 font-medium">
  //                 ⚠️ {t('alert_no_upload_ids')}
  //               </p>
  //               <p className="text-sm text-yellow-700 mt-1">
  //                 {t('alert_report_all')}
  //               </p>
  //             </div>
  //           ) : (
  //             <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
  //               <p className="text-sm text-blue-800 font-medium">
  //                 ✓ {selectedRows.length}{" "}
  //                 {selectedRows.length !== 1
  //                   ? t('alert_upload_ids_selected_plural')
  //                   : t('alert_upload_ids_selected')}
  //               </p>
  //               <p className="text-sm text-blue-700 mt-1">
  //                 {t('alert_report_selected')}
  //               </p>
  //             </div>
  //           )}

  //           <DateRangePicker
  //             onChange={(item) => setReportDateRange([item.selection])}
  //             showSelectionPreview={true}
  //             moveRangeOnFirstSelection={false}
  //             months={isMobile ? 1 : 2}
  //             ranges={reportDateRange}
  //             direction="horizontal"
  //             locale={currentLocale}
  //           />

  //           <div className="mt-4 p-3 bg-gray-50 rounded">
  //             <p className="text-sm text-gray-700">
  //               <strong>{t('label_selected_range')}</strong>{" "}
  //               {moment(reportDateRange[0].startDate).format("D MMM YYYY")} ~{" "}
  //               {moment(reportDateRange[0].endDate).format("D MMM YYYY")}
  //             </p>
  //           </div>
  //         </div>
  //       </DialogContent>
  //       <DialogActions>
  //         <Button onClick={() => setOpenDatePicker(false)}>
  //           {t('btn_cancel')}
  //         </Button>
  //         <Button
  //           onClick={handleDownloadReport}
  //           variant="contained"
  //           disabled={downloading}
  //         >
  //           {downloading ? (
  //             <>
  //               <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
  //               {t('btn_downloading')}
  //             </>
  //           ) : (
  //             t('btn_download_report')
  //           )}
  //         </Button>
  //       </DialogActions>
  //     </Dialog>
  //   </div>
  // );

  // UploadDashboard/index.jsx — Improved layout
// Better header zone, upload section, table area, responsive support

return (
  <div
    style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      minHeight: "100vh",
      background: "#f0f4f8",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflowX: "hidden",
    }}
  >
    <LoadingOverlay isLoading={loading} />

    {/* ── Subtle background orbs ── */}
    <motion.div
      style={{
        position: "absolute", left: 0, top: 0,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, hsl(175 80% 40% / 0.12), transparent)",
        pointerEvents: "none", zIndex: 0,
      }}
      animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      style={{
        position: "absolute", right: 0, top: 80,
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, hsl(215 90% 55% / 0.10), transparent)",
        pointerEvents: "none", zIndex: 0,
      }}
      animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />

    <div style={{ position: "relative", zIndex: 1, padding: "24px 24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ═══════════════════════════════════════════════════
          WELCOME HEADER
      ═══════════════════════════════════════════════════ */}
      {userName && userEmail && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
            <span style={{ background: "linear-gradient(135deg, #0d9488, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t("welcome_user")}, {userName}
            </span>
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>{userEmail}</div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════
          UPLOAD SECTION — Desktop collapsible
      ═══════════════════════════════════════════════════ */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#fff",
            borderRadius: 14,
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,.04)",
            overflow: "hidden",
          }}
        >
          {/* Collapsible header */}
          <div
            onClick={() => setIsUploadExpanded(!isUploadExpanded)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              cursor: "pointer",
              borderBottom: isUploadExpanded ? "1px solid #f1f5f9" : "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Shimmer on header */}
            <motion.div
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(90deg, transparent, rgba(13,148,136,.06), transparent)",
                width: "40%",
              }}
              animate={{ x: ["-120%", "260%"] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "linear-gradient(135deg, #0d9488, #2563eb)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FaUpload style={{ color: "#fff", fontSize: 13 }} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>Upload Data</div>
                <div style={{ fontSize: 11.5, color: "#94a3b8" }}>Add new files to the pipeline</div>
              </div>
              {!isUploadExpanded && file && (
                <Chip
                  label={file.name}
                  size="small"
                  onDelete={() => setFile(null)}
                  sx={{ fontSize: 11, ml: 1 }}
                />
              )}
            </div>

            <motion.div animate={{ rotate: isUploadExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <FaChevronDown style={{ color: "#94a3b8", fontSize: 13 }} />
            </motion.div>
          </div>

          {/* Expandable form */}
          <AnimatePresence>
            {isUploadExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <form onSubmit={handleSubmit} style={{ padding: "18px 20px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 14,
                      alignItems: "end",
                    }}
                  >
                    {/* Data Type */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Data Type
                      </label>
                      <Autocomplete
                        id="data_type"
                        options={dataTypes}
                        value={data_type}
                        size="small"
                        onChange={(event, newValue) => {
                          setDataType(newValue);
                          if (newValue === "Other") { setShowCustomInput(true); setCustomDataType(""); }
                          else { setShowCustomInput(false); setCustomDataType(""); }
                        }}
                        renderInput={(params) => (
                          <TextField {...params} placeholder="Select Data Type" required
                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13, "& fieldset": { borderColor: "#e2e8f0" } } }}
                          />
                        )}
                      />
                      {showCustomInput && (
                        <TextField
                          fullWidth size="small"
                          value={customDataType}
                          onChange={(e) => setCustomDataType(e.target.value)}
                          placeholder={t("placeholder_custom_type")}
                          required={showCustomInput}
                          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13 } }}
                        />
                      )}
                    </div>

                    {/* File Type */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        File Type
                      </label>
                      <TextField
                        fullWidth size="small"
                        value={file_type}
                        onChange={(e) => setFileType(e.target.value)}
                        placeholder="zip, pdf, png..."
                        required
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13, "& fieldset": { borderColor: "#e2e8f0" } } }}
                      />
                    </div>

                    {/* File Picker */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>
                        Choose File
                      </label>
                      <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" id="file-upload" required />
                      <label
                        htmlFor="file-upload"
                        style={{
                          display: "flex", alignItems: "center", gap: 8,
                          padding: "7px 12px",
                          border: "1.5px dashed #cbd5e1",
                          borderRadius: 8,
                          cursor: "pointer",
                          background: "#f8fafc",
                          fontSize: 12.5,
                          color: file ? "#0f172a" : "#94a3b8",
                          transition: "border-color .15s",
                          overflow: "hidden",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0d9488")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                      >
                        <FaUpload style={{ color: "#94a3b8", flexShrink: 0 }} />
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {file ? file.name : "Browse..."}
                        </span>
                      </label>
                    </div>

                    {/* Upload button */}
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{
                          background: "linear-gradient(135deg, #0d9488, #2563eb)",
                          textTransform: "none",
                          fontWeight: 700,
                          borderRadius: "8px",
                          fontSize: 13,
                          height: 38,
                          boxShadow: "none",
                          "&:hover": { boxShadow: "0 4px 14px rgba(13,148,136,.35)" },
                        }}
                      >
                        {isLoading ? (
                          <><CircularProgress size={16} color="inherit" style={{ marginRight: 8 }} />Uploading...</>
                        ) : (
                          <><FaUpload style={{ marginRight: 8 }} />Upload</>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Status messages */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ marginTop: 12, padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 12.5, color: "#dc2626" }}
                      >
                        {errorMessage}
                      </motion.div>
                    )}
                    {successMessage && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{ marginTop: 12, padding: "10px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 12.5, color: "#16a34a" }}
                      >
                        {successMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Mobile FAB */}
      {isMobile && (
        <>
          <Fab
            aria-label="upload"
            onClick={() => setIsMobileUploadOpen(true)}
            sx={{
              position: "fixed", bottom: 20, right: 20, zIndex: 1000,
              background: "linear-gradient(135deg, #0d9488, #2563eb)",
              color: "#fff",
              "&:hover": { background: "linear-gradient(135deg, #0f766e, #1d4ed8)" },
            }}
          >
            <FaUpload />
          </Fab>

          <Dialog fullScreen open={isMobileUploadOpen} onClose={() => setIsMobileUploadOpen(false)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #0d9488, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Upload Data
              </div>
              <IconButton onClick={() => setIsMobileUploadOpen(false)} size="small">
                <FaTimes style={{ fontSize: 16, color: "#64748b" }} />
              </IconButton>
            </div>
            <div style={{ padding: "20px", background: "#f8fafc", flex: 1, overflowY: "auto" }}>
              <form onSubmit={(e) => { handleSubmit(e); setIsMobileUploadOpen(false); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Data Type */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Data Type *</label>
                  <Autocomplete
                    options={dataTypes} value={data_type}
                    onChange={(event, newValue) => {
                      setDataType(newValue);
                      setShowCustomInput(newValue === "Other");
                      setCustomDataType("");
                    }}
                    renderInput={(params) => <TextField {...params} placeholder="Select or Type" required />}
                  />
                  {showCustomInput && (
                    <TextField fullWidth value={customDataType} onChange={(e) => setCustomDataType(e.target.value)} placeholder="Custom Data Type" required={showCustomInput} />
                  )}
                </div>
                {/* File Type */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>File Type *</label>
                  <TextField fullWidth value={file_type} onChange={(e) => setFileType(e.target.value)} placeholder="zip, pdf, png, jpg..." required />
                </div>
                {/* File Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Choose File *</label>
                  <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} className="hidden" id="mobile-file-upload" required />
                  <label htmlFor="mobile-file-upload"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "24px 16px", border: "2px dashed #cbd5e1", borderRadius: 12, cursor: "pointer", background: "#fff", textAlign: "center" }}
                  >
                    <FaUpload style={{ fontSize: 22, color: "#94a3b8" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{file ? file.name : "Tap to select file"}</div>
                      <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>
                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Max 100MB"}
                      </div>
                    </div>
                  </label>
                </div>
                <Button type="submit" variant="contained" fullWidth size="large" disabled={isLoading}
                  sx={{ background: "linear-gradient(135deg, #0d9488, #2563eb)", textTransform: "none", fontWeight: 700, borderRadius: "10px", fontSize: 14 }}
                >
                  {isLoading ? <><CircularProgress size={20} color="inherit" style={{ marginRight: 8 }} />Uploading...</> : <><FaUpload style={{ marginRight: 8 }} />Upload File</>}
                </Button>
                {errorMessage && <div style={{ padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: 13, color: "#dc2626" }}>{errorMessage}</div>}
                {successMessage && <div style={{ padding: "12px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: 13, color: "#16a34a" }}>{successMessage}</div>}
              </form>
            </div>
          </Dialog>
        </>
      )}

      {/* ═══════════════════════════════════════════════════
          DASHBOARD TABLE SECTION
      ═══════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          background: "#fff",
          borderRadius: 14,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,.04)",
          overflow: "hidden",
        }}
      >
        {/* ── Table Header ── */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid #f1f5f9",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Left: Title */}
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
              {t("dashboard_title")}
            </div>
            {selectedRows.length > 0 && (
              <div style={{ fontSize: 11.5, color: "#3b82f6", marginTop: 2 }}>
                {selectedRows.length} row{selectedRows.length !== 1 ? "s" : ""} selected
              </div>
            )}
          </div>

          {/* Right: Action buttons + date + refresh */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>

            {/* Download selected */}
            <Button
              onClick={handleDownload}
              disabled={selectedRows.length === 0 || downloadLoading}
              variant={selectedRows.length > 0 ? "contained" : "outlined"}
              size="small"
              startIcon={downloadLoading ? <CircularProgress size={13} color="inherit" /> : <FaDownload />}
              sx={{
                textTransform: "none", fontWeight: 600, borderRadius: "8px", fontSize: 12.5,
                ...(selectedRows.length > 0 && {
                  background: "linear-gradient(135deg, #0d9488, #2563eb)",
                  boxShadow: "none",
                  "&:hover": { boxShadow: "0 4px 12px rgba(13,148,136,.3)" },
                }),
              }}
            >
              Download {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>

            {/* Report */}
            <Button
              onClick={() => setOpenDatePicker(true)}
              disabled={downloading}
              variant="outlined"
              size="small"
              startIcon={downloading ? <CircularProgress size={13} color="inherit" /> : <FaFileDownload />}
              sx={{
                textTransform: "none", fontWeight: 600, borderRadius: "8px", fontSize: 12.5,
                borderColor: "#e2e8f0", color: "#475569",
                "&:hover": { borderColor: "#94a3b8", background: "#f8fafc" },
              }}
            >
              Report
            </Button>

            {/* Delete */}
            <Button
              onClick={() => setDeleteDialogOpen(true)}
              disabled={selectedRows.length === 0}
              variant="outlined"
              size="small"
              color="error"
              startIcon={<FaTrash />}
              sx={{
                textTransform: "none", fontWeight: 600, borderRadius: "8px", fontSize: 12.5,
                ...(selectedRows.length > 0 && {
                  background: "#fef2f2",
                  borderColor: "#fca5a5",
                  "&:hover": { background: "#fee2e2" },
                }),
              }}
            >
              Delete {selectedRows.length > 0 && `(${selectedRows.length})`}
            </Button>

            <div style={{ width: 1, height: 20, background: "#e2e8f0" }} />

            {/* Date range picker — desktop */}
            <div className="hidden md:block" ref={datePickerRef} style={{ position: "relative" }}>
              <TextField
                size="small"
                value={`${moment(searchState.start_date).format("D MMM YY")} ~ ${moment(searchState.end_date).format("D MMM YY")}`}
                onClick={() => setIsOpen(!isOpen)}
                InputProps={{ readOnly: true }}
                sx={{
                  cursor: "pointer", minWidth: 180,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px", fontSize: 12.5, cursor: "pointer",
                    "& fieldset": { borderColor: "#e2e8f0" },
                  },
                  "& input": { cursor: "pointer" },
                }}
              />
              {isOpen && (
                <div style={{ position: "absolute", right: 0, zIndex: 999, marginTop: 6, background: "#fff", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,.14)", border: "1px solid #e2e8f0" }}>
                  <DateRangePicker
                    onChange={(item) => {
                      setState([item.selection]);
                      const start_date = item.selection.startDate;
                      const end_date = item.selection.endDate;
                      setSearchState((prev) => ({ ...prev, start_date, end_date, page_number: 1 }));
                      setCurrentPage(1);
                    }}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={state}
                    direction="horizontal"
                    locale={currentLocale}
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "10px 14px", borderTop: "1px solid #f1f5f9" }}>
                    <Button onClick={() => setIsOpen(false)} size="small" variant="outlined" sx={{ textTransform: "none", borderRadius: "7px" }}>
                      {t("btn_cancel")}
                    </Button>
                    <Button onClick={() => { setIsOpen(false); fetchData(1); }} size="small" variant="contained"
                      sx={{ textTransform: "none", borderRadius: "7px", background: "linear-gradient(135deg, #0d9488, #2563eb)", boxShadow: "none" }}
                    >
                      {t("btn_apply")}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Refresh */}
            <IconButton
              onClick={handleRefresh}
              size="small"
              sx={{
                border: "1.5px solid #e2e8f0", borderRadius: "8px", width: 34, height: 34,
                color: "#64748b",
                "&:hover": { background: "#f8fafc", borderColor: "#cbd5e1" },
              }}
            >
              <FaHistory style={{ fontSize: 14, transition: "transform .4s" }} className={refreshing ? "animate-spin" : ""} />
            </IconButton>
          </div>

          {/* Mobile date picker */}
          {isMobile && (
            <div style={{ gridColumn: "1 / -1" }}>
              <TextField
                fullWidth size="small"
                value={`${moment(searchState.start_date).format("D MMM")} ~ ${moment(searchState.end_date).format("D MMM")}`}
                onClick={() => setIsOpen(!isOpen)}
                InputProps={{ readOnly: true }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13 } }}
              />
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div style={{ overflowX: "auto" }}>
          {error ? (
            <div style={{ textAlign: "center", color: "#ef4444", padding: "32px 20px", fontSize: 13 }}>{error}</div>
          ) : (
            <div style={{ maxHeight: 480, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #0d9488, #2563eb)", position: "sticky", top: 0, zIndex: 2 }}>
                    {columns.map((headCell) => (
                      <th
                        key={headCell.id}
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          fontSize: 11,
                          fontWeight: 700,
                          color: "rgba(255,255,255,.9)",
                          textTransform: "uppercase",
                          letterSpacing: 0.6,
                          whiteSpace: "nowrap",
                          borderBottom: "1px solid rgba(255,255,255,.15)",
                        }}
                      >
                        {headCell.id === "select" ? (
                          <Checkbox
                            indeterminate={selectedRows.length > 0 && selectedRows.length < tableData.length}
                            checked={tableData.length > 0 && selectedRows.length === tableData.length}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedRows(tableData.map((item) => item.UploadIDs));
                              else setSelectedRows([]);
                            }}
                            size="small"
                            sx={{ color: "rgba(255,255,255,.8)", "&.Mui-checked": { color: "#fff" }, "&.MuiCheckbox-indeterminate": { color: "#fff" }, p: 0 }}
                          />
                        ) : headCell.sortable ? (
                          <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={() => handleRequestSort(headCell.id)}
                            sx={{
                              "&.MuiTableSortLabel-root": { color: "rgba(255,255,255,.9)" },
                              "&.MuiTableSortLabel-root:hover": { color: "#fff" },
                              "&.Mui-active": { color: "#fff" },
                              "& .MuiTableSortLabel-icon": { color: "rgba(255,255,255,.7) !important" },
                            }}
                          >
                            {headCell.label}
                          </TableSortLabel>
                        ) : (
                          headCell.label
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stableSort(tableData, getComparator(order, orderBy)).map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        background: selectedRows.includes(item.UploadIDs)
                          ? "#eff6ff"
                          : item.CompleteNotification === 1
                          ? "#f0fdf4"
                          : index % 2 === 0 ? "#fff" : "#fafafa",
                        transition: "background .12s",
                      }}
                      onMouseEnter={(e) => { if (!selectedRows.includes(item.UploadIDs)) e.currentTarget.style.background = "#f8fafc"; }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = selectedRows.includes(item.UploadIDs)
                          ? "#eff6ff" : item.CompleteNotification === 1 ? "#f0fdf4"
                          : index % 2 === 0 ? "#fff" : "#fafafa";
                      }}
                    >
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Checkbox checked={selectedRows.includes(item.UploadIDs)} onChange={() => handleRowSelect(item.UploadIDs)} size="small" sx={{ p: 0 }} />
                          <span style={{ fontFamily: "monospace", fontSize: 12, color: "#64748b", background: "#f1f5f9", padding: "2px 7px", borderRadius: 5 }}>
                            {item.UploadIDs || t("status_not_available")}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <StatusBadge status={item.PostProcessCompletion} />
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <StatusBadge status={item.IECompletion} />
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <StatusBadge status={item.TranscribeCompletion} />
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <StatusBadge status={item.PreProcessCompletion} />
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, whiteSpace: "nowrap", color: "#64748b", fontFamily: "monospace", verticalAlign: "middle" }}>
                        {item.InstanceTimeStamp || t("status_not_available")}
                      </td>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12.5, verticalAlign: "middle" }}>
                        <Chip
                          label={item.DataType || t("status_not_available")}
                          size="small"
                          sx={{
                            fontSize: 11, fontWeight: 600,
                            background: "#f0f9ff", color: "#0369a1",
                            border: "1px solid #bae6fd",
                            height: 22,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <TablePagination
                rowsPerPageOptions={availablePageSizes}
                component="div"
                count={totalItems || 0}
                rowsPerPage={searchState.page_size || 10}
                page={Math.max(0, (searchState.page_number || 1) - 1)}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) => `${from}–${to} ${t("pagination_of")} ${count}`}
                sx={{
                  borderTop: "1px solid #f1f5f9",
                  "& .MuiTablePagination-toolbar": { minHeight: 46, px: 2 },
                  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { fontSize: 12.5, color: "#64748b" },
                  "& .MuiTablePagination-actions button": { border: "1.5px solid #e2e8f0", borderRadius: "7px", margin: "0 2px", "&:hover": { background: "#f8fafc" } },
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>

    {/* ═══════════════════════════════════════════════════
        DIALOGS — logic unchanged
    ═══════════════════════════════════════════════════ */}

    {/* Delete confirm */}
    <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}
      PaperProps={{ sx: { borderRadius: "14px", minWidth: 360 } }}
    >
      <DialogTitle sx={{ fontSize: 15, fontWeight: 700, pb: 1 }}>{t("dialog_delete_title")}</DialogTitle>
      <DialogContent sx={{ fontSize: 13.5, color: "#475569" }}>
        {t("dialog_delete_confirm")} {selectedRows.length}{" "}
        {selectedRows.length !== 1 ? t("dialog_delete_items") : t("dialog_delete_selected")}?{" "}
        {t("dialog_delete_warning")}
      </DialogContent>
      <DialogActions sx={{ p: "12px 20px", gap: 1 }}>
        <Button onClick={handleDeleteCancel} variant="outlined" size="small" sx={{ textTransform: "none", borderRadius: "8px" }}>
          {t("btn_cancel")}
        </Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained" size="small" sx={{ textTransform: "none", borderRadius: "8px" }}>
          {t("btn_delete")}
        </Button>
      </DialogActions>
    </Dialog>

    {/* Report download dialog */}
    <Dialog open={openDatePicker} onClose={() => setOpenDatePicker(false)} maxWidth="md" fullWidth
      PaperProps={{ sx: { borderRadius: "14px" } }}
    >
      <DialogTitle sx={{ fontSize: 15, fontWeight: 700, pb: 1 }}>{t("dialog_report_download_title")}</DialogTitle>
      <DialogContent>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 12 }}>
          {selectedRows.length === 0 ? (
            <div style={{ padding: "10px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8, fontSize: 12.5, color: "#92400e" }}>
              ⚠️ {t("alert_no_upload_ids")} — {t("alert_report_all")}
            </div>
          ) : (
            <div style={{ padding: "10px 14px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, fontSize: 12.5, color: "#1d4ed8" }}>
              ✓ {selectedRows.length} {selectedRows.length !== 1 ? t("alert_upload_ids_selected_plural") : t("alert_upload_ids_selected")} — {t("alert_report_selected")}
            </div>
          )}

          <DateRangePicker
            onChange={(item) => setReportDateRange([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={isMobile ? 1 : 2}
            ranges={reportDateRange}
            direction="horizontal"
            locale={currentLocale}
          />

          <div style={{ padding: "10px 14px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 12.5, color: "#475569" }}>
            <strong>{t("label_selected_range")}</strong>{" "}
            {moment(reportDateRange[0].startDate).format("D MMM YYYY")} ~{" "}
            {moment(reportDateRange[0].endDate).format("D MMM YYYY")}
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ p: "12px 20px", gap: 1 }}>
        <Button onClick={() => setOpenDatePicker(false)} variant="outlined" size="small" sx={{ textTransform: "none", borderRadius: "8px" }}>
          {t("btn_cancel")}
        </Button>
        <Button
          onClick={handleDownloadReport}
          variant="contained"
          size="small"
          disabled={downloading}
          sx={{ textTransform: "none", borderRadius: "8px", background: "linear-gradient(135deg, #0d9488, #2563eb)", boxShadow: "none" }}
        >
          {downloading ? <><CircularProgress size={14} color="inherit" style={{ marginRight: 8 }} />{t("btn_downloading")}</> : t("btn_download_report")}
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}
