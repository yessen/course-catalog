import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SemesterList from "./pages/SemesterList";
import CourseList from "./pages/CourseList";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path="semesterlist" element={<SemesterList />} />
              <Route path="courselist" element={<CourseList />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
