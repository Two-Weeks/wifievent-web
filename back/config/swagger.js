const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
      version: "0.0.0",
      title: "WiFi Event API",
      description: "WiFi Event"
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
      apiKeyAuth:{
          type: "apiKey",
          in: "header",       // can be "header", "query" or "cookie"
          name: "X-API-KEY",  // name of the header, query parameter or cookie
          description: "any description..."
      }
  },
}

const outputFile = './config/swagger_output.json';
const endpointsFiles = [
  './routes/index.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);