


import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { axChecker, axMaker } from "../../config/axios.config";
import { appConfig } from "../../config/app.config";
import { setSearch } from "../../redux/searchSlice";
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { setOffLoading, setOnLoading } from "../../redux/loadingSlice";
import ImageComponent from "./ImageComponent";
import {
  MdFirstPage,
  MdLastPage,
  MdExpandLess,
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { setTableData } from "../../redux/tableSlice";

export default function DocumentDetails() {
 
 
  
    const [mortgagedetail, setMortgageDetail] = useState({});

  const [pdfUrl, setPdfUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [textContent, setTextContent] = useState("");
 
    const { t } = useTranslation('document');
      const [userEmail, setUserEmail] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const [userName, setUserName] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
       const searchState = useSelector((state) => state.search);
  const tableState = useSelector((state) => state.table);
      const dispatch = useDispatch();
  const navigate = useNavigate();
   const [showRejectField, setShowRejectField] = useState(false);
     const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [approve_cmd, setApprove_cmd] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
const [viewerImages, setViewerImages] = useState([]);
const [inputModality, setInputModality] = useState("");
  const [outputModality, setOutputModality] = useState("");
  
const [findings, setFindings] = useState({});

  const [outputImages, setOutputImages] = useState([]);
  const [outputAudios, setOutputAudios] = useState([]);
 const [jsonInput, setJsonInput] = useState("{}");
const [isValidJson, setIsValidJson] = useState(true);
const [imageJson, setImageJson] = useState(null);
const [editableData, setEditableData] = useState({});
useEffect(() => {
  setEditableData(findings);
}, [findings]);

   useEffect(() => {
    // Retrieve both profile and sel
    // ectedProject from localStorage
 
    const profile = JSON.parse(localStorage.getItem("profile"));
    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
     
    const storedModalities = JSON.parse(
      localStorage.getItem("selectedModalities")
    );

    // Log for debugging

    if (!profile || !profile.user_email || !storedProject) {
      navigate("/");
    } else {
      setUserEmail(profile.user_email);
      setIsPolling(true);
      setUserName(profile.user_name || "User");
      setSelectedProject(storedProject);
      setSelectedProjectId(storedProject.id);

      if (storedModalities?.IPModality) {
        setInputModality(storedModalities.IPModality);
      }
      if (storedModalities?.OPModality) {
        setOutputModality(storedModalities.OPModality);
      }
    }
  }, []);

  useEffect(() => {
    if (tableState.currentId === null) navigate("/dashboard");
  }, [tableState.currentId, navigate]);

  useEffect(() => {
  if (tableState.currentId) {
    fetchDocumentData(tableState.currentId);
  }
}, [tableState.currentId]);

 


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
        confidence_flag: searchState?.confidence_flag || "",
        page_number: searchState.page_number + 1,
        page_size: searchState?.page_size,
        approve_status: searchState?.approve_status || "l",
        project_id: storedProject.id,
        user_id: String(selecteduser),
        bucket_type: searchState?.bucket_type || "All",
        // instance_id: "string",
      };

      // Headers setup
      const token = sessionStorage.getItem("secondAuthToken");
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Make the API call
      // Make the API call
      const response = await axChecker.post(
        `/checker/fetch_database/`,
        requestBody,
        config
      );

      // Axios doesn't use response.ok, it throws errors automatically for non-2xx responses
      // Access data directly from response.data
      const responseData = response.data;

      // Check if the response has the expected structure
      if (responseData?.status === true && responseData?.details?.data) {
        const dataValues = responseData.details.data;

        // Find the current document in the new data array
        const currentDocIndex = dataValues.findIndex(
          (item) => item.SerialID === tableState.currentId
        );

        // Store the current status from the fresh data
        const newCurrentStatus =
          currentDocIndex !== -1
            ? dataValues[currentDocIndex].ConfidenceFlag
            : null;

        // Update the table state with everything, including the current status
        dispatch(
          setTableData({
            data: dataValues,
            totalItemCount:
              responseData.details.TotalItemCount || dataValues.length,
            firstDataId:
              dataValues.length > 0 ? dataValues[0].InstanceID : null,
            lastDataId:
              dataValues.length > 0
                ? dataValues[dataValues.length - 1].InstanceID
                : null,
            index: currentDocIndex !== -1 ? currentDocIndex : tableState.index,
            currentId: tableState.currentId, // Preserve the current ID
            currentStatus: newCurrentStatus, // Update with fresh status
          })
        );
      }
    } catch (err) {
      // [Error handling stays the same]
    } finally {
      dispatch(setOffLoading());
    }
  };

  const handleSave = async () => {
    dispatch(setOnLoading());
    try {
      const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
      const profile = JSON.parse(localStorage.getItem("profile"));
      const token = sessionStorage.getItem("secondAuthToken");
      const selecteduser = localStorage.getItem("selectedProjectUserID");

      if (!profile) {
        toast.error(t('toast_user_profile_not_found'));
        return;
      }

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

    const requestBody = {
  instance_id: tableState.currentId,
  checker_id: String(profile.user_id),
  checker_name: profile.user_email,
  data: editableData,   // ← THIS is the change
  project_id: storedProject.id,
  user_id: String(selecteduser),
};




      const response = await axChecker.post("/checker/update_json", requestBody, {
        headers: headers,
      });

      if (response.data.status === true) {
        toast.success(response.data.string);
        await fetchDocumentData(tableState.currentId);
        await fetchData();

        const currentDocIndex = tableState.data.findIndex(
          (item) => item.InstanceID === tableState.currentId
        );
        if (currentDocIndex !== -1) {
          dispatch(
            setTableData({
              ...tableState,
              currentStatus: tableState.data[currentDocIndex].ConfidenceFlag,
            })
          );
        }
      } else {
        toast.error(response.data.string);
      }
    } catch (error) {

      toast.error(error.response?.data?.string);
    } finally {
      dispatch(setOffLoading());
    }
  };

