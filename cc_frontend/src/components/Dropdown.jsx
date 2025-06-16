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
    
    var options = ["dummy"]

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
        options = ["True", "False"]
    }
    if (data_type == "GROUP"){
        options = ["Placeholder"]
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