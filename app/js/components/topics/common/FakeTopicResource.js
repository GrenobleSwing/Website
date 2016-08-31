function FakeTopicResource($timeout, $filter, $q, $resource) {
  this.timeout = $timeout;
  this.filter = $filter;
  this.q = $q;

  this.topics = JSON.stringify([]);

  this.resource = $resource('resources/sample/topics.json', {});

    this.init_();
}

FakeTopicResource.prototype = {

  init_: function init_() {
    this.getTopics_ = this.getTopics_.bind(this);

    this.resource.query(function(topics) {
      this.setTopics_(topics);
    }.bind(this));
  },

  getById : function getById(id) {
      var deferred = this.q.defer();
      var filtered = this.filter('filter')(this.getTopics_(), { id: id });
      var topic = filtered.length ? filtered[0] : null;
      deferred.resolve(topic);
      return deferred.promise;
  },

  getAll: function getAll(params) {
    var deferred = this.q.defer();
    var filtered = this.filter('filter')(this.getTopics_(), params);
    deferred.resolve(filtered);
    return deferred.promise;
  },

    create: function create(topic) {
        var deferred = this.q.defer();

        // simulate api call with $timeout
        var filtered = this.filter('filter')(this.getTopics_(), { id: topic.id });
        if (filtered.length > 0) {
            deferred.resolve({ success: false, message: 'Topic "' + topic.name + '" is already taken' });
        } else {
            var topics = this.getTopics_();

            // assign id
            var lastTopic = topics[topic.length - 1] || { id: 0 };
            infos.id = lastTopic.id + 1;

            // save to local storage
            topics.push(topic);
            this.setTopics_(topics);

            deferred.resolve({ success: true });
        }

        return deferred.promise;
    },

    update: function update(topic) {
        var deferred = this.q.defer();

        var topics = this.getTopics_();
        for (var i = 0; i < topics.length; i++) {
            if (topics[i].id === topic.id) {
                topics[i] = topic;
                break;
            }
        }
        this.setTopics_(topics);
        deferred.resolve();

        return deferred.promise;
    },

    remove: function remove(id) {
        var deferred = $q.defer();

        var topics = this.getTopics_();
        for (var i = 0; i < topics.length; i++) {
            var topic = topics[i];
            if (topic.id === id) {
                topics.splice(i, 1);
                break;
            }
        }
        this.setTopics_(topics);
        deferred.resolve();

        return deferred.promise;
    },

    // private functions
    getTopics_ : function getTopics_() {
        if(!this.topics) {
            this.topics = JSON.stringify([]);
        }

        return JSON.parse(this.topics);
    },

    setTopics_ : function setTopics_(topics) {
        this.topics = JSON.stringify(topics);
    }
};
