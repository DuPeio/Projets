import tkinter as tk
import modele

DIM = 30
COULEURS = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "dark grey", "black"]
SUIVANT = 6

class VueTetris:
    def __init__(self, modele_tetris):
        self.__modele = modele_tetris
        self.__fenetre = tk.Tk()
        self.__fenetre.title("Tetris")
        
        self.__can_terrain = tk.Canvas(self.__fenetre, width=self.__modele.get_largeur() * DIM, height=self.__modele.get_hauteur() * DIM)
        self.__can_terrain.pack(side="left")
        self.__cases = []
        for i in range(self.__modele.get_hauteur()):
            ligne_cases = []
            for j in range(self.__modele.get_largeur()):
                case = self.__can_terrain.create_rectangle(j * DIM, i * DIM, (j + 1) * DIM, (i + 1) * DIM, outline="grey", fill="")
                ligne_cases.append(case)
            self.__cases.append(ligne_cases)
            
        self.__boutons = tk.Frame(self.__fenetre)
        
        
        self.__jeu = tk.Button(self.__boutons, text="", command=self.__modele.maj_jeu)
        self.__jeu.pack()
        
        tk.Label(self.__boutons,text="Forme suivante").pack()
        self.__can_fsuivante = tk.Canvas(self.__boutons, width=SUIVANT* DIM, height=SUIVANT*DIM )
        self.__can_fsuivante.pack()
        
        
        self.__lbl_score = "Score : 0"
        self.__score = tk.Label(self.__boutons, text = self.__lbl_score, fg="red")
        self.__score.pack()
        self.__les_suivants=[]
        for i in range(SUIVANT):
            ligne_cases_suiv=[]
            for j in range (SUIVANT):
                case_suiv = self.__can_fsuivante.create_rectangle(j*DIM, i*DIM, (j+1)*DIM, (i+1)*DIM, outline="grey", fill ="black")
                ligne_cases_suiv.append(case_suiv)
            self.__les_suivants.append(ligne_cases_suiv)
        
        self.__quitter = tk.Button(self.__boutons, text="Quitter", command=self.__fenetre.destroy)
        self.__quitter.pack()
        
        self.__touches1 = tk.Label(self.__boutons, text = "Flèches Gauche/Droite = Diriger", fg="green")
        self.__touches2 = tk.Label(self.__boutons, text = "Flèche Bas = Tomber plus vite", fg="green")
        self.__touches3 = tk.Label(self.__boutons, text = "Barre espace = Tomber encore plus vite", fg="green")
        self.__touches4 = tk.Label(self.__boutons, text = "Flèche Haut = Tourner Forme", fg="green")
        self.__touches1.pack()
        self.__touches2.pack()
        self.__touches3.pack()
        self.__touches4.pack()
        
        
        self.__boutons.pack(side="right")

    def get_fenetre(self):
        '''VueTetris -> VueTetris.__fenetre
        Récupère la fenêtre Tetris
        '''
        return self.__fenetre

    def dessine_case(self, j, i, coul):
        '''VueTetris, Int, Int, Int -> None
        Change la couleur de la case
        '''
        self.__can_terrain.itemconfigure(self.__cases[i][j], fill=COULEURS[coul])

    def dessine_terrain(self):
        '''VueTetris -> None
        Dessine chaque case du terrain
        '''
        for i in range(self.__modele.get_hauteur()):
            for j in range(self.__modele.get_largeur()):
                coul = self.__modele.get_terrain()[i][j]
                self.dessine_case(j, i, coul)

    def dessine_forme(self, coords, couleur):
        '''VueTetris, tuples(Int, Int), Int -> None
        Dessine chaque case de la forme
        '''
        for x, y in coords:
            self.dessine_case(x, y, couleur)
            
    #Etape 3
    def met_a_jour_score(self, val):
        '''VueTetris, Int-> None
        Change la valeur du score
        '''
        self.__score.configure(text="Score : "+ str(val))
    
    
    def dessine_case_suivante(self, x, y, coul):
        '''VueTetris, Int, Int, Int -> None
        Change la couleur de la case
        '''
        self.__can_fsuivante.itemconfigure(self.__les_suivants[x][y], fill=COULEURS[coul])
                
            
    def nettoie_forme_suivante(self):
        '''VueTetris-> None
        Remet toute les cases de la partie pièce suivante en noir 
        '''
        for i in range(len(self.__les_suivants)):
            for j in range(len(self.__les_suivants[i])):
                self.__can_fsuivante.itemconfigure(self.__les_suivants[i][j], fill="black")
        
        
    def dessine_forme_suivante(self, coords, coul):
        '''VueTetris, tuples(Int, Int), Int -> None
        Dessine chaque case de la forme suivante
        '''
        self.nettoie_forme_suivante()
        for x, y in coords:
            self.dessine_case_suivante(y+2, x+2, coul)
            
    
    #Etape 4
    def met_a_jour_bouton(self):
        '''VueTetris -> None
        Permet de changer le texte dans le bouton qui lance et met le jeu en pause
        '''
        if not self.__modele.get_commence():
            self.__jeu.configure(text="Commencer")
        elif not self.__modele.get_pause():
            self.__jeu.configure(text="Pause")
        elif self.__modele.get_pause():
            self.__jeu.configure(text="Reprendre") 
    
    def met_a_jour_reco(self):
        '''VueTetris -> None
        Permet de changer le texte dans le bouton pour relancer le jeu
        '''
        self.__jeu.configure(text="Recommencer", command = self.__modele.reco) 
    
    def met_a_jour_co(self):
        '''VueTetris -> None
        Permet de changer le texte dans le bouton pour relancer le jeu
        '''
        self.__jeu.configure(text="Recommencer", command = self.__modele.maj_jeu) 
        
        
    
            