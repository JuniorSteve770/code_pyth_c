import React, { useState, useEffect } from "react";
import "./Nform.css";

// Style inline pour les blocs <pre> et <code>
const codeStyle = {
  backgroundColor: "#f4f4f4",
  padding: "10px",
  borderRadius: "5px",
  fontFamily: "'Courier New', Courier, monospace",
  overflowX: "auto",
  whiteSpace: "pre",
  display: "block"
};


 // fichier JSON ou JS séparé avec basic, moyen, avance
// 
export const allQuestions = {
    basic: [
      {
        question: "Qu'est-ce qu'une clé primaire (PK) dans une base de données ?",
        options: [
          "Une colonne qui peut contenir des valeurs NULL",
          "Une colonne ou un ensemble de colonnes qui identifient de manière unique chaque ligne",
          "Une clé utilisée uniquement pour les jointures",
          "Une clé générée aléatoirement sans signification métier"
        ],
        answer: "Une colonne ou un ensemble de colonnes qui identifient de manière unique chaque ligne",
        explanation: "La clé primaire garantit l'unicité et l'intégrité des données. Exemple : ID_Client dans une table Clients."
      },
      {
        question: "Quelle propriété est obligatoire pour une clé primaire ?",
        options: [
          "Peut contenir des doublons",
          "Peut être NULL",
          "Doit être unique et non NULL",
          "Doit être une seule colonne"
        ],
        answer: "Doit être unique et non NULL",
        explanation: "Une PK doit être UNIQUE et NOT NULL pour garantir l'intégrité des données."
      },
      {
        question: "Quel est l'objectif principal du TDD (Test-Driven Development) ?",
        options: [
          "Écrire des tests après le code",
          "Écrire du code sans tests",
          "Écrire les tests avant le code et itérer",
          "Automatiser uniquement les tests d'intégration"
        ],
        answer: "Écrire les tests avant le code et itérer",
        explanation: "Le TDD suit le cycle : 1) Écrire un test échouant, 2) Implémenter le code minimal pour le faire passer, 3) Refactoriser."
      },
      {
        question: "Quelle est la principale caractéristique de la BCNF (Forme Normale de Boyce-Codd) ?",
        options: [
          "Elle permet des dépendances partielles",
          "Elle exige que toute dépendance fonctionnelle X → Y ait X comme super-clé",
          "Elle autorise les dépendances transitives",
          "Elle supprime les clés étrangères"
        ],
        answer: "Elle exige que toute dépendance fonctionnelle X → Y ait X comme super-clé",
        explanation: "BCNF est plus stricte que la 3NF : toute dépendance fonctionnelle doit avoir une super-clé à gauche."
      },
      {
        question: "Quelle est la sortie de ce code ?\n\n<pre><code>class A:\n    def __call__(self):\n        return 42\n\nprint(A()())</code></pre>",
        options: ["42", "Erreur", "None", "True"],
        answer: "42",
        explanation: "La méthode __call__ rend l'objet appelable. A()() appelle __call__ et retourne 42."
      },
      {
        question: "Que va afficher ce code ?\n\n<pre><code>class A:\n    def __str__(self):\n        return \"__str__\"\n\n    def __repr__(self):\n        return \"__repr__\"\n\nprint([A()])</code></pre>",
        options: ["[\"__str__\"]", "[\"__repr__\"]", "[__str__]", "[__repr__]"],
        answer: "[__repr__]",
        explanation: "Les listes utilisent __repr__ pour afficher leurs éléments."
      },
      {
        question: "Que fait ce code avec super() ?\n\n<pre><code>class A:\n    def __init__(self):\n        print(\"A\")\n\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        print(\"B\")\n\nB()</code></pre>",
        options: ["A puis B", "B seulement", "B puis A", "Erreur"],
        answer: "A puis B",
        explanation: "super().__init__() appelle la classe parente dans l'ordre MRO."
      },
      {
        question: "Pourquoi ce code viole-t-il le SRP ?\n\n<pre><code>class Report:\n    def generate(self): pass\n    def save_to_pdf(self): pass</code></pre>",
        options: ["Il respecte SRP", "Il viole LSP", "Il a deux responsabilités", "Il manque une classe mère"],
        answer: "Il a deux responsabilités",
        explanation: "Le SRP veut une seule raison de changer : ici, génération ET sauvegarde."
      },
      {
        question: "Quel est le problème ici ?\n\n<pre><code>class A:\n    def __init__(self, x=[]):\n        self.data = x\n        self.data.append(1)\n\nprint(A().data)\nprint(A().data)</code></pre>",
        options: ["[1] puis [1]", "[1] puis [1, 1]", "[1, 1] puis [1, 1]", "Erreur"],
        answer: "[1] puis [1, 1]",
        explanation: "Les listes mutables en valeur par défaut sont partagées."
      },
      {
        question: "Que va afficher ce code ?\n\n<pre><code>class A:\n    def __call__(self):\n        return self.val + 1\n\n    def __init__(self):\n        self.val = 1\n\na = A()\nprint(a())</code></pre>",
        options: ["1", "2", "Erreur", "None"],
        answer: "2",
        explanation: "a() appelle __call__, qui retourne val + 1."
      },
      {
        question: "Que retourne ce code avec @classmethod ?\n\n<pre><code>class A:\n    count = 0\n\n    @classmethod\n    def inc(cls):\n        cls.count += 1\n        return cls.count\n\nprint(A.inc())\nprint(A.inc())</code></pre>",
        options: ["1 puis 2", "1 puis 1", "0 puis 1", "Erreur"],
        answer: "1 puis 2",
        explanation: "@classmethod modifie un attribut partagé entre les instances."
      },
      {
        question: "Quel est le résultat ?\n\n<pre><code>class Temp:\n    def __init__(self):\n        self._celsius = 25\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9 / 5 + 32\n\nt = Temp()\nprint(t.fahrenheit)</code></pre>",
        options: ["Erreur", "25", "77.0", "None"],
        answer: "77.0",
        explanation: "@property permet l'accès à une méthode comme un attribut."
      }
    ],
    moyen: [
      {
        question: "Quelle est la sortie de ce code ?\n\n<pre><code>class A:\n    def __call__(self):\n        return 42\n\nprint(A()())</code></pre>",
        options: ["42", "Erreur", "None", "True"],
        answer: "42",
        explanation: "La méthode __call__ rend l'objet appelable. A()() appelle __call__ et retourne 42."
      },
      {
        question: "Que va afficher ce code ?\n\n<pre><code>class A:\n    def __str__(self):\n        return \"__str__\"\n\n    def __repr__(self):\n        return \"__repr__\"\n\nprint([A()])</code></pre>",
        options: ["[\"__str__\"]", "[\"__repr__\"]", "[__str__]", "[__repr__]"],
        answer: "[__repr__]",
        explanation: "Les listes utilisent __repr__ pour afficher leurs éléments."
      },
      {
        question: "Que fait ce code avec super() ?\n\n<pre><code>class A:\n    def __init__(self):\n        print(\"A\")\n\nclass B(A):\n    def __init__(self):\n        super().__init__()\n        print(\"B\")\n\nB()</code></pre>",
        options: ["A puis B", "B seulement", "B puis A", "Erreur"],
        answer: "A puis B",
        explanation: "super().__init__() appelle la classe parente dans l'ordre MRO."
      },
      {
        question: "Pourquoi ce code viole-t-il le SRP ?\n\n<pre><code>class Report:\n    def generate(self): pass\n    def save_to_pdf(self): pass</code></pre>",
        options: ["Il respecte SRP", "Il viole LSP", "Il a deux responsabilités", "Il manque une classe mère"],
        answer: "Il a deux responsabilités",
        explanation: "Le SRP veut une seule raison de changer : ici, génération ET sauvegarde."
      },
      {
        question: "Quel est le problème ici ?\n\n<pre><code>class A:\n    def __init__(self, x=[]):\n        self.data = x\n        self.data.append(1)\n\nprint(A().data)\nprint(A().data)</code></pre>",
        options: ["[1] puis [1]", "[1] puis [1, 1]", "[1, 1] puis [1, 1]", "Erreur"],
        answer: "[1] puis [1, 1]",
        explanation: "Les listes mutables en valeur par défaut sont partagées."
      },
      {
        question: "Que va afficher ce code ?\n\n<pre><code>class A:\n    def __call__(self):\n        return self.val + 1\n\n    def __init__(self):\n        self.val = 1\n\na = A()\nprint(a())</code></pre>",
        options: ["1", "2", "Erreur", "None"],
        answer: "2",
        explanation: "a() appelle __call__, qui retourne val + 1."
      },
      {
        question: "Que retourne ce code avec @classmethod ?\n\n<pre><code>class A:\n    count = 0\n\n    @classmethod\n    def inc(cls):\n        cls.count += 1\n        return cls.count\n\nprint(A.inc())\nprint(A.inc())</code></pre>",
        options: ["1 puis 2", "1 puis 1", "0 puis 1", "Erreur"],
        answer: "1 puis 2",
        explanation: "@classmethod modifie un attribut partagé entre les instances."
      },
      {
        question: "Quel est le résultat ?\n\n<pre><code>class Temp:\n    def __init__(self):\n        self._celsius = 25\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9 / 5 + 32\n\nt = Temp()\nprint(t.fahrenheit)</code></pre>",
        options: ["Erreur", "25", "77.0", "None"],
        answer: "77.0",
        explanation: "@property permet l'accès à une méthode comme un attribut."
      },
      {
        question: "Que retourne ce code ?\n\n<pre><code>class A:\n    def __eq__(self, other):\n        return True\n\nprint(A() == A())</code></pre>",
        options: ["True", "False", "Erreur", "None"],
        answer: "True",
        explanation: "__eq__ redéfinit l'opérateur ==."
      },
      {
        question: "Quel est le rôle de __str__ ?\n\n<pre><code>class A:\n    def __str__(self):\n        return \"Hello\"\n\nprint(str(A()))</code></pre>",
        options: ["Hello", "None", "__str__", "Erreur"],
        answer: "Hello",
        explanation: "__str__ fournit une représentation lisible pour print/str."
      },
      {
        question: "Que fait ce code ?\n\n<pre><code>class Logger:\n    def __init__(self):\n        self.f = open(\"log.txt\", \"w\")\n\n    def write(self, msg):\n        self.f.write(msg)</code></pre>",
        options: ["Singleton", "Ouverture répétée du fichier", "Garbage collector", "Encapsulation parfaite"],
        answer: "Ouverture répétée du fichier",
        explanation: "Chaque instance ouvre un fichier → risque de conflit."
      },
      {
        question: "Pourquoi la composition est préférable ici ?\n\n<pre><code>class Engine: pass\nclass Car:\n    def __init__(self):\n        self.engine = Engine()</code></pre>",
        options: ["Parce qu’elle remplace l’héritage", "Car Engine n’a pas besoin de sous-classe", "Pour simplifier les tests", "Pour éviter les erreurs de super()"],
        answer: "Pour simplifier les tests",
        explanation: "La composition est flexible et facilite le remplacement des composants."
      },
      {
        question: "Ce code viole-t-il LSP ?\n\n<pre><code>class Animal:\n    def speak(self): pass\n\nclass Dog(Animal):\n    def speak(self): print(\"Woof\")\n\ndef make_it_talk(animal):\n    animal.speak()\n\nmake_it_talk(Dog())</code></pre>",
        options: ["Oui", "Non", "Peut-être", "Erreur"],
        answer: "Non",
        explanation: "Dog remplace correctement Animal sans altérer le contrat."
      },
      {
        question: "À quoi sert @staticmethod ?\n\n<pre><code>class A:\n    @staticmethod\n    def helper():\n        return 1</code></pre>",
        options: ["Créer une instance", "Accéder à self", "Avoir une méthode indépendante", "Accéder à la classe"],
        answer: "Avoir une méthode indépendante",
        explanation: "@staticmethod ne reçoit ni self ni cls."
      },
      {
        question: "Comment corriger ce piège de valeur par défaut ?\n\n<pre><code>def append_to_list(val, l=[]):\n    l.append(val)\n    return l</code></pre>",
        options: ["Changer l’ordre des paramètres", "Utiliser l=None et initialiser dans la fonction", "Utiliser un tuple", "Ajouter un return"],
        answer: "Utiliser l=None et initialiser dans la fonction",
        explanation: "l=None évite les valeurs mutables partagées entre appels."
      }
    ],
    avance: [
      {
        question: "Quelle est la différence entre __str__ et __repr__ ?",
        options: [
          "__str__ sert au logging, __repr__ au print()",
          "__repr__ sert au debug, __str__ à l’affichage utilisateur",
          "Ils sont identiques",
          "repr() appelle str()"
        ],
        answer: "__repr__ sert au debug, __str__ à l’affichage utilisateur",
        explanation: "__repr__ est destiné aux développeurs, __str__ aux utilisateurs finaux."
      },
      {
        question: "Que produit ce code ?\n\n<pre><code>class A:\n    def __init__(self):\n        print(\"init\")\n\n    def __new__(cls):\n        print(\"new\")\n        return super().__new__(cls)\n\na = A()</code></pre>",
        options: ["init", "new", "new puis init", "Erreur"],
        answer: "new puis init",
        explanation: "__new__ est appelé avant __init__ pour instancier l'objet."
      },
      {
        question: "Pourquoi ce code viole-t-il OCP ?\n\n<pre><code>if type(animal) == Dog:\n    bark()\nelif type(animal) == Cat:\n    meow()</code></pre>",
        options: [
          "Il est optimisé",
          "Il respecte le polymorphisme",
          "Il doit être modifié à chaque nouvelle espèce",
          "Il utilise super()"
        ],
        answer: "Il doit être modifié à chaque nouvelle espèce",
        explanation: "Le code n’est pas ouvert à l’extension, il faut modifier les conditions pour chaque nouveau type."
      },
      {
        question: "Que fait le décorateur @property ?",
        options: [
          "Il rend une méthode publique",
          "Il empêche la méthode d'être modifiée",
          "Il transforme une méthode en attribut",
          "Il exécute automatiquement la méthode"
        ],
        answer: "Il transforme une méthode en attribut",
        explanation: "@property permet d'accéder à une méthode sans parenthèses."
      },
      {
        question: "Quel problème ce code pose-t-il ?\n\n<pre><code>class File:\n    def close(self):\n        print(\"closed\")\n\nf = File()\nf.close = None\nf.close()</code></pre>",
        options: ["Erreur car close est écrasé", "Rien ne se passe", "closed s’affiche", "Le garbage collector s’exécute"],
        answer: "Erreur car close est écrasé",
        explanation: "L’attribut close a été écrasé avec None → appel impossible."
      },
      {
        question: "Pourquoi ce code est-il incorrect ?\n\n<pre><code>class A:\n    def __init__(self):\n        self.x = 0\n\n    def get_x(self):\n        return self.x\n\n    def set_x(self, value):\n        self.x = value</code></pre>",
        options: [
          "Il manque un décorateur @property",
          "x doit être privé",
          "self.x ne peut pas être modifié",
          "get_x et set_x doivent être magiques"
        ],
        answer: "Il manque un décorateur @property",
        explanation: "Pour un accès moderne et contrôlé, il faut utiliser @property + @x.setter."
      },
      {
        question: "Quel est le rôle de @abstractmethod ?",
        options: [
          "Obliger les sous-classes à implémenter une méthode",
          "Interdire la surcharge",
          "Créer des objets dynamiquement",
          "Remplacer le constructeur"
        ],
        answer: "Obliger les sous-classes à implémenter une méthode",
        explanation: "Les classes filles doivent obligatoirement définir la méthode marquée @abstractmethod."
      },
      {
        question: "Quelle bonne pratique respecte le principe DIP ?",
        options: [
          "Dépendre de classes concrètes",
          "Créer toutes ses dépendances dans __init__",
          "Dépendre d'interfaces abstraites",
          "Ne pas utiliser d'import"
        ],
        answer: "Dépendre d'interfaces abstraites",
        explanation: "DIP = Dépendre d’abstractions et non d’implémentations concrètes."
      },
      {
        question: "Pourquoi ce code est risqué ?\n\n<pre><code>if hasattr(obj, 'run'):\n    obj.run()</code></pre>",
        options: [
          "Il n’est pas Pythonique",
          "Il respecte LSP",
          "Il viole OCP",
          "Il contourne le polymorphisme"
        ],
        answer: "Il contourne le polymorphisme",
        explanation: "L’usage de hasattr() empêche l'appel direct via le duck typing."
      },
      {
        question: "Quel pattern est utilisé avec __new__ pour limiter l’instanciation ?",
        options: ["Builder", "Decorator", "Singleton", "Factory"],
        answer: "Singleton",
        explanation: "__new__ peut être utilisé pour retourner toujours la même instance d'une classe."
      },
      {
        question: "Quelle classe ne peut pas être instanciée ?",
        options: [
          "Une classe avec @property",
          "Une classe abstraite contenant un @abstractmethod non implémenté",
          "Une classe avec __init__ vide",
          "Une classe héritant de deux parents"
        ],
        answer: "Une classe abstraite contenant un @abstractmethod non implémenté",
        explanation: "C’est le but des classes abstraites : forcer l’implémentation dans les sous-classes."
      },
      {
        question: "Quel est l'effet d'utiliser super() dans une classe sans héritage ?",
        options: ["Erreur", "Appel implicite d'object", "Comportement non défini", "Retourne None"],
        answer: "Appel implicite d'object",
        explanation: "super() appelera object si aucun héritage explicite n’est présent."
      },
      {
        question: "Quel comportement Python met en œuvre le duck typing ?",
        options: [
          "La vérification par isinstance",
          "L’appel direct aux méthodes sans vérification de type",
          "L’héritage de AbstractBaseClass",
          "La validation de signature"
        ],
        answer: "L’appel direct aux méthodes sans vérification de type",
        explanation: "Si un objet \"parle comme un canard\", on suppose qu’il est un canard. Pas besoin d’instance."
      },
      {
        question: "Que permet la méthode magique __getitem__ ?",
        options: [
          "Créer un générateur",
          "Rendre l'objet subscriptable (accès par index)",
          "Appliquer une condition sur les arguments",
          "Décorer un objet"
        ],
        answer: "Rendre l'objet subscriptable (accès par index)",
        explanation: "__getitem__ permet d’utiliser les crochets comme obj[index]."
      },
      {
        question: "Quel est le résultat de ce code ?\n\n<pre><code>class A:\n    def __init__(self):\n        self._x = 1\n\n    @property\n    def x(self):\n        return self._x\n\n    @x.setter\n    def x(self, val):\n        self._x = val\n\na = A()\na.x = 10\nprint(a.x)</code></pre>",
        options: ["1", "10", "Erreur", "None"],
        answer: "10",
        explanation: "@x.setter permet de modifier _x via l’attribut virtuel x."
      }
    ]
  };


