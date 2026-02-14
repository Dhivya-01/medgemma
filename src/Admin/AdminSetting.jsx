import { useState, useEffect } from "react";
import { axMaker } from "../config/axios.config";
// import { toast, ToastContainer, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';


const AdminSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [currentApiDetails, setCurrentApiDetails] = useState(null);
  const [dbType, setDbType] = useState(""); // Track which DB type we're creating
  const { t } = useTranslation('admin');


  // Unified form data for database creation
  const [formData, setFormData] = useState({
    table_name: "",
    admin_password: "",
  });

  // API endpoints buttons
  const endpoints = [
    {
      name: "Start PreProcessor",
      translationKey: "btn_start_preprocessor",
      path: "/maker/start_preprocessor",
      statusKey: "CheckStatus",
    },
    {
      name: "Stop PreProcessor",
      translationKey: "btn_stop_preprocessor",
      path: "/maker/stop_preprocessor/",
      statusKey: "CheckStatus",
    },
    {
      name: "Start Transcribe",
      translationKey: "btn_start_transcribe",
      path: "/maker/start_transcriber/",
      statusKey: "TranscribeStatus",
    },
    {
      name: "Stop Transcribe",
      translationKey: "btn_stop_transcribe",
      path: "/maker/stop_transcriber/",
      statusKey: "TranscribeStatus",
    },
    {
      name: "Start Extractor",
      translationKey: "btn_start_extractor",
      path: "/maker/start_extractor/",
      statusKey: "TranscribeStatus",
    },
    {
      name: "Stop Extractor",
      translationKey: "btn_stop_extractor",
      path: "/maker/stop_extractor/",
      statusKey: "TranscribeStatus",
    },
    {
      name: "Start PostProcessor",
      translationKey: "btn_start_postprocessor",
      path: "/maker/start_post_processor/",
      statusKey: "ProcessStatus",
    },
    {
      name: "Stop PostProcessor",
      translationKey: "btn_stop_postprocessor",
      path: "/maker/stop_post_processor/",
      statusKey: "ProcessStatus",
    },
    {
      name: "Start Progress Updater",
      translationKey: "btn_start_progress",
      path: "/maker/start_progress_updater/",
      statusKey: "ProcessStatus",
    },
    {
      name: "Stop Progress Updater",
      translationKey: "btn_stop_progress",
      path: "/maker/stop_progress_updater/",
      statusKey: "ProcessStatus",
    },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("secondAuthToken");
    if (token) {
      // Set default headers for all requests
      axMaker.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axMaker.defaults.headers.common["accept"] = "application/json";
      axMaker.defaults.headers.post["Content-Type"] = "application/json";
    }
  }, []);

  const handleClick = async (endpoint) => {
    try {
      const token = sessionStorage.getItem("secondAuthToken");

      // When using axios, the response data is already parsed
      const response = await axMaker.post(
        `${endpoint.path}`,
        {}, // Empty body or add parameters if needed
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // With axios, the JSON data is already available in response.data
      const data = response.data;

      // Check if response has status=true
      if (data.status === true) {
        // Use the string property for the toast message if available
        const successMessage = data.string || t('toast_operation_success');

        toast.success(successMessage);
      } else {
        // If status is not true, show error message
        const errorMessage = data.string || t('toast_operation_failed');
        toast.error(errorMessage);
      }
    } catch (error) {
      // Improved error handling
      let errorMessage = t('toast_error_generic');
      if (error.response && error.response.data) {
        errorMessage = error.response.data.detail || errorMessage;
      }

      toast.error(errorMessage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Show modal with pre-filled value based on which button was clicked
  const handleShowDbModal = (type) => {
    setDbType(type);
    setFormData({
      ...formData,
      table_name: type,
    });
    setShowModal(true);
  };

  const handleCreateDatabase = async () => {
    try {
      const token = sessionStorage.getItem("secondAuthToken");

      // Use axios for the API call
      const response = await axMaker.post(
        "/database/create/",
        {
          table_name: formData.table_name,
          admin_password: formData.admin_password,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      // Check if the response indicates success
      if (result.status === true) {
        const dbTypeText = dbType === "Auth" ? "Auth DB" : "Vault";
         const successMessage = result.string || (
        dbType === "Auth" ? t('toast_auth_created') : t('toast_vault_created') // Changed
      );
        toast.success(successMessage);

        setShowModal(false);
        setFormData({
          table_name: "",
          admin_password: "",
        });
      } else {
        // Handle API error response
        const errorMessage = result.string || t('toast_create_db_failed');
        toast.error(errorMessage);
      }
    } catch (error) {
      let errorMessage = t('toast_create_db_failed');
      if (error.response && error.response.data) {
        errorMessage = error.response.data.detail || errorMessage;
      }

      toast.error(errorMessage);
    }
  };

 const buttonStyle =
  "w-full flex items-center justify-center px-6 py-3 rounded-md bg-[#434343] text-white border border-[#333333] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out";

return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">{t("settings_title")}</h1>

    {/* -------- ACTION BUTTONS -------- */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      {endpoints.map((endpoint, index) => (
        <button
          key={index}
          onClick={() => handleClick(endpoint)}
          className={buttonStyle}
        >
          {t(endpoint.translationKey)}
        </button>
      ))}

      <button
        onClick={() => handleShowDbModal("Auth")}
        className={buttonStyle}
      >
        {t("btn_create_auth_db")}
      </button>

      <button
        onClick={() => handleShowDbModal("Vault")}
        className={buttonStyle}
      >
        {t("btn_create_vault")}
      </button>
    </div>

    {/* -------- MODAL -------- */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-[#efefef] p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-black">
            {dbType === "Auth"
              ? t("modal_create_auth")
              : t("modal_create_vault")}
          </h2>

          {/* Table Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-black mb-1">
              {t("label_table_name")}
            </label>
            <input
              type="text"
              name="table_name"
              value={formData.table_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-[#efefef] text-black rounded border border-[#555] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              {t("btn_cancel")}
            </button>

            <button
              onClick={handleCreateDatabase}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t("btn_create")}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default AdminSettings;
