
// Afficher le total des kilomètres
const total = document.querySelectorAll(".nbKilo");
const totalText = document.querySelector(".nbre");
let res = 0;
total.forEach(elmt => {
    res += parseFloat(elmt.textContent);
})
res = res.toFixed(2)

totalText.innerHTML = res;


// Afficher le panneaux warning
const equipement = document.querySelectorAll(".equipement")
equipement.forEach(elmt => {

    const avertissement = parseFloat(elmt.querySelector(".avertissement").textContent);

    const warning = elmt.querySelector(".warning");

    const nbKilo = parseFloat(elmt.querySelector(".nbKilo").textContent);
    if (avertissement <= nbKilo) {
        warning.style.opacity = 1;
    }
    else {
        warning.style.opacity = 0;
    }
})



// Les boutons
const bg = document.querySelector(".principal");
const protec = document.querySelector(".protec");

equipement.forEach(elmt => {
    const equipementId = elmt.getAttribute("data-id");

    // Ajouter kilo
    const btnAjouter = elmt.querySelector(".btnAjouter");
    const ajouterKilo = document.querySelector(`.formulaires[data-id='${equipementId}'] .ajouterKilo`);
    const btnAnnulAdd = ajouterKilo.querySelector(".btnAnnulAdd");

    btnAjouter.addEventListener("click", () => {
        bg.classList.add("blur");
        ajouterKilo.style.display = "block";
        protec.style.display = "block";
    });

    btnAnnulAdd.addEventListener("click", () => {
        bg.classList.remove("blur");
        ajouterKilo.style.display = "none";
        protec.style.display = "none";
    });

    // Supprimer kilo
    const btnRetirer = elmt.querySelector(".btnRetirer");
    const suppKilo = document.querySelector(`.formulaires[data-id='${equipementId}'] .suppKilo`);
    const btnAnnulSupp = suppKilo.querySelector(".btnAnnulSupp");

    btnRetirer.addEventListener("click", () => {
        bg.classList.add("blur");
        suppKilo.style.display = "block";
        protec.style.display = "block";
    });

    btnAnnulSupp.addEventListener("click", () => {
        bg.classList.remove("blur");
        suppKilo.style.display = "none";
        protec.style.display = "none";
    });

    // Modifier équipement
    const btnModifier = elmt.querySelector(".btnModifier");
    const modifEquip = document.querySelector(`.formulaires[data-id='${equipementId}'] .modifEquip`);
    const btnAnnulModifEquip = modifEquip.querySelector(".btnAnnulModifEquip");

    btnModifier.addEventListener("click", () => {
        bg.classList.add("blur");
        modifEquip.style.display = "block";
        protec.style.display = "block";
    });

    btnAnnulModifEquip.addEventListener("click", () => {
        bg.classList.remove("blur");
        modifEquip.style.display = "none";
        protec.style.display = "none";
    });


    // Modifier Kilomètres prévention
    const btnModifierKilo = elmt.querySelector(".btnModifierKilo");
    const modifPrev = document.querySelector(`.formulaires[data-id='${equipementId}'] .modifPrev`);
    const btnAnnulModifPrev = modifPrev.querySelector(".btnAnnulModifPrev");

    btnModifierKilo.addEventListener("click", () => {
        bg.classList.add("blur");
        modifPrev.style.display = "block";
        protec.style.display = "block";
    });

    btnAnnulModifPrev.addEventListener("click", () => {
        bg.classList.remove("blur");
        modifPrev.style.display = "none";
        protec.style.display = "none";
    });
});


// Ajouter Equipement
const ajouterEquip = document.querySelector(".ajouterEquip");
const btnAnnulAddEquip = document.querySelector(".btnAnnulAddEquip");
const addEquip = document.querySelector(".addEquip");

ajouterEquip.addEventListener("click", () => {
    bg.classList.add("blur");
    addEquip.style.display = "block";
    protec.style.display = "block";
})

btnAnnulAddEquip.addEventListener("click", () => {
    bg.classList.remove("blur");
    addEquip.style.display = "none";
    protec.style.display = "none";
})


//Supprimer Equipement

const removeEquip = document.querySelector(".removeEquip");
const btnAnnulRemoveEquip = document.querySelector(".btnAnnulRemoveEquip");
const supprimerEquip = document.querySelector(".supprimerEquip");

supprimerEquip.addEventListener("click", () => {
    bg.classList.add("blur");
    removeEquip.style.display = "block";
    protec.style.display = "block";
})

btnAnnulRemoveEquip.addEventListener("click", () => {
    bg.classList.remove("blur");
    removeEquip.style.display = "none";
    protec.style.display = "none";
})


const equipementSupp = document.querySelectorAll(".equipementSupp");
const removeEquipVerif = document.querySelector(".removeEquipVerif");
const demiTour = document.querySelector(".demiTour");
let equipementSuppId;
const surInput = document.querySelector(".surInput");
const nomEquipSupp = document.querySelector(".nomEquipSupp");


equipementSupp.forEach(elmtSupp => {
    elmtSupp.addEventListener("click", () => {
        removeEquip.style.display = "none";
        removeEquipVerif.style.display = "block";
        equipementSuppId = elmtSupp.getAttribute("data-id");
        surInput.setAttribute("value", equipementSuppId);
        nomEquipSupp.innerHTML = `<?php $req = $bdd->prepare('SELECT marque FROM equipement WHERE id = ?'); $req->execute(array( ${equipementSuppId}));  echo $req; ?>`
    })
})

demiTour.addEventListener("click", () => {
    bg.classList.remove("blur");
    removeEquipVerif.style.display = "none";
    protec.style.display = "none";
})

