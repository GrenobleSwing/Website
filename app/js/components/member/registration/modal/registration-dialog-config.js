angular.module('app.registration.dialog', ['ui.bootstrap', 'app.config', 'ngSanitize'])
    .controller('registrationDialogController', ['$http', '$scope', '$uibModalInstance', 'content', 'config', '$sce', RegistrationDialogController]);
