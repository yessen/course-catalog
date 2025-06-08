import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';
import Popup from '../components/Popup'
import DetailsCourseList from '../components/DetailsCourseList';
import '../App.css'


const TABLE_HEAD = ["Semester No.", "Max SCU", "Edit"];

export function SemesterList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [dataID, setDataID] = useState([]);
 
  const handleClick = (semester_no) => {
    const streamingList = JSON.parse(localStorage.getItem("streamingList"))
    if(streamingList){
      const semesterInfo = streamingList.filter((s) => s.semester_no == semester_no);
      setDataID(semesterInfo)
      // console.log(semesterInfo)
    }
  }  

  useEffect(()=> {
    const token = localStorage.getItem("token");
    const semesterList = localStorage.getItem("semesterList")
    
    if (!token) {
      setError("You need to log in first.");
      return;
    }

    if (semesterList){
      const semesterData = JSON.parse(semesterList);
      setData(semesterData);
    } else {
      axios.get('https://course-catalog-backend.vercel.app/api/semesters/',
        {headers: {
          'Authorization': `token ${token}`
        }}
      )
        .then(res => {
          setData(res.data)
          localStorage.setItem("semesterList", JSON.stringify(res.data));
        })
        .catch(err => {
          console.error("AxiosError:", err)
          if (err.response && err.response.status === 401){
            setError("Unauthorized. Please log in again.");
          } else{
            setError("Failed to fetch course data.")
          }
      })
    }
    setLoading(false);
  }, [])
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='row'>
      <div className='column'>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(({ id, course_code, course_name, scu, passing_grade, course_group, is_core, prerequisites, semester_no, max_scu }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                  <tr key={id} className="even:bg-blue-50/10 odd:bg-slate-950/10">
                    <td className={`${classes} table-cell`} onClick={() => setButtonPopup(true)}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue" 
                        className="font-normal"
                      >
                        <div onClick={() => handleClick(semester_no)} >
                          {semester_no}
                        </div>  
                      </Typography>
                    </td>
                    <td className={`${classes}`}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue" 
                        className="font-normal"
                      >
                        {max_scu}
                      </Typography>
                    </td>
                    <td className={`${classes}`}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue" 
                        className="font-normal"
                      >
                        <button>Edit</button>
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <DetailsCourseList idData={dataID}/>
      </Popup> 
    </div>
  );
}


// function SemesterList() {
//   return (
//     <>  
//       <div className="row">
//         <div className= "column" >
//           {/* This table is for the Semester */}
//           <table className="scrolldown">
//             <tr>
//               <th>Semester No.</th>
//               <th>Total SCU</th>
//               <th>Optional Description</th>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//             <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//             <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//           </table>
//         </div>
//         {/* Table for course and Semester */}
//         <div className= "column" >
//           <table>
//             <tr>
//               <th>Semester No</th>
//               <th>Course Name</th>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//           </table>
//         </div>
//       </div>
      
//     </>
//   )
// }

export default SemesterList