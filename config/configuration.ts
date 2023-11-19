export default () => ({
  ygt92: {
    port: Number(process.env.YGT92_PORT),
  },
  es353: {
    port: Number(process.env.ES353_PORT),
  },
  mongodb: {
    connectionString: process.env.MONGO_DB_CONNECTION_STRING,
    serverApi: {
      version: process.env.MONGO_DB_SERVER_API_VERSION,
      strict: Boolean(process.env.MONGO_DB_SERVER_API_STRICT),
      deprecationErrors: Boolean(
        process.env.MONGO_DB_SERVER_API_DEPRECATION_ERRORS,
      ),
    },
    name: process.env.MONGO_DB_DB_NAME,
  },
});
