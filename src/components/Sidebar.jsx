import { useState,useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Database,
  Download,
  Upload,
  Slack,
  LayoutGrid,
  ArrowLeftRight,
  Lock,
  LogOut,
  Paperclip,File,Trash,Settings
} from "lucide-react";
import { axMaker, axChecker } from "../config/axios.config";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useQueryClient } from "@tanstack/react-query";
import { FaHome, FaUsers, FaUserPlus, FaCog, FaDownload, FaCalendarAlt,FaFileCsv ,FaServer  } from "react-icons/fa";


export default function TopFloatingBar() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { t } = useTranslation('common');
  const navigate = useNavigate();
const queryClient = useQueryClient();
const profile = JSON.parse(localStorage.getItem("profile") || "{}");
const [selectedRole, setSelectedRole] = useState("");

const userEmail = profile?.user_email;
const projectId = localStorage.getItem("selectedProjectId");
const selectedUser = localStorage.getItem("selectedProjectUserID");
const token = sessionStorage.getItem("secondAuthToken");
const [selectedMLloopsRole, setSelectedMLloopsRole] = useState(
  localStorage.getItem("selectedMLloopsRole")
);
const isAuthenticated = token && projectId && selectedUser;
console.log(localStorage.getItem("selectedMLloopsRole"))

useEffect(() => {
  // Update role when component mounts or location changes
  const role = localStorage.getItem("selectedMLloopsRole");
  setSelectedMLloopsRole(role);
  
}, [location.pathname]); 
  
