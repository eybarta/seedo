var Paging = require('./paging.js');

var clickInterval = 0;
$(function() {
    setTimeout(function() {
        $("#isketch").addClass('pop');
        setTimeout(function() {
            $("#seedo").addClass('show');
        }, 600)
    }, 1200)
    
    $("#navbtn").on('click', function() {
        clearInterval(clickInterval);
        $("#navmenu").toggleClass('active');
        clickInterval = setTimeout(function() {
            $("body").off('click').on('click', function(e) {
                if (e.target.id!='navbtn') {
                    $("#navmenu").removeClass('active');
                    $("body").off('click');                    
                }

            })      
        }, 100)
        
    })
    console.log("Paiging > ", Paging);
    Paging.init();
}) 