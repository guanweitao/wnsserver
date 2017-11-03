const Sequelize = require('sequelize')
var sequelize = new Sequelize('wnsserver', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql'
})
const _dateBase = module.exports = {};

/**
 * user 用户
 */
_dateBase.user = sequelize.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  money: Sequelize.STRING
})
