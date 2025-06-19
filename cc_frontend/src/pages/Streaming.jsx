import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';

const TABLE_HEAD = ["id", "Course Code", "Semester", "Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites"];
const DATA = 'https://course-catalog-backend.vercel.app/api/';
=======
import React, {useEffect, useState } from 'react';
import StreamingSemesterList from '../components/StreamingSemesterList';
>>>>>>> 683e31ba42132dc30f2b5724551a8325025d2853

export default function Streaming() {
  const [data, setData] = useState({ courses: [], semesterCourses: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const streamingList = localStorage.getItem("streamingList")

    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }
    
    const headers = { Authorization: `Token ${token}` };

<<<<<<< HEAD
    const headers = { Authorization: `Token ${token}` };

    Promise.all([
      axios.get(`${DATA}courses/`, { headers }),
      axios.get(`${DATA}semester-courses/`, { headers })
    ])
      .then(([coursesRes, semestersRes]) => {
        setData({
          courses: coursesRes.data,
          semesterCourses: semestersRes.data,
        });
      })
      .catch(err => {
        console.error("AxiosError:", err);
        if (err.response && err.response.status === 403) {
          setError("Forbidden. Please check your access permissions.");
        } else if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to fetch course data.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div className="text-red-500 font-bold">{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full w-full overflow-scroll mt-10">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.courses.map(({ id, course_code, semester, course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
              <td className="p-4">{id}</td>
              <td className="p-4">{course_code}</td>
              <td className="p-4">{semester}</td>
              <td className="p-4">{course_name}</td>
              <td className="p-4">{scu}</td>
              <td className="p-4">{passing_grade}</td>
              <td className="p-4">{course_group}</td>
              <td className="p-4">{is_core ? "Yes" : "No"}</td>
              <td className="p-4">{Array.isArray(prerequisites) ? prerequisites.join(", ") : prerequisites || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
=======
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
            if(courseStream != undefined){
              const semesterStream = semesters.find((semesters) => semesters.id == courseStream.semester_id);
              data.semester_id = semesterStream.id
              data.semester_no = semesterStream.semester_no
              streamingData.push(data)
            }    
          })         
          // localStorage.setItem("streamingList", JSON.stringify(streamingData));
          // setData(courseStream);
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
>>>>>>> 683e31ba42132dc30f2b5724551a8325025d2853
  );
}
