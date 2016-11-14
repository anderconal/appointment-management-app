(function() {
  'use strict';
  angular.module('calendar')
       .controller('eventModalController', eventModalController);
  /* @ngInject */
  function eventModalController($uibModalInstance, currentEvent) {
    var vm = this;
    vm.currentEvent = currentEvent;
    vm.close = close;

    function close() {
      $uibModalInstance.close();
    }
  }
})();
