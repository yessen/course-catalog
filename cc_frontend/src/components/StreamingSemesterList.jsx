import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';
import Popup from './Popup';
import EditDetailsList from './EditListDetails';

// Table for each Streaming Semester
const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites", ""];

const DATA = 'https://course-catalog-backend.vercel.app/api/'

const StreamingSemesterList= (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editPopup, setEditPopup] = useState(false)
  const [dataID, setDataID] = useState([]);
  
// If I put the var detailsData here then two is inputted. (might be the key to solve the double input bug) 
  const semesterNo = props.idData 
  // const editButton = (id) =>{
  //   console.log(id)
  // }

  // Edit Click
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
    const streamingList = localStorage.getItem("streamingList")
    // var detailsData = [];
    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }

    const headers = { Authorization: `Token ${token}` };
    
    if (streamingList){
      // detailsData.push(props.idData)
      // setData(detailsData);
      // console.log(detailsData)
      const streamingData = JSON.parse(streamingList);
      setData(streamingData);
      setLoading(false);
    } else {
      // axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
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
    }
    // semesterCourses.forEach(semester_id => console.log(semester_id));
    // console.log(courseStream)
    setLoading(false);
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className='column'>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
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
              {(data.filter((s) => s.semester_no == semesterNo).map)(({ id, course_code, semester_no , course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={id} className="even:bg-blue-50/10 odd:bg-slate-950/10">
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course_code}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {semester_no}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                      >
                          {scu}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {passing_grade}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {course_group}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {is_core ? 'yes' : 'no'}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {prerequisites}
                        </Typography>
                      </td>
                      <td className={classes} onClick={() => setEditPopup(true)}>
                        <Typography
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
            <tr className='bg-indigo-300/50'>
              <td></td>
              <td></td>
              <td></td>
              <td>Total SCU</td>
              <td>{data.filter((s) => s.semester_no == semesterNo).map(data => data.scu).reduce((accumulator, currentValue) =>
                accumulator + currentValue, 0
              )}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className='bg-indigo-200/50'>
              <td></td>
              <td></td>
              <td></td>
              <td>Cumalative SCU</td>
              <td>{data.filter((s) => 
                (s.semester_no <= semesterNo)
              ).map(data => data.scu).reduce((accumulator, currentValue) =>
                accumulator + currentValue, 0)}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Popup trigger={editPopup} setTrigger={setEditPopup}>
        <EditDetailsList idData={dataID}/>
      </Popup>
    </div>
  );
}
export default StreamingSemesterList