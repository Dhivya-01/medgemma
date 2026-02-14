import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Input,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import moment from "moment";
import { appConfig } from "../../config/app.config";
import { axChecker, axMaker } from "../../config/axios.config";
// Add this import at the top of your file

import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import { setSearch } from "../../redux/searchSlice";
import { setTableData } from "../../redux/tableSlice";

// Date Range Picker
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import CustomTable from "../../components/table/CustomTable";
// import { toast } from "react-toastify";
import { toast } from "sonner";
import { FaHistory, FaSearch } from "react-icons/fa";

import LoadingOverlay from "../../components/LoadingOverlay";

import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { enUS, ja } from 'date-fns/locale';
import 'moment/locale/ja';



export const getHeadCells = (t) => [
  { id: "SerialID", label: t('table_serial_id'), align: "left" },
  { id: "InstanceName", label: t('table_instance_name'), align: "left" },
  { id: "InstancePages", label: t('table_pages') },
  { id: "InstanceDate", label: t('table_date') },
  { id: "DataType", label: t('table_type') },
  { id: "ProcessingStatus", label: t('table_processing_status') },
  { id: "ConfidenceFlag", label: t('table_confidence') },
  { id: "Action", label: t('table_action') },
  // { id: "JsonDiffs", label: t('table_error_rate') },
];

// Helper function to get column label
export const getColumnLabel = (columnId, headCells) => {
  const mainColumn = headCells.find((col) => col.id === columnId);
  if (mainColumn) return mainColumn.label;
  
  // If you have additionalColumns, handle them here
  // const additionalColumn = additionalColumns.find((col) => col.id === columnId);
  // return additionalColumn ? additionalColumn.label : columnId;
  
  return columnId;
};

