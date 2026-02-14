import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { Toaster } from "sonner";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Upload from "./User/Upload";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/PageTransition";
import FloatingSidebar from "./components/Sidebar";
import Dashboard from  "./pages/dashboard/index"
import Documents from "./pages/dashboard/Documents"
import CreateUser from "./Admin/CreateUser"
import AdminSetting from "./Admin/AdminSetting";
import AdminDashboard from "./Admin/AdminDashboard"
import Setting from "./Admin/Setting"
import UserDetails from "./Admin/UserDetails";
import UserInfo from "./Admin/UserInfo"
import ProjectCreationPage from "./Admin/ProjectCreationPage";
import DeleteProject from "./Admin/DeleteProject"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
    },
  },
});

const LayoutController = () => {
  const location = useLocation();

  const sidebarRoutes = ["/upload","/dashboard","/documents","/createuser","/createuser","/adminsetting","/admindashboard","/setting","/userdetails","/userinfo","/create-project","/DeleteProject"];

  const showSidebar = sidebarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {showSidebar && <FloatingSidebar />}


        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/documents" element={<Documents/>}/>
           <Route path="/createuser" element={<CreateUser/>}/>
            <Route path="/adminsetting" element={<AdminSetting/>}/>

             <Route path="/admindashboard" element={<AdminDashboard/>}/>
              <Route path="/setting" element={<Setting/>}/>
               <Route path="/userdetails" element={<UserDetails/>}/>
          <Route path="/userinfo" element={<UserInfo/>}/>
           <Route path="/create-project" element={<ProjectCreationPage/>}/>
            <Route path="/DeleteProject" element={<DeleteProject/>}/>
        </Routes>
      
    </>
  );
};




const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    
        <LayoutController />
     <Toaster position="top-right" richColors closeButton duration={1000} />
    </QueryClientProvider>
    
  );
};

export default App;
