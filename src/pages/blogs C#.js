import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
    {
        question: "Qu'est-ce que C# ?",
        answer: "C# est un langage orienté objet moderne développé par Microsoft, utilisé pour le web, les applications desktop, mobiles, le cloud et les jeux (Unity)."
      },
      {
        question: "Qu’est-ce que le SDK .NET ?",
        answer: "Un ensemble d’outils incluant le compilateur C#, des bibliothèques et une interface en ligne de commande pour compiler et exécuter du code C#."
      },
      {
        question: "Quelle commande CLI permet de créer un nouveau projet console en C# ?",
        answer: "`dotnet new console -n MonProjet`"
      },
      {
        question: "Comment exécuter un projet C# créé avec .NET CLI ?",
        answer: "`dotnet run`"
      },
      {
        question: "Quels environnements de développement sont recommandés pour le C# ?",
        answer: "Visual Studio (complet) ou Visual Studio Code (léger avec extensions C#)"
      },
      {
        question: "Quels types d'applications peut-on créer avec le SDK .NET ?",
        answer: "Applications console, web (ASP.NET), API REST, mobiles (Xamarin), jeux (Unity)"
      },
      {
        question: "Donne un exemple de déclaration de variable avec type en C#.",
        answer: "`int nombre = 10;` ou `string message = \"Bonjour\";`"
      },
      {
        question: "Quels sont les opérateurs arithmétiques de base en C# ?",
        answer: "`+`, `-`, `*`, `/`, `%` (modulo)"
      },
      {
        question: "Quels sont les opérateurs de comparaison en C# ?",
        answer: "`==`, `!=`, `<`, `>`, `<=`, `>=`"
      },
      {
        question: "Quelle structure contrôle le flux selon une condition ?",
        answer: "`if`, `else if`, `else` ou `switch-case`"
      },
      {
        question: "Quels types de boucles peut-on utiliser en C# ?",
        answer: "`for`, `while`, `foreach`"
      },
      {
        question: "Comment déclare-t-on un tableau en C# ?",
        answer: "`int[] nombres = new int[3] { 1, 2, 3 };`"
      },
      {
        question: "Donne deux opérations courantes sur les chaînes de caractères en C#.",
        answer: "`ToUpper()`, `Replace()`, `Length`, `ToLower()`"
      },
      {
        question: "Quelle classe permet de gérer les dates en C# ?",
        answer: "`DateTime`"
      },
      {
        question: "Comment créer une date future avec DateTime ?",
        answer: "`DateTime dateFuture = DateTime.Now.AddDays(7);`"
      },
      {
        question: "À quoi sert une énumération (`enum`) en C# ?",
        answer: "À définir un ensemble de constantes nommées."
      },
      {
        question: "Quel est un projet simple à faire en console pour s'exercer ?",
        answer: "Une calculatrice avec conditions `if` ou `switch` pour gérer les opérations."
      },
      {
        question: "Quelle application peut-on créer pour pratiquer la gestion de listes ?",
        answer: "Une TODO list console : ajouter, supprimer, afficher des tâches avec `List<string>`"
      },
      {
        question: "Pourquoi utilise-t-on `switch` plutôt que plusieurs `if` en C# ?",
        answer: "Le `switch` est plus lisible et structuré pour comparer une seule variable à plusieurs cas précis, surtout avec des valeurs constantes comme des caractères ou des chaînes."
      },
      {
        question: "Dans ce code, que fait le bloc `case 'B': Console.WriteLine(\"Bien\"); break;` si `char grade = 'B';` ?",
        answer: "Il affiche 'Bien' car la variable `grade` correspond au `case 'B'`. Le `break` empêche l'exécution des autres cas."
      },
      {
        question: "Comment est structurée une boucle `for` et quand l’utiliser ?",
        answer: "`for (int i = 0; i < 5; i++)` : utile quand on connaît à l’avance le nombre d’itérations. Elle suit une initialisation, une condition de boucle et une incrémentation."
      },
      {
        question: "Quel est le rôle d'une boucle `while` ?",
        answer: "Elle exécute un bloc tant qu’une condition est vraie. Idéale quand on ne sait pas combien de fois on doit répéter le code à l'avance."
      },
      {
        question: "Quand utiliser `foreach` en C# ?",
        answer: "`foreach` est utilisé pour parcourir tous les éléments d’un tableau ou d’une collection sans manipuler d’index manuellement. Très pratique et sécurisé."
      },
      {
        question: "Comment fonctionne une mini-calculatrice en console C# ?",
        answer: "Elle lit deux `double` depuis le clavier, puis lit un caractère d’opération. Un `switch` traite cette opération et affiche le résultat via `Console.WriteLine()`."
      },
      {
        question: "Quels éléments fondamentaux sont mobilisés dans le projet calculatrice ?",
        answer: "Entrée utilisateur (`ReadLine`), parsing (`Convert.ToDouble`), conditions (`switch`) et affichage (`Console.WriteLine`)."
      },
      {
        question: "Dans le projet de gestion de tâches, que fait l’utilisateur ?",
        answer: "Il interagit avec un menu dans une boucle `while`, ajoute/supprime des tâches via `List<string>`, et affiche la liste avec un `foreach`."
      },
      {
        question: "Comment supprimer un élément d’une liste par son index ?",
        answer: "`taches.RemoveAt(index);` — Supprime la tâche située à l’index donné dans la liste `taches`."
      },
      {
        question: "Pourquoi utilise-t-on `Environment.Exit(0);` dans ce code ?",
        answer: "Pour terminer proprement l'exécution du programme console lorsqu’un utilisateur sélectionne l’option Quitter."
      },
      //oop
      {
        question: "Qu'est-ce qu'une classe en C# ?",
        answer: "Une classe est un modèle ou un plan qui définit les propriétés et comportements d'un objet. Elle sert de blueprint pour créer des instances appelées objets."
      },
      {
        question: "Quelle est la différence entre une classe et un objet en C# ?",
        answer: "Une classe est une définition abstraite (blueprint), tandis qu'un objet est une instance concrète créée à partir de cette classe."
      },
      {
        question: "📥 À quoi sert un getter en C# ?",
        answer: "Un getter permet d’accéder à la valeur d’un attribut privé via une propriété publique. Ex : `public int Age { get { return age; } }`"
      },
      {
        question: "📤 À quoi sert un setter en C# ?",
        answer: "Un setter permet de modifier la valeur d’un attribut privé via une propriété publique. Ex : `public int Age { set { age = value; } }`"
      },
      {
        question: "💡 Quelle est la syntaxe standard d'une propriété avec getter et setter en C# ?",
        answer: "`public int Age { get; set; }` — permet d’accéder et de modifier automatiquement l’attribut sous-jacent."
      },
      {
        question: "🔐 Pourquoi utiliser des getters et setters plutôt que des attributs publics ?",
        answer: "Pour encapsuler l’accès aux données, appliquer des contrôles, et éviter que des valeurs incorrectes soient affectées directement."
      },
      {
        question: "Qu'est-ce que l'héritage en POO ?",
        answer: "L'héritage permet à une classe (classe dérivée) de réutiliser les membres (propriétés, méthodes) d'une autre classe (classe de base). Cela favorise la réutilisabilité du code."
      },
      {
        question: "Donnez un exemple de polymorphisme en C#.",
        answer: "Le polymorphisme permet aux objets de prendre plusieurs formes. Par exemple, une méthode peut être redéfinie dans une classe dérivée avec 'override' pour modifier son comportement."
      },
      {
        question: "Qu'est-ce que l'encapsulation ?",
        answer: "L'encapsulation consiste à masquer les détails internes d'une classe tout en exposant une interface publique contrôlée. Les propriétés privées sont généralement accessibles via des accesseurs (get/set)."
      },
      {
        question: "🔄 Qu’est-ce que le polymorphisme en POO ?",
        answer: "Le polymorphisme permet à des objets de classes différentes d’être traités comme s’ils étaient du même type (souvent via une classe parente ou interface)."
      },
      {
        question: "⚙️ Quels sont les deux types principaux de polymorphisme ?",
        answer: "1. Polymorphisme d’exécution (override) — via héritage. 2. Polymorphisme de compilation (overload) — via surcharge des méthodes."
      },
      {
        question: "🔁 Qu’est-ce que le polymorphisme d’exécution ?",
        answer: "C’est lorsqu’une méthode est redéfinie (`override`) dans une classe dérivée pour changer son comportement tout en conservant sa signature."
      },
      {
        question: "🧱 Qu’est-ce que le polymorphisme de compilation ?",
        answer: "C’est la possibilité de définir plusieurs méthodes avec le même nom mais des signatures différentes (types ou nombre d’arguments)."
      },
      {
        question: "📐 Qu’est-ce que l’héritage simple ?",
        answer: "Une classe dérive d’une seule classe de base. Exemple : `class Voiture : Vehicule`"
      },
      {
        question: "🔗 Qu’est-ce que l’héritage multiple (simulé en C#) ?",
        answer: "C# ne permet pas l’héritage multiple de classes, mais il le simule via l’implémentation de plusieurs interfaces. Ex : `class Oiseau : IVolant, IAnimal`"
      },
      {
        question: "Qu'est-ce qu'une interface en C# ?",
        answer: "Une interface définit un contrat que les classes doivent implémenter. Elle spécifie des méthodes et propriétés sans fournir d'implémentation concrète."
      },
      {
        question: "Pourquoi utiliser l'injection de dépendances ?",
        answer: "L'injection de dépendances favorise la modularité et la testabilité en fournissant les dépendances nécessaires à une classe plutôt que de les créer directement."
      },
      {
        question: "Qu'est-ce qu'un type générique en C# ?",
        answer: "Un type générique permet de créer des classes, interfaces ou méthodes réutilisables pour différents types de données, comme List<T> ou Dictionary<TKey, TValue>."
      },
      {
        question: "Quelle est la différence entre un type valeur et un type référence ?",
        answer: "Les types valeur (ex. int, float) sont stockés directement dans la pile, tandis que les types référence (ex. classes, tableaux) sont stockés dans le tas avec une référence pointant vers leur emplacement."
      },
      {
        question: "Comment structurer un projet en couches ?",
        answer: "Un projet bien structuré est organisé en couches : présentation (UI), métier (business logic), accès aux données (data access) et modèles/utilitaires partagés (common)."
      },
      {
        question: "Quelles sont les bonnes pratiques pour nommer les variables et méthodes en C# ?",
        answer: "Utilisez des noms descriptifs et suivez les conventions de nommage : PascalCase pour les classes/méthodes et camelCase pour les variables."
      },
      {
        question: "Qu'est-ce que le principe SOLID ?",
        answer: "SOLID est un ensemble de principes de conception orientée objet : Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation et Dependency Inversion."
      },
      {
        question: "Pourquoi utiliser des tests unitaires ?",
        answer: "Les tests unitaires valident chaque composant individuellement, garantissant que le code fonctionne correctement et réduisant les risques de régression lors des modifications."
      },
      {
        question: "Quelle est l'utilité des commentaires XML en C# ?",
        answer: "Les commentaires XML documentent les classes, méthodes et paramètres pour améliorer la lisibilité et générer automatiquement de la documentation."
      },
      {
        question: "Quelle est la syntaxe pour déclarer une classe en C# ?",
        answer: "public class NomClasse { // Propriétés et méthodes }"
      },
      {
        question: "Comment implémenter une interface en C# ?",
        answer: "Utilisez le mot-clé 'implements' pour indiquer qu'une classe respecte un contrat défini par une interface. Exemple : public class MaClasse : IMonInterface { }"
      },
      {
        question: "Quelle est la différence entre 'virtual' et 'override' en C# ?",
        answer: "'virtual' permet de définir une méthode pouvant être redéfinie, tandis que 'override' redéfinit cette méthode dans une classe dérivée."
      },
      {
        question: "Quel est l'avantage des types génériques ?",
        answer: "Les types génériques permettent de créer des structures réutilisables pour différents types de données, augmentant la flexibilité et réduisant la duplication de code."
      },
      {
        question: "Qu'est-ce qu'une méthode statique en C# ?",
        answer: "Une méthode statique appartient à la classe elle-même plutôt qu'à une instance spécifique. Elle est appelée avec le nom de la classe. Exemple : Math.Sqrt(16);"
      },
      {
        question: "Quelle est la différence entre 'abstract' et 'sealed' en C# ?",
        answer: "'abstract' indique qu'une classe ou méthode doit être implémentée par une classe dérivée, tandis que 'sealed' empêche une classe ou méthode d'être héritée ou redéfinie."
      },
      {
        question: "Quelle est l'utilité des énumérations (enum) en C# ?",
        answer: "Les énumérations définissent un ensemble de constantes nommées, rendant le code plus lisible et maintenable. Exemple : enum JoursSemaine { Lundi, Mardi };"
      }

];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [
    {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nint x = 10;\nint y = x;\ny = 20;\nConsole.WriteLine(x);```",
        "options": [
          "10",
          "20",
          "Erreur de compilation",
          "Null"
        ],
        "answer": "10",
        "explanation": "Les types valeur (comme int) sont copiés par valeur. Modifier 'y' ne change pas 'x'."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\npublic class Personne {\n    public string Nom { get; set; }\n}\n\nPersonne p1 = new Personne { Nom = \"Alice\" };\nPersonne p2 = p1;\np2.Nom = \"Bob\";\nConsole.WriteLine(p1.Nom);```",
        "options": [
          "Alice",
          "Bob",
          "Erreur de compilation",
          "Null"
        ],
        "answer": "Bob",
        "explanation": "Les types référence (comme les classes) partagent la même référence en mémoire. Modifier 'p2' affecte également 'p1'."
      },
      {
        "question": "Quelle méthode implémente correctement l'encapsulation pour une propriété privée ?\n\n```csharp\n// Option 1\npublic class Compte {\n    private double solde;\n    public double GetSolde() => solde;\n    public void SetSolde(double value) => solde = value;\n}\n\n// Option 2\npublic class Compte {\n    public double Solde { get; private set; }\n}\n\n// Option 3\npublic class Compte {\n    public double Solde { get; set; }\n}```",
        "options": [
          "Option 1",
          "Option 2",
          "Option 3",
          "Aucune des options"
        ],
        "answer": "Option 2",
        "explanation": "L'encapsulation est mieux réalisée avec des propriétés auto-implémentées ayant un accesseur privé ('private set'), garantissant un contrôle sur les modifications."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\npublic abstract class Animal {\n    public virtual void Parler() {\n        Console.WriteLine(\"Animal parle\");\n    }\n}\n\npublic class Chien : Animal {\n    public override void Parler() {\n        Console.WriteLine(\"Chien aboie\");\n    }\n}\n\nAnimal monAnimal = new Chien();\nmonAnimal.Parler();```",
        "options": [
          "Animal parle",
          "Chien aboie",
          "Erreur de compilation",
          "Null"
        ],
        "answer": "Chien aboie",
        "explanation": "Le polymorphisme permet à la méthode 'Parler' de la classe dérivée (Chien) de remplacer celle de la classe de base (Animal)."
      },
      {
        "question": "Quelle interface doit être implémentée pour créer une collection personnalisée énumérable en C# ?\n\n```csharp\npublic class MaCollection<T> : ??? {\n    // Implémentation ici\n}```",
        "options": [
          "`IEnumerable<T>`",
          "`ICollection<T>`",
          "`IList<T>`",
          "`IDisposable`"
        ],
        "answer": "`IEnumerable<T>`",
        "explanation": "Pour rendre une collection énumérable, il faut implémenter l'interface `IEnumerable<T>`, qui permet l'utilisation de boucles `foreach`."
      },
      {
        "question": "Quelle est la meilleure façon d'injecter une dépendance dans une classe en C# ?\n\n```csharp\n// Option 1\npublic class Service {\n    private readonly ILogger logger;\n    public Service(ILogger logger) {\n        this.logger = logger;\n    }\n}\n\n// Option 2\npublic class Service {\n    private static readonly ILogger logger = new ConsoleLogger();\n}```",
        "options": [
          "Option 1",
          "Option 2",
          "Les deux sont équivalentes",
          "Aucune des options"
        ],
        "answer": "Option 1",
        "explanation": "L'injection de dépendances via le constructeur (Option 1) favorise la modularité et la testabilité, contrairement à l'instanciation directe (Option 2)."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\npublic class Boite<T> {\n    public T Contenu { get; set; }\n}\n\nBoite<int> boiteEntier = new Boite<int>();\nboiteEntier.Contenu = 42;\nConsole.WriteLine(boiteEntier.Contenu);```",
        "options": [
          "42",
          "Erreur de compilation",
          "Null",
          "Boite`1"
        ],
        "answer": "42",
        "explanation": "Les types génériques permettent de créer des classes réutilisables pour différents types. Ici, `Boite<int>` stocke un entier."
      },
      {
        "question": "Quelle est la différence entre les deux méthodes suivantes ?\n\n```csharp\npublic void Afficher(string message) {\n    Console.WriteLine(message);\n}\n\npublic void Afficher(object message) {\n    Console.WriteLine(message.ToString());\n}```",
        "options": [
          "Aucune différence",
          "La première méthode est spécifique aux chaînes, la deuxième accepte tout type",
          "La première méthode est plus rapide",
          "La deuxième méthode provoque une erreur de compilation"
        ],
        "answer": "La première méthode est spécifique aux chaînes, la deuxième accepte tout type",
        "explanation": "La surcharge de méthodes permet de définir plusieurs versions d'une méthode avec des paramètres différents. La deuxième méthode accepte n'importe quel type grâce au type 'object'."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\npublic interface IVolant {\n    void Voler();\n}\n\npublic class Avion : IVolant {\n    public void Voler() {\n        Console.WriteLine(\"Avion vole\");\n    }\n}\n\nIVolant volant = new Avion();\nvolant.Voler();```",
        "options": [
          "Avion vole",
          "Erreur de compilation",
          "Null",
          "IVolant vole"
        ],
        "answer": "Avion vole",
        "explanation": "Une interface définit un contrat que les classes doivent implémenter. L'objet 'volant' utilise l'implémentation de la classe 'Avion'."
      },
      {
        "question": "Quelle est la meilleure pratique pour structurer un projet en couches ?\n\n```plaintext\nOption 1:\nMonProjet/\n├── Controllers/\n├── Services/\n├── DataAccess/\n└── Models/\n\nOption 2:\nMonProjet/\n├── Clients/\n│   ├── ClientController.cs\n│   ├── ClientService.cs\n│   └── ClientRepository.cs\n└── Produits/\n    ├── ProduitController.cs\n    ├── ProduitService.cs\n    └── ProduitRepository.cs```",
        "options": [
          "Option 1",
          "Option 2",
          "Les deux sont équivalentes",
          "Aucune des options"
        ],
        "answer": "Option 2",
        "explanation": "Organiser le code par fonctionnalité (Option 2) améliore la lisibilité et la maintenabilité, car tous les fichiers liés à une fonctionnalité sont regroupés."
      }
  ],
  avance: [
    {
        "question": "Quel est le rôle du Modèle Conceptuel des Données (MCD) dans Merise ?",
        "options": [
          "Décrire le code source",
          "Représenter les processus métier",
          "Représenter les entités et leurs relations",
          "Créer des interfaces utilisateur"
        ],
        "answer": "Représenter les entités et leurs relations",
        "explanation": "Le MCD modélise la structure logique des données avec entités, associations et cardinalités."
      },
      {
        "question": "Quelle est une limite principale de la méthode Merise ?",
        "options": [
          "Elle n’est pas adaptée aux bases de données relationnelles",
          "Elle ne prend pas en compte les traitements métier",
          "Elle est peu compatible avec les méthodes agiles",
          "Elle ne propose pas de représentation graphique"
        ],
        "answer": "Elle est peu compatible avec les méthodes agiles",
        "explanation": "Sa structure rigide et documentaire rend son usage difficile dans les environnements agiles."
      },
      {
        "question": "Quel diagramme UML permet de représenter les classes, attributs, méthodes et relations ?",
        "options": [
          "Diagramme d’activités",
          "Diagramme de classes",
          "Diagramme d’états",
          "Diagramme de séquence"
        ],
        "answer": "Diagramme de classes",
        "explanation": "Le diagramme de classes est un diagramme structurel montrant les classes et leurs relations."
      },
      {
        "question": "Quel diagramme UML est utilisé pour représenter le comportement temporel entre objets ?",
        "options": [
          "Diagramme de composants",
          "Diagramme de séquence",
          "Diagramme d’objets",
          "Diagramme de déploiement"
        ],
        "answer": "Diagramme de séquence",
        "explanation": "Le diagramme de séquence représente les échanges temporels entre objets pour un scénario donné."
      },
      {
        "question": "Quel est l’objectif du test UAT ?",
        "options": [
          "Tester l'intégration des composants",
          "Vérifier la logique métier par les développeurs",
          "Valider que le système répond aux besoins métier",
          "Mesurer la performance du backend"
        ],
        "answer": "Valider que le système répond aux besoins métier",
        "explanation": "UAT est réalisé par les utilisateurs pour s'assurer que le produit est conforme aux attentes fonctionnelles."
      },
      {
        "question": "Quelle est la première étape du cycle TDD ?",
        "options": [
          "Implémenter le code",
          "Refactoriser",
          "Écrire un test qui passe",
          "Écrire un test qui échoue"
        ],
        "answer": "Écrire un test qui échoue",
        "explanation": "Le cycle TDD commence toujours par l’écriture d’un test qui échoue pour guider le développement."
      },
      {
        "question": "Quelle est la principale différence entre BDD et TDD ?",
        "options": [
          "TDD est manuel, BDD est automatique",
          "BDD se concentre sur les comportements métiers, TDD sur le code",
          "TDD utilise Gherkin, BDD utilise JUnit",
          "BDD est fait après le développement, TDD avant"
        ],
        "answer": "BDD se concentre sur les comportements métiers, TDD sur le code",
        "explanation": "BDD exprime les comportements attendus en langage naturel, tandis que TDD teste des unités de code."
      },
      {
        "question": "Quel outil est utilisé pour les tests E2E ?",
        "options": [
          "pytest",
          "Selenium",
          "JUnit",
          "Cucumber"
        ],
        "answer": "Selenium",
        "explanation": "Selenium est un outil populaire pour l’automatisation de scénarios utilisateur en E2E Testing."
      },
      {
        "question": "Quels tests sont utilisés pour vérifier qu’aucune fonctionnalité existante n’est cassée après modification ?",
        "options": [
          "UT",
          "RT",
          "TDD",
          "BDD"
        ],
        "answer": "RT",
        "explanation": "Le Regression Testing (RT) permet de vérifier qu’aucune régression n’a été introduite dans le code existant."
      },
      {
        "question": "Quel type de test permet de valider l’intégration complète entre tous les composants ?",
        "options": [
          "Unit Testing",
          "End-to-End Testing",
          "BDD",
          "Mock Testing"
        ],
        "answer": "End-to-End Testing",
        "explanation": "L’E2E Testing simule un parcours utilisateur complet à travers tous les composants du système."
      }
  ]
};

// Timer
const Timer = ({ timeLeft }) => (
  <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
);

// Composant QCM
const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => (
  <div className="question-card">
    <h4>💡 {question}</h4>
    <Timer timeLeft={timeLeft} />
    <div className="options-container">
      {options.map((option, index) => (
        <button key={index} onClick={() => onAnswerClick(option)} className="option-button">
          {index + 1}. {option}
        </button>
      ))}
    </div>
  </div>
);

// Composant Flashcard
const Flashcard = ({ slide, index, total }) => (
  <div className="question-card">
    {/* <h5>🧠 Flashcard {index + 1} / {total}</h5> */}
    <p><strong>{slide.question}</strong></p>
    <p>{slide.answer}</p>
  </div>
);

// Composant Résultat
const Results = ({ scores }) => {
  const totalScore = scores.moyen + scores.avance;
  const totalQuestions = Object.values(questions).flat().length;
  return (
    <div className="results">
      <h3>🎯 Score final : {totalScore} / {totalQuestions}</h3>
      <p>✅ Niveau Moyen : {scores.moyen}</p>
      <p>✅ Niveau Avancé : {scores.avance}</p>
      {totalScore > 3 ? (
        <h3 className="success">🚀 Excellent travail ! Vous maîtrisez bien les CONCEPTS BIG O !</h3>
      ) : (
        <p className="fail">📚 Révisez encore un peu pour bien comprendre les concepts, ou retournez voir les flashcards !</p>
      )}
    </div>
  );
};

// Page principale
const Blogs = () => {
  const [level, setLevel] = useState("basic");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ moyen: 0, avance: 0 });
  const [timeLeft, setTimeLeft] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [message, setMessage] = useState("");

  // Timer pour les niveaux QCM
  useEffect(() => {
    if (level !== "basic" && !showResult && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (level !== "basic" && timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, level, showResult]);

  // Slide auto pour les flashcards
  useEffect(() => {
    if (level === "basic" && !showResult) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev + 1 < basicSlides.length) {
            return prev + 1;
          } else {
            setLevel("moyen");
            setCurrentQuestion(0);
            setTimeLeft(20);
            return 0;
          }
        });
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [level, showResult]);

  const handleAnswerClick = (option) => {
    const currentQuestions = questions[level];
    const current = currentQuestions[currentQuestion];
    if (option === current.answer) {
      setScores((prevScores) => ({ ...prevScores, [level]: prevScores[level] + 1 }));
      setMessage("✅ Correct !");
    } else {
      setMessage(`❌ Incorrect ! La bonne réponse était : ${current.answer}\n ℹ️ ${current.explanation}`);
    }
    setTimeout(handleNextQuestion, 2500);
  };

  const handleNextQuestion = () => {
    const currentQuestions = questions[level];
    if (currentQuestion + 1 < currentQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(20);
      setMessage("");
    } else {
      if (level === "moyen") {
        setLevel("avance");
      } else {
        setShowResult(true);
      }
      setCurrentQuestion(0);
      setTimeLeft(20);
      setMessage("");
    }
  };

  return (
    <div className="qcm-container">
      {showResult ? (
        <Results scores={scores} />
      ) : (
        <div>
          <h4 className="subtitle"> Big-O Notation ! 🔹 Niveau : {level.toUpperCase()}</h4>

          {level === "basic" ? (
            <Flashcard slide={basicSlides[currentSlide]} index={currentSlide} total={basicSlides.length} />
          ) : (
            <QuestionCard
              question={questions[level][currentQuestion].question}
              options={questions[level][currentQuestion].options}
              onAnswerClick={handleAnswerClick}
              timeLeft={timeLeft}
            />
          )}

          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Blogs;



