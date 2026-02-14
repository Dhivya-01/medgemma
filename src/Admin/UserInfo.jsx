import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import {  Bounce } from "react-toastify";
import { Eye, EyeOff, Trash, ArrowLeft, PencilLine } from "lucide-react";
import { axChecker } from "../config/axios.config";
// import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const UserIndividualDetails = () => {
  const { t } = useTranslation('user');
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailProvider, setEmailProvider] = useState(user?.emailProvider || "");
  const [email, setEmail] = useState(user?.UserEmail || "");
  const [password, setPassword] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState([]);

  const handleDelete = async () => {
    try {
      // Confirm deletion
      const confirmDelete = window.confirm(t('confirm_delete'));
      if (!confirmDelete) {
        return;
      }

      // Get auth token
      const token = sessionStorage.getItem("secondAuthToken");

      if (!token) {
         alert(t('toast_no_token'));
        return;
      }

      // Get project ID
      const projectId =
        localStorage.getItem("selectedProjectId") || user.ProjectID;

      // Get user ID
      const userIdToDelete = user.UserID;
      // const selectedUserId = localStorage.getItem("selectedUserId");
      const selecteduser = localStorage.getItem("selectedProjectUserID");
      // Setup request config
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Setup request data
      const requestData = {
        project_id: projectId,
        user_id: selecteduser,
        delete_user_id: String(user.UserID),
      };
 
   
      // Make delete request
      const response = await axChecker.post("/checker/delete_user", requestData, config);

      if (response.data && response.status === 200) {
        // alert("User deleted successfully");
        navigate("/userdetails", {
          state: {
            toastMessage: t('toast_user_deleted'),
          },
        });
      } else {
        throw new Error(response.data?.message || t('toast_delete_failed'));
      }
    } catch (error) {


      let errorMessage = t('toast_delete_failed') + ". ";
      if (error.response?.data?.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      }

      alert(errorMessage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("secondAuthToken");
   
      if (!token) {
        throw new Error(t('toast_no_auth'));
      }

      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Set password based on email provider
      const submittedPassword = emailProvider === "Email" ? password : "";
      const selectedProjectId = localStorage.getItem("selectedProjectId");
      const requestData = {
        project_id: selectedProjectId, // Use your actual project ID
        email_id: user?.UserEmail,
        email_provider: emailProvider,
        password: submittedPassword,
        user_id: String(user.UserID),
        is_reset: true,
      };
   

      const response = await axChecker.post("/authenticate/signup", requestData, {
        headers,
      });

     
if(response.data.status === true){
      toast.success(t('toast_user_updated'), {
        position: "top-right",
       
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
      // Reset form and exit edit mode
      setEmail("");
      setPassword("");
      setEmailProvider("");
      setIsEditing(false);
    } catch (error) {
  
      toast.error(t('toast_update_failed'), {
        position: "top-right",
    
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  };
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

const ViewField = ({ label, value }) => (
  <div>
    <label className="text-xs text-muted-foreground">{label}</label>
    <p className="mt-1 text-sm">{value || "-"}</p>
  </div>
);

const FormField = ({ label, children }) => (
  <div>
    <label className="text-xs text-muted-foreground mb-1 block">
      {label}
    </label>
    <div className="input">{children}</div>
  </div>
);


  return (
  <div className="min-h-screen py-8 px-4">
    <div className="max-w-3xl mx-auto">

      {/* Back Button */}
      <button
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => navigate("/userdetails")}
      >
        <ArrowLeft className="h-4 w-4" />
        {t("back_to_list")}
      </button>

      {/* Card */}
      <div className="glass-card overflow-hidden">

        {/* Header */}
        <div className="border-b border-border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold gradient-text">
              {user?.UserName || t("user_details_title")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("label_user_id")}: {user?.UserID}
            </p>
          </div>

          {!isEditing && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-secondary"
                title={t("btn_edit_user")}
              >
                <PencilLine className="h-4 w-4" />
              </button>

              <button
                onClick={handleDelete}
                className="btn btn-destructive"
                title={t("btn_delete_user")}
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6">

          {/* ================= VIEW MODE ================= */}
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ViewField label={t("label_email")} value={user?.UserEmail} />
              <ViewField
                label={t("label_last_login")}
                value={formatDate(user?.LoginTimeStamp)}
              />
              <ViewField
                label={t("label_user_created")}
                value={formatDate(user?.UserTimeStamp)}
              />
            </div>
          ) : (

            /* ================= EDIT MODE ================= */
            <form onSubmit={handleSubmit} className="space-y-5">

              <FormField label={t("label_email_provider")}>
                <select
                  value={emailProvider}
                  onChange={(e) => setEmailProvider(e.target.value)}
                  className="w-full bg-transparent outline-none"
                  required
                >
                  <option value="">{t("provider_select")}</option>
                  <option value="Google">{t("provider_google")}</option>
                  <option value="Microsoft">{t("provider_microsoft")}</option>
                  <option value="Email">{t("provider_email")}</option>
                </select>
              </FormField>

              <FormField label={t("label_email")}>
                <input
                  type="email"
                  value={email}
                  readOnly
                />
              </FormField>

              {emailProvider === "Email" && (
                <FormField label={t("label_password")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormField>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  {t("btn_cancel")}
                </button>

                <button type="submit" className="btn btn-primary">
                  {t("btn_save_changes")}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  </div>
);

};

export default UserIndividualDetails;
