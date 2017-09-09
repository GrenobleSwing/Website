function RegistrationEditDialogController($http, $scope, $modalInstance, content, config, $sce) {
  this.modalInstance = $modalInstance;
  $scope.trustedHtml = $sce.trustAsHtml(content.data
     .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.acceptRules" ')
     .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
     .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner"')
     .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName" ng-disabled="!formData.registration_withPartner"')
     .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ng-disabled="!formData.registration_withPartner"')
     .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ng-disabled="!formData.registration_withPartner"')
    //  .replace('</form>', '</form><pre>{{formData.registration_withPartner}}</pre>')
  );

  $scope.formData = {};
  $scope.formData.registration_topic = $("input#registration_topic", content.data).val();
  $scope.formData.registration_role = $("select#registration_role", content.data).val();
  $scope.formData.registration_withPartner = $("input#registration_withPartner", content.data).val() === "1";
  $scope.formData.registration_partnerFirstName = $("input#registration_partnerFirstName", content.data).val();
  $scope.formData.registration_partnerLastName = $("input#registration_partnerLastName", content.data).val();
  $scope.formData.registration_partnerEmail = $("input#registration_partnerEmail", content.data).val();

  $scope.cancelForm = function() {
    $modalInstance.dismiss('cancel');
  }

  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    var url = config.apiUrl + action;
    $http({
      method  : method,
      url     : url.replace('/api/api', '/api'),
      data    : {
        "registration[acceptRules]" : $scope.formData.acceptRules,
        "registration[topic]" : $scope.formData.registration_topic,
        "registration[role]" : $scope.formData.registration_role,
        "registration[withPartner]" : $scope.formData.registration_withPartner,
        "registration[partnerFirstName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerFirstName : "",
        "registration[partnerLastName]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerLastName : "",
        "registration[partnerEmail]" : $scope.formData.registration_withPartner ? $scope.formData.registration_partnerEmail : ""
      },
      headers : { 'Content-Type': 'application/x-www-form-urlencoded' },  // set the headers so angular passing info as form data (not request payload)
      transformRequest : function transformRequest( data, getHeaders ) {
					var headers = getHeaders();
          if ( ! angular.isObject( data ) ) {
						return( ( data == null ) ? "" : data.toString() );
					}
					var buffer = [];
					// Serialize each key in the object.
					for ( var name in data ) {
						if ( ! data.hasOwnProperty( name ) ) {
							continue;
						}
						var value = data[ name ];
						buffer.push(
							encodeURIComponent( name ) +
							"=" +
							encodeURIComponent( ( value == null ) ? "" : value )
						);
					}
					// Serialize the buffer and clean it up for transportation.
					var source = buffer
						.join( "&" )
						.replace( /%20/g, "+" )
					;
					return( source );
				}
     })
    .then(function(data) {
      if (data.status == 204) {
        this.ctrl.modalInstance.close('close');
      } else {
        // this.modalInstance.dismiss('cancel');
      }
    }.bind(this), function(error) {
      $scope.trustedHtml = $sce.trustAsHtml(error.data
         .replace(' name="registration[acceptRules]" ', ' name="registration[acceptRules]" ng-model="formData.acceptRules" ')
         .replace(' name="registration[role]" ', ' name="registration[role]" ng-model="formData.registration_role" ')
         .replace(' name="registration[withPartner]" ', ' name="registration[withPartner]" ng-model="formData.registration_withPartner" ')
         .replace(' name="registration[partnerFirstName]" ', ' name="registration[partnerFirstName]" ng-model="formData.registration_partnerFirstName" ')
         .replace(' name="registration[partnerLastName]" ', ' name="registration[partnerLastName]" ng-model="formData.registration_partnerLastName" ')
         .replace(' name="registration[partnerEmail]" ', ' name="registration[partnerEmail]" ng-model="formData.registration_partnerEmail" ')
      );
    });
  }
}
