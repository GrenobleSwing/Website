function MembersListController($scope, membersService) {
  this.membersService = membersService;
  this.$scope = $scope;

  this.items = [];

  this.init_();
}


MembersListController.prototype = {
  init_ : function init_() {
    this.refresh_ = this.refresh_.bind(this);
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);

    this.refresh_();
  },

  refresh_ : function refresh_() {
      this.items = this.membersService.getAll().then(this.handleSuccess_, this.handleError_);
  },

  handleSuccess_: function handleSuccess_(data, status, headers, config) {
     this.items = data;
     return data;
  },

  handleError_: function handleError_(data, status, headers, config) {
     alert(JSON.stringify(data));
  }
};
