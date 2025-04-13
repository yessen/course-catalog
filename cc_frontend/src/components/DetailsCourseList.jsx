import '../App.css'
import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { COURSE_DATA } from '../components/CourseData';

const TABLE_HEAD_1 = ["Course List", "SCU"];

export function CourseList() {

  const TABLE_ROWS_1 = COURSE_DATA;

  return (
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
                {TABLE_ROWS_1.map(({ course_name, scu, }, index) => {
                    const isLast = index === TABLE_ROWS_1.length - 1;
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
    );
}