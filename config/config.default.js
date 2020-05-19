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
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIOS'
  }

  config.jwt = {
    secret: 'egg-api-jwt',
    // match: ['/admin', '/user'],
    ignore: ['/user/checkLogin', '/user/register', '/admin/checkLogin', '/admin/', '/default/']
  }
  config.cluster = {
    listen: {
      path: '',
      port: 7000,
      // hostname:
      // port: 7001,
      hostname: '127.0.0.1',
      // hostname: '192.168.43.247',
      // hostname: '192.168.137.1',
      // hostname: '10.112.6.156',
      //hostname: '47.94.128.127',
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

  // config.onerror = {
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = 'error';
  //     ctx.status = 500;
  //   },
  //   html(err, ctx) {
  //     // html hander
  //     ctx.body = '<h3>error</h3>';
  //     ctx.status = 500;
  //   },
  //   json(err, ctx) {
  //     // json hander
  //     ctx.body = { message: 'error' };
  //     ctx.status = 500;
  //   },
  //   jsonp(err, ctx) {
  //     // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
  //   },
  // };

  return {
    ...config,
    ...userConfig,
  };


};
