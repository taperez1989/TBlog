// this is a module included in the node.js package that provides utilities for working wwith files and directory paths
const path = require("path");

// first part allows access to the dotenv module. The ".config" is provided by dotenv and configures how the env file is loaded
// the "path: path.resolve" is brought in by the node module and constructs an absolute path to the .env file. it is an object passed as an argument to the ".config()" method.
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// brings in the sequelize module for use
const sequelize = require("sequelize");

// the sequelize var is initialized based on the presence of of 'process.env.DB_URL'.
// if not provided, sequelize will then use individual environment variables. 'DB_NAME, USER, AND PASSWORD' along with default options 'localhost and postgres' in order to establish a connection to postgreSQL DB running locally or on specific host.
const connection = process.env.DB_URL
  ? new sequelize(process.env.DB_URL)
  : new sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "postgres",
        dialectoptions: {
          deicimalNumbers: true,
        },
      },
    );

module.exports = connection;