export default function DashboardPage() {
   const { t, i18n } = useTranslation('dashboard'); // Add this
  const dispatch = useDispatch();
   const headCells = getHeadCells(t);
  // Locale mapping for DateRangePicker
  const localeMap = {
    en: enUS,
    ja: ja,
  };
  const currentLocale = localeMap[i18n.language] || enUS;

  // Set moment locale
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);


  const searchState = useSelector((state) => state.search);
  const tableState = useSelector((state) => state.table);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState("");
  const [isPolling, setIsPolling] = useState(false);
  const navigate = useNavigate();
   const [visibleColumns, setVisibleColumns] = useState(
    headCells.map((cell) => cell.id)
  );
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Search by Serial ID
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [serialIdToSearch, setSerialIdToSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentApproveStatus, setCurrentApproveStatus] = useState("false");
  // Define the onClose function
  const handleClose = () => {
    setSearchDialogOpen(false);
  };
  const initialState = {
    allData: [], // Store all fetched data
    currentPageData: [], // Store current page data (20 items)
    page_number: 1,
    page_size: 20,
    totalItemCount: 0,
  };
  const getValidSelectedIds = () => selected.filter((id) => id !== undefined);

  useEffect(() => {
    fetchData();
  }, [searchState, userEmail]);

  const preventToastError = () => {
    // Dismiss all toasts immediately
    toast.dismiss();
  };
  useEffect(() => {
    if (!isInitialLoad && tableState.data.length === 0) {
      fetchData();
    }
  }, [isInitialLoad]);

  useEffect(() => {
    // Add event listeners to all navigation links in the navbar
    const navLinks = document.querySelectorAll("nav a, nav button");
    navLinks.forEach((link) => {
      link.addEventListener("click", preventToastError);
    });

    return () => {
      // Clean up event listeners
      navLinks.forEach((link) => {
        link.removeEventListener("click", preventToastError);
      });
    };
  }, []);

  const fetchData = async () => {
    dispatch(setOnLoading());
    try {
      // Get profile and project from localStorage
      const profile = JSON.parse(localStorage.getItem("profile"));
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      // Validation checks
      if (!profile || !profile.user_email) {
        navigate("/");
        return;
      }

      if (!storedProject || !storedProject.id) {
        toast.error("No project selected");
        return;
      }

      // Initial request body with user_id as string
      const requestBody = {
        start_date: searchState?.start_date || "",
        end_date: searchState?.end_date || "",
        data_type: searchState?.data_type || "",
        confidence_flag: searchState?.confidence_flag || "All",
        page_number: Math.max(1, searchState?.page_number || 1),
        page_size: searchState?.page_size || 20,
        approve_status: searchState?.approve_status || "All",
        project_id: storedProject.id,
        user_id: String(selecteduser),
        // instance_id: "string",
        // process_status: searchState?.process_status || "All",
        bucket_type: searchState?.bucket_type ,
      };
    


 

      // Get token from localStorage
      const token = sessionStorage.getItem("secondAuthToken");

      // Set up axios config with headers
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Make the API call using axios
      const response = await axChecker.post(
        "/checker/fetch_database",
        requestBody,
        config
      );


      // With axios, response data is automatically parsed to JSON
      const responseData = response.data;

      // Check if the response has the expected structure
      if (responseData?.status === true && responseData?.details?.data) {
        const dataValues = responseData.details.data;

        // Update state with the fetched data
        dispatch(
          setTableData({
            data: dataValues,
            totalItemCount: responseData.details.TotalItemCount,
            firstDataId:
              dataValues.length > 0 ? dataValues[0].InstanceID : null,
            lastDataId:
              dataValues.length > 0
                ? dataValues[dataValues.length - 1].InstanceID
                : null,
          })
        );

        if (responseData.string === "Instance Fetched Successfully!") {
       
          
          // Optional: Show success message
        }
      } else {
        toast.error("Invalid data format received");
      }
    } catch (err) {
      // With axios, errors are handled in catch block directly
      toast.error(err.response.data.string, );
    } finally {
      dispatch(setOffLoading());
    }
  };
  const handleSearchBySerialId = async () => {
    // Check if the input is valid
    if (!serialIdToSearch) {
      toast.error(t('toast_enter_serial_ids'));
      return;
    }

    dispatch(setOnLoading());
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");
      const token = sessionStorage.getItem("secondAuthToken");

      if (!profile || !profile.user_email || !token) {
        navigate("/");
        return;
      }
      if (!storedProject || !storedProject.id) {
        toast.error(t('toast_no_project'));
        return;
      }

      // Parse the input to get an array of serial IDs
      const serialIds = serialIdToSearch
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));

      if (serialIds.length === 0) {
        toast.error(t('toast_enter_serial_ids'));
        return;
      }

      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Updated to match the working fetch example
      const requestBody = {
        page_number: 1,
        page_size: 20,
        project_id: storedProject.id,
        user_id: String(selecteduser),
        serial_ids: serialIds, // Changed from serial_id to serial_ids to match the working example
      };

      const response = await axChecker.post(
        `/checker/search_by_serial_id`,
        requestBody,
        config
      );

      // Handle response
      if (response.data?.status === true && response.data?.details?.data) {
        const dataValues = response.data.details.data;

        // Update the table with search results
        dispatch(
          setTableData({
            data: dataValues,
            totalItemCount: dataValues.length,
            firstDataId:
              dataValues.length > 0 ? dataValues[0].InstanceID : null,
            lastDataId:
              dataValues.length > 0
                ? dataValues[dataValues.length - 1].InstanceID
                : null,
          })
        );

       
        toast.success(response.data.string, );
        setSearchDialogOpen(false);
      } else {
        toast.error(response.data?.string || "No results found");
      }
    } catch (err) {
      
      toast.error("Failed to search by Serial ID", );
    } finally {
      dispatch(setOffLoading());
    }
  };

  const [dataTypes, setDataTypes] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
      key: "selection",
    },
  ]);

  // Add bucket types state
  const [bucketTypes] = useState([
  { value: "All", label: t('bucket_all') },
  { value: "Sys-Green", label: t('bucket_sys_green') },
  { value: "Sys-Reject", label: t('bucket_sys_reject') },
  { value: "Sys-Red", label: t('bucket_sys_red') },
  { value: "Manual-Approved", label: t('bucket_manual_approved') },
  { value: "Manual-Reject", label: t('bucket_manual_reject') },
  { value: "Error", label: t('bucket_error') },
  ]);

  const datePickerRef = useRef(null);

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

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile || !profile.user_email) {
      navigate("/");
    } else {
      setUserEmail(profile.user_email);
      setIsPolling(true);
      setUserName(profile.user_name || "User");
    }
  }, [navigate]);

  const fetchDataTypes = async () => {
    dispatch(setOnLoading());
    try {
      const profile = JSON.parse(localStorage.getItem("profile"));
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      if (!profile || !profile.user_email) {
        navigate("/");
        return;
      }

      if (!storedProject || !storedProject.id) {
        toast.error(t('toast_no_project'));
        return;
      }

      const token = sessionStorage.getItem("secondAuthToken");

      if (!token) {
        toast.error(t('toast_invalid_data'));
        return;
      }

      // Configure axios headers
      axChecker.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axChecker.defaults.headers.post["Content-Type"] = "application/json";
      axChecker.defaults.headers.post["Accept"] = "application/json";

      // Request body
      const requestBody = {
        project_id: storedProject.id,
        user_id: String(selecteduser),
      };

      // Make the axios request
      const response = await axChecker.post(
        "/checker/get_data_types",
        requestBody
      );

      // Process the response
     if (response?.data?.status === true) {
  const serverData =
    response?.data?.details?.dataTypes || response?.data?.details?.dataType;

  if (Array.isArray(serverData)) {
    setDataTypes(["All", ...serverData]);
  } else {
    console.error("❌ Invalid data array format. Full response:", response.data);
    toast.error("Invalid data format received (array missing).");
  }
} else {
  console.error("❌ Unexpected response. Full response:", response.data);
  toast.error("Invalid data format received.");
}
    } catch (err) {
      // Display more specific error message if available
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch data types";
      toast.error(errorMessage);
    } finally {
      dispatch(setOffLoading());
    }
  };

  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const handleApprove = async (approve_condition, id) => {
    dispatch(setOnLoading());

    try {
      const token = sessionStorage.getItem("secondAuthToken");
      const documentIds = selected.length > 0 ? getValidSelectedIds() : [id];
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");
      // Create headers
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Create request body matching the correct API function
      const requestBody = {
        instance_ids: documentIds,
        approver_id: String(selecteduser),
        approver_name: userEmail,
        approve_cmd: "string",
        approve_condition: approve_condition,
        project_id: storedProject.id,
        user_id: String(selecteduser),
      };

      // Use the correct endpoint
      const response = await axChecker.post(
        `checker/approve_instances/?`,
        requestBody,
        config
      );

      const responseData = response.data;

      if (responseData.status) {
        toast.success(responseData.string,);
      } else {
        toast.error(responseData.string,);
      }
    } catch (err) {
      toast.error(t('toast_something_wrong')); 
    } finally {
      setSelected([]);
      dispatch(setOffLoading());
      fetchData();
    }
  };

  const handleInstance = async (id) => {
    const documentIds = selected.length > 0 ? getValidSelectedIds() : [id];
    // Show confirmation dialog
   if (!window.confirm(t('toast_delete_confirm'))) { 
  return;
}
    setIsLoading(true);
    setError("");

    try {
      // Get token from localStorage
      const token = sessionStorage.getItem("secondAuthToken");
      const profile = JSON.parse(localStorage.getItem("profile"));
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const requestBody = {
        instance_ids: documentIds,
        project_id: storedProject.id,
        user_id: String(selecteduser),
      };

      const response = await axChecker.post(
        `/checker/delete_instances`,
        requestBody,
        config
      );

      const responseData = response.data;

      if (responseData.status) {
        toast.success(responseData.string);
      } else {
        toast.error(responseData.string);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError(
            `Server error: ${
              error.response.data?.message || error.response.statusText
            }`
          );
        }
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError(error.message || "Failed to delete instance");
      }
    } finally {
      setIsLoading(false);
      fetchData();
    }
  };

  const handleExport = async () => {
    if (selected.length > 1) {
      toast.error(t('toast_select_one_export'));
      return;
    }
    if (selected.length === 0) {
      toast.error(t('toast_select_export'));
      return;
    }

    setIsExporting(true);
    dispatch(setOnLoading());

    try {
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const profile = JSON.parse(localStorage.getItem("profile"));
      const token = sessionStorage.getItem("secondAuthToken");
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      if (!token || !storedProject?.id) {
        throw new Error(
          "Missing required authentication or project information"
        );
      }

      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Transfer-Encoding", "application/json");
      myHeaders.append("Content-Type", "application/json");

      const requestBody = {
        instance_ids: selected.length === 1 ? [selected[0]] : [],
        project_id: storedProject.id,
        user_id: String(selecteduser),
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: "follow",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_LINK}/checker/excel`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Export completed successfully");
    } catch (error) {
      toast.error(error.message || "Failed to export data");
    } finally {
      setIsExporting(false);
      dispatch(setOffLoading());
    }
  };

  useEffect(() => {
    fetchDataTypes();
  }, []);

  const allFilesBool =
    searchState.confidence_flag === "All" &&
    searchState.approve_status === "All";

  const nonApprovedBool =
    // searchState.confidence_flag === "All" &&
    searchState.approve_status === "false";
  // searchState.process_status === "true";

  const approvedBool = searchState.approve_status === "true";
  const disapprovedBool =
    // searchState.approve_status === "false" &&
    // searchState.approve_status === "true" &&
    searchState.process_status === "false" &&
    searchState.bucket_type === "Sys-Reject";
  const greenBool = searchState.confidence_flag === "GREEN";
  const redBool = searchState.confidence_flag === "RED";

  // Add this useEffect to watch for bucket type changes
  useEffect(() => {
    if (searchState?.bucket_type) {
      fetchData();
    }
  }, [searchState?.bucket_type]);

  return (
    <div className="p-4 overflow-auto">
      <div className=" p-2 space-y-2">
        
        {/* Filter 1 */}
        <LoadingOverlay />
        <div className="flex justify-between items-center gap-2 pr-6">
          
          {/* Search Icon for Serial ID search */}
          <div className="flex items-start gap-5">
            {selected.length !== 0 ? (
              <div className="flex items-center gap-5">
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => handleInstance(true)}
                  className="!min-w-[8rem]"
                >
                  {t('btn_delete_instance')}
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  // className="btn btn-primary"
                  type="button"
                  onClick={() => handleApprove(true)}
                  // className="!min-w-[8rem]"
                >
                  {t('btn_approve')}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={() => handleApprove(false)}
                  className="!min-w-[8rem]"
                >
                  {t('btn_reject')}
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* <h1 className="flex justify-between items-center">Dashboard page</h1> */}
          <div className="flex items-center items-center gap-2">
            <IconButton
              onClick={() => setSearchDialogOpen(true)}
              // style={{ color: "#1976d2" }}
              className="icon-action"
            >
              <FaSearch size={20} />
            </IconButton>
            <FaHistory
              size={20}
              style={{
                margin: "10px",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
              onClick={fetchData}
            />

            <Button
              onClick={() => {
                setCurrentApproveStatus("false");
                dispatch(
                  setSearch({
                    confidence_flag: "All",
                    approve_status: "false",
                    page_number: 1,
                    process_status: "true",
                    bucket_type: "All",
                  })
                );
              }}
              variant={nonApprovedBool ? "contained" : "outlined"}
              style={{
                backgroundColor: nonApprovedBool ? "#FFC107" : "",
                color: nonApprovedBool ? "black" : "#FFC107",
                borderColor: "#FFC107",
              }}
              type="button"
            >
              {t('btn_not_approved')}
            </Button>

            <Button
              onClick={() => {
                setCurrentApproveStatus("true");
                dispatch(
                  setSearch({
                    approve_status: "true",
                    confidence_flag: "All",
                    page_number: 1,
                    process_status: "true",
                    bucket_type: "All",
                  })
                );
              }}
              variant={approvedBool ? "contained" : "outlined"}
              color="success"
              // className="btn btn-primary"
              type="button"
            >
              {t('btn_approved')}
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  setSearch({
                    confidence_flag: "All",
                    approve_status: "All",
                    page_number: 1,
                    process_status: "All",
                    bucket_type: "All",
                  })
                );
              }}
              variant={allFilesBool ? "contained" : "outlined"}
              type="button"
            >
              {t('btn_all_files')}
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 mt-2">
          <div className="flex  items-center gap-2 mt-4">
            <div className="flex justify-between items-center gap-10 mr-2 ml-2 ">
         
              {/* Date Picker - Updated version */}
<div ref={datePickerRef} className="relative">
  <div className="flex items-center gap-2">
     <label>{t('label_date')}</label>
    <TextField
      type="text"
      value={`${moment(searchState.start_date).format(
        "D MMM YYYY"
      )} ~ ${moment(searchState.end_date).format("D MMM YYYY")}`}
      onClick={() => setIsOpen(!isOpen)}
      placeholder={t('placeholder_select_date')}
      // size="small"
       className="bg-card rounded-lg"
      style={{ cursor: "pointer" }}
      autoComplete="off"
      InputProps={{ readOnly: true }}
    />
  </div>
  {isOpen && (
    <div className="absolute z-[999] mt-2 shadow-lg bg-white rounded-lg">
      <DateRangePicker
        onChange={(item) => {
          setState([item.selection]);
          // Don't auto-close or dispatch - let user complete selection
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        className="bg-white"
        locale={currentLocale}
      />
      <div className="flex justify-end gap-2 p-3 border-t bg-white">
        <Button 
          onClick={() => setIsOpen(false)} 
          size="small"
          variant="outlined"
        >
          {t('btn_cancel')}
        </Button>
        <Button 
          onClick={() => {
            const start_date = moment(state[0].startDate).format("YYYY-MM-DD");
            const end_date = moment(state[0].endDate).format("YYYY-MM-DD");
            dispatch(
              setSearch({ 
                start_date, 
                end_date, 
                page_number: 1 // Reset to page 1
              })
            );
            setIsOpen(false);
          }} 
          size="small"
          variant="contained"
          color="primary"
        >
          {t('btn_apply')}
        </Button>
      </div>
    </div>
  )}
</div>
            </div>
            <div className="flex items-center mr-2">
              <label className="m-2">{t('label_type')}</label>
              <Autocomplete
                value={searchState.data_type}
                size="small"
                onChange={(event, newValue) => {
                  dispatch(setSearch({ data_type: newValue, page_number: 0 }));
                }}
                options={dataTypes}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    className="!min-w-[12rem]"
                  />
                )}
                disableClearable
              />
            </div>

            <div className="mr-2 ml-2">
              {t('label_all_files')}  {tableState.totalItemCount}
            </div>
            <div className="flex items-center">
              <label className="m-2">{t('label_bucket_type')}</label>
              <Select
                value={searchState?.bucket_type }
                size="small"
                onChange={(e) => {
                  const newBucketType = e.target.value;

                  // Create a new search state object with the updated bucket type
                  const newSearchState = {
                    ...searchState,
                    bucket_type: newBucketType,
                    page_number: 1,
                  };

                  // Dispatch the update
                  dispatch(setSearch(newSearchState));
                }}
                className="!min-w-[8rem]"
              >
                {bucketTypes.map((item, i) => (
                  <MenuItem key={i} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                dispatch(
                  setSearch({
                    confidence_flag: "GREEN",
                    approve_status: currentApproveStatus, // Use current approve status
                    page_number: 1,
                    process_status: "true",
                    bucket_type: "All",
                  })
                );
              }}
              variant={greenBool ? "contained" : "outlined"}
              color="success"
              // className="btn btn-primary"
              type="button"
            >
              {t('btn_green')}
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  setSearch({
                    confidence_flag: "RED",
                    approve_status: currentApproveStatus, // Use current approve status
                    page_number: 1,
                    process_status: "true",
                    bucket_type: "All",
                  })
                );
              }}
              variant={redBool ? "contained" : "outlined"}
              color="error"
              type="button"
            >
              {t('btn_red')}
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  setSearch({
                    approve_status: currentApproveStatus, // Use current approve status
                    confidence_flag: "All",
                    page_number: 1,
                    process_status: "false",
                    bucket_type: "Sys-Reject",
                  })
                );
              }}
              variant={disapprovedBool ? "contained" : "outlined"}
              color="error"
              type="button"
            >
              {t('btn_reject_status')}
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={searchDialogOpen} onClose={handleClose}>
        <div
          className="bg-white rounded-lg shadow-lg w-96 mx-auto p-4"
          style={{ width: "600px" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-black text-lg font-semibold">
              {t('dialog_search_title')}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-4">
            <TextField
              id="serialId"
              multiline
              rows={10}
              value={serialIdToSearch}
              onChange={(e) => setSerialIdToSearch(e.target.value)}
              placeholder={t('placeholder_serial_id')}
              fullWidth
              className="text-base overflow-auto"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('dialog_serial_id_help')}
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              onClick={handleClose}
              className="px-4 py-1 text-sm"
            >
              {t('btn_cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchBySerialId}
              className="px-4 py-1 text-sm bg-blue-600"
            >
              {t('btn_search')}
            </Button>
          </div>
        </div>
      </Dialog>

      <br />

      {/* Filter 2 */}

      <CustomTable
        selected={selected}
        setSelected={setSelected}
        handleApprove={handleApprove}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        headCells={headCells}
      />
    </div>
  );
}
