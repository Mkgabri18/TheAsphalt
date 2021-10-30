//? import style from './styles/style.scss';

// Varios Comment
//* no relevante
//! comento de alerta
//? se deve hacer?
//// seguro que se borra
//TODO: para hacer

const menuHamburger = document.querySelector('#btnHambuger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');


menuHamburger.addEventListener('click', () => {
    console.log('open menu');
    // Open/Close Hamburger
    if(header.classList.contains('open')) {
        body.classList.remove('noscroll');
        header.classList.remove('open');
        fadeElems.forEach(function(element) {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
        });
    } else {
        body.classList.add('noscroll');
        header.classList.add('open');
        fadeElems.forEach(function(element) {
            element.classList.remove('fade-out');
            element.classList.add('fade-in');
        });
    }
});