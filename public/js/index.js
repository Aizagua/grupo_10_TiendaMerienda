let flecha1 = document.querySelector(".i1");
let flecha2 = document.querySelector(".i2");
let banner1 = document.querySelector(".banner1");
let banner2 = document.querySelector(".banner2");
let circulo1 = document.querySelector(".c1");
let circulo2 = document.querySelector(".c2");

// Función para cambiar las clases y transiciones
function changeBanner() {
    banner1.classList.toggle('banner-none');
    banner2.classList.toggle('banner-none');

    if (banner1.classList.contains('banner-none')) {
        circulo1.classList.remove('circulogris');
        circulo2.classList.add('circulogris');
    } else {
        
        circulo2.classList.remove('circulogris');
        circulo1.classList.add('circulogris');
    }
}

// Slider
flecha1.addEventListener('click', changeBanner);

flecha2.addEventListener('click', changeBanner);