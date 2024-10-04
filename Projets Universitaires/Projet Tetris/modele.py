from random import randint

LES_FORMES = [[(-1,1),(-1,0),(0,0),(1,0)],[(-1,-1),(0,-1),(0,0),(1,0)],[(-1,0),(0,0),(0,-1),(1,-1)],[(-1,0),(0,0),(1,0),(1,1)],[(0,-1),(0,0),(0,1),(-1,0)],[(-1,0),(0,0),(-1,1),(0,1)],[(0,2),(0,1),(0,0),(0,-1)]]

class ModeleTetris:
    def __init__ (self, nb_lig=24, nb_col=14, base = 4):
        self.__haut = nb_lig
        self.__larg = nb_col
        self.__base = base
        self.__score = 0
        self.__terrain:list = [[-2 for _ in range(self.__larg)] for _ in range(self.__base)] + [[-1 for _ in range(self.__larg)] for _ in range(self.__haut-self.__base)]
        self.__forme = Forme(self)
        self.__suivante = Forme(self)
        self.__commence = False
        self.__pause = False
    
    def get_largeur(self):
        '''ModeleTetris -> int
        Récupère la largeur de la classe ModeleTetris
        '''
        return self.__larg
    
    def get_hauteur(self):
        '''ModeleTetris -> int
        Récupère la hauteur de la classe ModeleTetris
        '''
        return self.__haut
    
    def get_valeur(self,lig,col):
        '''ModeleTetris, int, int-> int
        Récupère la valeur d'une case / le chiffre associé à tel élément de telle liste
        '''
        return self.__terrain[lig][col]
    
    def est_occupe(self, lig, col):
        '''ModeleTetris, int, int -> Bool
        Vérifie si une case existe avec ses coordonnées
        Vérifie si la case est vide grâce à sa valeur associée
        '''
        if lig >= self.get_hauteur() or col >= self.get_largeur() or lig < 0 or col < 0:
            return True
        if self.__terrain[lig][col] >= 0:
            return True
        return False

    def fini(self):
        '''ModeleTetris -> Bool
        Vérifie si le jeu doit s'arrêter
        '''
        for elmt in self.__terrain[self.__base-1]:
            if elmt != -2:
                self.__commence = 0
                return True
        return False
    
    
    def ajoute_forme(self):
        '''ModeleTetris -> None
        Permet de changer la valeur d'une case, sa couleur sur le terrain
        '''
        l = self.__forme.get_coords()
        for elmt in l:
            x,y = elmt
            self.__terrain[y][x] = self.__forme.get_couleur()
    
    def forme_tombe(self):
        '''ModeleTetris -> Bool
        Permet de dessiner la forme sur le terrain et d'en créer une nouvelle
        quand la précédente ne tombe plus
        '''
        if self.__forme.tombe():
            self.ajoute_forme()
            self.__forme=self.__suivante
            self.__suivante=Forme(self)
            self.supprime_lignes_completes()
            return True
        return False
    
    def get_couleur_forme(self):
        '''ModeleTetris -> Int
        Récupère la valeur associé à la forme, sa couleur
        '''
        return self.__forme.get_couleur()
    
    def get_coords_forme(self):
        '''ModeleTetris -> tuple(Int, Int)
        Récupère les coordonnées d'une forme
        '''
        return self.__forme.get_coords()
    
    def get_terrain(self):
        '''ModeleTetris -> List(List(Int))
        Récupère la liste qui compose le terrain
        '''
        return self.__terrain
    
    # Etape 2
    
    def forme_a_gauche(self):
        '''ModeleTetris -> None
        Fait se diriger la forme vers la gauche
        '''
        if self.__commence:
            if not self.__pause:
                self.__forme.a_gauche()
        
    def forme_a_droite(self):
        '''ModeleTetris -> None
        Fait se diriger la forme vers la droite
        '''
        if self.__commence:
            if not self.__pause:
                self.__forme.a_droite()
        
    def forme_tourne(self):
        '''ModeleTetris -> None
        Fait tourner la forme à 90°
        '''
        if self.__commence:
            if not self.__pause:
                self.__forme.tourne()
        
    #Etape 3
    def est_ligne_complete(self,lig):
        '''ModeleTetris -> Bool
        Verifie si une ligne du tableau est complète
        '''
        for i in range(len(self.__terrain[lig])):
            if not self.est_occupe(lig, i):
                return False
        return True
    
    def supprime_ligne(self,lig):
        '''ModeleTetris -> None
        Supprime la liste lig du terrain et ajoute une ligne
        '''
        del self.__terrain[lig]
        new_lig = [-1 for _ in range(self.__larg)]
        self.__terrain.insert(self.__base, new_lig)
        
    def supprime_lignes_completes(self):
        '''ModeleTetris -> None
        Supprime toutes les lignes complètes et ajoute 1 au score
        '''
        for lig in range(self.__base, self.__haut):
            if self.est_ligne_complete(lig):
                self.supprime_ligne(lig)
                self.__score += 1
                
    def get_score(self):
        '''ModeleTetris -> int
        Retourne le score
        '''
        return self.__score
    
    def get_coords_suivante(self):
        '''ModeleTetris -> tuple(Int, Int)
        Récupère les coordonnées de la forme suivante
        '''
        return self.__suivante.get_coords_relatives()
    
    def get_couleur_suivante(self):
        '''ModeleTetris -> Int
        Retourne la valeur/couleur de la forme suivante
        '''
        return self.__suivante.get_couleur()
            
            
    #Etape 4
    def get_commence(self):
        '''ModeleTetris -> bool
        Permet de savoir si le jeu a commencé ou pas
        '''
        return self.__commence
    
    def get_pause(self):
        '''ModeleTetris -> bool
        Permet de savoir si le jeu est en pause ou pas
        '''
        return self.__pause
    
    def maj_jeu(self):
        '''ModeleTetris -> None
        Met à jour le bouton quand on clique dessus
        '''
        if self.__commence:
            if self.__pause:
                self.__pause = False
            else: 
                self.__pause = True
        else: 
            self.__commence = True
        

    def reco(self):
        self.__score = 0
        self.__terrain:list = [[-2 for _ in range(self.__larg)] for _ in range(self.__base)] + [[-1 for _ in range(self.__larg)] for _ in range(self.__haut-self.__base)]
        self.__forme = Forme(self)
        self.__suivante = Forme(self)
        self.__commence = False
        self.__pause = False
    
