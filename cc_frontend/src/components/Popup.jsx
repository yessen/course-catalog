import '../App.css'
import '../Popup.css'
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, {useEffect, useState } from 'react';

const TABLE_HEAD = ["id", "Course Code","Semester","Course Name", "SCU", "Passing Grade", "Course Group", "Is Core?", "Prerequisites"];

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className='close-btn' onClick={() => props.setTrigger(false)}>
          close
        </button>
        {props.children}
      </div>
    </div>
    // <Card className="h-full w-full overflow-scroll">
    //   <table className="w-full min-w-max table-auto text-left">
    //     <thead>
    //       <tr>
    //         {TABLE_HEAD.map((head) => (
    //           <th
    //             key={head}
    //             className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
    //           >
    //             <Typography
    //               variant="small"
    //               color="blue-gray"
    //               className="font-normal leading-none opacity-70"
    //             >
    //               {head}
    //            </Typography>
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody>  
    //       {(data.map)(({ id, course_code, semester_id , course_name, scu, passing_grade, course_group, is_core, prerequisites }, index) => {
    //         const isLast = index === data.length - 1;
    //         const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    //         return (
    //           <tr key={id}>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {id}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {course_code}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {semester_id}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {course_name}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {scu}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {passing_grade}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {course_group}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {is_core ? 'yes' : 'no'}
    //               </Typography>
    //             </td>
    //             <td className={classes}>
    //               <Typography
    //                 variant="small"
    //                 color="blue-gray"
    //                 className="font-normal"
    //               >
    //                 {prerequisites}
    //               </Typography>
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>
    // </Card>
  ) : "" ;
};

export default Popup;