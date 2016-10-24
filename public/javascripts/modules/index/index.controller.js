(function() {
  'use strict';

  angular.module('index')
  .controller('indexController', indexController);

  function indexController() {
    var vm = this;
    vm.name = 'Something';
  }
})();
