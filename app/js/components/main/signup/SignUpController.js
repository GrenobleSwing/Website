function SignUpController($http, config, $scope, $sce, content, $compile, $state) {

  $scope.registerDone = false;
  $scope.registerSuccessful = false;
  $scope.formData = {};
  // $scope.formData.user__token = content.match('value="(.*)" ')[1];

  $scope.trustedHtml = $sce.trustAsHtml(content
     .replace("$element.action, $element.method", "$event, '/user', 'POST'")
     .replace(' id="user_email" ', ' id="user_email" ng-model="formData.user_email" ')
     .replace(' id="user_plainPassword_first" ', ' id="user_plainPassword_first" ng-model="formData.user_plainPassword_first" ')
     .replace(' id="user_plainPassword_second" ', ' id="user_plainPassword_second" ng-model="formData.user_plainPassword_second" '));

   $scope.cancelForm = function() {
     $state.go('index.login');
   }

  // process the form
  $scope.processForm = function($event, method, action) {
    // // console.info($event);
    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      // data : $.param($scope.formData),
      data    : {
        "user[email]" :	$scope.formData.user_email,
        "user[plainPassword][first]" :	$scope.formData.user_plainPassword_first,
        "user[plainPassword][second]" :	$scope.formData.user_plainPassword_second,
        "user[register]" :	""
        // ,"user[_token]" :	$scope.formData.user__token
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
      // console.log(data);
      $scope.registerDone = true;
      if (data.status != 201) {
        $scope.registerSuccessful = false;
      } else {
        // if successful, bind success message to message
        $scope.registerSuccessful = true;
      }
    }, function(error) {
      // console.log(error);

      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace("$element.action, $element.method", "$event, \"/user\", \"POST\"")
        .replace(' id="user_email" ', ' id="user_email" ng-model="formData.user_email" ')
        .replace(' id="user_plainPassword_first" ', ' id="user_plainPassword_first" ng-model="formData.user_plainPassword_first" ')
        .replace(' id="user_plainPassword_second" ', ' id="user_plainPassword_second" ng-model="formData.user_plainPassword_second" '));
    });
  }
}
