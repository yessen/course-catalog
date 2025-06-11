import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';
import Popup from '../components/Popup';
import DetailsCourseList from '../components/DetailsCourseList';
import EditDetailsList from '../components/EditListDetails';


const TABLE_HEAD_1 = ["Course List", "SCU", "Edit"];
const DATA = 'https://course-catalog-backend.vercel.app/api/'

export function CourseList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [editPopup, setEditPopup] = useState(false)
  const [dataID, setDataID] = useState([]);

  // const editButton = (id) =>{
  //   console.log(id)
  // }

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
                  <tr key={id} className="even:bg-blue-50/10 odd:bg-slate-950/10">
                    <td className={`${classes} table-cell`} onClick={() => setButtonPopup(true)}>
                      <Typography
                        as = "a"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <div onClick={() => handleClick(true)}>
                          {course_name}
                        </div> 
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
                    <td className={classes} onClick={() => setEditPopup(true)}>
                      <Typography
                        as = "a"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <button onClick={() => handleClick(id)}>
                          Edit
                        </button>
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

      <Popup trigger={editPopup} setTrigger={setEditPopup}>
        <EditDetailsList idData={dataID}/>
      </Popup>
    </div>
  );
}

export default CourseList