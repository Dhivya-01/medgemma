import React, { useState, useEffect } from "react";
import { axMaker } from "../config/axios.config";
import { Trash2, Copy, AlertCircle } from "lucide-react";
// import { toast, Bounce } from "react-toastify";
// import { ToastContainer } from "react-toastify";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const ProjectDeletePage = () => {
  const { t } = useTranslation('project');
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [inputProjectId, setInputProjectId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axMaker.post(
        "/orchestrator/get_project_list",
        {
          client_emails: "string",
          project_name: "string",
          client_password: "string",
          round_robin: false,
          practitioner_email: "string",
          ip_modality: "PDF",
          op_modality: "Json",
          // admin_password: import.meta.env.VITE_AUTH_PASSWORD,
          project_id: "string",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.data?.details?.ProjectIDs &&
        response.data?.details?.ProjectNames
      ) {
        const transformedProjects = response.data.details.ProjectIDs.map(
          (id, index) => ({
            id: id,
            name: response.data.details.ProjectNames[index],
          })
        );
        setProjects(transformedProjects);
      } else {
        setError(t('toast_invalid_data')); 
      }
    } catch (error) {
     setError(t('toast_load_failed'));
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(t('toast_copied'));
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess(t('toast_copy_failed'));
    }
  };

  const deleteProject = async () => {
    const idToDelete = inputProjectId.trim();

    if (!idToDelete) {
      setError(t('toast_enter_project_id'));
      return;
    }

    if (
    !window.confirm(
      `${t('confirm_delete')} ${idToDelete}? ${t('confirm_delete_warning')}` // Changed
    )
    ) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        setError(t('toast_no_auth_token'));
        return;
      }

      const response = await axMaker.post(
        `/orchestrator/delete_project`,
        {
          // client_emails: "string",
          // project_name: "string",
          // client_password: "string",
          // round_robin: false,
          // practitioner_email: "string",
          // ip_modality: "PDF",
          // op_modality: "Json",
          // admin_password: import.meta.env.VITE_AUTH_PASSWORD,
          project_id: idToDelete,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setInputProjectId("");
        fetchProjects();
      }
    } catch (error) {
      setError(error.response?.data?.message || t('toast_delete_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="section-container">
    {/* Background */}
    <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />

    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="glass-card">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <h2 className="text-2xl font-semibold gradient-text">
            {t("delete_title")}
          </h2>

          <span className="text-xs text-muted-foreground">
            Manage Projects
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* PROJECT LIST */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {t("available_projects")}
            </h3>

            <div className="rounded-xl border border-border bg-card max-h-[280px] overflow-y-auto divide-y divide-border">
              {isLoadingProjects ? (
                <div className="p-6 text-center text-muted-foreground">
                  {t("loading_projects")}
                </div>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-muted transition"
                  >
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {project.id}
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(project.id)}
                      className="icon-action"
                      title={t("copy_project_id")}
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">
                  {t("no_projects_found")}
                </div>
              )}
            </div>
          </div>

          {/* DELETE INPUT */}
          <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <label className="text-sm text-muted-foreground">
                {t("enter_project_id")}
              </label>

              <input
                type="text"
                value={inputProjectId}
                onChange={(e) => setInputProjectId(e.target.value)}
                className="input"
                placeholder={t("placeholder_project_id")}
              />
            </div>

            <button
              onClick={deleteProject}
              disabled={isLoading || !inputProjectId}
              className={`btn btn-danger px-6 py-3 ${
                (isLoading || !inputProjectId) && "btn-disabled"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-25"
                    />
                  </svg>
                  {t("button_deleting")}
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  {t("button_delete_project")}
                </>
              )}
            </button>
          </div>

          {/* STATUS MESSAGES */}
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              {t("toast_project_deleted")}
            </div>
          )}

          {copySuccess && (
            <div className="text-xs text-success">{copySuccess}</div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default ProjectDeletePage;
