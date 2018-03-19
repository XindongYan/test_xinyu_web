export const ORIGIN = {
    production: 'http://api.nicai360.com',
    test: 'http://testapi.nicai360.com',
    // development: 'http://testapi.nicai360.com',
    development: `http://${location.hostname}:3000`,
  }[process.env.NODE_ENV || 'development'];