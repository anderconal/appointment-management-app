(function() {
  'use strict';

  angular.module('events')
  .factory('Events', Events);

  /* @ngInject */
  function Events($http, $q) {
    var service = {
      getAllEvents: getAllEvents
    };

    var getAllEvents = getAllEvents;

    /*function getEvents() {
      var events = [
        {
          title: 'Ander Conal', // The title of the event,
          description: 'Depilación pecho y axilas',
          startsAt: new Date(2016, 9, 18, 19, 30), // A javascript date object for when the event starts
          endsAt: new Date(2016, 9, 18, 20), // Optional - a javascript date object for when the event ends
          color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
            primary: '#e3bc08', // the primary event color (should be darker than secondary)
            secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
          },
          actions: [{ // an array of actions that will be displayed next to the event title
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
            cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
            onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
              console.log('Edit event', args.calendarEvent);
            }
          }],
          draggable: true, //Allow an event to be dragged and dropped
          resizable: true, //Allow an event to be resizable
          incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
          recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
          cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
          allDay: false // set to true to display the event as an all day event on the day view
        },
        {
          title: 'Robert Zamorano', // The title of the event,
          description: 'Depilación pecho y espalda',
          startsAt: new Date(2016, 9, 20, 10), // A javascript date object for when the event starts
          endsAt: new Date(2016, 9, 20, 11, 30), // Optional - a javascript date object for when the event ends
          color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
            primary: '#ff00ff', // the primary event color (should be darker than secondary)
            secondary: '#ffbfff' // the secondary event color (should be lighter than primary)
          },
          actions: [{ // an array of actions that will be displayed next to the event title
            label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
            cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
            onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
              console.log('Edit event', args.calendarEvent);
            }
          }],
          draggable: true, //Allow an event to be dragged and dropped
          resizable: true, //Allow an event to be resizable
          incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
          recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
          cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
          allDay: false // set to true to display the event as an all day event on the day view
        }
      ];

      return events;
    } */

    function getAllEvents() {
      var deferred = $q.defer();

      $http.get('/events').then(function(result) {
        deferred.resolve(result.data);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    return service;
  }
})();
