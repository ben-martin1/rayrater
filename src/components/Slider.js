import React from "react";

function SlideBar({fn, min, max,}){
    function handleChange(e) {
        const value = parseInt(e.target.value, 10)
        fn(value);
    }
    return(
    <div className="slidecontainer">
        <input type="range" defaultValue={min} min={min} max={max} className="slider" id="zoom" onChange={handleChange}/>
    </div>
    );
}

export default SlideBar;