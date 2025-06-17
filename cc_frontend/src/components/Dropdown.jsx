import {
    useState,
    React
} from "react"
import '../Dropdown.css'

function Dropdown(
    props
    // {selected, setSelected}
) {
    const data_type = props.dataType 

    const [selection, setSelection] = useState("Choose One")
    const [isActive, setIsActive] = useState(false);
    const [courses, setCourses] = useState({
        id: "",
        course_code: "",
        course_name: "",
        scu: "",
        passing_grade: "",
        course_group: "",
        is_core: "",
        prerequisites: ""
    })

    const [semesterCourses, setSemesterCourses] = useState({
        id: "",
        semester_id: "",
        course_id: ""
    })
    // const streamingList = JSON.parse(
    // localStorage.getItem("streamingList"))

    const groupList = ["Placeholder"]

    var options = ["Choose One"]
    
    if (data_type == "SEMESTER"){
        options = [1,2,3,4,5,6,7,8]
    }
    if (data_type == "SCU"){
        options = [1,2,3,4,5,6,7,8,9,10]
    }
    if (data_type == "GRADE"){
        options = ['A','B','C','D','E','N/A']
    }
    if (data_type == "BOOL"){
        options = ["Yes", "No"]
    }
    if (data_type == "GROUP"){
        options = groupList
    }
    
    // const options = ["React","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something"]
    
    return(
        <div className="dropdown">
            <div className="dropdown-btn" onClick={e => 
                setIsActive(!isActive)
            }>
                {selection}
                <span className="fas fa-caret-down">▼</span>
            </div>
            {isActive &&
                (<div className="dropdown-content">
                    {options.map((option) => (
                        <div 
                            onClick={(e) => {
                                // setSelected(option);
                                setSelection(option)
                                setIsActive(false);
                            }} 
                            className="dropdown-item"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown