import './App.css'

function App() {
  return (
    <>
      <h1>Binus Course Catalogue</h1>
      <div className="row">
        <div className= "column" >
          {/* This table is for the Semester */}
          <table className="scrolldown">
            <tr>
              <th>Semester No.</th>
              <th>Total SCU</th>
              <th>Optional Description</th>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
            <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
            <tr>
            <td>Content</td>
              <td>No</td>
              <td>Content</td>
            </tr>
          </table>
        </div>
        {/* Table for Course List */}
        <div className= "column" >
          <table>
            <tr>
              <th>Course List</th>
              <th>SCU</th>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Content</td>
              <td>No</td>
            </tr>
          </table>
        </div>
        {/* Table for course and Semester */}
        <div className= "column" >
          <table>
            <tr>
              <th>Semester No</th>
              <th>Course Name</th>
            </tr>
            <tr>
              <td>No</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>No</td>
              <td>Name</td>
            </tr>
            <tr>
              <td>No</td>
              <td>Name</td>
            </tr>
          </table>
        </div>
      </div>
      
    </>
  )
}

export default App
