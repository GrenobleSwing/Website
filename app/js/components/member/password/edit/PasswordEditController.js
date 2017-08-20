function PasswordEditController($http, config, $scope, $sce, content, $compile, userDetails) {

    $scope.saveDone = false;
    $scope.saveSuccessful = false;
    $scope.formData = {};
    $scope.formData.user__token = $("input#fos_user_change_password_form__token", content).val();
    $scope.trustedHtml = $sce.trustAsHtml(content
       .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
       .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
       .replace(' name="fos_user_change_password_formser[plainPassword][second]" ', '  ')
       .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
       .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
       .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));

    // process the form
    $scope.processForm = function($event, method, action) {
      console.info($event);
      $event.preventDefault();

      $http({
        method  : method,
        url     : config.apiUrl + action,
        // data : $.param($scope.formData),
        data    : {
          "fos_user_change_password_form[current_password]" :	$scope.formData.current_password,
          "fos_user_change_password_form[plainPassword][first]" :	$scope.formData.plainPassword_first,
          "fos_user_change_password_form[plainPassword][second]" :	$scope.formData.plainPassword_second,
          "fos_user_change_password_form[_token]" :	$scope.formData.user__token
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
        // $scope.saveDone = true;
        if (data.status != 200) {
          $scope.saveSuccessful = false;
        } else {
          // if successful, bind success message to message
          $scope.saveSuccessful = true;

          $scope.trustedHtml = $sce.trustAsHtml(data.data
            .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
            .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
            .replace(' name="ufos_user_change_password_formser[plainPassword][second]" ', '  ')
            .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
            .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
            .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));
        }
      }, function(error) {
        console.log(error);

        $scope.trustedHtml = $sce.trustAsHtml(error.data
          .replace(' name="fos_user_change_password_form[current_password]" ', '  ')
          .replace(' name="fos_user_change_password_form[plainPassword][first]" ', '  ')
          .replace(' name="ufos_user_change_password_formser[plainPassword][second]" ', '  ')
          .replace(' id="fos_user_change_password_form_current_password" ', ' id="fos_user_change_password_form_current_password" ng-model="formData.current_password" ')
          .replace(' id="fos_user_change_password_form_plainPassword_first" ', ' id="fos_user_change_password_form_plainPassword_first" ng-model="formData.plainPassword_first" ')
          .replace(' id="fos_user_change_password_form_plainPassword_second" ', ' id="fos_user_change_password_form_plainPassword_second" ng-model="formData.plainPassword_second" '));
      });
    }
};
