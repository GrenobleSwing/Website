function PaymentDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'components/member/payment/cart.html',
    controller: 'paymentController',
    controllerAs: 'ctrl'
  };
}
