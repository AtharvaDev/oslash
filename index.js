const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');
const basicAuth = require('express-basic-auth')
const morgan = require('morgan')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

app.listen(3000, () => {
  console.log("oslash app listening on port 3000!");
});


app.use('/api-docs', basicAuth({
  users: { 'root': 'root' },
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerFile))

const userRoute = require("./routes/userRoute");
app.use('/users', userRoute);

const dbconnect = require("./database/db");

app.get("/users", async (req, res) => {
  const query = "SELECT * FROM users";
  const result = await dbconnect(query);
  res.send(result.rows);
});

app.post("/student", (req, res) => {
  const name = req.query.name;
  const rollNo = req.query.rollNo;
  const newObj =  {name: name, rollNo: rollNo };
  const tmepobj = { ...student, ...newObj };
  student = tmepobj;
  console.log(student);
  res.send(student);
});
