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


// Gérer la taille de la police du titre en fonction du scroll
const title = document.querySelector('H1'); 

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY; 
    const tailleFont = Math.max(8 - scrollPosition / 150, 2); 

    title.style.fontSize = `${tailleFont}vw`; 
});


// Gérer la position du rond marron
const rond1 = document.querySelector('.rond1'); 
const rond2 = document.querySelector('.rond2'); 

document.addEventListener('mousemove', (e) => {

    let x = e.clientX *100 /window.innerWidth+"%";
    let y = e.clientY *100 /window.innerHeight+"%";
    rond2.style.left = x;
    rond2.style.top = y; 
    rond2.style.transform = "translate(-"+x+",-"+y+")";
});



// Gerer les cartes 
let cartes = document.querySelectorAll(".carte");

cartes.forEach(elmt => {
    elmt.addEventListener("mousemove", (e)=>{
        let elmRect = elmt.getBoundingClientRect();
        let x = e.clientX - elmRect.x;
        let y = e.clientY - elmRect.y;

        let milieuCarteW = elmRect.width/2;
        let milieuCarteH = elmRect.height/2;

        let angleY = (x - milieuCarteW)/20;
        let angleX = -(y-milieuCarteH) /20;

        elmt.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`
        elmt.style.boxShadow="#000 20px 20px 0"

    });

    elmt.addEventListener("mouseleave", (e)=>{
        elmt.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`
        elmt.style.boxShadow="#000 15px 15px 0"
    })
});