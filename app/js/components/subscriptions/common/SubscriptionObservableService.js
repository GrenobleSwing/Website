function SubscriptionObservableService() {
  this.listeners = [];
}

SubscriptionObservableService.prototype = {
  addListener: function addListener(callback) {
    console.info("SubscriptionObservableService#addListener");
    this.listeners.push(callback);
  },

  removeListener: function removeListener(callback) {
    var index = this.listeners.indexOf(callback);
    this.listeners.splice(index, 1);
  },

  notifyListeners: function notifyListeners(data) {
    console.info("SubscriptionObservableService#notifyListeners on " + this.listeners.length + " listeners");
    console.info(data);
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i](data);
    }
  }
};
