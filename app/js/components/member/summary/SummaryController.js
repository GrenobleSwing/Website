function SummaryController($scope, $http, userDetails, config) {
  this.http = $http;
  this.userDetails = userDetails;

  this.$ok = false;
  this.totalAmount = 0;
  this.list = $http.get(config.apiUrl + '/account/'+userDetails.id+'/balance').then(function(response) {
    var data = response.data.details;
    this.list = [];
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        this.list.push({
          "name" : k,
          "data": data[k]["Cours"]
        });
      }
    }
    this.$ok = true;
    this.totalAmount = response.data.totalBalance;
  }.bind(this));

  /*
  this.client = {
    sandbox : "0",
    production: "0"
  };

  this.payment = function() {
    return paypal.request.post(config.apiUrl + '/paypal/create-payment?accountId='+userDetails.id);
  };

  this.onAuthorize = function(data, actions) {
    console.log('The payment was authorized !');
    console.info(data);
    return actions.payment.execute();
  };
  */

  $scope.opts = {
    // Pass the client ids to use to create your transaction on sandbox and production environments
    client: {
        sandbox:    'Ae4jgb4s1ExAngKX-6hqb19kM0bSHG9qTKc9N8gj3gmKD8uV6FM6TN4KQVcw251wmTA3tvopl5jewjkD', // from https://developer.paypal.com/developer/applications/
        production: 'AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl'  // from https://developer.paypal.com/developer/applications/
    },
    // Pass the payment details for your transaction
    // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters

    env: 'sandbox',
    payment: function() {
        console.log('payment');
        //console.log(this.props.env);
        //console.log(this.props.client);

        return paypal.request.post(config.apiUrl + '/paypal/create-payment?accountId='+userDetails.id);
        /*return paypal.rest.payment.create(this.props.env, this.props.client, {
            transactions: [
                {
                    amount: {
                        total:    '1.00',
                        currency: 'USD'
                    }
                }
            ]
        });*/
    },
    // Display a "Pay Now" button rather than a "Continue" button
    commit: true,
    // Pass a function to be called when the customer completes the payment
    onAuthorize: function(data, actions) {
        console.log('authorize');
        console.log(data);
        console.log(actions);
        return actions.payment.execute().then(function(res) {
          console.log(res);
          console.log('The payment was completed!');
        });
    },
    // Pass a function to be called when the customer cancels the payment
    onCancel: function(data) {
        console.log('cancel');
        console.log(data);
        console.log('The payment was cancelled!');
    },
    style : {
        shape:'rect',
        size: 'small',
        color: 'blue'
    }
  };
}
