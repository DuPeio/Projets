import vue
import modele
import time

class Controleur:
    def __init__(self, tetris):
        self.__tetris:modele.ModeleTetris = tetris
        self.__vue = vue.VueTetris(self.__tetris)
        self.__fen = self.__vue.get_fenetre()
        self.__fen.bind("<Key-Left>",self.forme_a_gauche)
        self.__fen.bind("<Key-Right>",self.forme_a_droite)
        self.__fen.bind("<Key-Down>",self.forme_tombe)
        self.__fen.bind("<Key-Up>",self.forme_tourne)
        self.__fen.bind("<space>",self.forme_tombe_a_fond)
        self.__delai = 260
        self.__delai2 = 0
        self.joue()
        self.__fen.mainloop()
        
              
    def joue(self) :
        '''Controleur -> None
        boucle principale du jeu. Fait tomber une forme d’une ligne.
        '''
        self.__vue.met_a_jour_co()
        if not self.__tetris.fini() :
            self.__vue.met_a_jour_bouton()
            self.affichage()
            self.__fen.after(self.__delai,self.joue)
        
        else:
            self.__vue.met_a_jour_reco()
            self.__delai = 260
            self.__fen.after(self.__delai,self.joue)
            
            
        
        
            
    def affichage(self):
        '''Controleur -> None
        Dessine le terrain et la forme si elle est entrain de tomber
        '''
        self.__vue.dessine_terrain()
        self.__vue.dessine_forme(self.__tetris.get_coords_forme(), self.__tetris.get_couleur_forme())
        self.__vue.dessine_forme_suivante(self.__tetris.get_coords_suivante(),self.__tetris.get_couleur_suivante())
        if self.__tetris.get_commence():
            if not self.__tetris.get_pause():
                if not self.__tetris.forme_tombe():
                    self.__vue.dessine_terrain()
                    self.__vue.dessine_forme(self.__tetris.get_coords_forme(), self.__tetris.get_couleur_forme())
                else:
                    self.tombe_paliers()
                    val = self.__tetris.get_score()
                    self.__vue.met_a_jour_score(val)
                    self.__vue.dessine_forme_suivante(self.__tetris.get_coords_suivante(),self.__tetris.get_couleur_suivante())
                
            
    #Etape 2
            
    def forme_a_gauche(self, event):
        '''Controleur -> None
        Fait se diriger la forme vers la gauche
        '''
        self.__tetris.forme_a_gauche()
        
    def forme_a_droite(self,event):
        '''Controleur -> None
        Fait se diriger la forme vers la droite'''
        self.__tetris.forme_a_droite()
        
    def forme_tombe(self,event):
        '''Controleur -> None
        Fait tomber la forme plus vite
        '''
        if self.__tetris.get_commence():
            if not self.__tetris.get_pause():
                self.__delai = 100
    
    def forme_tourne(self, event):
        '''Controleur -> None
        Fait tourner la forme à 90°
        '''
        self.__tetris.forme_tourne()
    
    #Etape 4
    def tombe_paliers(self):
        '''Controleur -> None
        Fait tomber la pièce de plus en plus vite en fonction du score
        '''
        self.__delai = 260
        if self.__tetris.get_score() < 10 :
            self.__delai = 260 - self.__tetris.get_score()*10
            self.__delai2 = self.__delai
        else:
            self.__delai = self.__delai2
        
    def forme_tombe_a_fond(self,event):
        '''Controleur -> None
        Fait tomber la forme plus vite
        '''
        if self.__tetris.get_commence():
            if not self.__tetris.get_pause():
                self.__delai = 1
                
if __name__ == "__main__" :
    # création du modèle
    tet = modele.ModeleTetris()
    # création du contrôleur. c’est lui qui créé la vue
    # et lance la boucle d’écoute des évts
    ctrl = Controleur(tet)
