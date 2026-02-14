// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useTranslation } from 'react-i18next'; // Add this import

// const CombinedSelection = ({
//   projects,
//   onProjectSelect,
//   onRoleSelect,
//   email,
//   user_ids,
// }) => {
//   const { t } = useTranslation('login'); // Add translation hook
//   const [selectedProject, setSelectedProject] = useState("");
//   const [selectedRole, setSelectedRole] = useState("annotator");
//   const isRBGEmail = email?.endsWith("rbg.ai") && email !== "mlloops@rbg.ai";

//   // Debug logging when component mounts
//   useEffect(() => {
//     // Handle projects that don't have user_ids
//     if (projects && projects.length > 0) {
//       // If projects don't have user_ids, try to retrieve them from localStorage
//       const storedProjects =
//         JSON.parse(localStorage.getItem("profile"))?.projects || [];

//       if (storedProjects.length > 0) {
//         // Map user_ids to projects if they exist in stored data
//         projects.forEach((project) => {
//           const storedProject = storedProjects.find((p) => p.id === project.id);
//           if (storedProject && storedProject.user_ids) {
//             project.user_ids = storedProject.user_ids;
//           }
//         });
//       }
//     }
//   }, [projects, user_ids]);

//   const handleProjectChange = (e) => {
//     setSelectedProject(e.target.value);
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (selectedProject) {
//       const project = projects.find((p) => p.id === selectedProject);
//       if (project) {
//         // Get user_id from project, or try to find it from localStorage if not present
//         const projectUserId =
//           project.user_ids ||
//           (JSON.parse(localStorage.getItem("profile"))?.projects || []).find(
//             (p) => p.id === project.id
//           )?.user_ids;

//         // Store each piece of information separately
//         localStorage.setItem("selectedProjectId", project.id);
//         localStorage.setItem("selectedProjectName", project.name);
//         localStorage.setItem("selectedProjectIsAdmin", project.is_admin);

//         // Make sure we have user_ids for this project
//         if (projectUserId) {
//           localStorage.setItem("selectedProjectUserID", projectUserId);
//         } else {
//           console.warn("No user_ids found for this project:", project);
//         }

//         // Also store the complete project info
//         localStorage.setItem(
//           "selectedProject",
//           JSON.stringify({
//             id: project.id,
//             name: project.name,
//             is_admin: project.is_admin,
//             user_ids: projectUserId,
//           })
//         );

//         // Store the selected role
//         const role = isRBGEmail ? selectedRole : "annotator";
//         localStorage.setItem("selectedRole", role);

//         // Pass both role and project ID to parent components
//         onRoleSelect(role);
//         onProjectSelect(project.id);
//       } else {
//         toast.error(t('combined_toast_invalid_project'));
//       }
//     } else {
//       toast.error(t('combined_toast_select_project'));
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-semibold mb-4">{t('combined_title')}</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Role Selection - Commented out but translated for future use */}
//         {/* {isRBGEmail ? (
//           <select
//             value={selectedRole}
//             onChange={handleRoleChange}
//             className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 ease-out"
//           >
//             <option value="developer">{t('combined_role_developer')}</option>
//             <option value="annotator">{t('combined_role_annotator')}</option>
//           </select>
//         ) : (
//           <button type="button" className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 ease-out">
//             {t('combined_role_annotator')}
//           </button>
//         )} */}

//         {/* Fixed Annotator Button */}
//         <button
//           type="button"
//           className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 ease-out"
//         >
//           {t('combined_role_annotator')}
//         </button>

//         {/* Project selection (for all users) */}
//         <select
//           value={selectedProject}
//           onChange={handleProjectChange}
//           className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-white text-black border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 ease-out"
//         >
//           <option value="">{t('combined_select_project')}</option>
//           {projects.map((project) => {
//             const projectUserId =
//               project.user_ids ||
//               (
//                 JSON.parse(localStorage.getItem("profile"))?.projects || []
//               ).find((p) => p.id === project.id)?.user_ids;

//             return (
//               <option key={project.id} value={project.id}>
//                 {project.name} - {project.id}
//               </option>
//             );
//           })}
//         </select>

//         {/* Continue button */}
//         <button
//           type="submit"
//           className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-md bg-[#434343] text-white border border-[#333333] shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out relative mt-6"
//         >
//           {t('combined_continue')}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CombinedSelection;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { ArrowLeftFromLineIcon,FileText } from "lucide-react";
import { motion } from "framer-motion";

const CombinedSelection = ({
  projects,
  onProjectSelect,
  onRoleSelect,
  email,
  user_ids,
  onBack, // Add this prop for back button
}) => {
  const { t } = useTranslation('login');
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedRole, setSelectedRole] = useState("annotator");
  const isRBGEmail = email?.endsWith("rbg.ai") && email !== "mlloops@rbg.ai";

  useEffect(() => {
    if (projects && projects.length > 0) {
      const storedProjects = JSON.parse(localStorage.getItem("profile"))?.projects || [];
      projects.forEach((project) => {
        const storedProject = storedProjects.find((p) => p.id === project.id);
        if (storedProject && storedProject.user_ids) {
          project.user_ids = storedProject.user_ids;
        }
      });
    }
  }, [projects, user_ids]);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProject) {
      const project = projects.find((p) => p.id === selectedProject);
      if (project) {
        const projectUserId = project.user_ids || 
          (JSON.parse(localStorage.getItem("profile"))?.projects || []).find((p) => p.id === project.id)?.user_ids;

        localStorage.setItem("selectedProjectId", project.id);
        localStorage.setItem("selectedProjectName", project.name);
        localStorage.setItem("selectedProjectIsAdmin", project.is_admin);
        if (projectUserId) {
          localStorage.setItem("selectedProjectUserID", projectUserId);
        }
        localStorage.setItem("selectedProject", JSON.stringify({
          id: project.id, name: project.name, is_admin: project.is_admin, user_ids: projectUserId
        }));
        const role = isRBGEmail ? selectedRole : "annotator";
        localStorage.setItem("selectedRole", role);

        onRoleSelect?.(role);
        onProjectSelect(project.id);
      } else {
        toast.error(t('combined_toast_invalid_project'));
      }
    } else {
      toast.error(t('combined_toast_select_project'));
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.h2 
          className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {t('combined_title', 'Select Project')}
        </motion.h2>
        {onBack && (
          <motion.button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeftFromLineIcon className="w-6 h-6 text-gray-500" />
          </motion.button>
        )}
      </div>

      <p className="text-gray-500 text-center">{t('combined_description', 'Choose your project to continue')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Display - Fixed as Annotator button in your style */}
        <motion.div 
          className="input w-full flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FileText size={16} />
          <span className="font-medium text-gray-700">Annotator</span>
        </motion.div>

        {/* Project Selection */}
        <motion.select
          value={selectedProject}
          onChange={handleProjectChange}
          className="input w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          required
        >
          <option value="">{t('combined_select_project', 'Select a project')}</option>
          {projects?.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} ({project.id})
            </option>
          ))}
        </motion.select>

        {/* Continue Button */}
        <motion.button
          type="submit"
          disabled={!selectedProject}
          className="primary-btn w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Continue
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CombinedSelection;
