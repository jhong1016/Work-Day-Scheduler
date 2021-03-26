// Set the business hours
const business = { start: 9, end: 18 }

var values, dateKey

function init(now=moment()) {
    // Add the current date to top of screen
    $('#currentDay').text(now.format('dddd, MMMM Do'))

    // Get the current hour
    var hour = now.hour()

    // Get values from local storage
    var localStr = localStorage.getItem('schedulerData') || "{}"
    values = JSON.parse(localStr)
    dateKey = now.format('YYYYMMDD')
    if (!(dateKey in values)) values[dateKey] = {}



$("#clearData").click(function() {
    // Button to clear all data currently corrected and refresh the page
    localStorage.clear();
    location.reload()
});