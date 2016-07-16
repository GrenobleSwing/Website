function FakeAccountResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.accounts = JSON.stringify([]);

  this.resource = $resource('resources/sample/accounts.json', {});

    this.init_();
}

FakeAccountResource.prototype = {

  init_: function init_() {
    this.getAccounts_ = this.getAccounts_.bind(this);

    this.resource.query(function(accounts) {
      this.setAccounts_(accounts);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getAccounts_(), { id: id });
      var account = filtered.length ? filtered[0] : null;
      deferred.resolve(account);
      return deferred.promise;
  },

    getByUserId : function getByUserId(userId) {
        var deferred = this.q.defer();
        var filtered = this.filter('filter')(this.getAccounts_(), { userId: userId });
        var account = filtered.length ? filtered[0] : {};
        deferred.resolve(account);
        return deferred.promise;
    },

    create: function create(account) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
        var filtered = this.filter('filter')(this.getAccounts_(), { id: account.id });
        if (filtered.length > 0) {
            deferred.resolve({ success: false, message: 'Account "' + account.name + '" is already taken' });
        } else {
            var accounts = this.getAccounts_();

            // assign id
            var lastAccount = accounts[account.length - 1] || { id: 0 };
            infos.id = lastAccount.id + 1;

            // save to local storage
            accounts.push(account);
            this.setAccounts_(accounts);

            deferred.resolve({ success: true });
        }

        return deferred.promise;
    },

    update: function update(account) {
        var deferred = this.q.defer();

        var accounts = this.getAccounts_();
        for (var i = 0; i < infos.length; i++) {
            if (accounts[i].id === info.id) {
                accounts[i] = account;
                break;
            }
        }
        this.setAccounts_(accounts);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var accounts = this.getAccounts_();
        for (var i = 0; i < accounts.length; i++) {
            var account = accounts[i];
            if (account.id === id) {
                accounts.splice(i, 1);
                break;
            }
        }
        this.setAccounts_(accounts);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getAccounts_ : function getAccounts_() {
        if(!this.accounts) {
            this.accounts = JSON.stringify([]);
        }

        return JSON.parse(this.accounts);
    },

    setAccounts_ : function setAccounts_(accounts) {
        this.accounts = JSON.stringify(accounts);
    }
};
