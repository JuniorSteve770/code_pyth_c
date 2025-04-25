import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
    {
        "question": "Big-O Notation: À quoi sert la notation Big-O ?",
        "answer": "À estimer la complexité d’un algorithme en temps et mémoire selon la taille des données, en ignorant les constantes."
      },
      {
        "question": "Quelles sont les principales classes de complexité Big-O ?",
        "answer": "O(1) : constant • O(log n) : logarithmique • O(n) : linéaire • O(n log n) : tri optimisé • O(n²) : quadratique"
      },
      {
        "question": "Pourquoi la notation Big-O est-elle utile ?",
        "answer": "Elle aide à comparer les performances des algorithmes et à choisir les plus adaptés aux gros volumes de données."
      },
      // Structures de Données
      {
        "question": "Pourquoi utilise-t-on des structures de données ?",
        "answer": "Pour organiser, accéder et manipuler efficacement des données selon les besoins du problème."
      },
      {
        "question": "Quels sont les avantages des structures classiques ?",
        "answer": "Tableau : accès rapide (O(1) mais taille fixe) • Liste chaînée : insertion/suppression facile (O(1), mais accès O(n)) • Arbre binaire : recherche rapide (O(log n) si équilibré) • Table de hachage : insertion/recherche quasi O(1)"
      },
      {
        "question": "Quelles structures pour quels cas d’usage ?",
        "answer": "Tas : file de priorité • Graphe : relations complexes (réseaux, chemins) • Arbres : tri, hiérarchies • Table de hachage : lookup rapide"
      },
      // Les graphes
        {
          "question": "Qu'est-ce qu'un graphe ?",
          "answer": "Une structure composée de nœuds (sommets) reliés par des arêtes (liens), représentant des relations entre objets."
        },
        {
            "question": "Qu’est-ce qu’un graphe en informatique ?",
            "answer": "Une structure composée de nœuds reliés par des arêtes, représentant des relations entre objets. Les arêtes peuvent être orientées et/ou pondérées."
        },
        {
          "question": "Comment représenter un graphe ?",
          "answer": "Matrice d'adjacence : efficace pour graphes denses • Liste d’adjacence : idéale pour graphes creux"
        },
        {
          "question": "Quels algorithmes utilise-t-on sur les graphes ?",
          "answer": "DFS, BFS : parcours • Dijkstra, Bellman-Ford : plus court chemin • Kruskal : arbre couvrant minimal"
        },
        {
        "question": "Qu’est-ce qu’un graphe et comment le représenter ?",
        "answer": "Un ensemble de nœuds reliés par des arêtes (orientées ou non, pondérées ou non). Représentation : matrice d’adjacence (dense) ou liste d’adjacence (creux)."
        },
        {
        "question": "Quels sont les types de parcours de graphe ?",
        "answer": "DFS : explore en profondeur, utile pour cycles et composants • BFS : explore en largeur, efficace pour plus court chemin non pondéré"
        },
        {
        "question": "Quels sont les algorithmes clés sur les graphes ?",
        "answer": "Dijkstra : plus court chemin (poids positifs) • Bellman-Ford : poids négatifs et détection de cycles • Kruskal/Prim : arbre couvrant minimal"
        },
      //Algorithme de TRI
      {
        "question": "Pourquoi les algorithmes de tri et de recherche sont-ils importants ?",
        "answer": "Ils permettent d’organiser et de retrouver efficacement des données, essentiels en bases de données, moteurs de recherche, systèmes de fichiers."
      },
      {
        "question": "Quels sont les types de tri et leurs performances ?",
        "answer": "Tri à Bulles/Sélection : simples mais lents (O(n²) • Tri Rapide, Fusion, Tas : rapides (O(n log n)) • Le choix dépend de la stabilité et de la mémoire."
      },
      {
        "question": "Quelles sont les méthodes de recherche principales ?",
        "answer": "Recherche linéaire : O(n), efficace pour petites données • Recherche binaire : O(log n), nécessite une structure triée"
      },
      {
        "question": "Quels sont les algorithmes de tri courants et leurs complexités ?",
        "answer": "Tri à Bulles : O(n²) • Tri Fusion : O(n log n) • Tri Rapide : O(n log n) en moyenne"
      },
      {
        "question": "Qu'est-ce que le Tri Fusion et le Tri Rapide ?",
        "answer": "Tri Fusion : divise et fusionne des sous-tableaux • Tri Rapide : choisit un pivot et trie récursivement"
      },
      {
        "question": "Quelles sont les principales méthodes de recherche ?",
        "answer": "Recherche Linéaire : O(n), tout parcourir • Recherche Binaire : O(log n), divise un tableau trié"
      },
      // Merise 
      {
        "question": "Qu’est-ce que la méthode Merise ?",
        "answer": "Une méthode de conception des systèmes d’information, basée sur 3 niveaux : conceptuel, organisationnel, physique."
      },
      {
        "question": "Quels sont les rôles du MCD, MCT et MPD en Merise ?",
        "answer": "MCD : structure logique des données • MCT : modélise les traitements métier • MPD : traduit les données en schéma SQL"
      },
      {
        "question": "Quels sont les avantages et limites de Merise ?",
        "answer": "Avantages : rigueur, clarté entre acteurs • Limites : rigide, peu adaptée aux méthodes agiles, usage en baisse"
      },
      // UML
      {
        "question": "Qu’est-ce que UML ?",
        "answer": "UML (Unified Modeling Language) est un langage de modélisation standardisé pour concevoir des systèmes orientés objet, couvrant structure et comportement."
      },
      {
        "question": "Quels sont les principaux diagrammes structurels en UML ?",
        "answer": "Diagrammes de Classes, Objets, Composants, Déploiement — pour modéliser la structure du système (objets, relations, architecture physique)."
      },
      {
        "question": "Quels sont les principaux diagrammes comportementaux en UML ?",
        "answer": "Cas d’Utilisation, Séquence, Activités, États — pour modéliser les interactions, les flux et le cycle de vie des objets."
      },
      {
        "question": "Quels sont les avantages et limites d’UML ?",
        "answer": "Avantages : standard reconnu, polyvalent, communication claire • Limites : complexité initiale, surcharge documentaire possible en Agile"
      },
      // Tests Logiciels : UAT, TDD, BDD, UT, RT, E2E
      {
        "question": "Qu’est-ce que le UAT (User Acceptance Testing) ?",
        "answer": "Des tests effectués par les utilisateurs finaux pour valider que le produit répond aux besoins métier."
      },
      {
        "question": "Quel est l’objectif principal du UAT ?",
        "answer": "S'assurer que le système est prêt pour la mise en production via des scénarios d’utilisation réels."
      },
      {
        "question": "Qu’est-ce que le TDD (Test-Driven Development) ?",
        "answer": "Méthode où les tests sont écrits avant le code afin de guider le développement étape par étape."
      },
      {
        "question": "Quel est le cycle de TDD ?",
        "answer": "Red : écrire un test qui échoue • Green : coder pour le faire réussir • Refactor : améliorer le code sans casser le test"
      },
      {
        "question": "Qu’est-ce que le BDD (Behavior-Driven Development) ?",
        "answer": "Une approche orientée comportement qui décrit les fonctionnalités en langage naturel, accessible à tous."
      },
      {
        "question": "Quel est l’objectif du BDD ?",
        "answer": "Aligner les attentes entre business, développeurs et testeurs grâce à des scénarios du type Given–When–Then."
      },
      {
        "question": "Qu’est-ce que le Unit Testing (UT) ?",
        "answer": "Des tests automatisés qui valident les fonctions ou méthodes isolées d’un programme."
      },
      {
        "question": "Quels sont les outils courants pour le UT ?",
        "answer": "JUnit (Java), pytest (Python), NUnit (.NET)"
      },
      {
        "question": "Qu’est-ce que le Regression Testing (RT) ?",
        "answer": "Des tests pour vérifier qu’aucune fonctionnalité existante n’est cassée après une modification du code."
      },
      {
        "question": "Quel est le rôle du RT dans le cycle de développement ?",
        "answer": "Assurer la stabilité du système à chaque mise à jour ou nouvelle version."
      },
      {
        "question": "Qu’est-ce que le E2E Testing (End-to-End) ?",
        "answer": "Des tests qui simulent un parcours utilisateur complet à travers toutes les couches de l’application."
      },
      {
        "question": "Quels outils sont utilisés pour l’E2E Testing ?",
        "answer": "Selenium, Cypress, Playwright pour tester des scénarios utilisateurs de bout en bout."
      }
];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [
    {
        question: "Quelle est la complexité temporelle d'un algorithme qui parcourt un tableau de taille `n` deux fois ?",
        options: [
            "O(n)",
            "O(n²)",
            "O(2n)",
            "O(log n)"
        ],
        answer: "O(n)",
        explanation: "Bien que le tableau soit parcouru deux fois, cela reste linéaire par rapport à la taille des données. Les constantes comme '2' sont ignorées dans la notation Big-O."
    },
    {
        question: "Quelle est la complexité temporelle de l'algorithme suivant ?\nfor i in range(n):\n    for j in range(n):\n        print(i, j)",
        options: [
            "O(n)",
            "O(n log n)",
            "O(n²)",
            "O(log n)"
        ],
        answer: "O(n²)",
        explanation: "La boucle externe s'exécute `n` fois, et pour chaque itération, la boucle interne s'exécute également `n` fois. Le nombre total d'opérations est donc proportionnel à `n * n`, soit O(n²)."
    },
    {
        question: "Quelle est la complexité d'une recherche binaire dans un tableau trié de taille `n` ?",
        options: [
            "O(n)",
            "O(log n)",
            "O(n²)",
            "O(1)"
        ],
        answer: "O(log n)",
        explanation: "La recherche binaire divise l'espace de recherche en deux à chaque étape, ce qui donne une complexité logarithmique."
    },
    {
        question: "Quelle structure de données permet un accès direct aux éléments en temps constant (O(1)) ?",
        options: [
            "Liste chaînée",
            "Tableau",
            "Arbre binaire",
            "Pile"
        ],
        answer: "Tableau",
        explanation: "Dans un tableau, chaque élément est stocké de manière contiguë, ce qui permet un accès direct via son index en temps constant."
    },
    {
        question: "Quelle est la meilleure structure de données pour implémenter une file d'attente (FIFO) ?",
        options: [
            "Pile",
            "Liste chaînée",
            "File",
            "Tableau"
        ],
        answer: "File",
        explanation: "Une file suit le principe FIFO (First In, First Out), ce qui correspond exactement au comportement attendu d'une file d'attente."
    },
    {
        question: "Quelle structure de données est idéale pour une insertion et suppression rapide en temps constant (O(1)) ?",
        options: [
            "Tableau",
            "Liste chaînée",
            "Tas",
            "Table de hachage"
        ],
        answer: "Table de hachage",
        explanation: "Les tables de hachage offrent des performances quasi constantes pour les opérations de recherche, insertion et suppression, en moyenne."
    },
    {
        question: "Quelle représentation de graphe est la plus efficace en termes de mémoire pour un graphe creux (avec peu d'arêtes) ?",
        options: [
            "Matrice d'adjacence",
            "Liste d'adjacence",
            "Table de hachage",
            "Arbre"
        ],
        answer: "Liste d'adjacence",
        explanation: "La liste d'adjacence ne stocke que les arêtes existantes, ce qui la rend plus efficace en mémoire pour les graphes creux."
    },
    {
        question: "Quel algorithme de parcours de graphe est préférable pour trouver le chemin le plus court dans un graphe non pondéré ?",
        options: [
            "DFS (Depth-First Search)",
            "BFS (Breadth-First Search)",
            "Dijkstra",
            "Bellman-Ford"
        ],
        answer: "BFS (Breadth-First Search)",
        explanation: "BFS explore tous les voisins d'un nœud avant de passer aux niveaux suivants, ce qui garantit de trouver le chemin le plus court dans un graphe non pondéré."
    },
    {
        question: "Quel algorithme peut gérer des graphes avec des poids négatifs ?",
        options: [
            "Dijkstra",
            "Bellman-Ford",
            "Kruskal",
            "Prim"
        ],
        answer: "Bellman-Ford",
        explanation: "L'algorithme de Bellman-Ford peut traiter des graphes avec des poids négatifs et détecter les cycles de poids négatif."
    },
    {
        question: "Quel algorithme de tri a une complexité moyenne de O(n log n) et peut dégrader à O(n²) dans le pire cas ?",
        options: [
            "Tri à Bulles",
            "Tri Fusion",
            "Tri Rapide",
            "Tri par Insertion"
        ],
        answer: "Tri Rapide",
        explanation: "Le Tri Rapide a une complexité moyenne de O(n log n), mais il peut dégrader à O(n²) si le pivot est mal choisi (par exemple, toujours le premier ou dernier élément)."
    },
    {
        question: "Quel algorithme de recherche nécessite que les données soient triées ?",
        options: [
            "Recherche Linéaire",
            "Recherche Binaire",
            "Recherche par Hachage",
            "Recherche Profondeur"
        ],
        answer: "Recherche Binaire",
        explanation: "La recherche binaire exploite une structure triée pour diviser l'espace de recherche en deux à chaque étape."
    },
    {
        question: "Quel algorithme de tri utilise une stratégie 'diviser pour régner' ?",
        options: [
            "Tri à Bulles",
            "Tri Fusion",
            "Tri par Sélection",
            "Tri par Insertion"
        ],
        answer: "Tri Fusion",
        explanation: "Le Tri Fusion divise le tableau en sous-tableaux, les trie récursivement, puis fusionne les résultats."
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
