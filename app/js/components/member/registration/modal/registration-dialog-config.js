angular.module('app.registration.dialog', ['ui.bootstrap', 'app.config', 'ngSanitize'])
    .controller('registrationEditDialogController', ['$http', '$scope', '$uibModalInstance', 'content', 'config', '$sce', RegistrationEditDialogController])
    .controller('registrationDialogController', ['$http', '$scope', '$uibModalInstance', 'content', 'config', '$sce', RegistrationDialogController]);
