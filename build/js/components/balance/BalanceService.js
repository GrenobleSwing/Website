function BalanceService(resource) {
  this.balanceResource = resource;

  this.init_();
}

BalanceService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getAmountByUser: function getAmountByUser(user) {
        return this.balanceResource.getByUserId(user.id).then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    getAllAmounts: function getAllAmounts() {
        return this.balanceResource.getAll().then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
    },

    // private functions
    handleSuccess_ : function handleSuccess_(res) {
        res.$ok = true;
        return res;
    },

    handleError_: function handleError_(error) {
        return function () {
            return { $ok: false, message: error };
        };
    }
};
