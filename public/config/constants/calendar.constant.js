(function() {
  'use strict';

  angular.module('myApp')
  .constant('CalendarConstants', {
    CALENDAR_DAY_VIEW: 'day',
    CALENDAR_WEEK_VIEW: 'week',
    CALENDAR_MONTH_VIEW: 'month',
    CALENDAR_YEAR_VIEW: 'year',
    CALENDAR_FIRST_WEEK_NUMBER: 1
  })
})();
