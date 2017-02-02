$(function() {
    setTimeout(function() {
        $("#isketch").addClass('pop');
        setTimeout(function() {
            $("#seedo").addClass('show');
        }, 600)
    }, 1200)
    
    $("#navbtn").on('click', function() {
        console.log('nav click');
        $("#navmenu").toggleClass('active')
    })
}) 