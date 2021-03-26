//1. Checks if local storage exists, if it doesn't load preset data to array.
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}

// 2. Using moment function to show what day and time it is and create html of the timeblocks dynamically.
$( document ).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
    $("#currentTime").text(moment().format("h:mm:ss a"));
    for (let i = 9; i < 18; i++) {

        // row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);

        // column
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');

        // column 2
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Add your event here..."></textarea>`);        
       
        // column 3
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        
        // col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);

        // add rows to container
        $(".container").append(row);

        getLocalStorage(i);
    }    

//3. Check hour of the day whether it's am or pm.
    function formatAMPM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();

//4. This checks the hour of the current day to the hour represented in the HTML data-element to decide it's background color.