const Timer = ({ timeLeft }) => (
  <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
);

const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => {
  const hasCode = question.includes("<pre>");
  return (
    <div className="question-card">
      <div
        dangerouslySetInnerHTML={{ __html: `<h4>💡 ${question}</h4>` }}
        style={{
          ...codeStyle,
        whiteSpace: question.includes("<pre>") ? "pre" : "normal",
        wordWrap: "break-word"
        }}
      />
      <Timer timeLeft={timeLeft} />
      <div className="options-container">
        {options.map((option, index) => (
          <button  
            key={index}
            onClick={() => onAnswerClick(option)}
            className="option-button" size="small"
          >
            {index + 1}. {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const Results = ({ scores }) => {
  const totalScore = scores.basic + scores.moyen + scores.avance;
  return (
    <div className="results">
      <h2>🎯 Score final : {totalScore} / {Object.values(allQuestions).flat().length}</h2>
      <p>✅ Niveau Basique : {scores.basic}</p>
      <p>✅ Niveau Moyen : {scores.moyen}</p>
      <p>✅ Niveau Avancé : {scores.avance}</p>
      {totalScore > 10 ? (
        <p className="success">🚀 Excellent travail !</p>
      ) : (
        <p className="fail">📚 Révisez encore un peu !</p>
      )}
    </div>
  );
};

const Nforms = () => {
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
    const currentQuestions = allQuestions[level];
    if (option === currentQuestions[currentQuestion].answer) {
      setScores((prevScores) => ({ ...prevScores, [level]: prevScores[level] + 1 }));
      setMessage("✅ Correct !");
    } else {
      setMessage(`❌ Incorrect ! La bonne réponse était : ${currentQuestions[currentQuestion].answer}\nℹ️ ${currentQuestions[currentQuestion].explanation}`);
    }
    setTimeout(handleNextQuestion, 2500);
  };

  const handleNextQuestion = () => {
    const currentQuestions = allQuestions[level];
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
          <h4 className="title">🧠 QCM Python – Niveau : {level.toUpperCase()}</h4>
          <QuestionCard
            question={allQuestions[level][currentQuestion].question}
            options={allQuestions[level][currentQuestion].options}
            onAnswerClick={handleAnswerClick}
            timeLeft={timeLeft}
          />
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default Nforms;
