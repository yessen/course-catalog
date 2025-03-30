import './App.css'
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home"
import SemesterList from "./pages/SemesterList"
import Streaming from "./pages/Streaming"
import CourseList from "./pages/CourseList"
import Layout from "./pages/Layout"
import Account from "./pages/Account"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Streaming" element={<Streaming />} />
          <Route path="SemesterList" element={<SemesterList />} />
          <Route path="CourseList" element={<CourseList />} />
          <Route path="Account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);