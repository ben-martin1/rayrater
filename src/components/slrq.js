

export async function findClosestBuilding(location){
    const args = {
      'location.latitude': location.lat.toFixed(5),
      'location.longitude': location.lng.toFixed(5),
    };
    console.log('GET buildingInsights\n', args);
    const params = new URLSearchParams({ ...args, key:"AIzaSyDW5v8I1LI0EqBg-WO1dRdocNuP_bgUZSE" });
    // https://developers.google.com/maps/documentation/solar/reference/rest/v1/buildingInsights/findClosest
    const insight = fetch(`https://solar.googleapis.com/v1/buildingInsights:findClosest?${params}`).then(
      async (response) => {
        const insightContent = await response.json();
        if (response.status != 200) {
          console.error('findClosestBuilding\n', insightContent);
          throw insightContent;
        }
        console.log('buildingInsightsResponse', insightContent);
        return JSON.stringify(insightContent);
      },
    );
    const dataLayers = fetch(`https://solar.googleapis.com/v1/dataLayers:get?${params}`).then(
      async (response) => {
        const dataLayersContent = await response.json();
        if (response.status != 200) {
          console.error('getDataLayerUrls\n', dataLayersContent);
          throw dataLayersContent;
        }
        console.log('dataLayersResponse', dataLayersContent);
        return dataLayersContent;
      },
    );

    return (insight, dataLayers);
  
  }

export default findClosestBuilding