import React from "react";
import { useState } from "react";


function SolarResponse({insight, dataLayers}){
    const [showSegments, setShowSegments] = useState(true);
    const handleChangeBool = (variable, fn) => {
        fn(!variable);
    }
    function getAvg(arr){
        var sum=0;
        for(var i=0; i<arr.length; i++){
            sum+=Number(arr[i]);
        }
        return sum/Number(arr.length);
    }
    return(
        <>
        {insight? (
            <div>
                <p><h2>Property info:</h2></p>
                <table className="centerAlign">
                <thead>
                    <tr>
                        <th scope="col"><h2>Photo Date</h2></th>
                        <th scope="col"><h2>Solar Potential</h2></th>
                        <th scope="col"><h2>Carbon Offset</h2></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="leftAlign">{insight.imageryDate ? (<>{insight.imageryDate.month}/{insight.imageryDate.day}/{insight.imageryDate.year}</>) : (<>Not available.</>)}</td>
                        <td className="leftAlign">{insight.solarPotential ? (<>{insight.solarPotential.maxSunshineHoursPerYear} hours per year</>): (<>Not available.</>)}</td>
                        <td className="leftAlign">{insight.solarPotential ? (<>{insight.solarPotential.carbonOffsetFactorKgPerMwh} KG/MWH</>): (<>Not available.</>)}</td>
                    </tr>
                </tbody>
                </table>
                <div className="centerAlign">Show Segments: <input type="checkbox" defaultChecked onChange={() => handleChangeBool(showSegments, setShowSegments)}></input></div>
                {showSegments? 
                    (<table className="centerAlign">
                    <thead>
                        <tr>
                            <th scope="col"><h2>Latitude</h2></th>
                            <th scope="col"><h2>Longitude</h2></th>
                            <th scope="col"><h2>Average Yield</h2></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {insight.solarPotential.roofSegmentStats.map(segment => {
                        return(
                        <tr>
                            <td className="leftAlign">{segment.center.latitude}</td> 
                            <td className="leftAlign">{segment.center.longitude}</td>
                            <td className="leftAlign">{getAvg(segment.stats.sunshineQuantiles)}</td>
                        </tr>);
                        })}
                    </tbody>
                </table>):(<div className="centerAlign">Segments Hidden.</div>)}
                
        </div>) : <p>no property found</p>}
        <>{ dataLayers ? <div>datalayer found</div>:<div>DATALAYER NOT FOUND</div>}</>
        </>
    );
}

export default SolarResponse