function TopicTypeService(resource) {
  this.typeResource = resource;

  this.init_();
}

TopicTypeService.prototype = {

    init_ : function init_() {
        this.handleSuccess_ = this.handleSuccess_.bind(this);
        this.handleError_ = this.handleError_.bind(this);
    },

    getAllTypes: function getAllTypes() {
        return this.typeResource.getAll().then(this.handleSuccess_, this.handleError_('Error retrieving subscriptions by User'));
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