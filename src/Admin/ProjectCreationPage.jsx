import { axMaker,axChecker } from "../config/axios.config";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

export default function ProjectCreationPage() {
  const [formData, setFormData] = useState({
    client_emails: [""],
    project_name: "",
    client_password: "",
    round_robin: false,
    practitioner_email: "",
    ip_modality: "PDF",
    op_modality: "Json",
    admin_password: import.meta.env.VITE_AUTH_PASSWORD,
    project_id: "",
    slack_uri: "",
    trello_uri: "",
    receive_emails: false,
    preprocessor_uri: "",
    transcriber_uri: "",
    extractor_uri: "",
    postprocessor_uri: "",
  });
 const { t } = useTranslation('project');
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState("");  
  const [jsonError, setJsonError] = useState("");

  const validateJSON = (jsonString) => {
    try {
      JSON.parse(jsonString);
      setJsonError("");
      return true;
    } catch (error) {
      setJsonError(t('toast_invalid_json'));
      return false;
    }
  };


  

  useEffect(() => {
    const fetchDataTypes = async () => {
    try {
      const response = await axChecker.post(
        "checker/get_project_data_types", 
        {}, 
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setJsonData(JSON.stringify(response.data.data_types, null, 2));
    } catch (error) {
     
      setJsonError(t('toast_load_data_types_failed'));
    }
  };

  fetchDataTypes();
 },  []);

  const handleJsonChange = (e) => {
    const value = e.target.value;
    setJsonData(value);
    validateJSON(value);
  };

  
  const fetchPractitioners = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("secondAuthToken");

      // Build headers
      const myHeaders = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Build request body
      const requestBody = {
        client_emails: "string",
        project_name: "string",
        client_password: "string",
        round_robin: false,
        practitioner_email: "string",
        ip_modality: "PDF",
        op_modality: "Json",
        admin_password: import.meta.env.VITE_AUTH_PASSWORD,
        project_id: "string",
      };

      const response = await axMaker.post(
        "orchestrator/get_practitioners",
        requestBody,
        { headers: myHeaders }
      );

      if (response.data?.details?.AIPs) {
        const cleanedEmails = response.data.details.AIPs.map((email) =>
          email.replace(/[",\\]/g, "").trim()
        ).filter(Boolean);

        setPractitioners(cleanedEmails);
      } else {
         toast.error(t('toast_practitioners_error'));
      }
    } catch (error) {
      console.error("❌ Error fetching practitioners:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      }

       toast.error(
      error.response?.status === 401
        ? t('toast_auth_failed') // Changed
        : t('toast_practitioners_failed') // Changed
    );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPractitioners();
  }, [fetchPractitioners]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "client_emails"
          ? value
          : type === "checkbox"
          ? e.target.checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateJSON(jsonData)) {
      toast.error(t('toast_json_error'));
      setLoading(false);
      return;
    }

    const queryParams = new URLSearchParams({
      client_emails: formData.client_emails,
      project_name: formData.project_name,
      client_password: formData.client_password,
      round_robin: formData.round_robin,
      practitioner_email: formData.practitioner_email,
      ip_modality: formData.ip_modality,
      op_modality: formData.op_modality,
      admin_password: formData.admin_password,
      project_id: formData.project_id,
      slack_uri: formData.slack_uri,
      trello_uri: formData.trello_uri,
      receive_emails: formData.receive_emails,
      preprocessor_uri: formData.preprocessor_uri,
      transcriber_uri: formData.transcriber_uri,
      extractor_uri: formData.extractor_uri,
      postprocessor_uri: formData.postprocessor_uri,
    }).toString();

    let requestBody;
    try {
      requestBody = JSON.parse(jsonData);
    } catch (error) {
      toast.error(t('toast_invalid_json'));
      setLoading(false);
      return;
    }

    try {
      await axMaker.post(
        `/orchestrator/create_project?${queryParams}`,
        requestBody,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(t('toast_project_success'), {});

      setFormData({
        client_emails: "",
        project_name: "",
        client_password: "",
        round_robin: false,
        practitioner_email: "",
        ip_modality: "PDF",
        op_modality: "Json",
        admin_password: import.meta.env.VITE_AUTH_PASSWORD,
        project_id: "",
        slack_uri: "",
        trello_uri: "",
        receive_emails: false,
        preprocessor_uri: "",
        transcriber_uri: "",
        extractor_uri: "",
        postprocessor_uri: "",
      });
   } catch (error) {
    console.error("Error creating project:", error);
    toast.error(
      error.response?.status === 401
        ? t('toast_auth_failed') // Changed
        : t('toast_project_failed') // Changed
    );
    if (error.response?.status === 401) navigate("/");
  } finally {
    setLoading(false);
  }
};

const SelectField = ({ label, name, value, options, onChange }) => (
  <div>
    <label className="text-sm text-muted-foreground">{label}</label>
    <select name={name} value={value} onChange={onChange} className="input">
      {options
        ? options.map((o) => <option key={o}>{o}</option>)
        : (
          <>
            <option value="false">False</option>
            <option value="true">True</option>
          </>
        )}
    </select>
  </div>
);


 return (
  <div className="section-container">
    {/* Background Gradient */}
    <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />

    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="glass-card">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-semibold gradient-text">
            {t("create_title")}
          </h2>

          <span className="text-xs text-muted-foreground">
            Project Configuration
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* SCROLLABLE BODY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[60vh] overflow-y-auto pr-2">
            
            {/* EMAIL */}
            <div>
              <label className="text-sm text-muted-foreground">
                {t("label_client_email")}
              </label>
              <input
                type="email"
                name="client_emails"
                value={formData.client_emails}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            {/* PROJECT NAME */}
            <div>
              <label className="text-sm text-muted-foreground">
                {t("label_project_name")}
              </label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-muted-foreground">
                {t("label_client_password")}
              </label>
              <input
                type="password"
                name="client_password"
                value={formData.client_password}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>

            {/* PRACTITIONER */}
            <div>
              <label className="text-sm text-muted-foreground">
                {t("label_practitioner")}
              </label>
              <select
                name="practitioner_email"
                value={formData.practitioner_email}
                onChange={handleInputChange}
                className="input"
              >
                <option value="">{t("select_practitioner")}</option>
                {practitioners.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* ROUND ROBIN */}
            <SelectField
              label={t("label_round_robin")}
              name="round_robin"
              value={formData.round_robin}
              onChange={handleInputChange}
            />

            {/* RECEIVE EMAIL */}
            <SelectField
              label={t("label_receive_emails")}
              name="receive_emails"
              value={formData.receive_emails}
              onChange={handleInputChange}
            />

            {/* INPUT MODALITY */}
            <SelectField
              label={t("label_ip_modality")}
              name="ip_modality"
              value={formData.ip_modality}
              options={["PDF", "Text", "Image", "Audio"]}
              onChange={handleInputChange}
            />

            {/* OUTPUT MODALITY */}
            <SelectField
              label={t("label_op_modality")}
              name="op_modality"
              value={formData.op_modality}
              options={["Json", "Image", "Images", "Audio", "Audios"]}
              onChange={handleInputChange}
            />

            {/* URI FIELDS */}
            {[
              "slack_uri",
              "trello_uri",
              "preprocessor_uri",
              "transcriber_uri",
              "extractor_uri",
              "postprocessor_uri",
            ].map((field) => (
              <div key={field} className="md:col-span-1">
                <label className="text-sm text-muted-foreground">
                  {t(`label_${field}`)}
                </label>
                <input
                  type="url"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            ))}

            {/* JSON CONFIG */}
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground">
                {t("label_additional_config")}
              </label>

              <textarea
                value={jsonData}
                onChange={handleJsonChange}
                rows={5}
                className={`input font-mono text-sm ${
                  jsonError ? "border-destructive" : ""
                }`}
              />

              {jsonError && (
                <p className="text-xs text-destructive mt-1">{jsonError}</p>
              )}
            </div>
          </div>

          {/* FOOTER ACTION */}
          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              className="primary-btn px-8 py-3"
              disabled={loading}
            >
              {loading ? t("button_creating") : t("button_create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);
  
}
