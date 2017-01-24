module.exports = {
  up: function(queryInterface, Sequelize) {
    queryInterface.addColumn(
      'oinks',
      'createdAt',
      Sequelize.STRING
    )
  },
  down: function(queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'oinks',
      'createdAd'
    )
  }
}
