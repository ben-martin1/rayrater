import * as geotiff from 'geotiff';
import * as geokeysToProj4 from 'geotiff-geokeys-to-proj4';
import proj4 from 'proj4';

async function downloadGeoTIFF(url){
    const requestUrl = url.includes("solar.googleapis.com") ? url + `&key=$AIzaSyDW5v8I1LI0EqBg-WO1dRdocNuP_bgUZSE` : url;
    const response = await fetch(requestUrl);

    if (response.status != 200){
        const error = await response.json();
        console.error("failed: ", error);
        throw error;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await geotiff.fromArrayBuffer(arrayBuffer);
    const image = await tiff.getImage();
    const rasters = await image.readRasters();

    const geoKeys = image.getGeoKeys();
    const projObj = geokeysToProj4.toProj4(geoKeys);
    const projection = proj4(projObj.proj4, 'WGS84');
    const box = image.getBoundingBox();
    const sw = projection.forward({
      x: box[0] * projObj.coordinatesConversionParameters.x,
      y: box[1] * projObj.coordinatesConversionParameters.y,
    });
    const ne = projection.forward({
      x: box[2] * projObj.coordinatesConversionParameters.x,
      y: box[3] * projObj.coordinatesConversionParameters.y,
    });
    return {
        // Width and height of the data layer image in pixels.
        // Used to know the row and column since Javascript
        // stores the values as flat arrays.
        width: rasters.width,
        height: rasters.height,
        rasters: [...Array(rasters.length).keys()].map((i) =>
          Array.from(rasters[i]),
        ),
        // The bounding box as a lat/lon rectangle.
        bounds: {
          north: ne.y,
          south: sw.y,
          east: ne.x,
          west: sw.x,
        },
      };
    
}

export default downloadGeoTIFF;