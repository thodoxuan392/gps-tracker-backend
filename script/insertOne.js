use('gps-tracker');

// Create a new document in the collection.
db.getCollection('location').insertOne({
  deviceId: 'V1',
  latitude: { degree: 22.0, minute: 12.2 },
  latitudeDirection: 'North Latitude',
  longitude: { degree: 11, minute: 346 },
  longitudeDirection: 'East Longitude',
  speed: 14.28,
  updatedAt: '2023-11-23T17:17:08.233Z',
  createdAt: '2023-11-23T17:17:08.233Z',
});
