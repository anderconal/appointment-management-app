(function() {
  'use strict';

  angular.module('translateApp')
    .constant('LOCALES', {
      'locales': {
        'es_ES': 'Castellano',
        'en_UK': 'English'
      },
      'preferredLocale': 'es_ES'
    })
})();
