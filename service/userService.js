const dbconnect = require("../database/db");
const bcrypt = require("../util/bcrypt");
const jwt = require("jsonwebtoken");
const { OslashException } = require("../exceptions/oslashException");

exports.registerUser = async (name, email, password) => {
  const hash = await bcrypt.createHashPassowrd(password);
  const query =
    "INSERT INTO users (name, email, password, created_date) VALUES ($1, $2, $3, now()) RETURNING *";
  const params = [name, email, hash];
  const result = await dbconnect(query, params);
  console.log(result.rows);
  if (result.rows.length > 0) {
    return result.rows[0].id;
  }
  throw new OslashException(500, "Internal Server Error");
};

exports.loginUser = async (email, password) => {
  const query = "SELECT * FROM users WHERE email = $1 AND active = true";
  const params = [email];
  const result = await dbconnect(query, params);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    const isPasswordCorrect = await bcrypt.verifyPassword(
      password,
      user.password
    );
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return token;
    } else {
      throw new OslashException(401, "Invalid Credentials");
    }
  } else {
    throw new OslashException(401, "Invalid Credentials");
  }
};

exports.getUsers = async () => {
  const query = "SELECT * FROM users";
  const result = await dbconnect(query);
  return result.rows;
};

exports.getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const params = [id];
  const result = await dbconnect(query, params);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  throw new OslashException(404, "User not found");
};

exports.updateUser = async (name, email, id) => {
  const query =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id";
  const params = [name, email, id];
  const result = await dbconnect(query, params);
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  throw new OslashException(500, "Internal Server Error");
};

exports.deleteUser = async (id) => {
  const query = "UPDATE users SET active = false WHERE id = $1";
  const params = [id];
  await dbconnect(query, params);
};

exports.checkIfUserExists = async (id) => {
  const query = "SELECT EXISTS (SELECT 1 FROM users WHERE id = $1 AND active = true)";
  const params = [id];
  const result = await dbconnect(query, params);
  return result.rows[0].exists;
};
