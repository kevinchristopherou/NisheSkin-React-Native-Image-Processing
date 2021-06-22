$(document).ready(function () {
    setTimeout(function() {
        addModalBoxEveryScreen()
    }, 2000);
})

function addModalBoxEveryScreen() {
    $("#exampleModal").modal('show');
}

// Make the navTitle Font with Bold
$('#navbarSupportedContent li').eq(1).addClass('active');
