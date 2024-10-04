<?php
    session_start();
    $bdd = new PDO('mysql:host=localhost;dbname=kilometres;charset=utf8','root','root');

    if (isset($_POST['go'])){
        $identifiant = $_POST['identifiant'];
        $mdp = sha1($_POST['mdp']);
        $mail = $_POST['mail'];

        if($identifiant != "" && $mdp != "" && $mail != ""){
            $req = $bdd->prepare("SELECT * FROM utilisateurs WHERE pseudo = ? AND mdp = ?");
            $req->execute(array($identifiant, $mdp));

            if($req->rowCount() == 0){
                
                $insc = $bdd->prepare("INSERT INTO utilisateurs (pseudo, mdp, mail) VALUES (?,?,?)");
                $insc->execute(array($identifiant, $mdp, $mail));

                $_SESSION['pseudo'] = $identifiant;
                $_SESSION['id'] = $req->fetch()['id'];
                header("Location: ./principal.php");
                exit();
            }
            else{
                $mess = "Identifiant déjà utilisé";
            }
        }else{
            $mess = "Champs de données manquant";
        }
    }

?>

<!DOCTYPE html>
<html lang="fr">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Pierre MAGIEU">
    <title>Kilométrage Inscription</title>
    <link rel="icon" href="../images/Logo Concluant sans fon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="../style.css">
</head>

<body class="inscription">
    <img class="logo" src="../images/Logo Concluant.svg" alt="Logo">
    <form method="POST" action="">
        <h1>INSCRIPTION</h1>
        <div class="blackBox"></div>
        <div class="input-box">
            <label for="mail">Adresse mail</label>
            <input type="text" id="mail" name="mail" placeholder="Entrez votre adresse mail">
            <img src="../images/empty-email_80599.png" alt="Icone mail">
        </div>
        <div class="input-box">
            <label for="idenfifiant">Identifiant</label>
            <input type="text" id="identifiant" name="identifiant" placeholder="Entrez votre identifiant">
            <img src="../images/user-profile_14660.png" alt="Icone User">
        </div>
        <div class="input-box">
            <label for="mdp">Mot de passe</label>
            <input type="password" id="mdp" name="mdp" placeholder="Entrez votre mot de passe" required>
            <img src="../images/lock_152462.png" alt="Icone Cadenas">
        </div>

        <div class="btn">
            <button type="submit" class="login" name ="go">INSCRIPTION</button>
        </div>
        <div class="connInsc">
            Vous avez déjà un compte ? <a href="./index.php">Connexion</a>
        </div>
    </form>

    <div class="erreur">
        <?php 
            if(isset($mess)){
            echo $mess;
            }
            ?>
    </div>

    <img class="bg" src="../images/BG montagnes.svg" alt="montagnes">
    <img class="fg" src="../images/Montagne Premier plan.svg" alt="montagne">

    <div class="infoTexte">
        L’utilisation principale de ce site vous permet de compter les kilomètres parcourus avec votre équipement. Que
        ce soit
        des chaussures de marche, des baskets, des bâtons, un vélo, une trottinette... vous pouvez suivre les kilomètres
        effectués avec le matériel de votre choix.
    </div>
    <img class="info" src="../images/information_157933 1.svg" alt="Icone information">


    <div id="particles-js"></div>
    <script type="text/javascript" src="../particles.js"></script>
    <script type="text/javascript" src="../app.js"></script>
    <script type="text/javascript" src="./script.js"></script>


</body>

</html>