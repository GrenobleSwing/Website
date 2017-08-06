function RegistrationDialogController($http, $scope, $modalInstance, content, config, $sce) {
  this.modalInstance = $modalInstance;
  $scope.trustedHtml = $sce.trustAsHtml(content.data);

  $scope.formData = {};
  $scope.formData.registration__token = $("input#registration__token", content.data).val();
  $scope.formData.topic = $("input#registration_topic", content.data).val();

  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      data    : {
        "registration[_token]" :	$scope.formData.registration__token,
        "registration[topic]" : $scope.formData.topic
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
      if (data.status == 201) {
        this.ctrl.modalInstance.close('close');
      } else {
        // this.modalInstance.dismiss('cancel');
      }
    }.bind(this), function(error) {
      $scope.trustedHtml = $sce.trustAsHtml(error.data);
    });
  }
}
