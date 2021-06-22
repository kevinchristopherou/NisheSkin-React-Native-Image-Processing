$(document).ready(function () {
    setTimeout(function() {
        addModalBoxEveryScreen()
    }, 2000);

    $('#category1').on('click', function(){
        post_filter(1);
    });
    $('#category2').on('click', function(){
        post_filter(2);
    });
})

function post_filter(category){
    let param = {
        _token: $('meta[name="csrf-token"]').attr('content'),
        category: category
    };
    $.post('blog/filter', param, function (posts) {
        if (posts === 'Request Error')
            return;
        let $post_list = $('#post_list').eq(0);
        $post_list.html('');
        for (let i in posts) {
            let post = posts[i];
            $post_list.append("<div class=\"post-box row\">\n" +
                "                        <div class=\"col-md-7\">\n" +
                "                            <span class=\"col-md-12\">category " + category + "</span>\n" +
                "                            <h4 class=\"col-md-12\">" + post['name'] + "</h4>\n" +
                "                            <p class=\"col-md-12\">\n" +
                "                                " + post['desc'] + "\n" +
                "                                <a href=\"blog/" + post['id'] + "\" >Read more</a>\n" +
                "                            </p>\n" +
                "                        </div>\n" +
                "                        <div class=\"col-md-5\">\n" +
                "                            <img src=\"upload/post/" + post['id'] + "_1.png\" width=\"100%\" height=\"100%\">\n" +
                "                        </div>\n" +
                "                    </div>");
        }
    })
}

function addModalBoxEveryScreen() {
    $("#exampleModal").modal('show');
}

// Make the navTitle Font with Bold
$('#navbarSupportedContent li').eq(2).addClass('active');

// Make Category Title as Bold when active
$('.category-box').on('click', function () {
    $('.category-box').removeClass('active');
    $(this).addClass('active');
});
