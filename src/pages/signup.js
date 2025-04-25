import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
    // 🔹 1. Classes et Objets
  { question: " Que fait le mot-clé `class` en C# ?", answer: "Il définit une classe, c’est-à-dire un modèle pour créer des objets." },
  { question: " Que représente le mot `object` ?", answer: "Une instance concrète créée à partir d’une classe." },
  { question: " À quoi sert le mot-clé `new` ?", answer: "Il permet de créer une nouvelle instance d’une classe (objet)." },
  { question: " À quoi sert `this` en C# ?", answer: "Il fait référence à l’instance courante de la classe." },
  { question: " Que signifie `static` dans une déclaration ?", answer: "Cela rend le membre commun à toutes les instances (partagé)." },
  { question: " À quoi sert `readonly` ?", answer: "Déclare un champ modifiable uniquement dans le constructeur." },

  // 🔹 2. Encapsulation
  { question: " Que fait le mot-clé `private` ?", answer: "Il limite l'accès à un membre à l’intérieur de la classe uniquement." },
  { question: " Que signifie `public` ?", answer: "Cela rend un membre accessible de n’importe où." },
  { question: " Que permet `protected` ?", answer: "Il autorise l’accès depuis la classe elle-même et ses classes dérivées." },
  { question: " À quoi sert `internal` ?", answer: "Rend le membre accessible uniquement dans le même assembly." },
  { question: " À quoi servent `get` et `set` ?", answer: "Ce sont des accesseurs qui permettent de lire ou modifier un attribut via une propriété." },
  { question: " Qu’est-ce qu’une `property` en C# ?", answer: "C’est une combinaison de `get` et `set` qui encapsule un champ." },

  // 🔹 3. Héritage
  { question: " Que signifie `: BaseClass` dans une déclaration de classe ?", answer: "C’est la syntaxe pour hériter d’une autre classe." },
  { question: " Que fait le mot-clé `base` ?", answer: "Il permet d’accéder aux membres de la classe parente." },
  { question: " Que fait `virtual` sur une méthode ?", answer: "Elle rend la méthode redéfinissable dans une classe dérivée." },
  { question: " Que signifie `override` ?", answer: "Cela redéfinit une méthode héritée d’une classe parent." },
  { question: " Que permet `sealed` ?", answer: "Il empêche une classe ou une méthode d’être héritée ou redéfinie." },
  { question: " Que fait `abstract` sur une classe ou méthode ?", answer: "Elle force les classes dérivées à fournir une implémentation." },

  // 🔹 4. Polymorphisme
  { question: " Que fait le mot-clé `override` dans le polymorphisme ?", answer: "Il redéfinit un comportement dans une classe dérivée." },
  { question: " Quel est le rôle de `virtual` dans le polymorphisme ?", answer: "Il autorise la redéfinition d’une méthode dans les sous-classes." },
  { question: " Que signifie `abstract` dans une méthode ?", answer: "Elle n’a pas de corps et doit être implémentée dans une sous-classe." },
  { question: " Que fait `interface` ?", answer: "Elle définit un contrat sans implémentation, que les classes doivent respecter." },
  { question: " À quoi servent `is` et `as` ?", answer: "`is` teste un type, `as` tente une conversion de type (retourne null si échoue)." },

  // 🔹 5. Surcharge (Overloading)
  { question: " Que fait `params` dans une méthode ?", answer: "Il permet de passer un nombre variable d’arguments à une méthode." },
  { question: " Comment fonctionne la surcharge sans mot-clé spécifique ?", answer: "Elle repose sur la différence de signature des méthodes (paramètres différents)." },

  // 🔹 6. Abstraction et Interfaces
  { question: " Quel est le rôle de `interface` ?", answer: "Définir un contrat que les classes doivent implémenter sans fournir de logique." },
  { question: " À quoi sert `abstract` dans une classe ?", answer: "Elle ne peut pas être instanciée et sert de base à des classes concrètes." },
  { question: " Pourquoi `implements` n’est pas utilisé en C# ?", answer: "En C#, on utilise `:` pour implémenter une interface (`class MaClasse : IMonInterface`)." },

  // 🔹 7. Types génériques et collections
  { question: " Que signifie `<T>` dans `List<T>` ou `Dictionary<TKey, TValue>` ?", answer: "C’est un paramètre générique qui permet d’écrire du code réutilisable et typé." },
  { question: " À quoi sert `List<T>` ?", answer: "À stocker une liste dynamique d’éléments de type T." },
  { question: " À quoi sert `Dictionary<TKey, TValue>` ?", answer: "C’est une collection de paires clé/valeur, très utile pour faire des associations." },
  { question: " Que permet `IEnumerable<T>` ?", answer: "Parcourir une collection avec `foreach` sans connaître son type précis." },

  // 🔹 8. Structuration et gestion du code
  { question: " Que fait `namespace` ?", answer: "Organise le code dans des espaces logiques pour éviter les conflits de noms." },
  { question: " À quoi sert `using` en C# ?", answer: "À importer un espace de noms ou gérer des ressources automatiquement (`using (var x = ...) { ... }`)." },
  { question: " Que fait `partial` ?", answer: "Permet de diviser une classe sur plusieurs fichiers sources." },
  { question: " Qu’est-ce qu’un constructeur (`constructor`) ?", answer: "Une méthode spéciale qui initialise un objet lors de sa création." },
  { question: " Qu’est-ce qu’un destructeur (`destructor`) ?", answer: "Méthode appelée à la destruction de l’objet, rarement utilisée car le garbage collector gère la mémoire." },
  { question: " Que font `async` et `await` ?", answer: "Permettent d’écrire du code asynchrone de manière lisible et fluide." },
  // 🔹 9. Principes SOLID
  { question: " Que signifie le principe de responsabilité unique (SRP) ?", answer: "Une classe ne doit avoir qu'une seule raison de changer, c'est-à-dire une seule responsabilité." },
  { question: " Que stipule le principe ouvert/fermé (OCP) ?", answer: "Les entités logicielles doivent être ouvertes à l'extension mais fermées à la modification." },
  { question: " En quoi consiste le principe de substitution de Liskov (LSP) ?", answer: "Les objets d'une classe dérivée doivent pouvoir être substitués à ceux de la classe de base sans altérer le comportement du programme." },
  { question: " Quel est le principe de ségrégation des interfaces (ISP) ?", answer: "Les clients ne doivent pas être forcés de dépendre d'interfaces qu'ils n'utilisent pas." },
  { question: " Que stipule le principe d'inversion des dépendances (DIP) ?", answer: "Les modules de haut niveau ne doivent pas dépendre des modules de bas niveau ; tous deux doivent dépendre d'abstractions." },
