// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('gps-tracker');

// Create a new document in the collection.
db.getCollection('device').createIndex({ deviceId: 1 });
db.getCollection('device-status').createIndex({ deviceId: 1 });
db.getCollection('location').createIndex({ deviceId: 1 });
