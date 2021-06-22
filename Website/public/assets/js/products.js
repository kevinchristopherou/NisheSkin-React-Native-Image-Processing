$(document).ready(function () {
    setTimeout(function() {
        addModalBoxEveryScreen()
    }, 2000);
    addLogicForCategoryCheckBox();
});

function addModalBoxEveryScreen() {
    $("#exampleModal").modal('show');
}

// Function for Category Check Box
function addLogicForCategoryCheckBox(){
    let isChecked = [];
    let categoryInfo = [];
    $("input:checkbox").on('click', function () {
        // in the handler, 'this' refers to the box clicked on
        let $box = $(this);
        if ($box.is(":checked")) {
            // the name of the box is retrieved using the .attr() method
            // as it is assumed and expected to be immutable
            let group = "input:checkbox[name='" + $box.attr("name") + "']";
            // the checked state of the group/box on the other hand will change
            // and the current value is retrieved using .prop() method
            $(group).prop("checked", false);
            switch ($box.attr('name')) {
                case 'type1':
                    isChecked[$box.attr('name')] = true;
                    $box.prop("checked", true);
                    break;
                case 'type2':
                    if (isChecked['type1']) {
                        isChecked[$box.attr('name')] = true;
                        $box.prop("checked", true);
                    }
                    break;
                case 'type3':
                    if (isChecked['type2']) {
                        isChecked[$box.attr('name')] = true;
                        $box.prop("checked", true);
                    }
                    break;
                default:
                    $box.prop("checked", true);
                    break;
            }
        } else {
            isChecked[$box.attr('name')] = false;
            $box.prop("checked", false);
        }
        $(".check-group").each(function () {
            let $checkGroup = $(this);
            let type = $checkGroup.attr('id');
            categoryInfo[type] = 0;
            let checkBoxes = $checkGroup.find('input:checkbox');
            for (let i = 0; i < checkBoxes.length; i++) {
                if ($(checkBoxes[i]).is(":checked")) {
                    categoryInfo[type] = i + 1;
                    break;
                }
            }
        })
        let param = {
            _token: $('meta[name="csrf-token"]').attr('content'),
            type1: categoryInfo['type1'],
            type2: categoryInfo['type2'],
            type3: categoryInfo['type3'],
            brand: categoryInfo['brand']
        };
        console.log(categoryInfo);
        $.post('products/filter', param, function (products) {
            if (products === 'Request Error')
                return;
            let $product_list = $('#product_list').eq(0);
            $product_list.html('');
            for (let i in products) {
                let product = products[i];
                $product_list.append("<div class=\"col-md-4\">\n" +
                    "                      <div class=\"product-item\">\n" +
                    "                            <img src=\"upload/product/" + product['id'] + ".png\">\n" +
                    "                            <h5>" + product['name'] + "</h5>\n" +
                    "                            <ul>\n" +
                    "                               <li> " + product['desc'] + "</li>\n" +
                    "                            </ul>\n" +
                    "                            <a class=\"main-btn\" href='http://" + product['url'] + "'>shop now</a>\n" +
                    "                      </div>\n" +
                    "                 </div>");
            }
        })
    });
}


// Make the navTitle Font with Bold
$('#navbarSupportedContent li').eq(0).addClass('active');
