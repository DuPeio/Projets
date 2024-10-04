    <?php
        session_start();
        if(!$_SESSION['pseudo']){
            header('Location: index.php');
            exit();

        }

        $identifiant = $_SESSION['pseudo'];
        $id = $_SESSION['id'];

        $bdd = new PDO('mysql:host=localhost;dbname=kilometres;charset=utf8', 'root', 'root');

        // Ajouter un équipement
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['addEquip'])) {
            $marque = htmlspecialchars($_POST['marque']);
            $modele = htmlspecialchars($_POST['modele']);
            // $equipementId = $_POST['equipementId'];
            
            if(!empty($_FILES['photoAdd'])){
                $req = $bdd->prepare("INSERT INTO equipement  (idUtilisateur, marque, modele, nbKilo, nbKiloPrevenir, dateAjout) VALUES (?, ?, ?, 0, 500, NOW())");
                $req->execute(array($id, $marque, $modele));
                
                $tailleMax = 2097152;

                if($_FILES['photoAdd']['size'] <= $tailleMax){
                    $equipementId = $bdd->lastInsertId();

                    echo $equipementId;
                    $extension = strtolower(substr(strrchr($_FILES['photoAdd']['name'],'.'),1));
                    $chemin = "./images/photosEquip/".$equipementId.".".$extension;
                    $nom = $equipementId.".".$extension;
                    $mouvementDuFichier = move_uploaded_file($_FILES['photoAdd']['tmp_name'], $chemin);

                    if($mouvementDuFichier){
                        echo $nom;
                        $req = $bdd->prepare("UPDATE equipement SET photo = ? WHERE id = ?");
                        $req -> execute(array($nom, $equipementId));
                    }
                }   
            }
        }

        //Supprimer un équipement
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['supprimerEquip'])){
            $equipementIdSupp = $_POST['IdEquipSupp'];

            $req = $bdd->prepare("DELETE FROM equipement WHERE id = ?");
            $req->execute(array($equipementIdSupp));
        }

        // Ajouter des kilomètres à un équipement
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['addKilo'])) {
            $equipementId = $_POST['equipementId'];
            $kilo = $_POST['kilo'];

            $req = $bdd->prepare("UPDATE equipement SET nbKilo = nbKilo + ? WHERE id = ?");
            $req->execute(array($kilo, $equipementId));
        }

        $req = $bdd->prepare("SELECT * FROM equipement WHERE idUtilisateur = ?");
        $req->execute(array($id));

        // Supprimer des kilomètres à un équipement
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['removeKilo'])) {
            $equipementId = $_POST['equipementId'];
            $kilo = $_POST['kilo'];

            $req = $bdd->prepare("UPDATE equipement SET nbKilo = nbKilo - ? WHERE id = ?");
            $req->execute(array($kilo, $equipementId));
        }

        // Modifier l'équipement
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['modifEquip'])){
            $equipementId = $_POST['equipementId'];
            $marque = htmlspecialchars($_POST['marqueModif']);
            $modele = htmlspecialchars($_POST['modeleModif']);
            if(!empty($_FILES['photoModif'])){
                $tailleMax = 2097152;
                if($_FILES['photoModif']['size'] <= $tailleMax){
                    $extension = strtolower(substr(strrchr($_FILES['photoModif']['name'],'.'),1));
                    $chemin = "./images/photosEquip/".$equipementId.".".$extension;
                    $nom = $equipementId.".".$extension;
                    $mouvementDuFichier = move_uploaded_file($_FILES['photoModif']['tmp_name'], $chemin);
                    if($mouvementDuFichier){
                        $req = $bdd->prepare("UPDATE equipement SET photo = ? WHERE id = ?");
                        $req -> execute(array($nom, $equipementId));
                    }
                }   

            }
            $req = $bdd->prepare("UPDATE equipement SET marque = ?, modele = ? WHERE id = ?");
            $req->execute(array($marque, $modele, $equipementId));
            
        }

        // Modifier kilomètres prévention
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['modifPrev'])){
            $equipementId = $_POST['equipementId'];
            $nbKiloPrevenir = $_POST['kiloPrev'];

            $res = $bdd->prepare("UPDATE equipement SET nbKiloPrevenir = ? WHERE id = ?");
            $res->execute(array($nbKiloPrevenir, $equipementId));
        }

        $req = $bdd->prepare("SELECT * FROM equipement WHERE idUtilisateur = ?");
        $req->execute(array($id));


        
        $matos = $req->fetchAll();

        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['deco'])){
            session_destroy();
            header("Location: ./principal.php");
            exit();
        }   
    ?>

    <!DOCTYPE html>
    <html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="Pierre MAGIEU">
        <link rel="icon" href="../images/Logo Concluant sans fon.svg" type="image/svg+xml">
        <link rel="stylesheet" href="./style.css">
        <title>Kilométrage</title>
    </head>

    <body class="index">
        <section class="principal ">
            <header>
                <form method="POST" action="">
                        <button type="submit" name="deco" class="deco"><img class="logo" src="./images/Logo Concluant.svg" alt="Logo" ></button>
                </form>
                
                <div class="TitreSousTitre">
                    <h1>VOS EQUIPEMENTS</h1>
                    <div class="sousTitre">
                        <div class="ligne"></div>
                        <div class="nom"><?php echo $identifiant; ?></div>
                    </div>
                </div>

                <div class="total">
                    Distance totale parcourue <br>
                    <div class="nbre"></div><span>kilomètres</span>
                </div>

            </header>

            <section class="corps">
                <img class="bgPlanete" src="./images/planet 1.png" alt="BG Planète">
            <ul>
                <?php foreach ($matos as $equipement): ?>
                    <li class="equipement" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">
                        <div class="photoModif">
                            <div class="conteneurImg">
                                <img src="./images/photosEquip/<?php echo htmlspecialchars($equipement['photo']); ?>" alt="photo chaussure">
                            </div>
                            <div class="btnModifier" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">Modifier</div>
                        </div>
                        <div class="matos">
                            <h2><?php echo htmlspecialchars($equipement['marque']." ".$equipement['modele']); ?></h2>
                            <div class="premier">
                                Nombre de kilomètres parcourus :
                                <span class="nbKilo"><?php echo htmlspecialchars($equipement['nbKilo']); ?></span> km
                                <div class="btnAjouter" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">AJOUTER</div>
                                <div class="btnRetirer" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">RETIRER</div>
                            </div>
                            <div class="deux">
                                M'avertir au bout de :
                                <span class="avertissement"><?php echo htmlspecialchars($equipement['nbKiloPrevenir']); ?></span> km
                                <div class="btnModifierKilo" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">MODIFIER</div>
                            </div>
                            <div class="trois">
                                Date d'ajout : <?php echo htmlspecialchars($equipement['dateAjout']); ?>
                            </div>
                            <div class="ligneMatos"></div>
                        </div>
                        <div class="warning">
                            <img src="./images/Panneau.svg" alt="Icone panneau warning">
                            <div class="warningText">
                                Nombre de kilomètres atteint !
                            </div>
                        </div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>

            <div class="boutons">
                <div class="ajouterEquip">
                    AJOUTER UN EQUIPEMENT
                </div>
                <div class="supprimerEquip">
                    SUPPRIMER UN EQUIPEMENT
                </div>
            </div>
            <div class="protec"></div>
        </section>

        <?php foreach ($matos as $equipement): ?>
                <div class="formulaires" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">

                <!-- Ajouter des kilomètres à un équipement -->
                <section class="ajouterKilo">
                    <h2>AJOUTER DES KILOMETRES A <div class="nom"><?php echo htmlspecialchars($equipement['marque']." ".$equipement['modele']); ?></div></h2>

                    <form class="formAdd" method="POST" action="">

                        <div class="question">Combien de kilomètres as-tu fais avec cet équipement ?</div>
                        <input type="number" step="0.01" min="0" placeholder="Remplir ici" name="kilo" required>

                        <input type="hidden" name="equipementId" value="<?php echo $equipement['id']; ?>">

                        <div class="btnAdd">
                            <button class="btnAnnulAdd" type="reset">Annuler</button>
                            <button type="submit" name="addKilo">Ajouter</button>
                        </div>

                    </form>
                </section>

                <!-- Supprimer des kilomètres d'un équipement -->
                <section class="suppKilo">
                    <h2>SUPPRIMER DES KILOMETRES A <div class="nom"><?php echo htmlspecialchars($equipement['marque']." ".$equipement['modele']); ?></div></h2>

                    <form class="formRemove" method="POST" action="">
                        <div class="question">Combien de kilomètres souhaites-tu supprimer à cet équipement ?</div>
                        <input type="number" step="0.01" min="0" placeholder="Remplir ici" name="kilo" required>

                        <input type="hidden" name="equipementId" value="<?php echo $equipement['id']; ?>">

                        <div class="btnRemove">
                            <button class="btnAnnulSupp" type="reset">Annuler</button>
                            <button type="submit" name="removeKilo">Supprimer</button>
                        </div>

                    </form>
                </section>

                <!-- Modifier un équipement -->
                <section class="modifEquip">
                    <h2>MODIFIER UN EQUIPEMENT</h2>

                    <form class="formModifEquip" method="POST" action="" enctype="multipart/form-data">
                        <div class="equip">
                            <img src="./images/Camera fond gris.svg" alt="photo chaussure">
                            <div class="nomEquip">    
                                <div class="marque"><?php echo htmlspecialchars($equipement['marque']); ?></div>
                                <div class="modele"><?php echo htmlspecialchars($equipement['modele']); ?></div>
                            </div>
                        </div>

                        <div class="marque">Modifier la marque ?</div>
                        <input type="text" maxlength="15" placeholder="Remplir ici" name="marqueModif" required>

                        <div class="modele">Modifier le modèle ?</div>
                        <input type="text"  maxlength="15" placeholder="Remplir ici" name="modeleModif" required>

                        <div>Ajouter une nouvelle photo ?</div>
                        <input type="file" accept=".png,.jpeg,.gif,.pdf,.jpg"  name="photoModif" class="photo">

                        <!-- Ca sert à reconnaitre le formulaire -->
                        <input type="hidden" name="equipementId" value="<?php echo $equipement['id']; ?>">

                        <div class="btnModifEquip">
                            <button class="btnAnnulModifEquip" type="reset">Annuler</button>
                            <button type="submit" name="modifEquip">Enregistrer</button>
                        </div>

                    </form>
                </section>

                <!-- Modifier Kilomètres prévention -->
                <section class="modifPrev">
                    <h2><div class="nom"><?php echo htmlspecialchars($equipement['marque']." ".$equipement['modele']); ?></div>MODIFICATION PREVENTION</h2>

                    <form class="formModifPrev" method="POST" action="">

                        <div class="question">Au bout de combien de kilomètres souhaites tu être prévenu ?</div>
                        <input type="number" step="0.01" min="0" placeholder="Remplir ici" name="kiloPrev" required>

                        <input type="hidden" name="equipementId" value="<?php echo $equipement['id']; ?>">

                        <div class="btnModifPrev">
                            <button class="btnAnnulModifPrev" type="reset">Annuler</button>
                            <button type="submit" name="modifPrev">Ajouter</button>
                        </div>

                    </form>
                </section>

            </div>
            <?php endforeach; ?>

        

        <section class="addEquip">
            <h2>AJOUTER UN EQUIPEMENT</h2>

            <form class="formAddEquip" method="POST" action="" enctype="multipart/form-data">
                <div class="sousTitre">Renseigne les informations de ton nouvel équipement</div>

                <div class="marque">Quelle est sa marque ?</div>
                <input type="text" maxlength="15" placeholder="Remplir ici" name="marque" required>

                <div class="modele">Quel est son modèle ?</div>
                <input type="text" maxlength="15" placeholder="Remplir ici" name="modele" required>

                <div>Tu veux ajouter une photo ?</div>
                <input type="file" accept=".png,.jpeg,.gif,.pdf,.jpg"  name="photoAdd" class="photo">

                <!-- <input type="hidden" name="idUtilisateur" value=""> -->

                <div class="btnAddEquip">
                    <button class="btnAnnulAddEquip" type="reset">Annuler</button>
                    <button type="submit" name="addEquip">Enregistrer</button>
                </div>

            </form>
        </section>

        <section class="removeEquip">
            <h2>SUPPRIMER UN EQUIPEMENT</h2>

            <div class="bg">
                <ul class="listRemoveEquip">
                    <?php foreach ($matos as $equipement): ?>
                        <li class="equipementSupp" data-id="<?php echo htmlspecialchars($equipement['id']); ?>">
                            <div class="ekip">
                                <div class="nomEquipPhoto ">
                                    <img src="./images/photosEquip/<?php echo htmlspecialchars($equipement['photo']); ?>" alt="photo chaussure">
                                </div>
                                <div class="nomEquip">
                                    <div><?php echo htmlspecialchars($equipement['marque']); ?></div>
                                    <div ><?php echo htmlspecialchars($equipement['modele']); ?></div>
                                </div> 
                            </div>
                            
                        </li>

                    <?php endforeach; ?>
                </ul>
            </div>
            <div class="btnAnnulRemoveEquip">
                Annuler
            </div>
        </section>

        <section class="removeEquipVerif">
            <h2>SUPPRIMER UN EQUIPEMENT</h2>
           
            <form  method="POST" action="">
                <div class="verifCorps">
                    <div class="question">
                        Veux tu vraiment supprimer cet équipement ? 
                    </div>
                    <br><br>
                    <div class="btnRemoveEquipVerif">
                        <button class="demiTour">Demi-tour !</button>
                        <button type="submit" name="supprimerEquip" class="sur" >J'en suis sûr !</button>
                    </div>
                </div>
            </form>
        </section>


        <script type="text/javascript" src="./scriptIndex.js"></script>
    </body>

    </html>