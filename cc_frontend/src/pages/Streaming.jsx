import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
import { COURSE_DATA } from "./components/course_data";
const TABLE_HEAD = ["Course Code", "Semester No.", "Course Name", "SCU"];
 
// Full data here
// const TABLE_ROWS = [
//   {
//     course_code: "John Michael",
//     semester: "1",
//     course_name: "23/04/18",
//     scu: "5",
//   },
//   {
//     course_code: "John Michael",
//     semester: "1",
//     course_name: "23/04/18",
//     scu: "5",
//   },
//   {
//     course_code: "John Michael",
//     semester: "1",
//     course_name: "23/04/18",
//     scu: "5",
//   },
//   {
//     course_code: "John Michael",
//     semester: "1",
//     course_name: "23/04/18",
//     scu: "5",
//   },
//   {
//     course_code: "John Michael",
//     semester: "1",
//     course_name: "23/04/18",
//     scu: "5",
//   },
// ];
 
export function Streaming() {
  const TABLE_ROWS = COURSE_DATA;
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
          {TABLE_ROWS.map(({ course_code, semester, course_name, scu }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={course_code}>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
export default Streaming