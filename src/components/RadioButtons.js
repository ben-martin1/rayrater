import React from "react";

function RadioButtons({ setImgType }){
    function handleChange(e){
        console.log("IMGTYPE CHANGE: ", e.target.value);
        setImgType(e.target.value);
    }

    return(
       <>
        <label htmlFor="imgType" >
            <label htmlFor="satellite">
                Satellite
                <input type="radio" name="imgType" value="satellite" onClick={handleChange} defaultChecked></input>
            </label>
            <label htmlFor="roadmap">
                Roadmap
                <input type="radio" name="imgType" value="roadmap" onClick={handleChange}></input>
            </label>
        </label>
       </>
    );
}

export default RadioButtons;