import React from "react";
import AutoCompleteBar from "../components/Search";
import SolarResponse from "../components/SolarResponse";
import { useState } from "react";
import GetMap from "../components/Map";
import LoadingSign from "../components/Loading";
import SlideBar from "../components/Slider";
import RadioButtons from "../components/RadioButtons";

function HomePage(){
    /*QUERY STATES */
    const [propertyInsight, setPropertyInsight] = useState(null);
    const [propertyDataLayers, setPropertyDataLayers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    /*UI STATES */
    const [zoom, setZoom] = useState(17);
    const [imgType, setImgType] = useState("satellite");
    const [showMarker, toggleMarker] = useState(false);

    function markerClick(){
        toggleMarker(!showMarker);
    }

    return(
    <div className="homeContainer">
        <section className="leftHome"></section>
        <section className="midHome">
            {!propertyInsight ? (<><h1>RayRater</h1>
            {isLoading && (<LoadingSign/>)}
            </>
            ): (<><h2>RayRater</h2>
                <p><GetMap latitude={propertyInsight.center.latitude} 
                longitude={propertyInsight.center.longitude} 
                zoom={zoom}
                imgType={imgType}
                /></p>
            {isLoading && (<LoadingSign/>)}</>)}

            <AutoCompleteBar 
            setPropertyInsight={setPropertyInsight} 
            setPropertyDataLayers={setPropertyDataLayers}
            setIsLoading={ setIsLoading }/>
            {propertyInsight && <SolarResponse 
            insight={propertyInsight} 
            dataLayers={propertyDataLayers}/>}
        </section>
        <section className="rightHome">
            <h2>Image settings</h2>
            <p>Zoom: {zoom-17}</p>
            <SlideBar setMapZoom={setZoom}/>
            <p>Image type:</p>
            <RadioButtons setImgType={setImgType}/>
        </section>
    </div>
    );
}
export default HomePage;