const handleSaveAndNext = async () => {
  await handleSave();
  handleNext();
};

 const fetchDocumentData = async (instanceId) => {
  if (!instanceId) return;

  dispatch(setOnLoading());

  try {
    const token = sessionStorage.getItem("secondAuthToken");
    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
    const selecteduser = localStorage.getItem("selectedProjectUserID");
    const storedModalities = JSON.parse(localStorage.getItem("selectedModalities"));

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody = {
      project_id: storedProject.id,
      user_id: Number(selecteduser),
      instance_id: instanceId,
    };

    console.log("Request Body:", requestBody);

    let fileRequestConfig = { headers };

    if (
      storedModalities.IPModality === "PDF" ||
      storedModalities.IPModality === "Audio"
    ) {
      fileRequestConfig.responseType = "arraybuffer";
    }

    // ✅ Parallel API calls
    const [fileResponse, jsonResponse] = await Promise.all([
      axChecker.post("/checker/fetch_instance", requestBody, fileRequestConfig),
      axChecker.post("/checker/fetch_json_file", requestBody, { headers }),
    ]);

    console.log("JSON API FULL RESPONSE:", jsonResponse);

    // ================= FILE RESPONSE =================
    if (fileResponse.status >= 200 && fileResponse.status < 300) {
      setPdfUrl("");
      setImageUrl("");
      setAudioUrl("");
      setTextContent("");

      switch (storedModalities.IPModality) {
        case "Image": { const data = fileResponse.data; console.log("IMAGE API RESPONSE:", data); if (data?.status && data?.details?.image_paths) 
          { setImageJson(data); 
             } else { console.error("Invalid image response structure"); } break; }

        case "PDF": {
          const pdfBlob = new Blob([fileResponse.data], { type: "application/pdf" });
          setPdfUrl(URL.createObjectURL(pdfBlob));
          break;
        }

        case "Audio": {
          const contentType = fileResponse.headers["content-type"] || "audio/mpeg";
          const audioBlob = new Blob([fileResponse.data], { type: contentType });
          setAudioUrl(URL.createObjectURL(audioBlob));
          break;
        }

        case "Text": {
          const decoder = new TextDecoder("utf-8");
          setTextContent(decoder.decode(fileResponse.data));
          break;
        }
        

        default:
          console.warn("Unsupported modality:", storedModalities.IPModality);
      }
    }

    // ================= JSON RESPONSE =================
    /**
     * 🔥 THIS IS WHERE YOUR BUG WAS
     * You were checking details.data (which doesn't exist)
     */

    if (jsonResponse.data?.status && jsonResponse.data?.details) {
      const findingsData = jsonResponse.data.details;

      console.log("✅ Extracted Findings:", findingsData);

      setFindings(findingsData); // <-- this drives UI
      setMortgageDetail(findingsData);
      setJsonInput(JSON.stringify(findingsData, null, 2));
    } else {
      console.warn("❌ No findings received:", jsonResponse.data);
      setFindings({});
    }
  } catch (error) {
    console.error("API ERROR:", error);

    const errorMessage =
      error.response?.data?.string ||
      error.message ||
      "Failed to load document data";

    toast.error(errorMessage);

    setFindings({});
    setPdfUrl("");
    setImageUrl("");
    setAudioUrl("");
    setTextContent("");
  } finally {
    dispatch(setOffLoading());
  }
};


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

 const handleRejectClick = () => {
  setShowRejectField((prev) => !prev);
};

  const handleReject = async () => {
  if (!approve_cmd?.trim()) {
    toast.error("Please enter reject reason");
    return;
  }

  dispatch(setOnLoading());

  try {
    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
    const profile = JSON.parse(localStorage.getItem("profile"));
    const token = sessionStorage.getItem("secondAuthToken");
    const selecteduser = localStorage.getItem("selectedProjectUserID");

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const requestBody = {
      instance_ids: [tableState.currentId],
      approver_id: String(profile.user_id),
      approver_name: profile.user_email,
      approve_cmd: approve_cmd,
      approve_condition: false, // rejected
      project_id: storedProject.id,
      user_id: String(selecteduser),
    };

    const response = await axChecker.post(
      "checker/approve_instances/",
      requestBody,
      { headers }
    );

    if (response.data.status === true) {
      toast.success(response.data.string);

      // 🔥 reset UI
      setApprove_cmd("");
      setShowRejectField(false);

      // refresh data
      await fetchData();

      // ✅ AUTO MOVE TO NEXT DOCUMENT
      handleNext();
    } else {
      toast.error(response.data.string);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.string ||
      "An error occurred. Please try again later."
    );
  } finally {
    dispatch(setOffLoading());
  }
};

  const handleChange = (key, newValue) => {
    setMortgageDetail((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const startResize = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
  };

  const resize = (e) => {
    if (resizeRef.current) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      setPdfWidth(newWidth);
    }
  };

  const stopResize = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
  };

  
 const handleNext = async () => {
  try {
    dispatch(setOnLoading());

    const currentIndex = tableState.index;
    const nextIndex = currentIndex + 1;

    // ✅ Move inside current page
    if (nextIndex < tableState.data.length) {
      const nextItem = tableState.data[nextIndex];

      dispatch(setTableData({
        ...tableState,
        index: nextIndex,
        currentId: nextItem.InstanceID,
        currentStatus: nextItem.ConfidenceFlag,
      }));

      return; // useEffect will call fetchDocumentData automatically
    }

    // ✅ Need next page
    const nextPage = searchState.page_number + 1;
    const totalPages = Math.ceil(
      tableState.totalItemCount / searchState.page_size
    );

    if (nextPage > totalPages) return;

    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
    const selecteduser = localStorage.getItem("selectedProjectUserID");
    const token = sessionStorage.getItem("secondAuthToken");

    const requestBody = {
      ...searchState,
      page_number: nextPage,
      project_id: storedProject.id,
      user_id: String(selecteduser),
      instance_id: "string",
    };

    const response = await axChecker.post("/checker/fetch_database/", requestBody, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const newData = response.data?.details?.data || [];

    if (!newData.length) return;

    dispatch(setSearch({ ...searchState, page_number: nextPage }));

    dispatch(setTableData({
      data: newData,
      totalItemCount: response.data.details.TotalItemCount,
      firstDataId: newData[0].InstanceID,
      lastDataId: newData[newData.length - 1].InstanceID,
      index: 0,
      currentId: newData[0].InstanceID,
      currentStatus: newData[0].ConfidenceFlag,
    }));

  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setOffLoading());
  }
};


  // Optimized handlePrevious function
 const handlePrevious = async () => {
  try {
    dispatch(setOnLoading());

    const currentIndex = tableState.index;
    const prevIndex = currentIndex - 1;

    // ✅ Move inside current page
    if (prevIndex >= 0) {
      const prevItem = tableState.data[prevIndex];

      dispatch(setTableData({
        ...tableState,
        index: prevIndex,
        currentId: prevItem.InstanceID,
        currentStatus: prevItem.ConfidenceFlag,
      }));

      return;
    }

    // ✅ Need previous page
    const prevPage = searchState.page_number - 1;
    if (prevPage < 1) return;

    const storedProject = JSON.parse(localStorage.getItem("selectedProject"));
    const selecteduser = localStorage.getItem("selectedProjectUserID");
    const token = sessionStorage.getItem("secondAuthToken");

    const requestBody = {
      ...searchState,
      page_number: prevPage,
      project_id: storedProject.id,
      user_id: String(selecteduser),
      instance_id: "string",
    };

    const response = await axChecker.post("/checker/fetch_database/", requestBody, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const newData = response.data?.details?.data || [];
    if (!newData.length) return;

    dispatch(setSearch({ ...searchState, page_number: prevPage }));

    const lastIndex = newData.length - 1;

    dispatch(setTableData({
      data: newData,
      totalItemCount: response.data.details.TotalItemCount,
      firstDataId: newData[0].InstanceID,
      lastDataId: newData[lastIndex].InstanceID,
      index: lastIndex,
      currentId: newData[lastIndex].InstanceID,
      currentStatus: newData[lastIndex].ConfidenceFlag,
    }));

  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setOffLoading());
  }
};





  /* ---------------- ZOOM FUNCTIONS ---------------- */
  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));
  const resetZoom = () => setZoom(1);

  const handleWheel = (e) => {
    e.preventDefault();
    e.deltaY < 0 ? zoomIn() : zoomOut();
  };

  let lastTap = 0;
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap < 300) zoom === 1 ? setZoom(2) : resetZoom();
    lastTap = now;
  };


