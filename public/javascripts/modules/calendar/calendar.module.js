(function() {
  'use strict';

  angular.module('calendar', [])
    /* @ngInject */
    .config(function(calendarConfig) {
      // Use moment to format dates
      calendarConfig.dateFormatter = 'moment';

      /* This will configure times on the day view to display in 24 hour format
         rather than the default of 12 hour */
      calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

      /* Make the week view more like the day view, with the caveat that event
         end times are ignored. */
      calendarConfig.showTimesOnWeekView = true;

      calendarConfig.i18nStrings.weekNumber = 'Week {week}';
    });
})();
