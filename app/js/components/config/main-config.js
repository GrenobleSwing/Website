angular
  .module('app.config', [])
  .constant('config', {
    apiUrl: 'http://localhost:8001',
    baseUrl: '/',
    enableDebug: true
  });
