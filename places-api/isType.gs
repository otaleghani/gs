function hasType(companyName, type) {
  if (!companyName) return 'FALSE';

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(companyName)}&key=${API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  if (data.results && data.results.length > 0) {
    const placeId = data.results[0].place_id;
    return checkPlaceDetails(placeId) ? 'TRUE' : 'FALSE';
  }
  return 'FALSE';
}

function checkPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  if (data.result && data.result.types) {
    return data.result.types.includes(type);
  }
  return false;
}

function HasType(companyName, type) {
  return hasType(companyName, type);
}
