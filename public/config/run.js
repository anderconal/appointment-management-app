(function() {
  'use strict';

  angular.module('myApp')
  .run(run);

  /* @ngInject */
  function run(LocaleService, moment, LanguageConstants) {
    // Get the browser language.
    var language = navigator.language.split('-')[0];

    // Set the browser language as Locale.
    LocaleService.setLocale(language);

    // Set the browser language as calendar's language (using moment)
    switch (language) {

      case LanguageConstants.SPANISH_LANGUAGE_CODE:
        moment.locale(LanguageConstants.MOMENT_SPANISH_LANGUAGE_CODE);
        break;

      case LanguageConstants.ENGLISH_LANGUAGE_CODE:
        moment.locale(LanguageConstants.MOMENT_ENGLISH_LANGUAGE_CODE);
        break;

      default:
        moment.locale(LanguageConstants.MOMENT_SPANISH_LANGUAGE_CODE);
    }
  }
})();
