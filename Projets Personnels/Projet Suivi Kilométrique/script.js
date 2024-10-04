const btnInfo = document.querySelector(".info");
const textInfo = document.querySelector(".infoTexte");


btnInfo.addEventListener("click", () => {
    textInfo.classList.toggle("infoTexteActif");
    btnInfo.classList.toggle("infoActif");
})