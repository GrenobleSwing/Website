// src/app/app.spec.js
// Containing describe block (or "suite"), usually named for an app feature.
// In this case the feature is the App itself.
describe('Unit: App', function () {

  // Include Modules
  beforeEach(module('app'));
  beforeEach(module('ui.router'));

  // Suite for testing an individual piece of our feature.
  describe('App Abstract Route', function () {

    // Instantiate global variables (global to all tests in this describe block).
    var $state,
      $rootScope,
      state = 'index';

    // Inject dependencies
    beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      $templateCache.put('components/home/home.html', '');
    }));

    // It block (or "spec") to test expectations for the
    // Expectations return true or false.
    it('verifies state configuration', function () {
      var config = $state.get(state);
      expect(config.abstract).toBeTruthy();
      expect(config.url).toBeUndefined();
    });
  });
});
