import {
    useState,
    React
} from "react"
import '../Dropdown.css'

function Dropdown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ["React","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something","Vite", "Something"]
    return(
        <div className="dropdown">
            <div className="dropdown-btn" onClick={e => 
                setIsActive(!isActive)
            }>
                {selected}
                <span className="fas fa-caret-down">▼</span>
            </div>
            {isActive &&
                (<div className="dropdown-content">
                    {options.map((option) => (
                        <div 
                            onClick={(e) => {
                                setSelected(option);
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