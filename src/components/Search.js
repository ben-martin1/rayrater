import React from "react";
import PlacesAutoComplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import findClosestBuilding from "./SolarRequest";
import { useState } from "react";

function AutoCompleteBar({setPropertyInsight, setPropertyDataLayers, setIsLoading, addSearch, addAddress, setActiveAddress, activeAddress}){
    
    const [address, setAddress] = useState("");


    function handleClick(input=address){
        input !== address ? (address !== "" && handleSelect(address)) : (input !== "" && handleSelect(input));
    }

    async function handleSelect(address) {
        setIsLoading(true);
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0])
        setAddress(address);

        const { insight, dataLayers } = await findClosestBuilding(latLng);
        setPropertyInsight(insight);
        setPropertyDataLayers(dataLayers);
        addSearch(insight);
        addAddress(address);
        setActiveAddress(address);
        setIsLoading(false);
    }

    return(
    <>
    <div>
    <PlacesAutoComplete 
    value={activeAddress}
    onChange={setActiveAddress} 
    onSelect={handleSelect}
    highlightFirstSuggestion = {true}
    >{({ getInputProps, suggestions, getSuggestionItemProps, loading}) => 
    (<div className="searchParent">
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

export default AutoCompleteBar;