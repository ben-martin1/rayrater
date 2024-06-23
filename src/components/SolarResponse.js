import React from "react";
import { useState } from "react";


function SolarResponse({insight, dataLayers}){
    const [showSegments, setShowSegments] = useState(false);
    const [showPanelYields, setPanelYields] = useState(true);
    const handleChangeBool = (variable, fn) => {
        fn(!variable);
    }

    return(
        <>
        {console.log(insight.solarPotential.roofSegmentStats[1].pitchDegrees)}
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
                        <td className="leftAlign padLeft">{insight.imageryDate ? (<>{insight.imageryDate.month}/{insight.imageryDate.day}/{insight.imageryDate.year}</>) : (<>Not available.</>)}</td>
                        <td className="leftAlign padLeft">{insight.solarPotential ? (<>{insight.solarPotential.maxSunshineHoursPerYear} hours per year</>): (<>Not available.</>)}</td>
                        <td className="leftAlign padLeft">{insight.solarPotential ? (<>{insight.solarPotential.carbonOffsetFactorKgPerMwh} KG/MWH</>): (<>Not available.</>)}</td>
                    </tr>
                </tbody>
                </table>
                <p><div className="leftAlign padLeft">Show Highest Yield Panels: <input type="checkbox" defaultChecked onChange={() => handleChangeBool(showPanelYields, setPanelYields)}></input></div></p>
                {showPanelYields? 
                    (<>
                    <div className="leftAlign padLeft"> Show Placement Specs: <input type="checkbox" onChange={() => handleChangeBool(showSegments, setShowSegments)}></input></div>
                    <table className="centerAlign">
                    <thead>
                        <tr>
                            <th scope="col"><h2>Rank</h2></th>
                            <th scope="col"><h2>Orientation</h2></th>
                            <th scope="col"><h2>Yearly DC/KWH</h2></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {insight.solarPotential.solarPanels.map((panel, index) => {
                        return(
                        <>
                            <tr>
                                <td className="leftAlign padLeft">{index+1}</td> 
                                <td className="leftAlign padLeft">{panel.orientation.toLowerCase()}</td>
                                <td className="leftAlign padLeft">{panel.yearlyEnergyDcKwh}</td>
                            </tr>
                            {showSegments && (<tr className="segmentDetail">
                                <td colSpan="3">
                                    <div className="wideRow">
                                        <div className="leftAlign">Lat: {panel.center.latitude}</div> 
                                        <div className="leftAlign">Long: {panel.center.longitude}</div>
                                        <div className="leftAlign">Pitch: {insight.solarPotential.roofSegmentStats[panel.segmentIndex].pitchDegrees}&deg;</div>
                                        <div className="leftAlign">Azimuth: {insight.solarPotential.roofSegmentStats[panel.segmentIndex].azimuthDegrees}&deg;</div>
                                    </div>
                                </td>
                            </tr>)}
                            
                        </>
                        )})}
                    </tbody>
                </table></>):(<div className="centerAlign">Panel Yields hidden.</div>)}
                
        </div>) : <p>no property found</p>}
        <>{ dataLayers ? <div></div>:<div>DATALAYER NOT FOUND</div>}</>
        </>
    );
}

export default SolarResponse