'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.validate = {
  enable: true,
  package: 'egg-validate'
}
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
exports.redis = {
  enable: true,
  package: 'egg-redis',
};