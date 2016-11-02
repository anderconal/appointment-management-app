(function() {
  'use strict';

  angular.module('translateApp')
  .directive('ngTranslateLanguageSelect', ngTranslateLanguageSelect);

  /* @ngInject */
  function ngTranslateLanguageSelect(LocaleService) {
    var directive = {
      restrict: 'A',
      replace: true,
      templateUrl: 'javascripts/common/internationalization/translate.template.html',
      controller: function ($scope) {
          $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
          $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
          $scope.visible = $scope.localesDisplayNames &&
          $scope.localesDisplayNames.length > 1;

          $scope.changeLanguage = function (locale) {
              LocaleService.setLocaleByDisplayName(locale);
          };
      }
    }
    
    return directive;
  }
})();
