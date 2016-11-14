(function() {
  'use strict';

  angular.module('translateApp')
  .service('LocaleService', LocaleService);

  /* @ngInject */
  function LocaleService($translate, LOCALES, $rootScope, tmhDynamicLocale) {
    /*
      Preparing locales info
    */
    var localesObj = LOCALES.locales;

    // Locales and locales display names
    var _LOCALES = Object.keys(localesObj);
    if (!_LOCALES || _LOCALES.length === 0) {
      console.error('There are no _LOCALES provided');
    }

    var _LOCALES_DISPLAY_NAMES = [];
    _LOCALES.forEach(function(locale) {
      _LOCALES_DISPLAY_NAMES.push(localesObj[locale]);
    });

    /*
      Storing current locale
    */
    // Because of async loading
    var currentLocale = $translate.proposedLanguage();

    /*
      Methods
    */
    var checkLocaleIsValid = function(locale) {
      return _LOCALES.indexOf(locale) !== -1;
    };

    var setLocale = function(locale) {
      if (!checkLocaleIsValid(locale)) {
        console.error('Locale name "' + locale + '" is invalid');
        return;
      }
      currentLocale = locale; // Updating current locale

      // Asking angular-translate to load and apply proper translations
      $translate.use(locale);
    };

    setLocale(LOCALES.preferredLocale);

    /*
      Events
    */
    // On successful applying translations by angular-translate
    $rootScope.$on('$translateChangeSuccess', function(event, data) {
      // Sets "lang" attribute to HTML
      document.documentElement.setAttribute('lang', data.language);
      /*
        Asking angular-dynamic-locale to load and apply proper AngularJS
        $locale setting
      */
      tmhDynamicLocale.set(data.language.toLowerCase().replace(/_/g, '-'));
    });

    return {
      getLocaleDisplayName: function() {
        return localesObj[currentLocale];
      },
      setLocaleByDisplayName: function(localeDisplayName) {
        setLocale(
          _LOCALES[
            _LOCALES_DISPLAY_NAMES.indexOf(localeDisplayName)// get locale index
            ]
        );
      },
      getLocalesDisplayNames: function() {
        return _LOCALES_DISPLAY_NAMES;
      },
      setLocale: setLocale
    };
  }
})();
