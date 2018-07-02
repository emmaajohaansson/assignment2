var apiURL = "http://localhost:8000/";

$(document).ready(function() {
    $("#products-area").fadeIn(200);
    fetchProducts();
    fetchStores();
    fetchReviews();

    $(".navbar a[data-link]").on("click", function(e){
        e.preventDefault();
        $(".navbar a[data-link]").parent().removeClass("active");
        $(this).parent().addClass("active");
        loadArea($(this).attr("data-link"));
    });

    $("#post-new-product").on("submit", function(e) {
        e.preventDefault();
        var form = $(this);
        $.ajax({
            url: apiURL + "products",
            type: "POST",
            dataType: "JSON",
            data: form.serialize()
        }).done(function(data) {
            if (data.success === true) {
                fetchProducts();
                form[0].reset();
                alert("Produkten har sparats!");
            } else {
                alert("Produkten kunde inte sparas...");
            }
        }).fail(function(data) {
            console.log(data);
        })
    });

    $("#products-list").on("click", "li", function(){
        var id = $(this).attr("data-id");
        /*
            Fetch the chosen product
        */
        $.ajax({
            url: apiURL + "products/" + id,
            dataType: "JSON"
        }).done(function(data){
            $("#product-details .modal-title").html(data.title)

            $("#product-details .modal-body").html("\
                <img src='" + data.image  + "' alt='product-image' class='product-image'>\
                <p><strong>Märke:</strong> " + data.brand + ".\
                <strong>Pris:</strong> " + data.price + "kr</p>\
                <p>" + data.description + "</p>\
            ");

            if (data.stores.length > 0) {
                var stores = "<h4>Finns i följande butiker</h4><ul>";
                $.each(data.stores, function(i, store){
                    stores += "<li>" + store.name + " (" + store.city + ")</li>";
                });
                stores += "</ul>";
                $("#product-details .modal-body").append(stores);
            }

            if (data.reviews.length > 0) {
                var stores = "<hr><h4>Recensioner</h4>";
                $.each(data.reviews, function(i, review){
                    stores += '\
                    <div class="panel panel-default">\
                        <div class="panel-heading">\
                            <h3 class="panel-title">' + review.name + ' <small>' + getStars(review.grade) + '</small></h3>\
                        </div>\
                        <div class="panel-body">\
                            ' + review.comment + '\
                        </div>\
                    </div>\
                    ';
                });
                stores += "</ul>";
                $("#product-details .modal-body").append(stores);
            }

            $("#product-details").modal('show');
        }).fail(function(data){
            console.log(data);
        });
    });
});

function fetchProducts() {
    /*
    Fetch all products
    */
    $("#products-list").html(createLoader());

    $.ajax({
        url: apiURL + "products",
        dataType: "JSON"
    }).done(function(data){
        $("#products-list").html("");

        $.each(data, function(i, product){
            $("#products-list").append("\
            <li class='list-group-item' data-id='" + product.id + "'>\
            <span class='badge'>" + product.price + "kr</span>\
            " + product.title + "\
            </li>\
            ");

        });
    }).fail(function(data){
        $("#products-list").html("");
        $("#products-list").append("<h4>Kunde inte hämta produkter</h4>");
    });
}

function fetchStores() {
    /*
    Fetch all stores
    */
    $("#stores-list").html(createLoader());

    $.ajax({
        url: apiURL + "stores",
        dataType: "JSON"
    }).done(function(data){
        $("#stores-list").html("");

        $.each(data, function(i, store){
            $("#stores-list").append("\
            <li class='list-group-item' data-id='" + store.id + "'>\
            <span class='badge'>" + store.city + "</span>\
            " + store.name + "\
            </li>\
            ");

            $("#product-choose-stores").append('\
                <div class="checkbox">\
                    <label><input type="checkbox" name="stores[]" value="' + store.id + '"> ' + store.name + '</label>\
                </div>\
            ');

        });
    }).fail(function(data){
        $("#stores-list").html("");
        $("#stores-list").append("<h4>Kunde inte hämta butiker</h4>");
    });
}

function fetchReviews() {
    /*
    Fetch all reviews
    */
    $("#reviews-list").html(createLoader());

    $.ajax({
        url: apiURL + "reviews",
        dataType: "JSON"
    }).done(function(data){
        $("#reviews-list").html("");

        $.each(data, function(i, review){
            $("#reviews-list").append("\
            <li class='list-group-item' data-id='" + review.id + "'>\
            <span class='badge'>" + getStars(review.grade) + "</span>\
            " + review.name + "\
            </li>\
            ");

        });
    }).fail(function(data){
        $("#reviews-list").html("");
        $("#reviews-list").append("<h4>Kunde inte hämta recensioner</h4>");
    });
}


function createLoader(){
    return "<div class='loader'></div>";
}

function loadArea(areaId){
    $(".area").fadeOut(200);
    $("#"+areaId).delay(200).fadeIn(200);
}

function getStars(nr) {
    var str = "";
    for (var i = 0; i < nr; i ++ ) {
        str += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
    }
    return str;
}