//   return (
//     <div className="h-screen flex flex-col gap-4 p-4 md:p-6 overflow-y-auto">
//       {/* HEADER */}
//     {/* ===== TOP TOOLBAR ===== */}
// <div >

//   {/* LEFT — Dashboard */}
//   <button
//     onClick={() => navigate("/dashboard")}
//     className="flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline whitespace-nowrap"
//   >
//     ← Dashboard
//   </button>

//   {/* CENTER — Document Title */}
//   <h1 className="text-sm md:text-lg font-semibold text-center truncate flex-1">
//     Document Analysis -  {tableState?.data[tableState.index]?.SerialID ||
//               tableState?.currentId}
//   </h1>

//   {/* RIGHT — Navigation */}
//   <div className="flex items-center gap-1 md:gap-2">

//     <IconButton
//       size="small"
//       color="primary"
//       disabled={searchState.page_number === 1 && tableState.index === 0}
//       onClick={handlePrevious}
//       className="!p-2"
//     >
//       <MdNavigateBefore className="text-xl md:text-2xl" />
//     </IconButton>

//     <span className="text-xs md:text-sm px-2 text-muted-foreground">
//       {tableState.index + 1} / {tableState.totalItemCount}
//     </span>

//     <IconButton
//       size="small"
//       color="primary"
//       disabled={
//         searchState.page_number ===
//           Math.ceil(tableState.totalItemCount / searchState.page_size) &&
//         tableState.index === tableState.data.length - 1
//       }
//       onClick={handleNext}
//       className="!p-2"
//     >
//       <MdNavigateNext className="text-xl md:text-2xl" />
//     </IconButton>

