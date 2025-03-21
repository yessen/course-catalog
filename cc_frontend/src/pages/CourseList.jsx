import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD1 = ["Course List"];
 
const TABLE_ROWS1 = [
  {
    course_list: "John Michael",
  },
];

const TABLE_HEAD2 = ["Course List", "job", "date", ""];
 
const TABLE_ROWS2 = [
  {
    courseList: "John Michael",
  },
  {
    courseList: "John Michael",
  },
  {
    courseList: "John Michael",
  },
  {
    courseList: "John Michael",
  },
  {
    courseList: "John Michael",
  },
];
 
export function CourseList() {
  return (
    <Card className="h-50% w-50% overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD1.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
          {TABLE_ROWS1.map(({ course_list }, index) => {
            const isLast = index === TABLE_ROWS1.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={course_list}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {course_list}
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD2.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
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
          {TABLE_ROWS2.map(({ name, job, date }, index) => {
            const isLast = index === TABLE_ROWS2.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {job}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {date}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                    Edit
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
// function CourseList() {
//   return (

    // <>
    //   <div className="row">
    //     {/* Table for Course List */}
    //     <div className= "column" >
    //       <table>
    //         <tr>
    //           <th>Course List</th>
    //           <th>SCU</th>
    //         </tr>
    //         <tr>
    //           <td>Content</td>
    //           <td>No</td>
    //         </tr>
    //         <tr>
    //           <td>Content</td>
    //           <td>No</td>
    //         </tr>
    //       </table>
    //     </div>
    //     {/* Table for course and Semester */}
    //     <div className= "column" >
    //       <table>
    //         <tr>
    //           <th>Semester No</th>
    //           <th>Course Name</th>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //         <tr>
    //           <td>No</td>
    //           <td>Name</td>
    //         </tr>
    //       </table>
    //     </div>
    //   </div>
      
    // </>
  // )
// }

export default CourseList