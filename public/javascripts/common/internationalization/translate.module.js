(function() {
  'use strict';

  angular.module('translateApp', [
    'pascalprecht.translate',
    'tmh.dynamicLocale'])
  .config(configure);

  /* @ngInject */
  function configure ($translateProvider, tmhDynamicLocaleProvider) {
    $translateProvider.useMissingTranslationHandlerLog();
    $translateProvider.useStaticFilesLoader({
        prefix: 'javascripts/assets/internationalization/locale-', // Path to translations files
        suffix: '.json' // Suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('es_ES');// Is applied on first load
    // Saves selected language to localStorage
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy(null);
    /*
      Provide the config with direction of where to load the $locale settings
      files for angular-dynamic-locale
    */
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_es-es.js');
  }
})();