//   </div>
// </div>


//       {/* MAIN LAYOUT */}
//      <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">

//   {/* IMAGE SECTION (Handled Fully by ImageComponent) */}
//   <div className="flex-1">
//     {imageJson && (
//      <ImageComponent
//   jsonInput={jsonInput}
//   setJsonInput={setJsonInput}
//   setIsValidJson={setIsValidJson}
//   jsonPath="data.image"
//   imageJson={imageJson}
// />

//     )}
//   </div>

//   {/* FINDINGS PANEL */}
// <div className="w-[420px] max-w-full overflow-y-auto p-5 space-y-4 bg-muted/30">
//     <h2 className="text-lg font-semibold">Editable Findings</h2>

//     {Object.entries(findings).map(([key, value]) => (
//       <div key={key} className="space-y-1">
//         <label className="text-sm text-muted-foreground capitalize">
//           {key.replace(/_/g, " ")}
//         </label>

//         <textarea
//           className="w-full p-3 rounded-lg border bg-background"
//           rows={3}
//           value={editableData[key] ?? value}
//           onChange={(e) =>
//             setEditableData((prev) => ({
//               ...prev,
//               [key]: e.target.value,
//             }))
//           }
//         />
//       </div>
//     ))}

// {/* Reject Reason */}
// <div className="flex flex-col gap-3 pt-4 border-t">

