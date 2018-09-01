/**
 * Contrôleur chargé d'afficher la page de remise à zéro du mot de passe
 * 
 * @param {*} $http 
 * @param {*} config 
 * @param {*} $scope 
 * @param {*} $sce 
 * @param {*} content 
 * @param {*} $compile 
 */
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
    .then(function(response) {
      console.log(response);
      $scope.registerDone = true;
      if (response.status == 302 || response.status == 200) {
        // if successful, bind success message to message
        $scope.registerSuccessful = true;
        $scope.successResponse = $sce.trustAsHtml(response.data);
      } else {
        $scope.registerSuccessful = false;
      }
    }, function(error) {
      console.log(error);
      $scope.registerDone = false;
      $scope.registerSuccessful = false;
      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace(' id="username" ', ' id="username" ng-model="formData.username" '));
    });
  }
}
