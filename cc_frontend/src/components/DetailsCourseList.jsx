import '../App.css'
import React, { useState } from "react";
import { COURSE_DATA } from '../components/CourseData';

const DetailsCourseList = (props) => {
  const { data } = props;
  const TABLE_ROWS = COURSE_DATA;
  return (
    <div style={{ padding: "10px 50px", backgroundColor: "azure" }}>
      <h3 style={{ margin: 0, paddingBottom: 10 }}>
        {data.make}
        <i> ({data.model})</i>
      </h3>
    </div>
  );
};

export default DetailsCourseList;