//   {!showRejectField ? (
//     <div className="flex gap-2 ">
//       <Button
//         onClick={handleRejectClick}
//          color="error"
//           variant="contained"
//           sx={{ minWidth: "4rem" }}
//       >
//         Reject
//       </Button>

//       <Button
//         onClick={handleSave}
//         color="success"
//           variant="contained"
//           sx={ {minWidth: "4rem" }}
//       >
//         Approve
//       </Button>

//       <Button
//         onClick={handleSaveAndNext}
//         disabled={!isValidJson}
//         color="info"
//           variant="contained"
//           sx={{ minWidth: "4rem" }}
//       >
//         Approve & Next
//       </Button>
//     </div>
//   ) : (
//     <div className="space-y-2 p-4">
//       <TextField
//         fullWidth
//         size="small"
//         label="Reject Reason"
//         value={approve_cmd}
//         onChange={(e) => setApprove_cmd(e.target.value)}
//         autoFocus
//       />

//       <div className="flex gap-2 pt-2">
//         <Button
//           onClick={() => setShowRejectField(false)}
//         color="inherit"
//           variant="contained"
//           sx={{ minWidth: "4rem" }}
//         >
//           Cancel
//         </Button>

//         <Button
//           onClick={handleReject}
//           color="error"
//           variant="contained"
//           sx={{ minWidth: "4rem" }}
//         >
//           Confirm Reject
//         </Button>
//       </div>
//     </div>
//   )}
// </div>

//   </div>


// </div>


 
//     </div>
//   );
// documents/index.jsx — Document Analysis Page
// Improved: structured toolbar, balanced two-column layout, responsive, medium-screen support

// documents/index.jsx — Document Analysis Page
// Improved: structured toolbar, balanced two-column layout, responsive, medium-screen support

