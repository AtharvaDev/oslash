const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const basicAuth = require('express-basic-auth')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(3000, () => {
  console.log("oslash app listening on port 3000!");
});


app.use('/api-docs', basicAuth({
  users: { 'root': 'root' },
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerFile))

