import { Outlet, Link } from "react-router";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/semesterlist">Semester List</Link>
          </li>
          <li>
            <Link to="/courselist">Course List</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout
