// import { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import { ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

// export default function DocumentDetails() {
//   const [patientIndex, setPatientIndex] = useState(0);
//   const [activeImage, setActiveImage] = useState(0);
//   const [zoom, setZoom] = useState(1);
//   const imageRef = useRef(null);

//   // 👉 Replace later with API data
//   const patients = [
//     {
//       name: "Patient A",
//       images: ["/sample/doc1.jpg", "/sample/doc2.jpg"],
//       findings: {
//         confidence: "92%",
//         impression:
//           "No acute cardiopulmonary abnormality detected. Mild degenerative changes observed.",
//       },
//     },
//     {
//       name: "Patient B",
//       images: ["/sample/doc3.jpg", "/sample/doc2.jpg"],
//       findings: {
//         confidence: "85%",
//         impression: "Some minor irregularities observed. Recommend follow-up.",
//       },
//     },
//   ];

//   const currentPatient = patients[patientIndex];
//   const images = currentPatient.images;
//   const findings = currentPatient.findings;

//   /* ---------------- ZOOM FUNCTIONS ---------------- */
//   const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 4));
//   const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));
//   const resetZoom = () => setZoom(1);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     e.deltaY < 0 ? zoomIn() : zoomOut();
//   };

//   let lastTap = 0;
//   const handleDoubleTap = () => {
//     const now = Date.now();
//     if (now - lastTap < 300) zoom === 1 ? setZoom(2) : resetZoom();
//     lastTap = now;
//   };

//   /* ---------------- NAVIGATION ---------------- */
//   const nextPatient = () => {
//     if (patientIndex < patients.length - 1) {
//       setPatientIndex((p) => p + 1);
//       setActiveImage(0);
//       resetZoom();
//     }
//   };

//   const prevPatient = () => {
//     if (patientIndex > 0) {
//       setPatientIndex((p) => p - 1);
//       setActiveImage(0);
//       resetZoom();
//     }
//   };

//   const approveDocument = () => alert(`Approved ${currentPatient.name}'s document`);
//   const rejectDocument = () => alert(`Rejected ${currentPatient.name}'s document`);

//   return (
//     <div className="h-screen flex flex-col gap-4 p-4 md:p-6">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//         <h1 className="text-xl md:text-2xl font-semibold gradient-text">
//           Document Analysis - {currentPatient.name}
//         </h1>

//         {/* Controls */}
//         <div className="flex gap-2 mr-6">
//           <button className="btn" onClick={zoomIn}><ZoomIn size={16} /></button>
//           <button className="btn" onClick={zoomOut}><ZoomOut size={16} /></button>
//           <button className="btn" onClick={resetZoom}><RotateCcw size={16} /></button>
//         </div>
//       </div>

//       {/* MAIN LAYOUT */}
//       <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">
//         {/* IMAGE VIEWER */}
//         <div
//           className="glass-card flex-1 flex items-center justify-center overflow-hidden relative touch-none"
//           onWheel={handleWheel}
//           onClick={handleDoubleTap}
//         >
//           <motion.img
//             ref={imageRef}
//             key={activeImage}
//             src={images[activeImage]}
//             alt="document"
//             animate={{ scale: zoom }}
//             transition={{ duration: 0.25 }}
//             className="max-h-full max-w-full object-contain"
//           />

//           {/* Zoom Indicator */}
//           <div className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
//             {Math.round(zoom * 100)}%
//           </div>

//           {/* Patient Navigation */}
//           <button
//             onClick={prevPatient}
//             disabled={patientIndex === 0}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={nextPatient}
//             disabled={patientIndex === patients.length - 1}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         {/* FINDINGS PANEL */}
//         <div className="glass-card w-full lg:w-[380px] p-4 md:p-6 overflow-y-auto flex flex-col gap-4">
//           <h2 className="text-lg font-semibold mb-3">Findings</h2>

//           <div className="p-4 rounded-xl bg-muted mb-4">
//             <p className="text-sm text-muted-foreground">Confidence</p>
//             <p className="text-xl font-semibold text-accent">{findings.confidence}</p>
//           </div>

//           <p className="text-sm text-muted-foreground mb-1">Impression</p>
//           <p className="leading-relaxed">{findings.impression}</p>

