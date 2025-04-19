import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import { COURSE_DATA } from "../components/CourseData";
import axios from "axios";
import React, {useEffect, useState } from 'react';
const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites"];

export function Streaming() {
  const TABLE_ROWS = COURSE_DATA;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
    
  useEffect(()=> {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in first.");
      return;
    }

    axios.get('https://course-catalog-backend.vercel.app/api/courses/',
      {headers: {
        'Authorization': token
      }}
    )
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     setError("You need to log in first.");
  //     return;
  //   }

  //   axios.get('https://course-catalog-backend.vercel.app/api/courses/', {
  //       headers: {
  //         'Authorization': {token}
  //       }
  //     })
    
  //     .then(res => {
  //       setData(res.data);
  //     })
  //     .catch(err => {
  //       console.error("AxiosError:", err);
  //       if (err.response && err.response.status === 401) {
  //         setError("Unauthorized. Please log in again.");
  //       } else {
  //         setError("Failed to fetch course data.");
  //       }
  //   });
  // }, []);
  
  return (
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
          {data.map(({ id, course_code, semester, course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={id}>
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
                    {semester}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
export default Streaming