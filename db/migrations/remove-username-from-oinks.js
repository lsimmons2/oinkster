
module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'oinks',
      'username'
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'oinks',
      'username',
      Sequelize.STRING
    )
  }
}
