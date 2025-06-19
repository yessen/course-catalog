import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from 'react';

const TABLE_HEAD = ["id", "Course Code", "Semester", "Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites"];
const DATA = 'https://course-catalog-backend.vercel.app/api/';

export default function Streaming() {
  const [data, setData] = useState({ courses: [], semesterCourses: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to log in first.");
      setLoading(false);
      return;
    }

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
  );
}
