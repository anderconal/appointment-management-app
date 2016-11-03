(function() {
  'use strict';
  angular.module('calendar')
  .controller('calendarController', calendarController);

  /* @ngInject */
  function calendarController(Events, calendarConfig, $uibModal, getAllEvents) {
    var vm = this;

    // Declaration of variables
    vm.calendarView = '';
    vm.viewDate = {};
    vm.actions = [];
    vm.events = [];
    vm.isCellOpen = false;
    vm.weekNumber = {};
    vm.subtractWeek = subtractWeek;
    vm.setToToday = setToToday;
    vm.addWeek = addWeek;
    vm.updateWeek = updateWeek;

    // Constructor like function
    activate();

    function activate() {
      vm.calendarView = 'week';
      vm.viewDate = new Date();
      vm.weekAndYearNumber = getWeekAndYearNumber(vm.viewDate);
      vm.weekNumber = vm.weekAndYearNumber[1];
      vm.yearNumber = vm.weekAndYearNumber[0];
      vm.weeksInYear = weeksInYear(vm.yearNumber);

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

      vm.events = getAllEvents;

      convertDates(vm.events);

      vm.isCellOpen = true;
    } // End of the activate function

    /*
      Functions
    */

    /*
      Functions
      Events
    */
    vm.addEvent = function() {
        vm.events.push({
          title: 'New event',
          startsAt: moment().startOf('day').toDate(),
          endsAt: moment().endOf('day').toDate(),
          color: calendarConfig.colorTypes.important,
          draggable: true,
          resizable: true
        });
        console.log(startsAt);
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

    /*
      Functions
      Dates
    */
    function subtractWeek(view) {
      if (view === 'week') {
        if (vm.weekNumber > 1) {
          vm.weekNumber--;
        } else if (vm.weekNumber === 1) {
          vm.yearNumber--;
          vm.weeksInYear = weeksInYear(vm.yearNumber);
          vm.weekNumber = vm.weeksInYear;
        }
      }
    }

    function setToToday(view) {
      if (view === 'week') {
        vm.weekAndYearNumber = getWeekAndYearNumber(vm.viewDate);
        vm.weekNumber = vm.weekAndYearNumber[1];
        vm.yearNumber = vm.weekAndYearNumber[0];
      }
    }

    function addWeek(view) {
      if (view === 'week') {
        if (vm.weekNumber < vm.weeksInYear) {
          vm.weekNumber++;
        } else if (vm.weekNumber === vm.weeksInYear) {
          vm.yearNumber++;
          vm.weeksInYear = weeksInYear(vm.yearNumber);
          vm.weekNumber = 1;
        }
      }
    }

    function updateWeek(viewDate) {
      vm.weekAndYearNumber = getWeekAndYearNumber(viewDate);
      vm.weekNumber = vm.weekAndYearNumber[1];
      vm.yearNumber = vm.weekAndYearNumber[0];
    }

    /*
      Functions
      Dates
      Helpers
    */
    function convertDates(events) {
      var currentStartDate, currentEndDate = {};

      for (var i = 0; i < events.length; i++) {
        /*
          Since we get a JSON with events, we have to convert the
          events.startsAt and events.endsAt Strings to valid Date objects
        */

        // startsAt
        currentStartDate = new Date(events[i].startsAt);
        events[i].startsAt = new Date(currentStartDate.getTime() +
                             currentStartDate.getTimezoneOffset() * 60000);

        // endsAt
        currentEndDate = new Date(events[i].endsAt);
        events[i].endsAt = new Date(currentEndDate.getTime() +
                           currentEndDate.getTimezoneOffset() * 60000);
      }
    }

    function getWeekAndYearNumber(d) {
      // Copy date so don't modify original
      d = new Date(+d);
      d.setHours(0,0,0,0);
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      d.setDate(d.getDate() + 4 - (d.getDay()||7));
      // Get first day of year
      var yearStart = new Date(d.getFullYear(),0,1);
      // Calculate full weeks to nearest Thursday
      var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      // Return array of year and week number
      return [d.getFullYear(), weekNo];
    }

    function weeksInYear(year) {
      var d = new Date(year, 11, 31);
      var week = getWeekAndYearNumber(d)[1];

      /*
        If 31 December is in the following year it gets the week for 24
        December.
      */
      return week == 1 ? getWeekAndYearNumber(d.setDate(24))[1] : week;
    }
  }
})();
