import React from "react";

function SlideBar({setMapZoom}){
    function handleChange(e) {
        const value = parseInt(e.target.value, 10)
        console.log(value);
        setMapZoom(value);
    }
    return(
    <div className="slidecontainer">
        <input type="range" defaultValue={17} min="17" max="21" className="slider" id="zoom" onChange={handleChange}/>
    </div>
    );
}

export default SlideBar;