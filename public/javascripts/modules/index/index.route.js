(function() {
  'use strict';

  angular.module('index')
  /* @ngInject */
  .config(function($stateProvider) {
    var index = {
      name: 'index',
      url: '/',
      templateUrl: 'templates/modules/index/index.template.html',
      controller: 'indexController',
      controllerAs: 'indexCtrl'
    };

    $stateProvider.state(index);
  });
})();
