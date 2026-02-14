

import { Mail, Lock, ArrowLeftFromLineIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { msalInstance } from "../Services/msalConfig.js";
import { axChecker, axMaker } from "../config/axios.config.js";
import { setOffLoading, setOnLoading } from "../redux/loadingSlice.js";
import CombinedSelection from "../components/CombinedSelection.jsx";
import LoadingOverlay from "../components/LoadingOverlay.jsx";
import { motion } from "framer-motion";

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // All original state from the full login page
  const [showProjectSelection, setShowProjectSelection] = useState(false);
  const [projects, setProjects] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showEmailSignIn, setShowEmailSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationData, setVerificationData] = useState(null);
  const [secureCode, setSecureCode] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [showMLloopsRoleSelection, setShowMLloopsRoleSelection] = useState(false);
  const [selectedMLloopsRole, setSelectedMLloopsRole] = useState("");
  const [showMLloopsProjectSelection, setShowMLloopsProjectSelection] = useState(false);
  const [mlloopsSelectedRole, setMlloopsSelectedRole] = useState("");
  const [responseData, setResponseData] = useState(null);

  const APP_TITLE = import.meta.env.VITE_DEED_PARSER_TITLE;
  const isMLloops = APP_TITLE.toLowerCase().includes("mlloops");

  // Load Google API
  const loadGoogleApi = () => {
    return new Promise((resolve, reject) => {
      if (typeof google !== "undefined") {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google API script"));
      document.head.appendChild(script);
    });
  };

  // Original handleLogin function
  const handleLogin = async (email_id, email_provider, password = "") => {
    dispatch(setOnLoading());
    try {
      const data = { email_id, email_provider, password };
      const isMLLoopsEmail = email_id === "mlloops@rbg.ai";
      let response;

      if (isMLLoopsEmail) {
        response = await axMaker.post("/authenticate/signin", data);
      } else {
        response = await axChecker.post("/authenticate/signin", data);
      }
console.log(response);

      setResponseData(response.data);
      localStorage.setItem("loginResponse", JSON.stringify(response.data));

      if (response.data.status === false) {
        toast.error(response.data.string || "Login failed. Please try again.");
        return false;
      } else if (response.data.details?.verify_email === true) {
        setVerificationData({
          email_id: response.data.details.email_id,
          user_ids: [response.data.details.user_ids[0]],
          password: password,
        });
        setIsFlipped(true);
      } else {
        const accessToken = response.data.details.gen_tokens.access_token;
        sessionStorage.setItem("authToken", accessToken);
        sessionStorage.setItem("secondAuthToken", accessToken);
        await processLoginResponse(response.data, email_id, accessToken);
      }
      return true;
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      return false;
    } finally {
      dispatch(setOffLoading());
    }
  };

  const processLoginResponse = async (responseData, email, token) => {
    const details = responseData.details;
    const projects = details.project_ids.map((id, index) => ({
      id,
      name: details.project_names[index],
      is_admin: details.is_admins[index] === 1,
      user_ids: details.user_ids[index],
    }));

    const userInfo = {
      user_ids: details.user_ids,
      user_email: details.email_id,
      user_name: details.email_id.split("@")[0],
      projects,
      last_login: details.last_login,
    };

    localStorage.setItem("profile", JSON.stringify(userInfo));
    setUserInfo(userInfo);
    setProjects(projects);

    const isMLLoopsEmail = email === "mlloops@rbg.ai";
    if (isMLLoopsEmail) {
      setShowMLloopsRoleSelection(true);
    } else {
      setShowProjectSelection(true);
    }
  };


  const handleMLloopsRoleSelect = (role) => {
    setSelectedMLloopsRole(role);
    setMlloopsSelectedRole(role);
    localStorage.setItem("selectedMLloopsRole", role);

    if (role === "super-admin") {
      // Super admin goes directly to create-project
      const updatedUserInfo = {
        ...userInfo,
        role: role,
        isDeveloper: false,
        isAnnotator: false,
        is_admin: true,
      };

      localStorage.setItem("profile", JSON.stringify(updatedUserInfo));

      navigate("/create-project", {
        state: {
          justLoggedIn: true,
          isAdmin: true,
          isSuperAdmin: true,
          toastMessage: "Logged in as Super Admin",
          userInfo: updatedUserInfo,
        },
        replace: true,
      });
    } else {
      // Admin and User need project selection
      setShowMLloopsRoleSelection(false);
      setShowMLloopsProjectSelection(true);
    }
  };

  const handleMLloopsProjectSelect = (selectedProjectId) => {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );

    if (!selectedProject) {
      toast.error("Error selecting project. Please try again.");
      return;
    }

    const projectUserId = selectedProject.user_ids;

    const updatedUserInfo = {
      ...userInfo,
      role: mlloopsSelectedRole,
      project_id: selectedProjectId,
      project_name: selectedProject.name,
      is_admin: true, // MLloops always has admin privileges
      user_id: projectUserId,
      isDeveloper: false,
      isAnnotator: false,
    };

    // Store selected project and user info
    localStorage.setItem("selectedProjectId", selectedProjectId);
    localStorage.setItem("selectedProjectName", selectedProject.name);
    localStorage.setItem("selectedProjectIsAdmin", "true");
    localStorage.setItem("selectedProjectUserID", projectUserId);
    localStorage.setItem("selectedUserId", projectUserId);
    localStorage.setItem("selecteduser", projectUserId);
    localStorage.setItem(
      "selectedProjectInfo",
      JSON.stringify(updatedUserInfo)
    );
    localStorage.setItem("profile", JSON.stringify(updatedUserInfo));

    // Navigate based on selected role
    switch (mlloopsSelectedRole) {
      case "admin":
        navigate("/createuser", {
          state: {
            justLoggedIn: true,
            isAdmin: true,
            toastMessage: "Logged in as Admin",
            userInfo: updatedUserInfo,
          },
          replace: true,
        });
        break;
      case "user":
        navigate("/upload", {
          state: {
            justLoggedIn: true,
            isAdmin: false,
            toastMessage: "Logged in as User",
            userInfo: updatedUserInfo,
          },
          replace: true,
        });
        break;
      default:
        toast.error("Invalid role selected");
    }
  };

  const MLloopsRoleSelection = ({ onRoleSelect, onBack }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const roles = [
      {
        value: "super-admin",
        label: "Super Admin",
        color: "text-black",
        icon: "👑",
      },
      { value: "admin", label: "Admin", color: "text-black", icon: "⚙️" },
      { value: "user", label: "User", color: "text-black", icon: "👤" },
    ];

    const handleRoleSelection = (role) => {
      setSelectedRole(role.value);
      setIsDropdownOpen(false);
    };

    const handleContinue = () => {
      if (selectedRole) {
        onRoleSelect(selectedRole);
      } else {
        toast.error("Please select a role to continue");
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
          Select Your Role
        </motion.h2>
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200 backdrop-blur-sm transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftFromLineIcon className="w-6 h-6 text-gray-500" />
        </motion.button>
      </div>

      {/* Welcome message */}
      <motion.p 
        className="text-gray-600 text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Welcome mlloops@rbg.ai! Please select your role to continue.
      </motion.p>

      {/* Custom Dropdown - Your exact design with theme */}
      <motion.div 
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="input w-full justify-between !pr-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-3 truncate">
            {selectedRole ? (
              <>
                <span className="text-xl">{roles.find(r => r.value === selectedRole)?.icon}</span>
                <span className={roles.find(r => r.value === selectedRole)?.color}>
                  {roles.find(r => r.value === selectedRole)?.label}
                </span>
              </>
            ) : (
              <>
                {/* <span className="text-xl">👤</span> */}
                <span className="text-gray-500 font-medium">Choose your role...</span>
              </>
            )}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <motion.div 
            className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            {roles.map((role) => (
              <motion.button
                key={role.value}
                onClick={() => handleRoleSelection(role)}
                className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-gray-50/80 backdrop-blur-sm border-b border-gray-100/50 last:border-b-0 first:rounded-t-2xl last:rounded-b-2xl transition-all duration-200"
                whileHover={{ 
                  backgroundColor: "rgba(248, 250, 252, 0.8)",
                  x: 4 
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* <span className="text-2xl">{role.icon}</span> */}
                <span className={`${role.color} font-semibold text-lg`}>{role.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.button
        onClick={handleContinue}
        disabled={!selectedRole}
        className="primary-btn w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Continue
      </motion.button>
    </motion.div>
  );


  };

  const MLloopsProjectSelection = ({
    projects,
    onProjectSelect,
    selectedRole,
    onBack,
    isRBGEmail,
  }) => {
    const [selectedProject, setSelectedProject] = useState("");

    const handleProjectChange = (e) => {
      setSelectedProject(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (selectedProject) {
        const project = projects.find((p) => p.id === selectedProject);
        if (project) {
          // Get user_id from project or from localStorage fallback
          const projectUserId =
            project.user_ids ||
            (JSON.parse(localStorage.getItem("profile"))?.projects || []).find(
              (p) => p.id === project.id
            )?.user_ids;

          // Save separate values
          localStorage.setItem("selectedProjectId", project.id);
          localStorage.setItem("selectedProjectName", project.name);
          localStorage.setItem("selectedProjectIsAdmin", project.is_admin);

          if (projectUserId) {
            localStorage.setItem("selectedProjectUserID", projectUserId);
          } else {
            console.warn("No user_ids found for this project:", project);
          }

          // Save complete project
          localStorage.setItem(
            "selectedProject",
            JSON.stringify({
              id: project.id,
              name: project.name,
              is_admin: project.is_admin,
              user_ids: projectUserId,
            })
          );

          // Store role
          const role = isRBGEmail ? selectedRole : "annotator";
          localStorage.setItem("selectedRole", role);

          onProjectSelect(project.id);
        } else {
          toast.error("Invalid project selection");
        }
      } else {
        toast.error("Please select a project");
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
          Select Project
        </motion.h2>
        <motion.button
          onClick={onBack}
          className="p-2 rounded-xl bg-gray-100/50 hover:bg-gray-200 backdrop-blur-sm transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftFromLineIcon className="w-6 h-6 text-gray-500" />
        </motion.button>
      </div>

      {/* Role Display */}
      <motion.div 
        className="input w-full flex items-center justify-center gap-3 py-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {isRBGEmail ? (
          <>
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="font-semibold text-gray-700">
              {selectedRole === "developer" ? "Developer" : "Annotator"}
            </span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-gray-700">Annotator</span>
          </>
        )}
      </motion.div>

      {/* Project Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose your project
        </label>
        <motion.select
          value={selectedProject}
          onChange={handleProjectChange}
          className="input w-full"
          required
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        >
          <option value="">Select a project</option>
          {projects?.map((project) => {
            const projectUserId = project.user_ids || 
              (JSON.parse(localStorage.getItem("profile"))?.projects || []).find((p) => p.id === project.id)?.user_ids;
            
            return (
              <option key={project.id} value={project.id}>
                {project.name} - {project.id}
                {projectUserId ? ` (User: ${projectUserId})` : ""}
              </option>
            );
          })}
        </motion.select>
      </motion.div>

      {/* Continue Button */}
      <motion.button
        type="submit"
        onClick={handleSubmit}
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
    </motion.div>
  );
  };


    const handleRoleSelect = (role) => {
    const updatedUserInfo = {
      ...userInfo,
      role: role,
      isDeveloper: role === "developer",
      isAnnotator: role === "annotator",
    };
    setUserInfo(updatedUserInfo);

    // No need for additional conditions here as the role selection is handled in CombinedSelection
    // setShowRoleSelection(false);
    setShowProjectSelection(true);
  };

  const handleProjectSelect = (selectedProjectId) => {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    if (!selectedProject) {
      toast.error("Error selecting project. Please try again.");
      return;
    }

    // This is the user_id specific to this project
    const projectUserId = selectedProject.user_ids;
console.log("dfgfgf",selectedProject.user_ids);

    // Get the user ID from userInfo
    const userId = userInfo.user_ids; // Make sure userInfo is available here

    const updatedUserInfo = {
      ...userInfo,
      project_id: selectedProjectId,
      project_name: selectedProject.name,
      is_admin: selectedProject.is_admin,
      // project_user_id: selectedProject.user_ids
      user_id: projectUserId,
    };

    // Store selected project and user ID in local storage
    localStorage.setItem("selectedProjectId", selectedProjectId);
    localStorage.setItem("selectedProjectName", selectedProject.name);
    localStorage.setItem(
      "selectedProjectIsAdmin",
      selectedProject.is_admin ? "true" : "false"
    );
    localStorage.setItem("selectedProjectUserID", projectUserId);
    localStorage.setItem("selectedUserId", projectUserId); // Also store as selectedUserId
    localStorage.setItem("selecteduser", projectUserId); // Maintain compatibility with existing code

    // Store the complete project info for reference
    localStorage.setItem(
      "selectedProjectInfo",
      JSON.stringify(updatedUserInfo)
    );

    const userIds = JSON.parse(localStorage.getItem("selectedProjectUserID"));

    // Navigate the user
    navigateUser(updatedUserInfo);
  };
  const navigateUser = (userInfo) => {
    const token = sessionStorage.getItem("secondAuthToken");
    const selectedRole = localStorage.getItem("selectedRole"); // Assuming you're storing the selected role in localStorage

    if (userInfo) {
      sessionStorage.setItem("secondAuthToken", token);
      localStorage.setItem("profile", JSON.stringify(userInfo));

      const userEmail = userInfo.user_email;

      if (userEmail === "mlloops@rbg.ai") {
        navigate("/create-project", {
          state: {
            justLoggedIn: true,
            isAdmin: true,
            toastMessage: "Logged in as Admin",
            userInfo: userInfo,
          },
          replace: true,
        });
      } else {
        if (selectedRole === "developer") {
          navigate("/PractitionerPage", {
            state: {
              justLoggedIn: true,
              isAdmin: false,
              toastMessage: "Logged in as Developer",
              userInfo: userInfo,
            },
            replace: true,
          });
        } else if (userInfo.is_admin) {
          navigate("/createuser", {
            state: {
              justLoggedIn: true,
              isAdmin: true,
              toastMessage: "Logged in as Admin",
              userInfo: userInfo,
            },
            replace: true,
          });
          navigate;
        } else {
          navigate("/upload", {
            state: {
              justLoggedIn: true,
              isAdmin: false,
              toastMessage: "Logged in as User",
              userInfo: userInfo,
            },
            replace: true,
          });
        }
      }
    } else {
      toast.error("Login failed: Invalid user information");
    }
  };


  // Google Login
  const onGoogleLogin = async () => {
    dispatch(setOnLoading());
    try {
      await loadGoogleApi();
      const client = google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "email profile",
        callback: async (response) => {
          if (response.access_token) {
            const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
              headers: { Authorization: `Bearer ${response.access_token}` },
            }).then((res) => res.json());
            await handleLogin(userInfo.email, "Google");
          }
        },
      });
      client.requestAccessToken();
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    } finally {
      dispatch(setOffLoading());
    }
  };

  // Microsoft Login
  const onMicrosoftLogin = async () => {
    if (!isInitialized) {
      toast.error("Microsoft authentication is not ready. Please try again later.");
      return;
    }
    dispatch(setOnLoading());
    const loginRequest = { scopes: ["User.Read"], prompt: "select_account" };
    try {
      const response = await msalInstance.loginPopup(loginRequest);
      await handleLogin(response.account.username, "Microsoft");
    } catch (error) {
      toast.error("Microsoft login failed. Please try again.");
    } finally {
      dispatch(setOffLoading());
    }
  };

  // Email Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    await handleLogin(email, "Email", password);
  };

  // Email verification handlers
  const handleGenerate = async () => {
    dispatch(setOnLoading());
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const generateResponse = await axChecker.post("/authenticate/generate_secure_code", {
        email_id: verificationData.email_id,
        user_ids: [verificationData.user_ids[0], null],
      }, { headers });
      toast.success("Verification code sent to your email.");
    } catch (error) {
      toast.error(`Generate failed: ${error.message}`);
    } finally {
      dispatch(setOffLoading());
    }
  };

  const handleValidate = async () => {
    dispatch(setOnLoading());
    try {
      const token = sessionStorage.getItem("authToken");
      const headers = {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const validateResponse = await axChecker.post("/authenticate/validate_secure_code", {
        email_id: verificationData.email_id,
        user_ids: [verificationData.user_ids[0], null],
        secure_code: secureCode,
      }, { headers });

      if (validateResponse.data.status === true) {
        toast.success(validateResponse.data.string);
        setIsFlipped(false);
        setShowEmailSignIn(true);
        setVerificationData(null);
        setSecureCode("");
        setEmail(verificationData.email_id);
      } else {
        throw new Error("Email validation failed");
      }
    } catch (error) {
      toast.error(`Validation failed: ${error.message}`);
    } finally {
      dispatch(setOffLoading());
    }
  };

  const handleForgot = () => {
    navigate("/ForgotPassword");
  };

  // Render content based on current state (same logic as original)
  const renderContent = () => {
    if (userInfo) {
      if (showMLloopsRoleSelection) {
        return <MLloopsRoleSelection onRoleSelect={handleMLloopsRoleSelect} />;
      } else if (showMLloopsProjectSelection) {
        return (
          <MLloopsProjectSelection
            projects={projects}
            onProjectSelect={handleMLloopsProjectSelect}
            selectedRole={mlloopsSelectedRole}
            onBack={() => {
              setShowMLloopsProjectSelection(false);
              setShowMLloopsRoleSelection(true);
            }}
          />
        );
      } else if (showProjectSelection) {
        return (
  <CombinedSelection
  projects={projects}
  onProjectSelect={handleProjectSelect}
  onRoleSelect={handleRoleSelect}
  email={userInfo.user_email}
  user_ids={userInfo.user_ids}
  onBack={() => setShowProjectSelection(false)} // Add this
/>

        );
      }
    }

    if (isFlipped && verificationData) {
      return (
        <EmailVerification
          verificationData={verificationData}
          secureCode={secureCode}
          setSecureCode={setSecureCode}
          onGenerate={handleGenerate}
          onValidate={handleValidate}
        />
      );
    }

    if (showEmailSignIn) {
      return (
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="input w-full">
            <Mail size={16} />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input w-full">
            <Lock size={16} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="primary-btn w-full">
            Sign In
          </button>
          <div className="flex justify-between text-sm">
            <button
              type="button"
              onClick={() => setShowEmailSignIn(false)}
              className="text-muted-foreground hover:text-accent"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleForgot}
              className="text-muted-foreground hover:text-accent"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      );
    }

    return (
      <>
        <div className="space-y-3 mb-6 w-full max-w-md">
          <button onClick={onGoogleLogin} className="auth-btn w-full">
            Continue with Google
          </button>
          <button onClick={onMicrosoftLogin} className="auth-btn w-full">
            Continue with Microsoft
          </button>
        </div>
        <div className="divider w-full max-w-md">or</div>
        <button
          onClick={() => setShowEmailSignIn(true)}
          className="auth-btn w-full"
        >
          Sign in with Email
        </button>
      </>
    );
  };

  useEffect(() => {
    msalInstance.initialize().then(() => setIsInitialized(true));
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center px-8 py-12 relative">
      <button
        onClick={onClose}
        className="absolute right-4 top-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-muted text-foreground transition-all duration-200 hover:scale-110"
        aria-label="Close panel"
      >
        ✕
      </button>

      <div className="w-full max-w-sm flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-muted-foreground mb-8 max-w-xs">
          Access your AI workspace securely.
        </p>

        <div className="flip-card-inner-login w-full max-w-md h-96 relative transition-transform duration-700 transform-style-preserve-3d">
          <div className={`flip-card-front space-y-4 ${isFlipped ? "flipped" : ""}`}>
            {renderContent()}
          </div>
          {/* Email verification back side */}
          <div className="flip-card-back-login absolute inset-0 backface-hidden rotate-y-180">
            {verificationData && (
              <EmailVerification
                verificationData={verificationData}
                secureCode={secureCode}
                setSecureCode={setSecureCode}
                onGenerate={handleGenerate}
                onValidate={handleValidate}
              />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .flip-card-inner-login {
          perspective: 1000px;
        }
        .flip-card-inner-login.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back-login {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
        }
        .flip-card-back-login {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

// You'll need to define these helper components or import them
const MLloopsRoleSelection = ({ onRoleSelect }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Select Your Role</h2>
    <select onChange={(e) => onRoleSelect(e.target.value)} className="input w-full">
      <option value="super-admin">Super Admin</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  </div>
);

const EmailVerification = ({ verificationData, secureCode, setSecureCode, onGenerate, onValidate }) => (
  <div className="space-y-4 p-6">
    <h2 className="text-xl font-semibold">Email Verification</h2>
    <p>Email: {verificationData?.email_id}</p>
    <button onClick={onGenerate} className="primary-btn w-full">Generate Code</button>
    <input
      type="text"
      placeholder="Enter secure code"
      value={secureCode}
      onChange={(e) => setSecureCode(e.target.value)}
      className="input w-full"
    />
    <button onClick={onValidate} className="primary-btn w-full">Validate</button>
  </div>
);

export default Login;

