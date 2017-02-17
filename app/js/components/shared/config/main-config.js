angular
  .module('app.config', [])
  .constant('config', {
    apiUrl: 'http://localhost:8001/api/v1',
    baseUrl: '/',
    enableDebug: true
  });
