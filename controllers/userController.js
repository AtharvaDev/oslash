const dbconnect = require("../database/db");
const bcrypt = require("../util/bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../service/userService");
const { OslashException } = require("../exceptions/oslashException");

exports.register = async (req, res) => {
  // #swagger.description = 'API for user registration';
  // #swagger.tags = ['User Module']
  /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "User details",
                required: true,
                type: 'object',
                schema: { $name: "string", $email: "string", $password: "string" }
        } */

  try {
    const { name, email, password } = req.body;
    const userId = await userService.registerUser(name, email, password);
    res.send(`User id ${userId} created successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  // #swagger.description = 'API for user login';
  // #swagger.tags = ['User Module']
  /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "User details",
                required: true,
                type: 'object',
                schema: { $email: "string", $password: "string" }
        } */

  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.send({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof OslashException) {
      res.status(error.status).send(error.message);
    }
    res.status(500).send("Internal Server Error");
  }
};

exports.getUsers = async (req, res) => {
  // #swagger.description = 'API to get details of all the users';
  // #swagger.tags = ['User Module']

  try {
    const result = await userService.getUsers();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getUser = async (req, res) => {
  // #swagger.description = 'API to user details of a single user';
  // #swagger.tags = ['User Module']

  try {
    const id = req.userId;
    const result = await userService.getUserById(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateUser = async (req, res) => {
  // #swagger.description = 'API to update user deatils';
  // #swagger.tags = ['User Module']
  /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "User details",
                required: true,
                type: 'object',
                schema: { $name: "string", $email: "string" }
        } */

  try {
    const id = req.userId;
    const { name, email } = req.body;
    const result = await userService.updateUser(name, email, id);
    res.send(`User details for ${result.id} updated successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  // #swagger.description = 'API to delete a user';
  // #swagger.tags = ['User Module']
  try {
    const id = req.userId;
    const exists = await userService.checkIfUserExists(id);
    console.log(exists);
    if (exists) {
      await userService.deleteUser(id);
      res.send(`User id ${id} deleted successfully`);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
