function PasswordResetController($http, config, $scope, $sce, content, $compile) {

  $scope.registerDone = false;
  $scope.registerSuccessful = false;
  $scope.formData = {};
  $scope.formData.user__token = content.match('value="(.*)" ')[1];

  $scope.trustedHtml = $sce.trustAsHtml(content
     .replace(' id="username" ', ' id="username" ng-model="formData.username" '));

  // process the form
  $scope.processForm = function($event, method, action) {

    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      // data : $.param($scope.formData),
      data    : {
        "username" :	$scope.formData.username
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
      console.log(data);
      $scope.registerDone = true;
      if (data.status != 302) {
        $scope.registerSuccessful = false;
      } else {
        // if successful, bind success message to message
        $scope.registerSuccessful = true;
      }
    }, function(error) {
      console.log(error);

      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace(' id="username" ', ' id="username" ng-model="formData.username" '));
    });
  }
}
