require("dotenv").config();
const { Pool, Client } = require("pg");
const { OslashException } = require("../exceptions/oslashException");

let client, pool;

const dbconnect = async (query, params) => {
  const config = {
    user: `${process.env.DB_USER}`,
    host: `${process.env.DB_HOST}`,
    database: `${process.env.DB_DATABSE_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    port: process.env.DB_PORT,
  };
  try {
    if (client == null) {
      client = new Client(config);
      client
        .connect()
        .then(() => console.log("Connected"))
        .catch((err) => console.log("connection error", err.stack));
    }
    if (pool == null) {
      pool = new Pool(config);
    }
    if (params && params.length > 0) {
      return await pool.query(query, params);
    } else {
      return await pool.query(query);
    }
  } catch (error) {
    console.error("Error in query ", query, params);
    throw new OslashException(500, `Error in query ${query}, ${params}`);
  }
};

module.exports = dbconnect;
