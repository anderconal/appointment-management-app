var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  startsAt: Date,
  endsAt: Date,
  color: {
    primary: String,
    secondary: String
  },
  draggable: Boolean,
  resizable: Boolean,
  incrementsBadgeTotal: Boolean,
  recursOn: String,
  cssClass: String,
  allDay: Boolean
});

mongoose.model('Event', EventSchema);
