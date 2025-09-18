import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/auth/Login";
import Signup from "./Components/auth/Signup";
import Contact from "./pages/Contact";
import Browse from "./pages/Browse";
import Home from "./pages/Home";
import JobDescription from "./Components/jobs/JobDescription";
import Jobs from "./pages/Jobs";
import Profile from "./Components/layout/Profile";
import Companies from "./Components/admin/Companies";
import ProtectedRoute from "./Components/admin/ProtectedRoute";
import CompanyCreate from "./Components/admin/ComapnyCreate";
import CompanySetup from "./Components/admin/CompanySetup";
import PostJob from "./Components/admin/PostJob";
import AdminJobs from "./Components/admin/AdminJobs";
import Applicants from "./Components/admin/Applicants";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

  // admin panel links
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
