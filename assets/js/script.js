// Set the business hours
const business = { start: 9, end: 18 }

var values, dateKey

function init(now=moment()) {
    // Add the current date to top of screen
    $('#currentDay').text(now.format("dddd, Do MMMM YYYY"));

    // Get the current hour of the current day
    var hour = now.hour()

    // Get values from local storage
    var localStr = localStorage.getItem('schedulerData') || "{}"
    values = JSON.parse(localStr)
    dateKey = now.format('DDMMYYYY')
    if (!(dateKey in values)) values[dateKey] = {}

    // Build the time slots and add rows to container
    var container = $('.container')
    for (let hr = business.start; hr < business.end; hr++) {
        let time = moment(hr, 'H')
        let frame = hour > hr ? 'past' : hour < hr ? 'future' : 'present'
        var eventText = values[dateKey][hr] || ''
        let row = $(`
        <div id='time-slot-${hr}' class='time-block row'>
            <span class='hour time-column col-1'>
                <span class='hour-display'>${time.format('hA')}</span>
            </span>
            <span class='info-column col ${frame}'>
                <textarea id='event-input-${hr}' data-hr=${hr} type="text" class='event-input'>${eventText}</textarea>
            </span>
            <span id='save-button-${hr}' data-hr=${hr} class='saveBtn col-1'>
            </span>
        </div>`)
        container.append(row)
    }

    // When a user clicks the save button, data is saved to the objects and to local storage
    container.on('click', event => {
        if (event.target.matches('.saveBtn')) {
            var button = event.target
            var hr = button.dataset.hr
            var inputValue = $(`#event-input-${hr}`)[0].value
            values[dateKey][hr] = inputValue
            localStorage.setItem('schedulerData', JSON.stringify(values))
        }
    })

    localStorage.setItem('schedulerData', JSON.stringify(values))

    setAlarm(now)
}
init()

var timer

function setAlarm(now=moment()) {
    // Update display at the start of the next hour
    var startOfNextHour = now.clone().endOf('hour').add(1, 'second')
    var durationToNextHour = startOfNextHour - now
    timer = setInterval(function() {
        clearInterval(timer)
        updateDisplay(startOfNextHour)
    }, durationToNextHour)
}

function updateDisplay(now=moment()) {
    // Get the current hour
    var hour = now.hour()

    // Update each color by checking the hour of the current day to the hour represented in the HTML data-element
    var cells = $('.info-column')
    console.log(cells);
    for (let i = 0, hr = business.start; i < cells.length; i++, hr++) {
        let cell = $(cells[i])
        cell.removeClass(['past', 'present', 'future'])
        cell.addClass(hour > hr ? 'past' : hour < hr ? 'future' : 'present')
    }
    
    setAlarm(now)
}

$("#clearData").click(function() {
    // Button to clear all data currently corrected and refresh the page
    localStorage.clear();
    location.reload();
});