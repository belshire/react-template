require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

// console.log(process.env);

const ApiEnvironments = {
  prod: 'http://m.jcpenney.com',
  te1: 'http://m-dt-test1.jcpenney.com',
  te2: 'http://m-dt-test2.jcpenney.com',
  te3: 'http://m-dt-test3.jcpenney.com',
  te4: 'http://m-dt-test4.jcpenney.com',
  dv1: 'http://m-dt-dev1.jcpenney.com',
  dv2: 'http://m-dt-dev2.jcpenney.com',
  dv3: 'http://m-dt-dev3.jcpenney.com',
  dv4: 'http://m-dt-dev4.jcpenney.com'
};

module.exports = Object.assign({
  port: process.env.PORT,
  ApiEnv: process.env.API_ENV || 'prod',
  setApiEnv(env) {
    if (env in ApiEnvironments) {
      this.ApiEnv = env;
    }

    return;
  },
  getApiUrl() {
    return ApiEnvironments[this.ApiEnv];
  },
  app: {
    title: 'JCPenney | Find the best deals on Clothing, Furniture, and more! - JCPenney',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'JCPenney',
        'og:locale': 'en_US',
        'og:title': 'JCPenney | Find the best deals on Clothing, Furniture, and more! - JCPenney'
      }
    }
  }
}, environment);
