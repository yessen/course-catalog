import {
    useEffect,
    useState,
    React
} from "react"
import '../Dropdown.css'

function Dropdown(
    props
    // {selected, setSelected}
) {
    const {options, onSelect} = props;
    // console.log(props)
    // const data_type = props.dataType 
    // const {id} = useParams()
    const [selection, setSelection] = useState("Choose One")
    const [isActive, setIsActive] = useState(false);

    // const groupList = ["Placeholder"]
    
    const handleOptionClick = (option) => {
        setSelection(option)
        // console.log(props.onSelect)
        onSelect(option);
        setIsActive(false);
    }

    //const options = props.options
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
                            onClick={() => {
                                // setSelected(option);
                                // setSelection(option)
                                handleOptionClick(option)
                                // setIsActive(false);
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