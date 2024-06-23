import React, {useState} from "react";
import AutoCompleteBar from "../components/Search";
import SolarResponse from "../components/SolarResponse";

import SearchHistory from "../components/SearchHistory";
import GetMap from "../components/Map";
import LoadingSign from "../components/Loading";
import SlideBar from "../components/Slider";
import RadioButtons from "../components/RadioButtons";

function HomePage(){
    /*QUERY STATES */
    const [propertyInsight, setPropertyInsight] = useState(null);
    const [propertyDataLayers, setPropertyDataLayers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchHistory, updateSearchHistory] = useState([]);
    const [addresses, updateAddresses] = useState([]);
    const [activeAddress, setActiveAddress] = useState("");

    /*UI STATES */
    const [zoom, setZoom] = useState(17);
    const [imgType, setImgType] = useState("satellite");

    const clearSearch = () => {
        updateSearchHistory([]);
        updateAddresses([]);
    }

    const addToSearchHistory = (newElement) => {
        updateSearchHistory(searchHistory => [newElement, ...searchHistory]);
    }

    const addToAdresses = (newAddress) => {
        !(newAddress in searchHistory) && updateAddresses(searchHistory => [newAddress, ...searchHistory]);
    }

    return(
    <div className="homeContainer">
        <section className="leftHome">
            {propertyInsight && <SearchHistory 
            searches={searchHistory}
            addresses={addresses}
            fn={setPropertyInsight}
            fn2={setActiveAddress}
            clear={clearSearch}/>}
        </section>
        <section className="midHome">
            {!propertyInsight ? (<><h1>RayRater</h1>
            {isLoading && (<LoadingSign/>)}
            </>
            ): (<><h2>RayRater</h2>
                {propertyInsight.center ? (<p><GetMap latitude={propertyInsight.center.latitude} 
                longitude={propertyInsight.center.longitude} 
                zoom={zoom}
                imgType={imgType}
                /></p>):(<p>Invalid address: Must be building. Please try again.</p>)}
                
            {isLoading && (<LoadingSign/>)}</>)}

            <AutoCompleteBar 
            setPropertyInsight={setPropertyInsight} 
            setPropertyDataLayers={setPropertyDataLayers}
            setIsLoading={setIsLoading}
            addSearch={addToSearchHistory}
            addAddress={addToAdresses}
            setActiveAddress={setActiveAddress}
            activeAddress={activeAddress}
            />

            {propertyInsight && (propertyInsight.solarPotential && <SolarResponse 
            insight={propertyInsight} 
            dataLayers={propertyDataLayers}/>)}
        </section>
        <section className="rightHome">
            {propertyInsight &&     
                (<><h2>Image settings</h2>
                <p>Zoom: {zoom-17}</p>
                <SlideBar fn={setZoom} min={17} max={21}/>
                <p>Image type:</p>
                <RadioButtons fn={setImgType}/></>)
            }
        </section>
    </div>
    );
}

export default HomePage;