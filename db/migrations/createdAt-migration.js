module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.renameTable('Oinks', 'oinks');
    queryInterface.renameTable('Users', 'users');
  },
  down: function(queryInterface, Sequelize) {
    return
  }
}
