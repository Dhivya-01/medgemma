import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axChecker } from "../config/axios.config";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';


const UserDetails = () => {
  const { t } = useTranslation('user');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const location = useLocation();
  const toastShown = useRef(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const showWelcomeToast = () => {
      if (!toastShown.current && location.state?.toastMessage) {
        toast.success(location.state.toastMessage, {
          position: "top-right",
        
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        toastShown.current = true;
      }
    };

    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile || !profile.user_email) {
      navigate("/");
    } else {
      setUserName(profile.user_name || "User");
      setSelectedProjectId(location.state?.selectedProjectId);
      setTimeout(showWelcomeToast, 100);
    }
  }, [navigate, location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("secondAuthToken");

        if (!token) {
          throw new Error(t('toast_no_token'));
        }

        const selectedProjectId = localStorage.getItem("selectedProjectId");
        const selectedUserId = localStorage.getItem("selectedUserId");
        const selecteduser = localStorage.getItem("selectedProjectUserID");
        
        

        const config = {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const data = {
          project_id: selectedProjectId,
          user_id:  selecteduser,
        };


        const response = await axChecker.post("/checker/get_checkers", data, config);
    
        if (response.data.status && response.data.details) {
          setUsers(response.data.details);
          setLoading(false);
        }
      } catch (error) {
    
        setError(t('toast_fetch_failed'));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    navigate("/userinfo", {
      state: {
        user,
        selectedProjectId,
      },
    });
  };
if (loading) return <div>{t('loading')}</div>; 
if (error) return <div>{t('error')}: {error}</div>; 

  return (
    <div className="flex items-center justify-center mt-6 ">
           {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={false}    // Important!
        pauseOnFocusLoss={false} // Important!
        closeOnClick={true}
        draggable={true}
      /> */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">{t('welcome_user')}, {userName}</h1>
         <div className="overflow-y-auto max-h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(52, 152, 219, 0.3)" }}
                >
                  {t('table_email')}
                </th>
                <th
                  className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(52, 152, 219, 0.3)" }}
                >
                  {t('table_user_id')}
                </th>
                <th
                  className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(52, 152, 219, 0.3)" }}
                >
                  {t('table_project_name')}
                </th>
                <th
                  className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(52, 152, 219, 0.3)" }}
                >
                  {t('table_last_login')}
                </th>
                <th
                  className="px-6 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  style={{ backgroundColor: "rgba(52, 152, 219, 0.3)" }}
                >
                  {t('table_user_created')}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserID} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {user.UserEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <button
                      onClick={() => handleUserClick(user)}
                      className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                    >
                      {user.UserID}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {user.ProjectName}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {new Date(user.LoginTimeStamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    {new Date(user.UserTimeStamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
