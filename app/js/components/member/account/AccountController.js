function AccountController($http, config, userDetails, $sce, $scope) {
  $scope.saveDone = false;
  $scope.saveSuccessful = false;
  $scope.formData = {};

  $http.get(config.apiUrl + '/account/'+userDetails.id+'/edit').then(function(response) {
    $scope.formData.account__token = $("input#account__token", response.data).val();

    $scope.trustedHtml = $sce.trustAsHtml(response.data
       .replace(' name="account[firstName]" ', ' name="account[firstName]" ng-model="formData.account_firstName" ')
       .replace(' name="account[lastName]" ', ' name="account[lastName]" ng-model="formData.account_lastName" ')
       .replace(' name="account[phoneNumber]" ', ' name="account[lastName]" ng-model="formData.account_phoneNumber" ')
       .replace(' name="account[birthDate]" ', ' name="account[birthDate]" ng-model="formData.account_birthDate" gs-datepicker ')
       .replace(' name="account[address][street]" ', ' name="account[address][street]" ng-model="formData.account_address_street" ')
       .replace(' name="account[address][city]" ', ' name="account[address][city]" ng-model="formData.account_address_city" ')
       .replace(' name="account[address][zipCode]" ', ' name="account[address][zipCode]" ng-model="formData.account_address_zipCode" ')
       .replace(' name="account[address][state]" ', ' name="account[address][state]" ng-model="formData.account_address_state" ')
       .replace(' name="account[address][country]" ', ' name="account[address][country]" ng-model="formData.account_address_country" ')
     );

     var date = userDetails.birthDate.match(/(\d{4})-(\d{2})-(\d{2})/);

     $scope.formData.account_firstName = userDetails.firstName;
     $scope.formData.account_lastName = userDetails.lastName;
     $scope.formData.account_phoneNumber = userDetails.phoneNumber;
     $scope.formData.account_birthDate_month = date[2].replace("0", "");
     $scope.formData.account_birthDate_day = date[3].replace("0", "");
     $scope.formData.account_birthDate_year = date[1];
     $scope.formData.account_birthDate = date[0];
     $scope.formData.account_address_street = userDetails.address.street;
     $scope.formData.account_address_city = userDetails.address.city;
     $scope.formData.account_address_zipCode = userDetails.address.zipCode;
     $scope.formData.account_address_state = userDetails.address.state;
     $scope.formData.account_address_country = userDetails.address.country;
  }.bind(this));

  $scope.processForm = function($event, method, action) {
    console.info($event);
    $event.preventDefault();

    $http({
      method  : method,
      url     : config.apiUrl + action,
      data    : {
        "account[firstName]" :	$scope.formData.account_firstName,
        "account[lastName]" :	$scope.formData.account_lastName,
        "account[phoneNumber]" :	$scope.formData.account_phoneNumber,
        "account[birthDate]" :	$scope.formData.account_birthDate,
        "account[address][street]" : $scope.formData.account_address_street,
        "account[address][city]" : $scope.formData.account_address_city,
        "account[address][zipCode]" : $scope.formData.account_address_zipCode,
        "account[address][state]" : $scope.formData.account_address_state,
        "account[address][country]" : $scope.formData.account_address_country
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
      $scope.saveDone = true;
      if (data.status != 204) {
        $scope.saveSuccessful = false;
      } else {
        // if successful, bind success message to message
        $scope.saveSuccessful = true;
      }
    }, function(error) {
      console.log(error);
      $scope.saveDone = true;
      $scope.saveSuccessful = false;

      $scope.trustedHtml = $sce.trustAsHtml(error.data
        .replace(' name="account[firstName]" ', ' name="account[firstName]" ng-model="formData.account_firstName" ')
        .replace(' name="account[lastName]" ', ' name="account[lastName]" ng-model="formData.account_lastName" ')
        .replace(' name="account[phoneNumber]" ', ' name="account[lastName]" ng-model="formData.account_phoneNumber" ')
        .replace(' name="account[birthDate][month]" ', ' name="account[birthDate][month]" ng-model="formData.account_birthDate_month" ')
        .replace(' name="account[birthDate][day]" ', ' name="account[birthDate][day]" ng-model="formData.account_birthDate_day" ')
        .replace(' name="account[birthDate][year]" ', ' name="account[birthDate][year]" ng-model="formData.account_birthDate_year" ')
        .replace(' name="account[address][street]" ', ' name="account[address][street]" ng-model="formData.account_firstName" ')
        .replace(' name="account[address][city]" ', ' name="account[address][city]" ng-model="formData.account_city" ')
        .replace(' name="account[address][zipCode]" ', ' name="account[address][city]" ng-model="formData.account_zipCode" ')
        .replace(' name="account[address][state]" ', ' name="account[address][state]" ng-model="formData.account_state" ')
        .replace(' name="account[address][country]" ', ' name="account[address][country]" ng-model="formData.account_country" ')
      );
    });
  }
}
