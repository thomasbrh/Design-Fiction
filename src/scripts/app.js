'use strict';
/* Importation de GSAP */
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script chargé !");
    console.log(typeof gsap !== "undefined" ? "GSAP est bien chargé" : "GSAP ne fonctionne pas");
});

/* Chargement des données JSON */
let titanicData = [];
fetch("assets/data/data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur de chargement du fichier JSON");
        }
        return response.json();
    })
    .then(data => {
        titanicData = data;
    })
    .catch(error => {
        console.error("Erreur lors du chargement des données", error);
    });

/* Barre de progression */
/* window.onscroll = function() {
    updateProgressBar();
};

function updateProgressBar() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / docHeight) * 100;
 
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
} */

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
