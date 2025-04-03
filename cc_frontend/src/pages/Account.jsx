import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import { COURSE_DATA } from './components/course_data';
import { useState } from "react";
import { Input } from "@material-tailwind/react";
// import { useEffect, useState } from 'react'
// import { NgModule } from '@angular/core';

// import styles from './MasterDetail.module.scss';

const TABLE_HEAD = ["Course Code", "Semester No.", "Course Name", "SCU"];
const TABLE_ROWS = COURSE_DATA;
export function Account() {

  

  return (
    <div className = 'row'>
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
              {/* Course List and SCU */}
              {TABLE_ROWS.map(({ course_name, scu, }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                  <tr key={course_name}>
                    <td className={classes}>
                      <Typography
                        as = "a"
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {course_name}
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
    </div>
  );
}

export default Account;