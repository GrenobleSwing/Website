function TopicEditController(modalInstance, topicService, topic) {
  this.modalInstance = modalInstance;
  this.topicService = topicService;

  this.topic = angular.copy(topic);
  this.nestedTopics = [];
  this.topicTypes = [
    {id: "year", label: "Année"},
    {id: "adhesion", label: "Adhésion"},
    {id: "duet", label: "Danse de couple"},
    {id: "solo", label: "Solo Jazz"}];
  this.tmpTeacher = "";
  this.init_();
}

TopicEditController.prototype = {
  init_: function init_() {
    if (!this.topic.teachers) {
      this.topic.teachers = [];
    }

    this.topicService.queryTopics({parent: true, active: true}).then(function(data) {
      this.nestedTopics = data;
    }.bind(this));
  },

  apply: function apply() {
    this.modalInstance.close(this.topic);
  },

  cancel : function cancel() {
    this.modalInstance.dismiss('cancel');
  },

  showTeachers : function showTeachers() {
    return this.topic.type == "duet" || this.topic.type == "solo";
  },

  addTeacher: function addTeacher() {
    this.topic.teachers.push(angular.copy(this.tmpTeacher));
    this.tmpTeacher = "";
  }
};
