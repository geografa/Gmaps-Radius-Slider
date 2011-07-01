goog.require('goog.ui.Dialog');
goog.require('goog.ui.Slider');
goog.require('goog.ui.Component');
var sliderTimer, slider;

// When a user clicks on a feature on the map, intercept the
// click event and display the data in a modal dialog box.
function displayData(mouseEvent) {
  var dialog = new goog.ui.Dialog();
  dialog.setTitle(mouseEvent.row['name'].value);
  dialog.setContent(formatTableRowAsHtml(mouseEvent.row));
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.OK);
  dialog.setVisible(true);
}

// Produce some nicely formatted HTML using the raw row data exposed as
// part of the feature click event.
function formatTableRowAsHtml(row) {
  var parts = [
    '<center><img width="400px" height="200px" src="',
    row['pic_link'].value,
    '"></img><br>',
    '<b>elevation: </b>',
    row['min_elevation'].value,
    ' to ',
    row['max_elevation'].value,
    ' feet</center>'
  ];
  return parts.join('');
}

// Create a Google Closure slider bar which can be used to select the
// distance by which to filter the Fusion Tables data.
function initializeSlider() {
    var sliderElement = document.getElementById('slider');
    slider = new goog.ui.Slider;
    slider.decorate(sliderElement);
    slider.addEventListener(goog.ui.Component.EventType.CHANGE, function() {
      // Avoid updating the map too often by ignoring slider value changes
      // that occur within 200mS of eachother.
      if (sliderTimer) window.clearTimeout(sliderTimer);
      sliderTimer = window.setTimeout(updateMap, 200);
      document.getElementById("slider-value").innerHTML = slider.getValue() + " mi";
    });
    slider.setValue(3.218688);
}

// Convert a slider value (0 - 100%) to an distance between 0 and 3000.
function sliderValueToKm(value) {
  return Math.round(value * 1.609344);
}

// Update the query used to filter Fusion Tables data using the
// current value of the slider.
function updateMap() {
  radius = sliderValueToKm(slider.getValue());
	// updateQuery = "SELECT City FROM " + tableid + " WHERE ST_INTERSECTS(City, CIRCLE(LATLNG(" + marker.getPosition().lat() + "," + marker.getPosition().lng() + ")," + radius + "))";
	// layer.setQuery(updateQuery);
}
