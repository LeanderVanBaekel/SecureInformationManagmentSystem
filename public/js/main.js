

var thisLocation = window.location.href.split('/')[3];

var a = document.querySelector('a[href="/'+thisLocation+'"]').classList.add('active');

console.log(a);
