(function() {
  'use strict';

  angular.module('translateApp')
    .constant('LOCALES', {
      'locales': {
        'es': 'Castellano',
        'en': 'English'
      },
      'preferredLocale': 'es'
    })
})();
