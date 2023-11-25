/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'gps-tracker';

// The current database to use.
use(database);

// Create a new collection.
db.createCollection('device', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Device Validator',
      required: ['deviceId', 'name', 'serialNumber', 'updatedAt', 'createdAt'],
      properties: {
        deviceId: {
          bsonType: 'string',
          description: "'deviceId' must be a string and is required",
        },
        name: {
          bsonType: 'string',
          description: "'name' must be a string and is required",
        },
        serialNumber: {
          bsonType: 'string',
          description: "'serialNumber' must be an string and is required",
        },
        updatedAt: {
          bsonType: 'string',
          description: "'updatedAt' must be a string and is required",
        },
        createdAt: {
          bsonType: 'string',
          description: "'updatedAt' must be a string and is required",
        },
      },
    },
  },
});
db.createCollection('device-status', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Device Status Validator',
      required: ['deviceId', 'isOnline', 'updatedAt', 'createdAt'],
      properties: {
        deviceId: {
          bsonType: 'string',
          description: "'deviceId' must be a string and is required",
        },
        isOnline: {
          bsonType: 'bool',
          description: "'terminalId' must be an boolean and is required",
        },
        updatedAt: {
          bsonType: 'string',
          description: "'updatedAt' must be a string and is required",
        },
        createdAt: {
          bsonType: 'string',
          description: "'createdAt' must be a string and is required",
        },
      },
    },
  },
});
db.createCollection('location');
