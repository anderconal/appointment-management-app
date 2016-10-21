(function() {
'use strict';

angular.module('myApp', [
  'ui.router',
  'ui.bootstrap',
  'mwl.calendar',
  'ngTouch',
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'index',
  'calendar',
  'eventModal',
  'events',
]).
/* @ngInject */
config(function($urlRouterProvider, $touchProvider) {
  $urlRouterProvider.otherwise('/');
  $touchProvider.ngClickOverrideEnabled(true);
});
})();
