import { useState } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
// import { ToastContainer, toast, Bounce } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";

import { appConfig } from "../config/app.config";

const EmailManagement = () => {
  const [emails, setEmails] = useState([""]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleEmailChange = (index, value) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleRemoveEmail = (index) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleAction = async (action) => {
    const validEmails = emails.filter((email) => email.trim() !== "");
    if (validEmails.length === 0) {
      toast.error("Please enter at least one valid email address.");
      return;
    }

    const emailString = validEmails.join(";");
    const endpoint =
      action === "upload"
        ? "/checker/upload_email"
        : "/checker/complete_email";

    try {
      const response = await ax.post(endpoint, null, {
        params: { email_id: emailString },
      });

      toast.success(`${validEmails.length} emails ${action}ed successfully!`, {
        position: "top-right",
       
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Reset email list after successful action
      setEmails([""]);
    } catch (error) {
   
      toast.error(`Error ${action}ing emails. Please try again.`, {
        position: "top-right",
       
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Email Management
        </h2>

        <div className="space-y-4 mb-6">
          {emails.map((email, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter email address"
              />
              {hoveredRow === index && (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition-colors duration-200"
                  onClick={() => handleRemoveEmail(index)}
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleAddEmail}
            className="flex-1 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            style={{ backgroundColor: appConfig.color.primary }}
          >
            <FaPlus className="mr-2" /> Add Email
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleAction("upload")}
            className="flex-1 bg-[#38761d] hover:bg-[#6aa84f] font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-white"
          >
            Upload
          </button>
          <button
            onClick={() => handleAction("complete")}
            className="flex-1 bg-[#38761d] hover:bg-[#6aa84f] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            Complete
          </button>
        </div>

            {/* <ToastContainer
         position="top-right"
         autoClose={2000}
         pauseOnHover={false}    // Important!
         pauseOnFocusLoss={false} // Important!
         closeOnClick={true}
         draggable={true}
       /> */}
      </div>
    </div>
  );
};

export default EmailManagement;
