const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Direccion = require('./direccion');
const Agenda = require('./agenda');
const Expediente = require('./expediente');

const Persona = sequelize.define('persona', {
   id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
   },
   nombre: {type: Sequelize.STRING},
   apepat: {type: Sequelize.STRING},
   apemat: {type: Sequelize.STRING},
   fecha_nacimiento: {type: Sequelize.DATE},
   sexo: {type: Sequelize.STRING},
   sangre: {type: Sequelize.STRING},
   altura: {type: Sequelize.STRING},
   peso: {type: Sequelize.STRING},
   deleted: {type: Sequelize.BOOLEAN}
}, {
   tableName: 'persona',
   timestamps: false
});

Persona.hasMany(Direccion,{foreignKey:'persona_id',targetKey:'id',as:'direccion'});

Persona.hasMany(Agenda,{foreignKey:'persona_id',targetKey:'id',as:'agenda'});

Persona.hasMany(Expediente,{foreignKey:'persona_id',targetKey:'id',as:'expediente'});


/*Author.associate = (models) => {
   Author.hasMany(models.post);
   User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
   User.belongsToMany(models.WorkingDay, {through: 'UsersWorkingDays', foreignKey: 'userId', as: 'days'})
};*/

module.exports = Persona;