//           {/* Approve / Reject */}
//           <div className="flex gap-2 mt-4">
//             <button onClick={approveDocument} className="btn btn-accent flex-1">
//               <Check size={16} className="mr-1" /> Approve
//             </button>
//             <button onClick={rejectDocument} className="btn btn-destructive flex-1">
//               <X size={16} className="mr-1" /> Reject
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* THUMBNAILS */}
//       <div className="glass-card p-2 flex gap-2 overflow-x-auto">
//         {images.map((img, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setActiveImage(index);
//               resetZoom();
//             }}
//             className={`min-w-[90px] h-[70px] rounded-md overflow-hidden border-2 transition
//               ${activeImage === index ? "border-accent" : "border-transparent"}
//             `}
//           >
//             <img src={img} className="w-full h-full object-cover" />
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }




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


  return (
    <div className="h-screen flex flex-col gap-4 p-4 md:p-6">
      {/* HEADER */}
    {/* ===== TOP TOOLBAR ===== */}
<div className="sticky top-0 z-50 glass-card  p-4 mr-4 flex items-center justify-between gap-2">

  {/* LEFT — Dashboard */}
  <button
    onClick={() => navigate("/dashboard")}
    className="flex items-center gap-1 text-sm md:text-base font-medium text-primary hover:underline whitespace-nowrap"
  >
    ← Dashboard
  </button>

  {/* CENTER — Document Title */}
  <h1 className="text-sm md:text-lg font-semibold text-center truncate flex-1">
    Document Analysis -  {tableState?.data[tableState.index]?.SerialID ||
              tableState?.currentId}
  </h1>

  {/* RIGHT — Navigation */}
  <div className="flex items-center gap-1 md:gap-2">

    <IconButton
      size="small"
      color="primary"
      disabled={searchState.page_number === 1 && tableState.index === 0}
      onClick={handlePrevious}
      className="!p-2"
    >
      <MdNavigateBefore className="text-xl md:text-2xl" />
    </IconButton>

    <span className="text-xs md:text-sm px-2 text-muted-foreground">
      {tableState.index + 1} / {tableState.totalItemCount}
    </span>

    <IconButton
      size="small"
      color="primary"
      disabled={
        searchState.page_number ===
          Math.ceil(tableState.totalItemCount / searchState.page_size) &&
        tableState.index === tableState.data.length - 1
      }
      onClick={handleNext}
      className="!p-2"
    >
      <MdNavigateNext className="text-xl md:text-2xl" />
    </IconButton>

  </div>
</div>


      {/* MAIN LAYOUT */}
     <div className="flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden">

  {/* IMAGE SECTION (Handled Fully by ImageComponent) */}
  <div className="flex-1">
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

  {/* FINDINGS PANEL */}
<div className="w-[420px] max-w-full overflow-y-auto p-5 space-y-4 bg-muted/30">
    <h2 className="text-lg font-semibold">Editable Findings</h2>

    {Object.entries(findings).map(([key, value]) => (
      <div key={key} className="space-y-1">
        <label className="text-sm text-muted-foreground capitalize">
          {key.replace(/_/g, " ")}
        </label>

        <textarea
          className="w-full p-3 rounded-lg border bg-background"
          rows={3}
          value={editableData[key] ?? value}
          onChange={(e) =>
            setEditableData((prev) => ({
              ...prev,
              [key]: e.target.value,
            }))
          }
        />
      </div>
    ))}

    {/* Reject Reason */}
    <div className="flex flex-col gap-3 pt-4 border-t">

  {!showRejectField ? (
    <div className="flex gap-2">
      <button
        onClick={handleRejectClick}
        className="btn btn-destructive flex-1"
      >
        Reject
      </button>

      <button
        onClick={handleSaveAndNext}
        disabled={!isValidJson}
        className="btn btn-accent flex-1"
      >
        Approve & Next
      </button>
    </div>
  ) : (
    <div className="space-y-2">
      <TextField
        fullWidth
        size="small"
        label="Reject Reason"
        value={approve_cmd}
        onChange={(e) => setApprove_cmd(e.target.value)}
        autoFocus
      />

      <div className="flex gap-2">
        <button
          onClick={() => setShowRejectField(false)}
          className="btn flex-1"
        >
          Cancel
        </button>

        <button
          onClick={handleReject}
          className="btn btn-destructive flex-1"
        >
          Confirm Reject
        </button>
      </div>
    </div>
  )}
</div>

  </div>


</div>


      {/* THUMBNAILS */}
      {/* <div className="glass-card p-2 flex gap-2 overflow-x-auto">
        {viewerImages.map((img, index) => (

          <button
            key={index}
            onClick={() => {
              setActiveImage(index);
              resetZoom();
            }}
            className={`min-w-[90px] h-[70px] rounded-md overflow-hidden border-2 transition
              ${activeImage === index ? "border-accent" : "border-transparent"}
            `}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div> */}
    </div>
  );
}
