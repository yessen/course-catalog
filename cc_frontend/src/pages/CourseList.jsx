import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';
import Popup from '../components/Popup';
import DetailsCourseList from '../components/DetailsCourseList';


const TABLE_HEAD_1 = ["Course List", "SCU"];
const DATA = 'https://course-catalog-backend.vercel.app/api/'

export function CourseList() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [dataID, setDataID] = useState([]);

  const handleClick = (id) => {
    var courseDetails = [];
    const streamingList = JSON.parse(localStorage.getItem("streamingList"))
    if (streamingList){ 
      const streamInfo = streamingList.find((s) => s.id == id);
      courseDetails.push(streamInfo)
      setDataID(courseDetails)
      // console.log(streamInfo)
    } 
    else {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Token ${token}` };
      Promise.all([
        axios.get(`${DATA}courses/`, { headers }),
        axios.get(`${DATA}semester-courses/`, { headers }),
        axios.get(`${DATA}semesters/`, { headers })
      ])
        .then(([courseRes, semesterCourseRes, semestersRes]) => {
          const semesters = semestersRes.data
          const semesterCourses = semesterCourseRes.data
          const courses = courseRes.data
          
          //new corse storage after combining relevent data
          var streamingData = [];

          courses.forEach(data => {
            const courseStream = semesterCourses.find((semesterCourses) => semesterCourses.course_id == data.id);
            const semesterStream = semesters.find((semesters) => semesters.id == courseStream.semester_id);
            data.semester_id = semesterStream.id
            data.semester_no = semesterStream.semester_no
            streamingData.push(data)
          })
          localStorage.setItem("streamingList", JSON.stringify(streamingData));
          setData(courseStream);
        })
        .catch(err => {
          console.error("AxiosError:", err)
          if (err.response && err.response.status === 401){
            setError("Unauthorized. Please log in again.");
          } else{
            setError("Failed to fetch course data.")
          }
        }) 
      const streamInfo = streamingList.find((s) => s.id == id);
      setDataID(streamInfo)
    }
  }

  useEffect(()=> {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }

    const courseList = localStorage.getItem("courseList")
    
    if (courseList){
      const courseData = JSON.parse(courseList);
      // console.log('Using cached data:', courseData);
      setData(courseData);
    } else {
      axios.get('https://course-catalog-backend.vercel.app/api/courses/',
        {headers: {
          'Authorization': `token ${token}`
        }}
      )
      .then(res => {
        setData(res.data);
        localStorage.setItem("courseList", JSON.stringify(res.data));
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
    <div className = 'row'>
      <div className='column'>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD_1.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
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
              {/* Course List and SCU */}
              {data.map(({ id, course_code, semester_no , course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        as = "a"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        onClick={() => handleClick(id)}
                      >
                        <button onClick={() => setButtonPopup(true)}>
                          {course_name}
                        </button>  
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        as = "a"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {scu}
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


// const TABLE_HEAD1 = ["Course List", "SCU"];
 
// const TABLE_ROWS1 = [
//   {
//     course_list: "John Michael",
//   },
// ];

// const TABLE_HEAD2 = ["Course List", "job", "date", ""];
 
// const TABLE_ROWS2 = [
//   {
//     courseList: "John Michael",
//   },
//   {
//     courseList: "John Michael",
//   },
//   {
//     courseList: "John Michael",
//   },
//   {
//     courseList: "John Michael",
//   },
//   {
//     courseList: "John Michael",
//   },
// ];
 
// export function CourseList() {
//   return (
//     <Card className="h-50% w-50% overflow-scroll">
//       <table className="w-full min-w-max table-auto text-left">
//         <thead>
//           <tr>
//             {TABLE_HEAD1.map((head) => (
//               <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   {head}
//                 </Typography>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {TABLE_ROWS1.map(({ course_list, semester_no }, index) => {
//             const isLast = index === TABLE_ROWS1.length - 1;
//             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
//             return (
//               <tr key={course_list}>
//                 <td className={classes}>
//                   <Typography variant="small" color="blue-gray" className="font-normal">
//                     {course_list}
//                   </Typography>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <table className="w-full min-w-max table-auto text-left">
//         <thead>
//           <tr>
//             {TABLE_HEAD2.map((head) => (
//               <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   {head}
//                 </Typography>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {TABLE_ROWS2.map(({ name, job, date }, index) => {
//             const isLast = index === TABLE_ROWS2.length - 1;
//             const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
//             return (
//               <tr key={name}>
//                 <td className={classes}>
//                   <Typography variant="small" color="blue-gray" className="font-normal">
//                     {name}
//                   </Typography>
//                 </td>
//                 <td className={`${classes} bg-blue-gray-50/50`}>
//                   <Typography variant="small" color="blue-gray" className="font-normal">
//                     {job}
//                   </Typography>
//                 </td>
//                 <td className={classes}>
//                   <Typography variant="small" color="blue-gray" className="font-normal">
//                     {date}
//                   </Typography>
//                 </td>
//                 <td className={`${classes} bg-blue-gray-50/50`}>
//                   <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
//                     Edit
//                   </Typography>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </Card>
    
//   );
  
// }
// function CourseList() {
//   return (

    // <>
    //   <div className="row">
    //     {/* Table for Course List */}
    //     <div className= "column" >
    //       <table>
    //         <tr>
    //           <th>Course List</th>
    //           <th>SCU</th>
    //         </tr>
    //         <tr>
    //           <td>Content</td>
    //           <td>No</td>
    //         </tr>
    //         <tr>
    //           <td>Content</td>
    //           <td>No</td>
    //         </tr>
    //       </table>
    //     </div>
    //     {/* Table for course and Semester */}
    //     <div className= "column" >
    //       <table>
    //         <tr>
    //           <th>Semester No</th>
    //           <th>Course Name</th>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //       </table>
    //     </div>
    //   </div>
      
    // </>
  // )
// }

export default CourseList