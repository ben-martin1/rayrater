import React from "react";

function GetMap({ latitude, longitude, zoom, imgType, marker }){
    const url =`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}
    &zoom=${zoom}
    &size=600x300
    &markers=${marker=true? `color:blue%7Clabel:S%${latitude},${longitude}`:""}
    &key=AIzaSyDW5v8I1LI0EqBg-WO1dRdocNuP_bgUZSE&PARAMETERS
    &map_id=f4db7d501757bc0d
    &maptype=${imgType}
   `
  return(
        <>
        <img src = {url}/>
        </>
        
    );
}

export default GetMap;