const Sequelize = require('sequelize');
const fs = require('fs');
const path = require ('path');

const sequelize = new Sequelize('database','','',{
  dialect: 'sqlite',
  storage: './database.sqlite',
  isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
   autocommit: true,
});

module.exports = sequelize;
