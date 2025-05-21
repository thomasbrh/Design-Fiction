'use strict';
/* Importation de GSAP */
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");
    console.log(typeof gsap !== "undefined" ? "GSAP est bien chargé" : "GSAP ne fonctionne pas");
});


/* Slider */
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

setInterval(() => {
  // Retirer la classe active de l'actuel
  slides[currentIndex].classList.remove('active');

  // Avancer à la slide suivante (ou revenir à 0 si à la fin)
  currentIndex = (currentIndex + 1) % slides.length;

  // Ajouter la classe active à la nouvelle slide
  slides[currentIndex].classList.add('active');
}, 3000); // Toutes les 1000 ms = 1 seconde
