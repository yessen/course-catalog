import '../App.css'
import Dropdown from './Dropdown';
import 
  { Card, 
    Typography,
    Input,
    Select
  } from "@material-tailwind/react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import React, {useEffect, useState } from 'react';

const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites", "", ""];
const DATA = 'https://course-catalog-backend.vercel.app/api/'

const EditDetailsList= (props) => {
  // const [selected, setSelected] = useState("Choose One")
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(props)
  const [editCourseData, setEditCourseData] = useState({
    course_code: props.idData[0].course_code,
    course_name: props.idData[0].course_name,
    scu: props.idData[0].scu,
    passing_grade: props.idData[0].passing_grade,
    course_group: props.idData[0].course_group,
    is_core: props.idData[0].is_core,
    prerequisites: props.idData[0].prerequisites
  })
  const [editCourSem, setEditCourSem] = useState({
    semester_id: props.idData[0].semester_id,
    course_id: props.idData[0].id
  })

// If I put the var detailsData here then two is inputted. (might be the key to solve the double input bug) 
  const optiSemester = [1,2,3,4,5,6,7,8]
  const optiSCU = [1,2,3,4,5,6,7,8,9,10]
  const optiGrade = ['A','B','C','D','E','N/A']
  const optiBool = ["Yes", "No"]
  const groupList = ["placeholder"]
  const optiGroup = groupList
  const optiPre = groupList
  

  // Save all the variables here.
  const changeCourseCode = (event) => {
    const courseCode = event.target.value
    setEditCourseData({...editCourseData,
      course_code: courseCode
    });
  };
  const handleSelSemseter = (selSemest) => {
    const semesterCode = selSemest
    setEditCourSem({...editCourSem,
      semester_id: semesterCode
    });
  }
  const changeCourseName = (event) => {
    const courseName = event.target.value
    setEditCourseData({...editCourseData,
      course_name: courseName
    });
  };
  const handleSCU = (selSCU) => {
    const scuCode = selSCU
    setEditCourseData({...editCourseData,
      scu: scuCode
    });
  };
  const handleGrade = (selGrade) => {
    const gradeCode = selGrade
    setEditCourseData({...editCourseData,
      passing_grade: gradeCode
    });
  };
  const handleBool = (selBool) => {
    console.log(selBool)
    var bool = selBool
    if (selBool == 'Yes'){
      bool = true
    } else if (selBool == 'No'){
      bool = false
    }
    
    setEditCourseData({...editCourseData,
      is_core: bool
    });
  };
  const handleGroup = (selGroup) => {
    const groupCode = selGroup;
    setEditCourseData({...editCourseData,
      course_group: groupCode
    });
  };
  const handlePre = (selPre) => {
    const prereCode = selPre;
    setEditCourseData({...editCourseData,
      prerequisites: prereCode
    });
  };
  
  
  // Completing the SAVE button fills you with determinaion.
  const handleClick = () => {
    // console.log(editCourseData)
    // console.log(editCourSem)
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Token ${token}` };
    Promise.all([
      axios.post(`${DATA}courses/`,
        // JSON.stringify(editCourseData), 
        editCourseData,
        { headers:headers }),
      axios.post(`${DATA}semester-courses/`, 
        editCourSem,
        { headers:headers }
      )
    ]) 
    .then(([coursePOST]) => {
      console.log(coursePOST)
    })
    .catch(err => {
      console.error("AxiosError:", err)
      if (err.response && err.response.status === 401){
        setError("Unauthorized. Please log in again.");
      } else{
        setError("Failed to fetch course data.")          
      }
    }) 

  //  console.log(editCourseData);
  //  console.log(editCourSem)
  };
  
  
    

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
                      <Input onChange={changeCourseCode}/>
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
                      {/* <Dropdown dataType='SEMESTER'
                        // selected={selected} 
                        // setSelected={setSelected}
                      /> */}
                      <Dropdown options={optiSemester} onSelect={handleSelSemseter}/>
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
                      <Input onChange={changeCourseName}/>
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
                      <Dropdown options={optiSCU} onSelect={handleSCU}/>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown A-E */}
                      {passing_grade}
                      <Dropdown options={optiGrade} onSelect={handleGrade}/>
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
                      <Dropdown options={optiGroup} onSelect={handleGroup}/>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown True or False */}
                      {is_core ? 'Yes' : 'No'}
                      <Dropdown options={optiBool} onSelect={handleBool}/>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      {/* Dropdown (Course Code list) */}
                      <Dropdown options={optiPre} onSelect={handlePre}/>
                      {prerequisites}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue"
                      className="font-normal"
                    >
                      <button onClick={handleClick}>Save</button>
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