function SubscriptionObservableService() {
  this.listeners = [];
}

SubscriptionObservableService.prototype = {
  addListener: function addListener(callback) {
    this.listeners.push(callback);
  },

  removeListener: function removeListener(callback) {
    var index = this.listeners.indexOf(callback);
    this.listeners.splice(index, 1);
  },

  notifyListeners: function notifyListeners(data) {
    for (var i = 0; i < this.listeners.length; i++) {
      this.listeners[i](data);
    }
  }
};
