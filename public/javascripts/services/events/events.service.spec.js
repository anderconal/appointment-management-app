/* global inject */
describe('Events factory', function() {
  var Events;

  beforeEach(angular.mock.module('events'));

  beforeEach(inject(function(_Events_) {
    Events = _Events_;
  }));

  it('should exist', function() {
    expect(Events).toBeDefined();
  });

  describe('.getAllEvents', function() {
    it('should exist', function() {
      expect(Events.getAllEvents).toBeDefined();
    });
  });
});
