let titreUni = document.getElementById("titreUni");
let titrePers = document.getElementById("titrePers");

let listeUni = document.querySelectorAll(".univ");
let listePers = document.querySelectorAll(".perso");

titreUni.addEventListener("click", ()=>{
    for(let elmt of listeUni){
        elmt.classList.toggle("uni");
    }
});

titrePers.addEventListener("click", ()=>{
    for(let elmt of listePers){
        elmt.classList.toggle("pers");
    }
});