const handleCsvDownload = async () => {
  try {
    const requestData = {
      file_name: "reports/sftp_upload_tracker.csv",
      project_id: projectId,
      user_id: selectedUser,
    };

    const response = await axChecker.post(`/checker/download_file/`, requestData);

    const result = response.data;

    if (result.status && result.details.base64_file) {
      const csvContent = atob(result.details.base64_file);
      const blob = new Blob([csvContent], { type: "text/csv" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "sftp_upload_tracker.csv";
      link.click();

      window.URL.revokeObjectURL(url);
    }
  } catch (err) {
    toast.error("CSV download failed");
  }
};


const handleDownloadReport = async () => {
  try {
    const response = await axChecker.post(
      "/checker/final_report/",
      {
        project_id: projectId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "final_report.xlsx";
    link.click();
  } catch {
    toast.error("Report download failed");
  }
};


  const toolBtn =
    "w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition";

  /* ✨ Smooth Horizontal Expand Animation */
  const barVariants = {
    closed: {
      width: 60,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    open: {
      width: "auto",
      transition: { type: "spring", stiffness: 180, damping: 18 }
    }
  };

   const handleLogout = async () => {
  try {
    const token = sessionStorage.getItem("secondAuthToken");

    if (!token) {
      navigate("/");
      return;
    }

    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const email_id = storedUserInfo.user_email;

    if (!email_id) {
      toast.error("Session expired. Please login again.");
      navigate("/");
      return;
    }

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const isMLLoopsEmail = email_id === "mlloops@rbg.ai";

    const response = isMLLoopsEmail
      ? await axMaker.post("/authenticate/logout", {}, { headers })
      : await axChecker.post("/authenticate/logout", {}, { headers });

if (response.data.status === true) {
  sessionStorage.clear();
  localStorage.removeItem("profile");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("userInfo");

  queryClient.clear();

  window.dispatchEvent(new Event("storage"));

  navigate("/", { replace: false });
}

  } catch (error) {
    console.error("Logout error:", error);
    toast.error(t("toast_logout_failed"));
  }
};

 const handleCreateProject = () => {
    navigate("/create-project");
  };
  

  const isnotAdminOrUserInfoOrSetting =
    location.pathname === "/upload" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/ResetPassword" ||
    location.pathname === "/documents";

  const isAdminOrUserInfoOrSetting =
    location.pathname === "/Admin" ||
    location.pathname === "/userinfo" ||
    location.pathname === "/setting" ||
    location.pathname === "/userdetails" ||
    location.pathname === "/createuser" ||
    // location.pathname === "/AdminSetting" ||
    location.pathname === "/admindashboard";

  const isTermsOrPrivacy =
    location.pathname === "/TermsOfUse" ||
    location.pathname === "/PrivacyPolicy" ;


  return (
  <div className="fixed top-2 right-2 z-50">
    <motion.div
      variants={barVariants}
      animate={open ? "open" : "closed"}
      className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl px-2 py-2 flex items-center gap-2"
    >
      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            {/* ---------------- SUPER ADMIN ---------------- */}
             {userEmail === "mlloops@rbg.ai" && (
              <>
               {selectedMLloopsRole === "super-admin" && (
              <>
                <Link to="/create-project" className={toolBtn}>
                  <File size={19} />
                </Link>

                <Link to="/DeleteProject" className={toolBtn}>
                  <Trash size={19} />
                </Link>

                <Link to="/adminsetting" className={toolBtn}>
                  <Settings size={19} />
                </Link>
                </>
               )}
                  {selectedMLloopsRole === "admin" && (
                    <>
                    <Link to="/createuser" className={toolBtn}>
                  <FaUserPlus size={19} />
                </Link>

                <Link to="/userdetails" className={toolBtn}>
                  <FaUsers size={19} />
                </Link>

                <Link to="/admindashboard" className={toolBtn}>
                  <Database size={19} />
                </Link>
                </>
                  )}
                  {selectedMLloopsRole === "user" && (
               <>
                <Link to="/upload" className={toolBtn}>
                  <Upload size={19} />
                </Link>

                
 <Link to="/dashboard" className={toolBtn}>
                  <LayoutGrid size={19} />
                </Link>
                <button onClick={handleCsvDownload} className={toolBtn}>
                  <FaFileCsv size={19} />
                </button>

                <button onClick={handleDownloadReport} className={toolBtn}>
                  <Download size={19} />
                </button>
              </>
                  )}
                    {!selectedMLloopsRole && (
        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md">
          <span className="text-sm font-medium text-gray-600">{t('nav_no_role_selected')}</span>
        </div>
      )}
              </>
            )}

            
            {/* ---------------- ADMIN ---------------- */}
             {userEmail !== "mlloops@rbg.ai" && (
              <>
           {isAdminOrUserInfoOrSetting && (
              <>
                <Link to="/createuser" className={toolBtn}>
                  <FaUserPlus size={19} />
                </Link>

                <Link to="/userdetails" className={toolBtn}>
                  <FaUsers size={19} />
                </Link>

                <Link to="/admindashboard" className={toolBtn}>
                  <Database size={19} />
                </Link>
              </>
            )}
             
  
            {/* ---------------- USER ---------------- */}
              {isnotAdminOrUserInfoOrSetting && (
              <>
                <Link to="/upload" className={toolBtn}>
                  <Upload size={19} />
                </Link>

                <Link to="/dashboard" className={toolBtn}>
                  <LayoutGrid size={19} />
                </Link>

                <button onClick={handleCsvDownload} className={toolBtn}>
                  <FaFileCsv size={19} />
                </button>

                <button onClick={handleDownloadReport} className={toolBtn}>
                  <Download size={19} />
                </button>
              </>
            )}
          </>
  )}
            {/* FILE ATTACH (ALL ROLES CAN USE) */}
            {/* {!isTermsOrPrivacy && (
              <label className={toolBtn + " cursor-pointer"}>
                <Paperclip size={19} />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            )} */}

            {/* FILE NAME */}
            {file && (
              <div className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 max-w-[140px] truncate">
                {file.name}
              </div>
            )}

            {/* LOGOUT (HIDDEN ONLY ON PUBLIC PAGES) */}
            {!isTermsOrPrivacy && (
              <button
                onClick={handleLogout}
                className="w-11 h-11 flex items-center justify-center rounded-xl primary-btn text-white transition"
              >
                <LogOut size={18} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
);

}
