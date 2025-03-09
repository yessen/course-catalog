import './App.css'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home"
import SemesterList from "./pages/SemesterList"
import CourseList from "./pages/CourseList"
import Layout from "./pages/Layout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SemesterList" element={<SemesterList />} />
          <Route path="CourseList" element={<CourseList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);