// 🔹 10. Gestion des Exceptions
{ question: " Quel est le rôle des blocs try, catch et finally ?", answer: "`try` tente d'exécuter un bloc de code, `catch` intercepte les exceptions, et `finally` s'exécute toujours, qu'une exception ait été levée ou non." },
{ question: " À quoi sert le mot-clé `throw` ?", answer: "Il permet de lever une exception manuellement." },
{ question: " Qu'est-ce que la classe `Exception` en C# ?", answer: "C'est la classe de base pour toutes les exceptions en C#." },

//🔹 11. Modificateurs d'Accès Avancés
{ question: " Que signifie le modificateur `protected internal` ?", answer: "L'accès est autorisé dans le même assembly ou dans les classes dérivées." },
{ question: " Que signifie le modificateur `private protected` ?", answer: "L'accès est autorisé uniquement dans la classe contenant ou dans les classes dérivées situées dans le même assembly." },

//🔹 12. Structures et Types Spéciaux
{ question: " Qu'est-ce qu'une `struct` en C# ?", answer: "C'est un type valeur qui peut contenir des champs, des méthodes et des constructeurs." },
{ question: " Qu'est-ce qu'un `record` en C# ?", answer: "C'est un type référence immuable, principalement utilisé pour les objets de données." },
{ question: " À quoi sert une `enum` ?", answer: "À définir un ensemble de constantes nommées." },
{ question: " Qu'est-ce qu'un `delegate` ?", answer: "C'est un type qui représente une référence à une méthode avec une signature spécifique." },
{ question: " Quel est le rôle d'un `event` ?", answer: "Il permet à une classe de fournir des notifications à d'autres classes lorsque quelque chose d'intéressant se produit." },

//🔹 13. Types Nullable & Opérateurs Modernes
{ question: " Que signifie le `?` après un type ?", answer: "Il indique que le type peut avoir une valeur nulle." },
{ question: " À quoi sert l'opérateur `??` ?", answer: "Il retourne la valeur de gauche si elle n'est pas nulle ; sinon, il retourne la valeur de droite." },
{ question: " Quel est le rôle de l'opérateur `?.` ?", answer: "Il permet d'accéder à un membre d'un objet uniquement si l'objet n'est pas nul." },
{ question: " Que retourne la fonction `nameof()` ?", answer: "Le nom de la variable, du type ou du membre passé en argument, sous forme de chaîne." },

