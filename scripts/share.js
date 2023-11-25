$('#share').click(function () {
    navigator.clipboard.writeText(`${window.location.href}?s=${localStorage.getItem("NextPauseChoice").replace(" ", "%20")}`);
    $('h6').show();
    setTimeout(() => {
        $('h6').hide();
    }, 2000);
});
