import React from "react";
import ray from "../images/ray.png"

function LoadingSign(){
    return(
    <div>
        <img className="loading" alt={"loading icon"} src={ray} height={100} width={100}/>
        <p>Loading Ray's Rating</p> 
    </div>
    );
}

export default LoadingSign