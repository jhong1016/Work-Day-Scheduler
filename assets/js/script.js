$(document).ready(function() {

    //1. Create html of the timeblocks dynamically
    for (var i = 9; i <= 17; i++){
        $('.container').append(`<div class="row time-block" data-time="${i}"> 
        <div class="col-sm col-md-2 hour"> 
            <p>${i}AM</p> 
        </div> 
        <div class="col-sm col-md-8 d-flex description"> 
            <textarea></textarea> 
        </div> 
        <div class="col-sm col-md-2 saveBtn"> 
            <i class="far fa-save fa-2x"></i> 
        </div> 
        </div>`);
    }
       
    var timeTrackObject = {};
        //2. Checks if local storage exists, if it doesn't load preset data to array.
        if (localStorage.getItem('timeTrackObject')) {
            timeTrackObject = JSON.parse(localStorage.getItem('timeTrackObject'));
        }else{
            timeTrackObject = {
                '9am': { time: "9am", value: ""},
                '10am':{ time: "10am", value: ""},
                '11am':{ time: "11am", value: ""},
                '12pm':{ time: "12pm", value: ""},
                '1pm':{ time: "1pm", value: ""},
                '2pm':{ time: "2pm", value: ""},
                '3pm':{ time: "3pm", value: ""},
                '4pm':{ time: "4pm", value: ""},
                '5pm':{ time: "5pm", value: ""}
            };
        }