import '../App.css'
import { Card, Typography } from "@material-tailwind/react";
 
const TABLE_HEAD = ["Course Code", "Group", "Course", "SCU"];
 
const TABLE_ROWS = [
  {
    course_code: "John Michael",
    group: "Manager",
    course_name: "23/04/18",
    scu: "5",
  },
  {
    course_code: "John Michael",
    group: "Manager",
    course_name: "23/04/18",
    scu: "5",
  },
  {
    course_code: "John Michael",
    group: "Manager",
    course_name: "23/04/18",
    scu: "5",
  },
  {
    course_code: "John Michael",
    group: "Manager",
    course_name: "23/04/18",
    scu: "5",
  },
  {
    course_code: "John Michael",
    group: "Manager",
    course_name: "23/04/18",
    scu: "5",
  },
];
 
export function Streaming() {
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
          {TABLE_ROWS.map(({ course_code, group, course_name, scu }, index) => {
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
                    {group}
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