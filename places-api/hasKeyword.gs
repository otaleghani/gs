function hasKeyword(companyName, keywords) {
  if (!companyName) return 'FALSE';

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(companyName)}&key=${API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  if (data.results && data.results.length > 0) {
    const placeId = data.results[0].place_id;
    return checkPlaceDetails(placeId, keywords) ? 'TRUE' : 'FALSE';
  }
  return 'FALSE';
}

function checkPlaceDetails(placeId, keywords) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;
  const response = UrlFetchApp.fetch(url);
  const data = JSON.parse(response.getContentText());

  const jsonString = JSON.stringify(data.result).toLowerCase();
  for (let i = 0; i < keywords.length; i++) {
    if (jsonString.includes(keywords[i].toLowerCase())) {
      return true;
    }
  }
  return false;
}

function HasKeyword(companyName, keywordString) {
  const keywords = keywordString.split(',').map(word => word.trim());
  return hasKeyword(companyName, keywords);
}
