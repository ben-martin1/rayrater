export async function findClosestBuilding(location){
  const args = {
    'location.latitude': location.lat.toFixed(5),
    'location.longitude': location.lng.toFixed(5),
  };
  console.log('GET buildingInsights\n', args);
  const params = new URLSearchParams({ ...args, key:"AIzaSyDW5v8I1LI0EqBg-WO1dRdocNuP_bgUZSE" });
  // https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest
  
    try{
        const [insightRes, dataLayersRes] = await Promise.all([
          fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`),
          fetch(`https://solar.googleapis.com/v1/dataLayers:get?${params}&${"radiusMeters=10"}`)]);
        const insightData = await insightRes.json();
        const dataLayersData = await dataLayersRes.json();

        console.log("Insight: ",insightData);
        console.log("Data Layers: ", dataLayersData);

        return { insight:insightData, dataLayers:dataLayersData };
      
    } catch(error){
    console.log("API call error: ", error);
  }
}

export default findClosestBuilding;
