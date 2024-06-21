import React from "react";
import PlacesAutoComplete, {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import findClosestBuilding from "./SolarRequest";
import { useState } from "react";

function AutoCompleteBar({setPropertyInsight, setPropertyDataLayers, setIsLoading}){
    
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleClick = () => {
        address != "" && handleSelect(address);
    }

    const handleSelect = async address=>{
        setIsLoading(true);
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0])
        setAddress(address);
        setCoordinates(latLng);

        const { insight, dataLayers } = await findClosestBuilding(latLng);
        setPropertyInsight(insight);
        setPropertyDataLayers(dataLayers);
        setIsLoading(false);
    }

    return(
    <>
    <div>
    <PlacesAutoComplete 
    value={address}
    onChange={setAddress} 
    onSelect={handleSelect}
    highlightFirstSuggestion = {true}
    >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => 
    (<div>
        <input className="solarSearch" {...getInputProps({placeholder: "Find solar data..."})}/>
        <button onClick={handleClick}>Search</button>
        <div className="addressContainer">
            {loading ? <>Loading addresses...</> : null}
            {suggestions.map(suggestion => {
                const {key, ...props} = getSuggestionItemProps(suggestion);
                return <div className="addressSuggestion" key={suggestion.placeId} {...props}>
                    {suggestion.description}
                    </div>
            })}

        </div>
    </div>)
    }</PlacesAutoComplete>
    </div>
    </>
    );
}
export default AutoCompleteBar