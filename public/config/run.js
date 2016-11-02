(function() {
  'use strict';

  angular.module('myApp')
  .run(run);

  /* @ngInject */
  function run(LocaleService) {
    // Get the browser language.
    var language = navigator.language.split('-')[0];

    // Set the browser language as Locale.
    LocaleService.setLocale(language);
  }
})();
