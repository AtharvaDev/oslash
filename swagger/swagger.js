const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger/swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "oslash",
    description: "",
  },
  host: "",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],

  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "authorization", // name of the header, query parameter or cookie
      description: "Authorization Bearer Token for authentication",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("../index.js");
});
