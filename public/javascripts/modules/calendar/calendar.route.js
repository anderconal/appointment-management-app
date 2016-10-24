(function() {
  'use strict';

  angular.module('calendar')
  /* @ngInject */
  .config(function($stateProvider) {
    var calendar = {
      name: 'calendar',
      url: '/calendar',
      templateUrl: 'templates/modules/calendar/calendar.template.html',
      controller: 'calendarController',
      controllerAs: 'calendarCtrl',
      resolve: {
        /* @ngInject */
        getAllEvents: function(Events) {
          return Events.getAllEvents();
        }
      }
    };

    $stateProvider.state(calendar);
  });
})();
