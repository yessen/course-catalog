import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';
import StreamingSemesterList from '../components/StreamingSemesterList';
import DetailsCourseList from '../components/DetailsCourseList';
const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites"];

const DATA = 'https://course-catalog-backend.vercel.app/api/'

export function Streaming() {
  // const TABLE_ROWS = COURSE_DATA;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [semOne, setSemOne] = useState([]);
  // const [semTwo, setSemTwo] = useState([]);
  // const [semThree, setSemThree] = useState([]);
  // const [semFour, setSemFour] = useState([]);
  // const [semFive, setSemFive] = useState([]);
  // const [semSix, setSemSix] = useState([]);
  // const [semSeven, setSemSeven] = useState([]);
  // const [semEight, setSemEight] = useState([]);
  useEffect(()=> {
    const token = localStorage.getItem("token");
    const streamingList = localStorage.getItem("streamingList")

    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }
    
    const headers = { Authorization: `Token ${token}` };

    if (streamingList){
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
    <div className='row'>
      <h1>Semester 1</h1>
      <div className='column'>
        <StreamingSemesterList idData={1}/>
      </div>
      <h1>Semester 2</h1>
      <div className='column'> 
        <StreamingSemesterList idData={2}/>
      </div>
      <h1>Semester 3</h1>
      <div className='column'> 
        <StreamingSemesterList idData={3}/>
      </div>
      <h1>Semester 4</h1>
      <div className='column'> 
        <StreamingSemesterList idData={4}/>
      </div>
      <h1>Semester 5</h1>
      <div className='column'> 
        <StreamingSemesterList idData={5}/>
      </div>
      <h1>Semester 6</h1>
      <div className='column'> 
        <StreamingSemesterList idData={6}/>
      </div>
      <h1>Semester 7</h1>
      <div className='column'> 
        <StreamingSemesterList idData={7}/>
      </div>
      <h1>Semester 8</h1>
      <div className='column'> 
        <StreamingSemesterList idData={8}/>
      </div>

      
    </div>
  );
}
export default Streaming