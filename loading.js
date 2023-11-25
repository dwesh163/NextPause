const url = new URL(window.location.href);
if(url.searchParams.get('s')){
    localStorage.setItem("NextPauseChoice", url.searchParams.get('s'))
    window.location.href=url.origin + url.pathname
}
