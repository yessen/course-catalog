import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import { SEMESTER_DATA } from './components/semester_data';



const TABLE_HEAD = ["Semester No.", "Course Name"];
 
// const TABLE_ROWS = [
//   {
//     semester_no: "Manager",
//     total_scu: "20",
//   },
//   {
//     semester_no: "Manager",
//     total_scu: "20",
//   },
//   {
//     semester_no: "Manager",
//     total_scu: "20",
//   },
//   {
//     semester_no: "Manager",
//     total_scu: "20",
//   },
// ];
 
export function SemesterList() {
  const TABLE_ROWS = SEMESTER_DATA;
  return (
    <div className='row'>
      <div className='column'>
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
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
              {TABLE_ROWS.map(({ semester_no, total_scu }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
    
                return (
                  <tr key={semester_no}>
                    <td className={classes}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue-gray" 
                        className="font-normal"
                      >
                        {semester_no}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography 
                        as = "a"
                        variant="small" 
                        color="blue-gray" 
                        className="font-normal"
                      >
                        {total_scu}
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


// function SemesterList() {
//   return (
//     <>  
//       <div className="row">
//         <div className= "column" >
//           {/* This table is for the Semester */}
//           <table className="scrolldown">
//             <tr>
//               <th>Semester No.</th>
//               <th>Total SCU</th>
//               <th>Optional Description</th>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//             <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//               <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//             <tr>
//             <td>Content</td>
//               <td>No</td>
//               <td>Content</td>
//             </tr>
//           </table>
//         </div>
//         {/* Table for course and Semester */}
//         <div className= "column" >
//           <table>
//             <tr>
//               <th>Semester No</th>
//               <th>Course Name</th>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//             <tr>
//               <td>No</td>
//               <td>Name</td>
//             </tr>
//           </table>
//         </div>
//       </div>
      
//     </>
//   )
// }

export default SemesterList