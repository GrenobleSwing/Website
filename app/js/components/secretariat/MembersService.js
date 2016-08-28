function MembersService(membersResource) {
  this.membersResource = membersResource;

  this.init_();
}


MembersService.prototype = {

  init_ : function init_() {
    this.handleSuccess_ = this.handleSuccess_.bind(this);
    this.handleError_ = this.handleError_.bind(this);
  },

  getAll: function getAll() {
    return  this.membersResource.getAll().then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
  },

  // private functions
  handleSuccess_ : function handleSuccess_(res) {
      return res;
  },

  handleError_: function handleError_(error) {
      return function () {
          return { $ok: false, message: error };
      };
  }
};
