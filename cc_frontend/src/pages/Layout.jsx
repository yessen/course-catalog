import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <>
      <div className="header">
        <h1>Binus Course Catalogue</h1>
        {/* <img src= className="img"alt="Binus Logo"/> */}
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
