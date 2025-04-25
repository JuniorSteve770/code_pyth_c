import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

import "./QCMStyles.css";

const questions = {
    basic: [
        
        { question: "Quelle est la différence entre une classe et une instance ?", options: ["Une classe est un objet, une instance est une fonction", "Une classe est un modèle, une instance est une réalisation concrète", "Il n'y a aucune différence", "Une classe est une variable"], answer: "Une classe est un modèle, une instance est une réalisation concrète", explanation: "Une classe définit le blueprint (modèle), tandis qu'une instance est un objet créé à partir de cette classe." },
        { question: "Qu'est-ce qu'un constructeur dans une classe Python ?", options: ["Un destructeur d'objets", "Une méthode appelée automatiquement lors de la création d'une instance", "Un type de variable", "Une fonction statique"], answer: "Une méthode appelée automatiquement lors de la création d'une instance", explanation: "Le constructeur est défini avec la méthode `__init__` et s'exécute lorsqu'une nouvelle instance est créée." },
        { question: "Quelle est la différence entre héritage simple et multiple en Python ?", options: ["L'héritage multiple permet à une classe d'hériter de plusieurs classes", "Pas de différence", "L'héritage simple ne permet pas l'utilisation de méthodes", "L'héritage multiple est interdit en Python"], answer: "L'héritage multiple permet à une classe d'hériter de plusieurs classes", explanation: "En Python, une classe peut hériter de plusieurs classes mères via l'héritage multiple." },
        { question: "Qu'est-ce qu'une méthode de classe (`@classmethod`) ?", options: ["Une méthode qui agit sur une instance", "Une méthode qui agit sur la classe elle-même", "Une méthode qui ne peut être appelée que depuis une autre classe", "Une méthode qui ne prend aucun argument"], answer: "Une méthode qui agit sur la classe elle-même", explanation: "Les méthodes de classe utilisent le décorateur `@classmethod` et reçoivent la classe (`cls`) comme premier argument." },
        { question: "Qu'est-ce qu'une méthode abstraite en Python ?", options: ["Une méthode qui doit être implémentée par les sous-classes", "Une méthode qui ne fait rien", "Une méthode qui ne peut être appelée", "Une méthode qui retourne toujours `None`"], answer: "Une méthode qui doit être implémentée par les sous-classes", explanation: "Les méthodes abstraites sont définies dans une classe abstraite et doivent être implémentées par les classes filles." },
        { question: "Quelle est la différence entre `super()` et `self` ?", options: ["`super()` appelle une méthode de la classe parente, `self` accède aux attributs de l'instance", "`super()` est utilisé pour créer une instance, `self` pour supprimer une instance", "`super()` et `self` sont identiques", "`super()` est un alias pour `self`"], answer: "`super()` appelle une méthode de la classe parente, `self` accède aux attributs de l'instance", explanation: "`super()` permet d'appeler des méthodes ou attributs de la classe parente, tandis que `self` référence l'instance actuelle." },
        { question: "Qu'est-ce qu'un getter en Python ?", options: ["Une méthode qui modifie une propriété", "Une méthode qui récupère une valeur", "Une méthode qui détruit une instance", "Une méthode qui crée une classe"], answer: "Une méthode qui récupère une valeur", explanation: "Les getters sont utilisés pour lire la valeur d'une propriété encapsulée." },
        { question: "Qu'est-ce qu'un setter en Python ?", options: ["Une méthode qui lit une propriété", "Une méthode qui modifie une propriété", "Une méthode qui détruit une instance", "Une méthode qui crée une classe"], answer: "Une méthode qui modifie une propriété", explanation: "Les setters permettent de modifier la valeur d'une propriété encapsulée." },
        { question: "Quelle est la différence entre `__str__` et `__repr__` ?", options: ["`__str__` est utilisé pour les humains, `__repr__` pour les développeurs", "`__str__` affiche des données brutes, `__repr__` affiche des données formatées", "`__str__` et `__repr__` sont identiques", "`__str__` est pour les objets, `__repr__` pour les classes"], answer: "`__str__` est utilisé pour les humains, `__repr__` pour les développeurs", explanation: "`__str__` produit une représentation lisible pour les humains, tandis que `__repr__` est destinée aux développeurs." },
        { question: "Qu'est-ce qu'une classe abstraite en Python ?", options: ["Une classe qui ne peut pas être instanciée", "Une classe qui contient des méthodes abstraites", "Une classe qui ne peut avoir de sous-classes", "Toutes les réponses sont correctes"], answer: "Toutes les réponses sont correctes", explanation: "Une classe abstraite ne peut pas être instanciée directement et contient au moins une méthode abstraite." },
        { question: "Quelle est la différence entre une méthode statique et une méthode de classe ?", options: ["La méthode statique n'a pas accès à `cls`, la méthode de classe oui", "La méthode statique est plus rapide", "Pas de différence", "La méthode statique est utilisée uniquement pour les calculs"], answer: "La méthode statique n'a pas accès à `cls`, la méthode de classe oui", explanation: "Les méthodes statiques n'ont pas accès à la classe (`cls`) ni à l'instance (`self`)." },
        { question: "Qu'est-ce qu'un mixin en Python ?", options: ["Une classe qui ajoute des fonctionnalités spécifiques", "Une classe principale", "Une classe qui ne peut pas être héritée", "Une classe qui remplace une autre classe"], answer: "Une classe qui ajoute des fonctionnalités spécifiques", explanation: "Les mixins sont des classes conçues pour fournir des fonctionnalités spécifiques à d'autres classes via l'héritage multiple." },
        { question: "Quelle est la différence entre `is` et `==` ?", options: ["`is` compare les objets, `==` compare les valeurs", "`is` est plus lent", "`is` et `==` sont identiques", "`is` ne peut pas être utilisé avec des nombres"], answer: "`is` compare les objets, `==` compare les valeurs", explanation: "`is` vérifie si deux objets sont identiques, tandis que `==` vérifie si leurs valeurs sont égales." },
        { question: "Qu'est-ce qu'une exception personnalisée en Python ?", options: ["Une erreur prédéfinie", "Une exception définie par l'utilisateur", "Une erreur fatale", "Une exception qui ne peut pas être interceptée"], answer: "Une exception définie par l'utilisateur", explanation: "Les exceptions personnalisées sont des classes qui héritent de `Exception` ou de ses sous-classes." },
        { question: "Qu'est-ce qu'un design pattern Singleton ?", options: ["Une classe qui ne peut avoir qu'une seule instance", "Une classe qui ne peut pas être héritée", "Une classe qui ne peut pas être instanciée", "Une classe qui ne peut avoir qu'une seule méthode"], answer: "Une classe qui ne peut avoir qu'une seule instance", explanation: "Le pattern Singleton garantit qu'une classe a une seule instance et fournit un point d'accès global à celle-ci." },
        
    ],
    moyen: [ 
        { question: "Quelle est la syntaxe correcte pour définir une classe en Python ?", options: ["class MaClasse:", "def MaClasse():", "class MaClasse()", "MaClasse = class()"], answer: "class MaClasse:", explanation: "La syntaxe pour définir une classe commence par le mot-clé `class`, suivi du nom de la classe et d'un deux-points." },
        { question: "Comment appeler une méthode statique dans une classe Python ?", options: ["NomClasse.methode_statique()", "instance.methode_statique()", "methode_statique()", "@staticmethod"], answer: "NomClasse.methode_statique()", explanation: "Les méthodes statiques sont appelées directement sur la classe sans nécessiter une instance." },
        { question: "Quelle est la bonne manière d'utiliser un décorateur en Python ?", options: ["@decorator def ma_fonction():", "ma_fonction = @decorator", "decorator.ma_fonction()", "def ma_fonction(): @decorator"], answer: "@decorator def ma_fonction():", explanation: "Les décorateurs sont utilisés avec la syntaxe `@nom_du_decorateur` juste avant la définition de la fonction." },
        { question: "Quelle est la syntaxe pour importer une classe spécifique d'un module ?", options: ["from module import Classe", "import module.Classe", "module.import(Classe)", "import Classe from module"], answer: "from module import Classe", explanation: "La syntaxe `from module import Classe` permet d'importer une classe spécifique d'un module." },
        { question: "Quelle est la différence entre `list.append(x)` et `list.extend(x)` ?", options: ["`append` ajoute un élément, `extend` ajoute plusieurs éléments", "`append` est plus rapide", "`append` et `extend` sont identiques", "`extend` ne peut pas être utilisé avec des listes"], answer: "`append` ajoute un élément, `extend` ajoute plusieurs éléments", explanation: "`append` ajoute un seul élément à la liste, tandis que `extend` ajoute tous les éléments d'un itérable." },
        { question: "Quelle est la syntaxe pour définir une fonction lambda en Python ?", options: ["lambda x: x + 1", "def lambda(x): x + 1", "lambda(x): x + 1", "x => x + 1"], answer: "lambda x: x + 1", explanation: "Les fonctions lambda sont définies avec la syntaxe `lambda arguments: expression`." },
        { question: "Quelle est la syntaxe pour une boucle `for` en Python ?", options: ["for i in range(10):", "for i = 0 to 10:", "for i in 10:", "for i := 0 to 10:"], answer: "for i in range(10):", explanation: "La syntaxe `for i in range(10):` permet de parcourir une séquence de nombres." },
        { question: "Quelle est la syntaxe pour capturer une exception en Python ?", options: ["try: ... except Exception as e:", "try: ... catch Exception as e:", "try: ... on Exception as e:", "try: ... handle Exception as e:"], answer: "try: ... except Exception as e:", explanation: "La syntaxe `try: ... except Exception as e:` permet de capturer et de gérer les exceptions." },
        { question: "Quelle est la syntaxe pour créer un dictionnaire vide en Python ?", options: ["{}", "dict()", "[]", "new dict()"], answer: "{}", explanation: "Les accolades `{}` ou la fonction `dict()` peuvent être utilisées pour créer un dictionnaire vide." },
        { question: "Quelle est la syntaxe pour formater une chaîne de caractères en Python ?", options: ["f\"{variable}\"", "format(variable)", "{variable}", "string.format(variable)"], answer: "f\"{variable}\"", explanation: "Les chaînes formatées (f-strings) utilisent la syntaxe `f\"{variable}\"` pour intégrer des variables." },
        { question: "Quelle est la syntaxe pour supprimer une clé d'un dictionnaire ?", options: ["del dictionnaire[clé]", "dictionnaire.remove(clé)", "dictionnaire.delete(clé)", "dictionnaire.pop(clé)"], answer: "del dictionnaire[clé]", explanation: "La syntaxe `del dictionnaire[clé]` permet de supprimer une clé d'un dictionnaire." },
        { question: "Quelle est la syntaxe pour concaténer deux listes en Python ?", options: ["liste1 + liste2", "liste1.concat(liste2)", "liste1.extend(liste2)", "liste1.append(liste2)"], answer: "liste1 + liste2", explanation: "L'opérateur `+` peut être utilisé pour concaténer deux listes." },
        { question: "Quelle est la syntaxe pour filtrer une liste en Python ?", options: ["filter(lambda x: condition, liste)", "liste.filter(condition)", "filtered(liste, condition)", "liste.where(condition)"], answer: "filter(lambda x: condition, liste)", explanation: "La fonction `filter` applique une condition à chaque élément d'une liste." },
        { question: "Quelle est la syntaxe pour utiliser une compréhension de liste en Python ?", options: ["[x for x in iterable if condition]", "[x in iterable if condition]", "list(x for x in iterable if condition)", "list.comprehend(x for x in iterable if condition)"], answer: "[x for x in iterable if condition]", explanation: "La compréhension de liste utilise la syntaxe `[x for x in iterable if condition]`." },
        { question: "Quelle est la syntaxe pour définir une fonction génératrice en Python ?", options: ["def generateur(): yield valeur", "def generateur(): return valeur", "generateur = [valeur]", "generateur = (valeur)"], answer: "def generateur(): yield valeur", explanation: "Les générateurs utilisent le mot-clé `yield` pour produire des valeurs une par une." },
            ],
    avance: [
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Voiture:\n    def __init__(self, marque):\n        self.marque = marque\nv = Voiture('Peugeot')\nprint(v.marque)\n```\n", options: ["Peugeot", "Voiture", "Erreur", "None"], answer: "Peugeot", explanation: "La variable `marque` est initialisée dans le constructeur et imprimée correctement." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Animal:\n    def parler(self):\n        print('Je suis un animal')\n\nclass Chat(Animal):\n    def parler(self):\n        print('Miaou')\na = Chat()\na.parler()\n```\n", options: ["Je suis un animal", "Miaou", "Erreur", "Aucune sortie"], answer: "Miaou", explanation: "La méthode `parler` est redéfinie dans la classe fille `Chat`, donc c'est cette version qui est appelée." },
        { question: "Quelle est la sortie du code suivant ?\n\n```python\nclass Calcul:\n    def __add__(self, autre):\n        return 'Addition'\nc = Calcul()\nprint(c + c)\n```\n", options: ["Addition", "Erreur", "0", "None"], answer: "Addition", explanation: "La méthode spéciale `__add__` est redéfinie pour gérer l'opération d'addition entre deux objets de la classe `Calcul`." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\np = Point(3, 4)\nprint(p.x + p.y)\n```\n", options: ["7", "Point", "Erreur", "None"], answer: "7", explanation: "Les attributs `x` et `y` sont correctement initialisés et additionnés." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass CompteBancaire:\n    def __init__(self, solde):\n        self.solde = solde\n    def retirer(self, montant):\n        if montant > self.solde:\n            return 'Solde insuffisant'\n        self.solde -= montant\n        return 'Retrait effectué'\nc = CompteBancaire(100)\nprint(c.retirer(200))\n```\n", options: ["Retrait effectué", "Solde insuffisant", "Erreur", "None"], answer: "Solde insuffisant", explanation: "Le montant à retirer dépasse le solde disponible, donc le message 'Solde insuffisant' est retourné." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Rectangle:\n    def __init__(self, longueur, largeur):\n        self.longueur = longueur\n        self.largeur = largeur\n    def surface(self):\n        return self.longueur * self.largeur\nr = Rectangle(5, 3)\nprint(r.surface())\n```\n", options: ["15", "Rectangle", "Erreur", "None"], answer: "15", explanation: "La méthode `surface` calcule correctement le produit de la longueur et de la largeur." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Personne:\n    def __init__(self, nom):\n        self.nom = nom\n    def saluer(self):\n        print(f'Bonjour, je m’appelle {self.nom}')\np = Personne('Alice')\np.saluer()\n```\n", options: ["Bonjour, je m’appelle Alice", "Personne", "Erreur", "None"], answer: "Bonjour, je m’appelle Alice", explanation: "La méthode `saluer` imprime le nom de l'instance." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Parent:\n    def methode(self):\n        print('Parent')\nclass Enfant(Parent):\n    def methode(self):\n        super().methode()\n        print('Enfant')\ne = Enfant()\ne.methode()\n```\n", options: ["Parent", "Enfant", "Parent\nEnfant", "Erreur"], answer: "Parent\nEnfant", explanation: "La méthode `methode` de la classe `Parent` est appelée via `super()`, puis la version de la classe `Enfant` est exécutée." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __str__(self):\n        return 'Objet A'\na = A()\nprint(a)\n```\n", options: ["Objet A", "<__main__.A object at ...>", "Erreur", "None"], answer: "Objet A", explanation: "La méthode `__str__` redéfinit la représentation en chaîne de caractères de l'objet." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass ListeSpeciale(list):\n    def __getitem__(self, index):\n        if index >= len(self):\n            return 'Index hors limites'\n        return super().__getitem__(index)\nl = ListeSpeciale([1, 2, 3])\nprint(l[5])\n```\n", options: ["1", "Index hors limites", "Erreur", "None"], answer: "Index hors limites", explanation: "La méthode `__getitem__` est redéfinie pour gérer les indices hors limites." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Test:\n    def __call__(self, x):\n        return x * 2\nt = Test()\nprint(t(5))\n```\n", options: ["10", "Test", "Erreur", "None"], answer: "10", explanation: "La méthode `__call__` permet d'appeler une instance comme une fonction." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Chrono:\n    def __enter__(self):\n        print('Démarrage')\n    def __exit__(self, *args):\n        print('Arrêt')\nwith Chrono():\n    pass\n```\n", options: ["Démarrage\nArrêt", "Démarrage", "Arrêt", "Erreur"], answer: "Démarrage\nArrêt", explanation: "Les méthodes `__enter__` et `__exit__` sont appelées automatiquement avec l'instruction `with`." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Iterateur:\n    def __init__(self, max):\n        self.max = max\n    def __iter__(self):\n        self.n = 0\n        return self\n    def __next__(self):\n        if self.n < self.max:\n            result = self.n\n            self.n += 1\n            return result\n        raise StopIteration\ni = Iterateur(3)\nfor x in i:\n    print(x)\n```\n", options: ["0\n1\n2", "0\n1\n2\n3", "Erreur", "None"], answer: "0\n1\n2", explanation: "L'itérateur génère les valeurs de 0 à `max - 1`." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Fraction:\n    def __init__(self, numerateur, denominateur):\n        self.numerateur = numerateur\n        self.denominateur = denominateur\n    def __str__(self):\n        return f'{self.numerateur}/{self.denominateur}'\nf = Fraction(1, 2)\nprint(f)\n```\n", options: ["1/2", "Fraction", "Erreur", "None"], answer: "1/2", explanation: "La méthode `__str__` redéfinit la représentation en chaîne de caractères de l'objet." },
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Compteur:\n    count = 0\n    def __init__(self):\n        Compteur.count += 1\nprint(Compteur.count)\nc1 = Compteur()\nc2 = Compteur()\nprint(Compteur.count)\n```\n", options: ["0\n2", "1\n2", "2\n2", "Erreur"], answer: "0\n2", explanation: "La variable de classe `count` est partagée entre toutes les instances et incrémentée à chaque création." },
    
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def methode(self):\n        print('A')\nclass B(A):\n    def methode(self):\n        print('B')\nclass C(A):\n    def methode(self):\n        print('C')\nclass D(B, C):\n    pass\nd = D()\nd.methode()\n```\n", options: ["A", "B", "C", "Erreur"], answer: "B", explanation: "La méthode `methode` de la classe `B` est appelée car elle apparaît avant `C` dans la hiérarchie d'héritage (MRO - Method Resolution Order)." },
    
    
        { question: "Quelle est la différence entre composition et héritage ?", options: ["L'héritage crée une relation 'est un', tandis que la composition crée une relation 'a un'", "Pas de différence", "La composition n'est pas utilisée en Python", "L'héritage est toujours préféré à la composition"], answer: "L'héritage crée une relation 'est un', tandis que la composition crée une relation 'a un'", explanation: "L'héritage implique une relation 'est un' (par exemple, un Chien est un Animal), tandis que la composition implique une relation 'a un' (par exemple, une Voiture a un Moteur)." },
    
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Compteur:\n    __count = 0\n    def incrementer(self):\n        self.__count += 1\nc = Compteur()\nc.incrementer()\nprint(c.__count)\n```\n", options: ["1", "0", "Attribut inaccessible", "Erreur"], answer: "Erreur", explanation: "L'attribut `__count` est privé en raison du double underscore, ce qui le rend inaccessible directement depuis l'extérieur de la classe." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __init__(self):\n        print('A')\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        print('B')\nb = B()\n```\n", options: ["A\nB", "B", "A", "Erreur"], answer: "A\nB", explanation: "La méthode `__init__` de la classe parente `A` est appelée via `super()`, puis la méthode `__init__` de la classe `B` est exécutée." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __add__(self, autre):\n        return 'Addition'\na1 = A()\na2 = A()\nprint(a1 + a2)\n```\n", options: ["Addition", "Erreur", "None", "A"], answer: "Addition", explanation: "La méthode spéciale `__add__` est redéfinie pour gérer l'opération d'addition entre deux objets de la classe `A`." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def methode(self):\n        print('A')\nclass B:\n    def methode(self):\n        print('B')\nclass C(A, B):\n    pass\nc = C()\nc.methode()\n```\n", options: ["A", "B", "Erreur", "C"], answer: "A", explanation: "La méthode `methode` de la classe `A` est appelée car elle apparaît avant `B` dans la hiérarchie d'héritage (MRO - Method Resolution Order)." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __new__(cls, *args, **kwargs):\n        print('Création de l’instance')\n        return super().__new__(cls)\n    def __init__(self):\n        print('Initialisation de l’instance')\na = A()\n```\n", options: ["Création de l’instance\nInitialisation de l’instance", "Création de l’instance", "Initialisation de l’instance", "Erreur"], answer: "Création de l’instance\nInitialisation de l’instance", explanation: "La méthode `__new__` est appelée avant `__init__` lors de la création d'une instance." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __repr__(self):\n        return 'Objet A'\na = A()\nprint(repr(a))\n```\n", options: ["Objet A", "<__main__.A object at ...>", "A", "Erreur"], answer: "Objet A", explanation: "La méthode `__repr__` redéfinit la représentation officielle de l'objet." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass Singleton:\n    __instance = None\n    def __new__(cls):\n        if cls.__instance is None:\n            cls.__instance = super().__new__(cls)\n        return cls.__instance\ns1 = Singleton()\ns2 = Singleton()\nprint(s1 is s2)\n```\n", options: ["True", "False", "Erreur", "None"], answer: "True", explanation: "Le pattern Singleton garantit qu'il n'y a qu'une seule instance de la classe." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __call__(self, x):\n        return x * 2\na = A()\nprint(a(5))\n```\n", options: ["10", "A", "Erreur", "None"], answer: "10", explanation: "La méthode `__call__` permet d'appeler une instance comme une fonction." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def methode(self):\n        print('A')\nclass B(A):\n    def methode(self):\n        super().methode()\n        print('B')\nb = B()\nb.methode()\n```\n", options: ["A\nB", "B", "A", "Erreur"], answer: "A\nB", explanation: "La méthode `methode` de la classe parente `A` est appelée via `super()`, puis la méthode `methode` de la classe `B` est exécutée." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __getitem__(self, index):\n        return index * 2\na = A()\nprint(a[5])\n```\n", options: ["10", "5", "Erreur", "None"], answer: "10", explanation: "La méthode `__getitem__` est redéfinie pour gérer l'accès aux éléments via des indices." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __len__(self):\n        return 42\na = A()\nprint(len(a))\n```\n", options: ["42", "Erreur", "0", "A"], answer: "42", explanation: "La méthode `__len__` est redéfinie pour retourner une valeur personnalisée lorsque `len()` est appelé." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __bool__(self):\n        return False\na = A()\nif a:\n    print('Vrai')\nelse:\n    print('Faux')\n```\n", options: ["Vrai", "Faux", "Erreur", "A"], answer: "Faux", explanation: "La méthode `__bool__` est redéfinie pour déterminer si une instance est considérée comme `True` ou `False` dans un contexte booléen." },
        
        { question: "Quelle est la sortie du programme suivant ?\n\n```python\nclass A:\n    def __eq__(self, autre):\n        return True\na1 = A()\na2 = A()\nprint(a1 == a2)\n```\n", options: ["True", "False", "Erreur", "None"], answer: "True", explanation: "La méthode `__eq__` est redéfinie pour que toutes les instances de la classe `A` soient considérées comme égales." }

    ]
};

const Timer = ({ timeLeft }) => (
    <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
);

const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => (
    <div className="question-card">
        <h2>💡 {question}</h2>
        <Timer timeLeft={timeLeft} />
        <div className="options-container">
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => onAnswerClick(option)}
                    className="option-button"
                >
                    {index + 1}. {option}
                </button>
            ))}
        </div>
    </div>
);

const Results = ({ scores }) => {
    const totalScore = scores.basic + scores.moyen + scores.avance;
    return (
        <div className="results">
            <h2>🎯 Score final : {totalScore} / {Object.values(questions).flat().length}</h2>
            <p>✅ Niveau Basique : {scores.basic}</p>
            <p>✅ Niveau Moyen : {scores.moyen}</p>
            <p>✅ Niveau Avancé : {scores.avance}</p>
            {totalScore > 3 ? (
                <p className="success">🚀 Excellent travail ! Vous maîtrisez bien les Concepts OOP !</p>
            ) : (
                <p className="fail">📚 Révisez encore un peu pour bien comprendre les concepts !</p>
            )}
        </div>
    );
};

const OOp_Python = () => {
    const [level, setLevel] = useState("basic");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ basic: 0, moyen: 0, avance: 0 });
    const [timeLeft, setTimeLeft] = useState(20);
    const [showResult, setShowResult] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    const handleAnswerClick = (option) => {
        const currentQuestions = questions[level];
        if (option === currentQuestions[currentQuestion].answer) {
            setScores((prevScores) => ({ ...prevScores, [level]: prevScores[level] + 1 }));
            setMessage("✅ Correct !");
        } else {
            setMessage(`❌ Incorrect ! La bonne réponse était : ${currentQuestions[currentQuestion].answer}\n ℹ️ Indice : ${currentQuestions[currentQuestion].explanation}`);
        }
        setTimeout(handleNextQuestion, 2000);
    };

    const handleNextQuestion = () => {
        const currentQuestions = questions[level];
        if (currentQuestion + 1 < currentQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setTimeLeft(20);
            setMessage("");
        } else {
            if (level === "basic") setLevel("moyen");
            else if (level === "moyen") setLevel("avance");
            else setShowResult(true);
            setCurrentQuestion(0);
            setTimeLeft(20);
        }
    };

    return (
        <div className="qcm-container">
            {showResult ? (
                <Results scores={scores} />
            ) : (
                <div>
                    <h1 className="title">💡 OOP 4 All !</h1>
                    <h3 className="subtitle">🔹 Niveau : {level.toUpperCase()}</h3>
                    <QuestionCard
                        question={questions[level][currentQuestion].question}
                        options={questions[level][currentQuestion].options}
                        onAnswerClick={handleAnswerClick}
                        timeLeft={timeLeft}
                    />
                    {message && <p className="message">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default OOp_Python;