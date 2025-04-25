import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import { SEMESTER_DATA } from '../components/SemesterData';
import axios from "axios";
import React, {useEffect, useState } from 'react';


const TABLE_HEAD = ["Semester No.", "Max SCU"];

export function SemesterList() {
  // const TABLE_ROWS = SEMESTER_DATA;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
    
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
      })}
  }, [])
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
              {data.map(({ semester_no, max_scu }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                  <tr key={semester_no}>
                    <td className={classes}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue-gray" 
                        className="font-normal"
                      >
                        {semester_no}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue-gray" 
                        className="font-normal"
                      >
                        {max_scu}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>

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