class Forme:
    def __init__ (self, modele):
        self.__modele = modele
        indice = randint(0,6)
        self.__couleur = indice
        self.__forme = LES_FORMES[indice]
        self.__x0 = randint(1,self.__modele.get_largeur()-2)
        self.__y0 = 1
    
    def get_couleur(self):
        '''Forme -> int
        Récupère la couleur en cours
        '''
        return self.__couleur
    
    def get_coords(self):
        '''Forme -> list(tuple(int))
        Récupère les coordonnées absolue de la forme
        '''
        res = []
        for elmt in self.__forme:
            res.append((elmt[0] + self.__x0, elmt[1] + self.__y0))
        return res
    
    def collision(self):
        '''Forme,Forme-> Bool
        Vérifie si la forme touche une autre pièce ou le bas du terrain
        '''
        for co in self.get_coords():
            if co[1] == self.__modele.get_hauteur()-1:
                return True
        for elem in self.get_coords():
            x,y = elem
            if self.__modele.est_occupe(y+1,x):
                return True
        return False
    
    def tombe(self):
        '''Forme -> Bool
        Fait tomber la forme
        '''
        if not self.collision():
            self.__y0 +=1
            return False
        return True 
    
    # Etape 2
    def position_valide(self):
        '''Forme -> Bool
        Vérifie si une position est possible pour chaque coordonnées de la forme
        '''
        for elmt in self.get_coords():
            if self.__modele.est_occupe(elmt[1],elmt[0]):
                return False
            if elmt[0] < 0 or elmt[0] >= self.__modele.get_largeur():
                return False
            if not elmt[1] < self.__modele.get_hauteur()-1:
                return False
        return True

    
    def a_gauche(self):
        '''Forme -> None
        Fait se diriger la forme vers la gauche
        '''
        self.__x0 -= 1
        if not self.position_valide():
            self.__x0 +=1
            
    def a_droite(self):
        '''Forme -> None
        Fait se diriger la forme vers la droite
        '''
        self.__x0 += 1
        if not self.position_valide():
            self.__x0 -=1
            
    def tourne(self):
        '''Forme -> None
        Fait tourner la forme à 90°
        '''
        forme_prec = self.__forme
        self.__forme=[]
        for x,y in forme_prec:
            self.__forme.append((-y, x))
        if not self.position_valide():
            self.__forme = forme_prec
            
    
    #Etape 3
    def get_coords_relatives(self):
        '''Forme -> list(tuple(int))
        Récupère les coordonnées relatives de la forme
        '''
        return self.__forme.copy()