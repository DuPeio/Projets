function main(){

    // Initialisation des variables
    // Calculatrice
    const boutons = document.querySelectorAll(".bouton");
    const affichage = document.querySelector(".affichage");
    const calculatrice = document.querySelector(".calculatrice");

    // Affichage et calculs
    let chaine = "";
    let chainePrec = "" ;
    let chaineAffiche = "";
    let listeCalcul  = [];
    let listeCalculAffiche = [];

    // Titre en fond
    const h1 = document.querySelector(".afficheTitre");
    const titres = document.querySelector(".titres");
    

    // Affichage
    const canvas = document.getElementById("canva");
    var ctx = canvas.getContext("2d");

    // Graph
    let mode = false;
    let plage_xy = 50;
    let ecart = 25;

    // Formulaire pour le graph
    const formu = document.getElementById("graphForm");
    const submit = document.getElementById("formuleSubmit");
    const formText = document.getElementById("formule");

    // Rendre la police propre
    window.devicePixelRatio=5;
    let sizeX = canvas.width;
    let sizeY = canvas.height;
    var scale = window.devicePixelRatio;
    canvas.width = Math.floor(sizeX * (scale-1)); 
    canvas.height = Math.floor(sizeY * scale); 
    const fontSize = 25 * (scale-1);
    const lineHeight = 25 * (scale-1);
    ctx.font = `${fontSize}px Luckiest Guy`;
    ctx.textBaseline = "top";

    // Mode sombre/clair
    const modeSombre = document.querySelector(".darkMode");

    // Activation/Desactivation de la calculatrice
    const onOff = document.querySelector(".onoff");
    const btnPower = document.querySelector(".btnPower");
    let demarre = false;


    // Gérer les boutons spéciaux
    let except = {
        "ZOOM +": function () {
            if(mode == true && plage_xy>=20){
                plage_xy -= 10;
                ecart = parseInt(plage_xy/2);
                afficherGraph(formText.value);
            }
        },
        "ZOOM -": function () {
            if(mode == true && plage_xy <= 400){
                plage_xy += 10;
                ecart = parseInt(plage_xy/2);
                afficherGraph(formText.value);
            }
        },
        "EXE" : function (){
            if (mode == false){
                if (chaine != ""){
                    chainePrec = chaine;
                    chaine = eval(chaine);
    
                    listeCalcul.push(`${chainePrec}`);
                    listeCalculAffiche.push(`${chaineAffiche}`);
    
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    let dernierHeight = 0;
                    for (let i = 0; i < listeCalcul.length; i++) {
                        if (listeCalcul.length > 3) {
                            listeCalcul.shift();
                            listeCalculAffiche.shift();
                        }
                        ctx.fillText(`${listeCalculAffiche[i]}=`, 10, ((i) * lineHeight) + dernierHeight+10);
                        ctx.fillText(eval(listeCalcul[i]), 250, ((i+1) * (lineHeight)+ dernierHeight));
                        dernierHeight = ((i+1) * lineHeight)*1.4;
                    }
                    chaine = "";
                    chaineAffiche = "";
                }
            }
            
            
        },
        "xⁿ" : function(){
            chaine = chaine + "**";
            chaineAffiche += "^";
            listeCalcul[-1] = chaine;
            listeCalculAffiche[-1] = chaineAffiche;
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
            
        },

        "DEL" : function (){
            chainePrec = chaine;
            chaine =  chaine.slice(0, -1);
            chaineAffiche = chaineAffiche.slice(0,-1);
            listeCalcul[-1] = chaine;
            listeCalculAffiche[-1] = chaineAffiche;
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
                
        },

        "C" : function (){           
            chaine = "";
            chaineAffiche = "";
            listeCalcul = [];
            listeCalculAffiche = [];
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }else{
                formText.value = chaine;
            }
           
            
        },
        "MODE" : function (){
            chaine = "";
            chaineAffiche ="";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            formu.classList.toggle("hide");
            mode = !mode;
            formText.value = "";
            
        },
        "√x" : function (){
            chaine += "Math.sqrt(";
            chaineAffiche += "√(";
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
            
        },
        "cos(x)" : function (){
            chaine += "Math.cos(";
            chaineAffiche += "cos(";
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
            
            
        },
        "sin(x)" : function (){
            chaine += "Math.sin(";
            chaineAffiche += "sin(";
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
            
        },
        "tan(x)" : function (){
            chaine += "Math.tan(";
            chaineAffiche += "tan(";
            if (mode == false){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillText(chaineAffiche,20,25);
            }else{
                formText.value = chaine;
            }
            
        },
    };

    // Tester si il le bouton est possible de le contexte
    function test(chaine){
        if (chaine[chaine.length-1] in except2 ||chaine.length === 0){
            return false;
        }else{
            return true;
        }
    }
    let except2 = {
        '+' : function(){
            return(test(chaine));
        },
        "-" : function(){
            if (chaine[chaine.length-1] === "-"){
                return false;
            }else{
                return true;
            }
        },
        "/" :function(){
            return(test(chaine));
        },
        "%" : function(){
            return(test(chaine));
        },
        "*" :function(){
            return(test(chaine));
        }
    }

    // Touches de la calculatrice
        for (let i = 0, bouton; bouton = boutons[i], i < boutons.length; i++) {
            bouton.addEventListener("click", function () {
                ctx.font = `${fontSize}px Luckiest Guy`;
                let touche = bouton.textContent;
                if (demarre == true){
                    if (mode === false){
                        if (touche in except){
                            except[touche]();
                        }else if (touche in except2) {
                            if(except2[touche](chaine)){
                                chaine += touche;
                                chaineAffiche += touche;
                                listeCalcul[-1] = chaine;
                                listeCalculAffiche[-1] = chaineAffiche;
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                                ctx.fillText(chaineAffiche,20,25);
                            }
                        }else{
                            chaine += touche;
                            chaineAffiche += touche;
                            listeCalcul[-1] = chaine;
                            listeCalculAffiche[-1] = chaineAffiche;
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.fillText(chaineAffiche,20,25);
                        }
                    }
                    else{
                        if (touche in except){
                            except[touche]();
                        }else if (touche in except2) {
                            if(except2[touche](chaine)){
                                chaine += touche;
                                formText.value = chaine;
    
                            }
                        }else{
                            chaine += touche;
                            formText.value = chaine;
                        }
                    }
                }
            });
        }


    // Partie Graph
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        afficherGraph(formText.value);
    });

    // Dessiner le repère
    function afficherGraph(formule, taille = 5) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = taille;

        ctx.strokeStyle = "yellow";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2); 
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        dessine_les_points(canvas, formule, -plage_xy, plage_xy, -plage_xy, plage_xy, 10_000, "blue", true, ecart, ecart, taille);
    }

    // Dessiner le graphique
    function dessine_point(canvas, x, y,debut_x, fin_x,debut_y, fin_y, color="blue", taille){
        let x_canvas = ((x - debut_x) / (fin_x - debut_x)) * canvas.width;
        let y_canvas = canvas.height - ((y - debut_y) / (fin_y - debut_y)) * canvas.height;
      
        let ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(x_canvas+(taille/2), y_canvas-(taille/2), (taille/2), 0, Math.PI * 2); 
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    function dessine_les_points(canvas, formule, debut_x, fin_x,debut_y, fin_y, precision=10_000, color="blue", text = true, xgrad = 1, ygrad = 1, taille = 3){
        for(let i = 0; i < precision; i++){
            let point_x = debut_x + ((fin_x - debut_x)/precision) * i;
            let point_y = eval(formule.replace("x", "(" + point_x + ")"));
            //console.log(point_x, point_y);
            dessine_point(canvas, point_x, point_y, debut_x, fin_x, debut_y, fin_y, color, taille);
        }

        if(text){
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = "black";
            ctx.font = `${10 * taille}px Luckiest Guy`;
            for(let i = debut_x; i < fin_x; i += xgrad){
                ctx.fillText(i, ((i - debut_x) / (fin_x - debut_x)) * canvas.width, canvas.height/2);
            }

            for(let i = debut_y; i < fin_y; i += ygrad){
                ctx.fillText(i, canvas.width/2, canvas.height - ((i - debut_y) / (fin_y - debut_y)) * canvas.height);
            }
        }
    }

    // Affichage du titre en premier plan avec effet 3D
    h1.addEventListener("mouseenter", function(){
        titres.classList.add("hover");
        calculatrice.classList.add("troisD");

        

    });
    h1.addEventListener("mouseleave", function(){
        titres.classList.remove("hover");
        calculatrice.classList.remove("troisD");
    });


    // Mode Sombre
    modeSombre.addEventListener("click", ()=>{
        if (modeSombre.innerHTML == '<img src="./img/SunV2.png" alt="Icone Soleil">'){
            modeSombre.innerHTML = '<img src="./img/MoonV2.png" alt="Icone Lune">';
            document.querySelector("html").style.backgroundColor = "white";
            document.querySelector(".important").style.color = "#00044d";
            document.querySelector(".important").style.textShadow = "3px 3px #e0c738";
            
        }else{
            modeSombre.innerHTML = '<img src="./img/SunV2.png" alt="Icone Soleil">';
            document.querySelector("html").style.backgroundColor = "black";
            document.querySelector(".important").style.color = "white";
            document.querySelector(".important").style.textShadow = "3px 3px #00044d";
        }
        
    });

    // Bouton Power
    btnPower.addEventListener("click", ()=>{
        ctx.font = `${fontSize}px Luckiest Guy`;
        if (btnPower.innerHTML == "OFF"){
            onOff.style.marginLeft = "auto";
            onOff.style.backgroundColor = "rgb(0, 255, 0)";
            btnPower.innerHTML = "ON";
            btnPower.style.marginLeft = "auto";
            btnPower.style.backgroundColor = "rgb(0, 255, 0)";
            demarre = true;
            for(let btn of boutons){
                btn.classList.add("boutonAllume");
            }
            document.querySelector(".historiqueSecDisplay").style.backgroundColor = "rgb(218, 219, 251, 0.95)";
            affichage.classList.add("affichageAllume");
            ctx.fillText("Activation", canvas.width/2-300, canvas.height/2-100);
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1000);
            
        }else{
            onOff.style.marginLeft = "0";
            onOff.style.backgroundColor = "red";
            btnPower.innerHTML = "OFF";
            btnPower.style.marginLeft = "0";
            btnPower.style.backgroundColor = "red";
            chaine = "";
            chaineAffiche = "";
            listeCalcul = [];
            listeCalculAffiche = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            formu.classList.add("hide");
            demarre = false;
            for(let btn of boutons){
                btn.classList.remove("boutonAllume");
            }
            ctx.fillText("Desactivation", canvas.width/2-350, canvas.height/2-100); 
            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                affichage.classList.remove("affichageAllume");
                document.querySelector(".historiqueSecDisplay").style.backgroundColor = "rgba(152, 153, 175, 0.95)";
            }, 1000);    
            
        }
        
    });
}

window.onload = main;