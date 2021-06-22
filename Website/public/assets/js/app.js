$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");},
    ajaxStop: function() { $body.removeClass("loading"); }
});

$(document).ready(function(){
    $("#subscribe").on('click', function () {
        if($("#email").val() === "") return;
        let param = {
            _token: $('meta[name="csrf-token"]').attr('content'),
            email: $("#email").val()
        };
        $.post('/subscribe', param, function (res) {
            if (res === 'Request Error')
                return;
            $("#exampleModal").modal('toggle');
        })
    })
    $("#footer_subscribe").on('click', function () {
        if($("#footer_email").val() === "") return;
        let param = {
            _token: $('meta[name="csrf-token"]').attr('content'),
            email: $("#footer_email").val()
        };
        $.post('/subscribe', param, function (res) {
            if (res === 'Request Error')
                return;
            $("#footer_email").val("");
        })
    })
});
