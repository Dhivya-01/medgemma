import { useState, useEffect } from "react";
import { axChecker } from "../config/axios.config";
// import { toast,ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const CreateUser = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailProvider, setEmailProvider] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [receiveEmails, setReceiveEmails] = useState(false);
  const [emailReset, setEmailReset] = useState(false);
  const [userPrivilege, setUserPrivilege] = useState("user");
   const { t } = useTranslation('user'); 


  // Email provider options
  const emailProviders = [
    { value: "", label: "Select Provider" },
    { value: "Google", label: "Google" },
    { value: "Microsoft", label: "Microsoft" },
    { value: "Email", label: "Email" },
  ];

    const userPrivileges = [
  { value: "user", label: t('privilege_user') },
  { value: "checker", label: t('privilege_checker') },
  { value: "admin", label: t('privilege_maker') },
];


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("profile"));
    if (userInfo && userInfo.projects) {
      setProjects(userInfo.projects);
      if (userInfo.projects.length > 0) {
        setSelectedProject(userInfo.projects[0].id);
      }
    }
  }, []);

  useEffect(() => {
  setIsAdmin(userPrivilege === "admin");
}, [userPrivilege]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "emailProvider":
        setEmailProvider(value);
        // Reset password when switching providers
        if (value !== "Email") {
          setPassword("");
        }
        break;
      case "project":
        setSelectedProject(value);
        break;
      case "receiveEmails":
        setReceiveEmails(value === "true");
        break;
      case "emailReset":
        setEmailReset(value === "true");
        break;
      case "userPrivilege":
        setUserPrivilege(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selecteduser = localStorage.getItem("selectedProjectUserID");
      const token = sessionStorage.getItem("secondAuthToken");

      if (!token) {
        throw new Error(t('toast_no_token'));
      }

      // Find selected project details
      const selectedProjectObj = projects.find((p) => p.id === selectedProject);

      // Set password based on email provider
      const submissionPassword = emailProvider === "Email" ? password : "";
      const isAdminUser = userPrivilege === "admin";
      
      
      // Create request payload
      const payload = {
        user_id: selecteduser,
        project_id: selectedProject,
        email_id: Email,
        email_provider: emailProvider,
        password: submissionPassword,
        is_reset: false,
        // is_admin: isAdmin,
         is_admin: isAdminUser,
        // is_admin: false,
        receive_emails: receiveEmails,
        email_reset: "No",
        user_privilege: userPrivilege,
      };


      // Make the Axios request with proper configuration
      const response = await axChecker.post(`/authenticate/signup`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      // Handle successful response
      if (response.data && response.data.string) {
        if (response.data.status) {
          toast.success(response.data.string, {});
        } else {
          toast.error(response.data.string, {});
        }
      }

      // Reset form fields
      setEmail("");
      setPassword("");
      setEmailProvider("");
      setIsAdmin(false);
      setReceiveEmails(false);
      setEmailReset(false);
      setUserPrivilege("user");
    } catch (error) {
      // Handle different error types
      if (error.response) {
      if (error.response.status === 401) {
        toast.error(t('toast_auth_failed')); // Changed
      } else {
        toast.error(
          error.response.data?.message || t('toast_server_error') // Changed
        );
      }
    } else if (error.request) {
      toast.error(t('toast_no_response')); // Changed
    } else {
      toast.error(error.message || t('toast_error_generic')); // Changed
    }
  }
};


return (
  <div className="w-full h-full flex justify-center items-start px-4 md:px-6 py-6 overflow-auto">

    {/* Container */}
    <div className="glass-card w-full max-w-5xl p-5 md:p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold gradient-text">
            {t("button_create_user")}
          </h2>
          <p className="text-xs text-muted-foreground">
            Configure access, provider & privileges
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* GRID (theme-density layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Project */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("label_project")}
            </label>
            <div className="input">
              <select
                name="project"
                value={selectedProject}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} — {project.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("label_email")}
            </label>
            <div className="input">
              <input
                name="email"
                type="email"
                value={Email}
                onChange={handleChange}
                placeholder="user@company.com"
              />
            </div>
          </div>

          {/* Provider */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("label_email_provider")}
            </label>
            <div className="input">
              <select
                name="emailProvider"
                value={emailProvider}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                {emailProviders.map((provider) => (
                  <option key={provider.value} value={provider.value}>
                    {provider.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Password appears only when needed */}
          {emailProvider === "Email" && (
            <div className="md:col-span-2 xl:col-span-3">
              <label className="text-xs text-muted-foreground mb-1 block">
                {t("label_password")}
              </label>
              <div className="input">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
            </div>
          )}

          {/* Privilege */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("label_user_privilege")}
            </label>
            <div className="input">
              <select
                name="userPrivilege"
                value={userPrivilege}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                {userPrivileges.map((privilege) => (
                  <option key={privilege.value} value={privilege.value}>
                    {privilege.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Receive Emails */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              {t("label_receive_emails")}
            </label>
            <div className="input">
              <select
                name="receiveEmails"
                value={receiveEmails.toString()}
                onChange={handleChange}
                className="w-full bg-transparent outline-none"
              >
                <option value="false">{t("option_no")}</option>
                <option value="true">{t("option_yes")}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-border">
          <button type="submit" className="btn btn-primary px-6">
            {t("button_create_user")}
          </button>
        </div>

      </form>
    </div>
  </div>
);


};

export default CreateUser;
