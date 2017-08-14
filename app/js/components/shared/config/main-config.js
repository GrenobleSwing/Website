angular
  .module('app.config', [])
  .constant('config', {
    // apiUrl: 'http://localhost/api',
    apiUrl: '@API_URL@',
    baseUrl: '/',
    enableDebug: true
  });
