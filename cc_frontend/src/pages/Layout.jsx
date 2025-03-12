import { Outlet, Link } from "react-router";
import IMAGES from "../Images/Images";

const Layout = () => {
  return (
    <>
      <div className="header">
        <h1>Binus Course Catalogue</h1>
      </div>
      <div className="binuslogo">
        <img src={IMAGES.BinusLogo} alt='Binus Logo'
        height="100"
        width="auto" />
      </div>
      
      <div className="topnav">
        <nav>
            <div>
              <li>  
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/semesterlist">Semester List</Link>
              </li>
              <li>
                  <Link to="/courselist">Course List</Link>
              </li>
            </div>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Layout
