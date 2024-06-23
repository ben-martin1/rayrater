import React from "react";

function SearchHistory({searches, addresses, fn, fn2, clear}){
    function onSelect(index, address){
        fn(searches[index]);
        fn2(address);
    }

    function onClear(){
        clear();
    }
    return(
    <>
    <h2>Search History</h2>
    <button onClick={onClear}>Clear</button>
    <span className="searchContainer">
            {addresses.map((address, index) => {
                    return (<div className="searchElement" key={index} onClick={() => {onSelect(index, address)}}>{address}</div>);
                }
            )}
    </span>
    </>
    );
}

export default SearchHistory;