return (
  <div
    style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#f0f4f8",
      overflow: "hidden",
    }}
  >

    {/* ═══════════════════════════════════════════════════
        TOP TOOLBAR
        Left: ← Dashboard
        Center: Document title + serial ID
        Right: Prev counter Next
    ═══════════════════════════════════════════════════ */}
    <div
      style={{
        background: "#fff",
        borderBottom: "1.5px solid #e2e8f0",
        padding: "0 20px",
        height: 52,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",  /* equal left/right columns, center shrinks to content */
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      {/* ── Col 1: Back link + Prev/Counter/Next (left-aligned, grouped) ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Dashboard back link */}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#3b82f6",
            fontSize: 13,
            fontWeight: 600,
            fontFamily: "inherit",
            padding: "5px 10px",
            borderRadius: 8,
            whiteSpace: "nowrap",
            transition: "background .15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#eff6ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Dashboard
        </button>

        {/* Thin divider between link and nav */}
        <div style={{ width: 1, height: 18, background: "#e2e8f0", flexShrink: 0 }} />

        {/* Prev / Counter / Next — sits right next to Dashboard */}
        <IconButton
          size="small"
          color="primary"
          disabled={searchState.page_number === 1 && tableState.index === 0}
          onClick={handlePrevious}
          sx={{
            border: "1.5px solid #e2e8f0",
            borderRadius: "8px",
            width: 30,
            height: 30,
            "&:hover": { background: "#f8fafc" },
            "&:disabled": { opacity: 0.35, borderColor: "#f1f5f9" },
          }}
        >
          <MdNavigateBefore style={{ fontSize: 18 }} />
        </IconButton>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "2px 10px",
            background: "#f8fafc",
            border: "1.5px solid #e2e8f0",
            borderRadius: 7,
            fontSize: 12,
            color: "#64748b",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <strong style={{ color: "#0f172a" }}>{tableState.index + 1}</strong>
          <span style={{ color: "#cbd5e1", margin: "0 1px" }}>/</span>
          {tableState.totalItemCount}
        </div>

        <IconButton
          size="small"
          color="primary"
          disabled={
            searchState.page_number ===
              Math.ceil(tableState.totalItemCount / searchState.page_size) &&
            tableState.index === tableState.data.length - 1
          }
          onClick={handleNext}
          sx={{
            border: "1.5px solid #e2e8f0",
            borderRadius: "8px",
            width: 30,
            height: 30,
            "&:hover": { background: "#f8fafc" },
            "&:disabled": { opacity: 0.35, borderColor: "#f1f5f9" },
          }}
        >
          <MdNavigateNext style={{ fontSize: 18 }} />
        </IconButton>
      </div>

      {/* ── Col 2: Title (truly centered because grid 1fr auto 1fr) ── */}
      <div style={{ textAlign: "center", minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "-0.2px",
            whiteSpace: "nowrap",
          }}
        >
          Document Analysis
        </div>
        <div
          style={{
            fontSize: 11.5,
            color: "#94a3b8",
            fontFamily: "monospace",
            marginTop: 1,
          }}
        >
          #{tableState?.data[tableState.index]?.SerialID || tableState?.currentId}
        </div>
      </div>

      {/* ── Col 3: empty — keeps grid symmetric so title stays centered ── */}
      <div />
    </div>

    {/* ═══════════════════════════════════════════════════
        MAIN CONTENT — Image viewer (left) + Findings panel (right)
    ═══════════════════════════════════════════════════ */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        gap: 0,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* ── Left: Image Viewer ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
        
          display: "flex",
          flexDirection: "column",
        }}
      >
        {imageJson && (
          <ImageComponent
            jsonInput={jsonInput}
            setJsonInput={setJsonInput}
            setIsValidJson={setIsValidJson}
            jsonPath="data.image"
            imageJson={imageJson}
          />
        )}
      </div>

      {/* ── Vertical Divider ── */}
      <div style={{ width: 1, background: "#e2e8f0", flexShrink: 0 }} />

      {/* ── Right: Findings Panel ── */}
      <div
        style={{
          width: 400,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          overflow: "hidden",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding: "14px 18px 12px",
            borderBottom: "1px solid #f1f5f9",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a" }}>
            Editable Findings
          </div>
          <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 2 }}>
            Review and edit extracted fields
          </div>
        </div>

        {/* Scrollable findings list */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {Object.entries(findings).map(([key, value]) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: 0.6,
                }}
              >
                {key.replace(/_/g, " ")}
              </label>
              <textarea
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 9,
                  border: "1.5px solid #e2e8f0",
                  background: "#f8fafc",
                  fontSize: 13,
                  color: "#334155",
                  fontFamily: "inherit",
                  resize: "vertical",
                  outline: "none",
                  transition: "border-color .15s",
                  lineHeight: 1.5,
                  boxSizing: "border-box",
                }}
                rows={3}
                value={editableData[key] ?? value}
                onChange={(e) =>
                  setEditableData((prev) => ({ ...prev, [key]: e.target.value }))
                }
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          ))}
        </div>

        {/* ── Action Footer ── */}
        <div
          style={{
            borderTop: "1.5px solid #f1f5f9",
            padding: "14px 18px",
            flexShrink: 0,
            background: "#fff",
          }}
        >
          {!showRejectField ? (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {/* Reject */}
              <Button
                onClick={handleRejectClick}
                color="error"
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: 12.5,
                  flex: 1,
                }}
              >
                Reject
              </Button>

              {/* Approve */}
              <Button
                onClick={handleSave}
                color="success"
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: 12.5,
                  flex: 1,
                }}
              >
                Approve
              </Button>

              {/* Approve & Next */}
              <Button
                onClick={handleSaveAndNext}
                disabled={!isValidJson}
                color="primary"
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "8px",
                  fontSize: 12.5,
                  flex: 2,
                  minWidth: 120,
                }}
              >
                Approve & Next →
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <TextField
                fullWidth
                size="small"
                label="Reject Reason"
                value={approve_cmd}
                onChange={(e) => setApprove_cmd(e.target.value)}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: 13,
                    "& fieldset": { borderColor: "#e2e8f0" },
                  },
                  "& label": { fontSize: 12.5 },
                }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  onClick={() => setShowRejectField(false)}
                  color="inherit"
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    fontSize: 12.5,
                    flex: 1,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleReject}
                  color="error"
                  variant="contained"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: "8px",
                    fontSize: 12.5,
                    flex: 1,
                  }}
                >
                  Confirm Reject
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}
