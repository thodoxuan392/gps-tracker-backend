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
      required: ['name', 'serialNumber', 'updatedAt', 'createdAt'],
      properties: {
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
db.createCollection('login', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Login Validator',
      required: ['deviceId', 'terminalId', 'updatedAt', 'createdAt'],
      properties: {
        deviceId: {
          bsonType: 'string',
          description: "'deviceId' must be a string and is required",
        },
        terminalId: {
          bsonType: 'string',
          description: "'terminalId' must be an integer and is required",
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
db.createCollection('location', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Location Validator',
      required: [
        'deviceId',
        'dataTime',
        'gpsInformation',
        'lbsInformation',
        'updatedAt',
        'createdAt',
      ],
      properties: {
        deviceId: {
          bsonType: 'string',
          description: "'deviceId' must be a string and is required",
        },
        dataTime: {
          bsonType: 'string',
          description: "'dataTime' must be an string and is required",
        },
        gpsInformation: {
          bsonType: 'object',
          description: "'gpsInformation' must be a object and is required",
          required: [
            'latitude',
            'longitude',
            'speed',
            'longitudeDirection',
            'latitudeDirection',
            'angle',
          ],
          properties: {
            latitude: {
              bsonType: 'string',
              description: "'deviceId' must be a string and is required",
              properties: {
                degree: {
                  bsonType: 'double',
                  description: "'degree' must be a double and is required",
                },
                minute: {
                  bsonType: 'double',
                  description: "'minute' must be an double and is required",
                },
              },
            },
            longitude: {
              bsonType: 'string',
              description: "'dataTime' must be an string and is required",
              properties: {
                degree: {
                  bsonType: 'double',
                  description: "'degree' must be a double and is required",
                },
                minute: {
                  bsonType: 'double',
                  description: "'minute' must be an double and is required",
                },
              },
            },
            speed: {
              bsonType: 'double',
              description: "'speed' must be a double and is required",
            },
            longitudeDirection: {
              bsonType: 'string',
              description:
                "'longitudeDirection' must be an string and is required",
            },
            latitudeDirection: {
              bsonType: 'string',
              description:
                "'latitudeDirection' must be a string and is required",
            },
            angle: {
              bsonType: 'double',
              description: "'angle' must be an double and is required",
            },
          },
        },
        lbsInformation: {
          bsonType: 'object',
          description: "'lbsInformation' must be an object and is required",
          required: [
            'mobileCountry',
            'mobileNetwork',
            'locationArea',
            'cellId',
          ],
          properties: {
            longitudeDirection: {
              bsonType: 'string',
              description:
                "'longitudeDirection' must be an string and is required",
            },
            latitudeDirection: {
              bsonType: 'string',
              description:
                "'latitudeDirection' must be a string and is required",
            },
          },
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

db.createCollection('heartbeat', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      title: 'Device Validator',
      required: [
        'deviceId',
        'dataTime',
        'gpsInformation',
        'updatedAt',
        'createdAt',
      ],
      properties: {
        deviceId: {
          bsonType: 'string',
          description: "'deviceId' must be a string and is required",
        },
        statusInformation: {
          bsonType: 'object',
          description: "'statusInformation' must be an object and is required",
          required: [
            'gasOilElectricity',
            'gpsTracking',
            'alarm',
            'isCharging',
            'acc',
            'defenseActivated',
          ],
          properties: {
            gasOilElectricity: {
              bsonType: 'bool',
              description:
                "'gasOilElectricity' must be a bollean and is required",
            },
            gpsTracking: {
              bsonType: 'bool',
              description: "'gpsTracking' must be an boolean and is required",
            },
            alarm: {
              bsonType: 'string',
              description: "'alarm' must be an string and is required",
            },
            isCharging: {
              bsonType: 'bool',
              description: "'isCharging' must be a boolean and is required",
            },
            acc: {
              bsonType: 'bool',
              description: "'acc' must be an boolean and is required",
            },
            defenseActivated: {
              bsonType: 'bool',
              description:
                "'defenseActivated' must be a boolean and is required",
            },
          },
        },
        voltageLevel: {
          bsonType: 'string',
          description: "'voltageLevel' must be a string and is required",
        },
        gsmSignalStrengthLevel: {
          bsonType: 'string',
          description:
            "'gsmSignalStrengthLevel' must be an string and is required",
        },
        language: {
          bsonType: 'string',
          description: "'language' must be an string and is required",
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
