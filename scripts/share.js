$('#share').click(function () {
    navigator.clipboard.writeText(`${window.location.href}?s=${encodeURI(localStorage.getItem("NextPauseChoice"))}`);
    $('h6').show();
    setTimeout(() => {
        $('h6').hide();
    }, 2000);
});
