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