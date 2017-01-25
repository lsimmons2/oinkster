
module.exports = {

  up: function(queryInterface, Sequelize) {
    queryInterface.bulkCreate(
      'users',
        [
          {
            firstName: 'bob',
            lastName: 'bob',
            username: 'bob',
            email: 'bob@bob.com',
            bio:'yo soy bob',
            picture: null,
            password: 'bob',
            salt: 'bob'
          }
        ]
    )
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropeTable('users')
  }

}
