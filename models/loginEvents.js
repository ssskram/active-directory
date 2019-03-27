const events = {
  list: "value",
  item: {
    id: "id",
    time: "createdDateTime",
    userName: "userDisplayName",
    userEmail: "userPrincipalName",
    appName: "appDisplayName",
    ipAddress: "ipAddress",
    city: "location.city",
    state: "location.state",
    country: "location.countryOrRegion",
    latitude: "location.geoCoordinates.latitude",
    longitude: "location.geoCoordinates.longitude"
  }
};

module.exports = {
  events
};
