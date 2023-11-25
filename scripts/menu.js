$('#right').click(function () {
    hideBox()
});

$('#left').click(function () {
    showBox()
});

function hideBox() {
    var groupElement = $('.group');
    $("#right").hide()
    $("#left").show()
    groupElement.css('transform', 'translateX(90%)');
}

function showBox() {
    $("#left").hide()
    $("#right").show()
    var groupElement = $('.group');
    groupElement.css('transform', 'translateX(0%)');
}

$(".group").on('mouseover', function () {

    console.log();
    
    if($(".group").css("transform").split(",")[4] != 0){
        showBox()
        setTimeout(function () {
            hideBox()
        }, 5000);
    }
});

setTimeout(function () {
    hideBox()
}, 5000);

$("#left").hide()