//🔹 14. Design Patterns (Patrons de Conception)
{ question: " Quel est le but du patron Singleton ?", answer: "Garantir qu'une classe n'a qu'une seule instance et fournir un point d'accès global à celle-ci." },
{ question: " En quoi consiste le patron Factory Method ?", answer: "Il fournit une interface pour créer des objets, mais laisse les sous-classes décider de la classe à instancier." },
{ question: " Quel est l'objectif du patron Strategy ?", answer: "Définir une famille d'algorithmes, les encapsuler et les rendre interchangeables." },
{ question: " À quoi sert le patron Observer ?", answer: "Permet à un objet de notifier automatiquement les modifications de son état à ses observateurs." },
{ question: " Quel est le rôle du patron Decorator ?", answer: "Ajouter dynamiquement des responsabilités à un objet sans modifier son code." },
{ question: " En quoi consiste le patron Adapter ?", answer: "Permet à des interfaces incompatibles de travailler ensemble en convertissant l'interface d'une classe en une autre attendue par les clients." },
];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [
    {
        "question": "Quel est le rôle du mot-clé `this` dans la classe suivante ?\n\n```csharp\nclass Personne {\n    private string nom;\n    public Personne(string nom) {\n        this.nom = nom;\n    }\n}\n```",
        "options": [
          "Il crée une nouvelle instance de la classe.",
          "Il fait référence à la classe parente.",
          "Il fait référence à l'instance actuelle de la classe.",
          "Il rend le champ `nom` accessible publiquement."
        ],
        "answer": "Il fait référence à l'instance actuelle de la classe.",
        "explanation": "Le mot-clé `this` est utilisé pour référencer l'instance actuelle de la classe, ce qui est utile pour distinguer les champs des paramètres ou variables locaux portant le même nom."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nclass Animal {\n    public virtual void FaireDuBruit() {\n        Console.WriteLine(\"Animal fait un bruit\");\n    }\n}\n\nclass Chien : Animal {\n    public override void FaireDuBruit() {\n        Console.WriteLine(\"Le chien aboie\");\n    }\n}\n\nAnimal a = new Chien();\na.FaireDuBruit();\n```",
        "options": [
          "Animal fait un bruit",
          "Le chien aboie",
          "Erreur de compilation",
          "Aucune sortie"
        ],
        "answer": "Le chien aboie",
        "explanation": "Grâce au polymorphisme, la méthode `FaireDuBruit` de la classe dérivée `Chien` est appelée, même si l'objet est référencé par un type de la classe de base `Animal`."
      },
      {
        "question": "Quel est l'effet du mot-clé `sealed` dans la déclaration suivante ?\n\n```csharp\nsealed class Utilitaire {\n    public void Afficher() {\n        Console.WriteLine(\"Utilitaire\");\n    }\n}\n```",
        "options": [
          "La classe `Utilitaire` peut être héritée.",
          "La méthode `Afficher` ne peut pas être redéfinie.",
          "La classe `Utilitaire` ne peut pas être héritée.",
          "La classe `Utilitaire` est abstraite."
        ],
        "answer": "La classe `Utilitaire` ne peut pas être héritée.",
        "explanation": "Le mot-clé `sealed` empêche une classe d'être héritée, ce qui signifie qu'aucune classe ne peut dériver de `Utilitaire`."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\ninterface ICalcul {\n    int Additionner(int a, int b);\n}\n\nclass Calculateur : ICalcul {\n    public int Additionner(int a, int b) {\n        return a + b;\n    }\n}\n\nICalcul calc = new Calculateur();\nConsole.WriteLine(calc.Additionner(3, 4));\n```",
        "options": [
          "7",
          "Erreur de compilation",
          "0",
          "3"
        ],
        "answer": "7",
        "explanation": "La classe `Calculateur` implémente l'interface `ICalcul` en fournissant une définition pour la méthode `Additionner`, qui retourne la somme des deux entiers."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nclass Base {\n    public void Afficher() {\n        Console.WriteLine(\"Base\");\n    }\n}\n\nclass Derivee : Base {\n    public new void Afficher() {\n        Console.WriteLine(\"Derivee\");\n    }\n}\n\nBase obj = new Derivee();\nobj.Afficher();\n```",
        "options": [
          "Base",
          "Derivee",
          "Erreur de compilation",
          "Aucune sortie"
        ],
        "answer": "Base",
        "explanation": "Le mot-clé `new` masque la méthode `Afficher` de la classe de base. Cependant, comme l'objet est référencé par le type de la classe de base, la méthode de la classe de base est appelée."
      },
      {
        "question": "Que fait le mot-clé `class` en C# ?",
        "options": [
            "Déclare une fonction",
            "Définit un modèle pour créer des objets",
            "Importe une bibliothèque externe",
            "Crée une instance d'objet"
        ],
        "answer": "Définit un modèle pour créer des objets",
        "explanation": "Le mot-clé `class` permet de définir un blueprint pour créer des objets avec des propriétés et méthodes."
    },
    {
        "question": "Que retourne ce code ?\n```csharp\nint x = 5;\nint y = x++;\nConsole.WriteLine(y);```",
        "options": [
            "5",
            "6",
            "Erreur de compilation",
            "0"
        ],
        "answer": "5",
        "explanation": "L'opérateur `x++` effectue un post-incrément : il retourne la valeur originale (5) avant d'incrémenter."
    },
    {
        "question": "Quel est le résultat de ce code ?\n```csharp\nstring s = null;\nConsole.WriteLine(s?.Length ?? -1);```",
        "options": [
            "0",
            "null",
            "-1",
            "Erreur NullReferenceException"
        ],
        "answer": "-1",
        "explanation": "L'opérateur `?.` évite une exception si `s` est null, et `??` retourne -1 comme valeur par défaut."
    },
    {
        "question": "Quelle est la sortie de ce code ?\n```csharp\nvar numbers = new List<int> { 1, 2, 3 };\nnumbers[1] = 10;\nConsole.WriteLine(numbers[1]);```",
        "options": [
            "1",
            "2",
            "10",
            "Erreur"
        ],
        "answer": "10",
        "explanation": "Les listes sont mutables. On modifie ici la valeur à l'index 1."
    },
    {
        "question": "Quel mot-clé permet de redéfinir une méthode héritée ?",
        "options": [
            "virtual",
            "override",
            "new",
            "abstract"
        ],
        "answer": "override",
        "explanation": "`override` est utilisé pour redéfinir une méthode marquée comme `virtual` ou `abstract` dans la classe parente."
    }
  ],
  avance: [
    {
        "question": "Que fait ce code ?\n```csharp\npublic interface ILogger {\n    void Log(string message);\n}\nclass FileLogger : ILogger {\n    public void Log(string message) => File.WriteAllText(\"log.txt\", message);\n}```",
        "options": [
            "Crée une classe abstraite",
            "Implémente une interface",
            "Définit un delegate",
            "Utilise l'héritage multiple"
        ],
        "answer": "Implémente une interface",
        "explanation": "La classe `FileLogger` implémente le contrat `ILogger` en fournissant une implémentation concrète de `Log()`."
    },
    {
        "question": "Quel principe SOLID est violé ici ?\n```csharp\nclass Report {\n    public void GeneratePDF() { /*...*/ }\n    public void Print() { /*...*/ }\n}```",
        "options": [
            "SRP (Single Responsibility Principle)",
            "OCP (Open/Closed Principle)",
            "LSP (Liskov Substitution Principle)",
            "ISP (Interface Segregation Principle)"
        ],
        "answer": "SRP (Single Responsibility Principle)",
        "explanation": "La classe `Report` a deux responsabilités : génération PDF et impression. Elle devrait être scindée en deux classes."
    },
    {
        "question": "Quelle collection utiliser pour stocker des paires clé-valeur ?",
        "options": [
            "List<T>",
            "HashSet<T>",
            "Dictionary<TKey, TValue>",
            "Array"
        ],
        "answer": "Dictionary<TKey, TValue>",
        "explanation": "`Dictionary` est optimisé pour les accès par clé, contrairement aux listes ou tableaux."
    },
    {
        "question": "Que fait ce code ?\n```csharp\npublic record Person(string Name, int Age);```",
        "options": [
            "Crée une classe mutable",
            "Définit une structure",
            "Crée un type immuable avec equals/GetHashCode prédéfinis",
            "Génère une interface"
        ],
        "answer": "Crée un type immuable avec equals/GetHashCode prédéfinis",
        "explanation": "Les `record` en C# sont des types référence immuables avec des méthodes d'égalité générées automatiquement."
    },
    {
        "question": "Comment corriger cette erreur ?\n```csharp\nobject obj = \"hello\";\nint length = obj.Length; // Erreur```",
        "options": [
            "Utiliser `((string)obj).Length`",
            "Remplacer `object` par `var`",
            "Ajouter `dynamic`",
            "Utiliser `obj?.Length ?? 0`"
        ],
        "answer": "Utiliser `((string)obj).Length`",
        "explanation": "Un cast explicite est nécessaire car `object` n'a pas de propriété `Length`."
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
const SignUp = () => {
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

export default SignUp;