(function() {
  'use strict';
  angular.module('calendar')
  .controller('calendarController', calendarController);

  /* @ngInject */
  function calendarController(Events, calendarConfig, $uibModal) {
    var vm = this;

    // Declaration of variables
    vm.calendarView = '';
    vm.viewDate = {};
    vm.actions = [];
    vm.events = [];
    vm.calendarTitle = '';
    vm.isCellOpen = false;

    // Constructor like function
    activate();

    function activate() {
      vm.calendarView = 'week';
      vm.viewDate = new Date();
      vm.actions = [{
          label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
          onClick: function(args) {
            alert.show('Edited', args.calendarEvent);
          }
        }, {
          label: '<i class=\'glyphicon glyphicon-remove\'></i>',
          onClick: function(args) {
            alert.show('Deleted', args.calendarEvent);
          }
        }];
      vm.events = Events.getEvents();
      vm.isCellOpen = true;
      vm.calendarTitle = 'Lydia\'s calendar';
    } // End of the activate function

    // Functions
    vm.addEvent = function() {
        vm.events.push({
          title: 'New event',
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          resizable: true
        });
      };

    vm.eventClicked = function(event) {
      var modalInstance = $uibModal.open({
        animation: true,
        controller: 'eventModalController',
        controllerAs: 'emCtrl',
        templateUrl: 'templates/modules/calendar/event-modal/' +
                     'event-modal.template.html',
        resolve: {
          currentEvent: function() {
            return event;
          }
        }
      });
    };

    vm.eventEdited = function(event) {
      alert('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };
  }
})();
