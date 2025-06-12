import '../App.css'
import 
  { Card, 
    Typography,
    Input,
    Select
  } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';


const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites", "", ""];

const DATA = 'https://course-catalog-backend.vercel.app/api/'

const EditDetailsList= (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
// If I put the var detailsData here then two is inputted. (might be the key to solve the double input bug) 

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
      setData(props.idData)
      // setData(detailsData);
      // console.log(detailsData)
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
                  className="border-b border-blue-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>  
            {(data.map)(({ id, course_code, semester_no , course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => {
              const isLast = index === data.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"
              return (
                <tr key={id} className="even:bg-blue-50/10">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Not Editable */}
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Free Text */}
                      {course_code}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Integer Dropdown 1-8 */}
                      {semester_no}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Free Text */}
                      {course_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Integer Dropdown 1-10 */}
                      {scu}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown A-E */}
                      {/* <Select>
                        <Select.List>
                          <Select.Option>Material Tailwind React</Select.Option>
                          <Select.Option>Material Tailwind HTML</Select.Option>
                          <Select.Option>Material Tailwind Vue</Select.Option>
                          <Select.Option>Material Tailwind Svelte</Select.Option>
                        </Select.List>
                      </Select> */}
                      {passing_grade}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown */}
                      {course_group}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown True or False */}
                      {is_core ? 'yes' : 'no'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown (Course Code list) */}
                      {prerequisites}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      <button>Save</button>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      <button>Delete</button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
export default EditDetailsList