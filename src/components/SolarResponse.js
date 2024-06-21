import React from "react";
import GetMap from "./Map";

function SolarResponse({insight, dataLayers}){
    return(
        <>
        {insight? (
            <div>
                <p>{insight.name} Date: {insight.imageryDate.month}/{insight.imageryDate.day}/{insight.imageryDate.year} SolarPotential:{[insight.solarPotential.maxSunshineHoursPerYear]} hours per year </p>
        </div>) : <p>no property found</p>}
        <>{ dataLayers ? <div>datalayer found</div>:<div>DATALAYER NOT FOUND</div>}</>
        </>
    );
}

export default SolarResponse