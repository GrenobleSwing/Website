function InvoiceRequestDirective() {

  return {
    restrict: 'E',
    controller: 'invoiceRequestController',
    controllerAs: 'ctrl',
    template: '<div class="row">'+
      '<div class="col-md-12"><h2>Demande de facture</h2></div>'+
      '<span class="col-md-1 text-right">'+
      '<input type="checkbox" name="invoice" id="invoice" ng-model="ctrl.invoice" ng-change="ctrl.handleChange()" />'+
      '</span>'+
      '<span class="col-md-11">Cochez cette case si vous souhaitez recevoir une facture</span>'+
      '</div>'
  };
}
