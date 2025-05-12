// Simplified GeoJSON for Arkansas
// This is a dummy, severely simplified map representation for demonstration purposes
const usArAll = {
  "title": "Arkansas",
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Arkansas",
        "code": "AR"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [-94.6, 33.0],
              [-89.6, 33.0],
              [-89.6, 36.5],
              [-94.6, 36.5],
              [-94.6, 33.0]
            ]
          ]
        ]
      },
      "id": "AR"
    }
  ]
};

// We would normally use the complete GeoJSON data for Arkansas counties
// This is a simplified version for demo purposes only
export default usArAll; 