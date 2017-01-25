
module.exports = {

  up: function(queryInterface, Sequelize) {
    queryInterface.dropAllTables();
  },

  down: function(queryInterface, Sequelize) {
    return;
  }

}
