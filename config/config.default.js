/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574394634433_3537';

  // add your middleware config here
  config.middleware = ['errorHandler', 'jwt'];
  config.errorHandler = {
    match: '/admin'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    // operatorsAliases: false,
    username: 'root',
    password: '7014@ljc',
    database: 'flutter_blog_dev',
  };
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIOS'
  }

  config.jwt = {
    secret: 'egg-api-jwt',
    // match: ['/admin', '/user'],
    ignore: ['/user/checkLogin', '/user/addComment', '/default/']
  }
  config.cluster = {
    listen: {
      path: '',
      port: 7000,
      // hostname: '192.168.43.247',
      hostname: '192.168.137.1',
      // hostname: '10.112.6.156',
      // hostname: '47.94.128.127',
    }
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0,
    },
  }

  return {
    ...config,
    ...userConfig,
  };


};
