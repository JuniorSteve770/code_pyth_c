import React, { useState, useEffect } from "react";
// Ajoutons le support pour afficher du code Python dans les questions
// Étape 1 : Modifier les questions contenant du code Python pour les afficher dans un bloc <pre><code>...</code></pre>

// Exemple de question avec code :
const questions = {
    avance: [
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
      // ...autres questions
    ]
  };
  
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
  
  const Timer = ({ timeLeft }) => (
    <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
  );
  
  const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => (
    <div className="question-card">
      <div
        dangerouslySetInnerHTML={{ __html: `<h4>💡 ${question}</h4>` }}
        style={codeStyle}
      />
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
  
  const Nforms = () => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [score, setScore] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(20);
    const [showResult, setShowResult] = React.useState(false);
    const [message, setMessage] = React.useState("");
  
    React.useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        handleNextQuestion();
      }
    }, [timeLeft]);
  
    const handleAnswerClick = (option) => {
      if (option === questions.avance[currentQuestion].answer) {
        setScore(score + 1);
        setMessage("✅ Correct !");
      } else {
        setMessage(`❌ Incorrect ! La bonne réponse était : ${questions.avance[currentQuestion].answer}\nℹ️ ${questions.avance[currentQuestion].explanation}`);
      }
      setTimeout(handleNextQuestion, 2000);
    };
  
    const handleNextQuestion = () => {
      if (currentQuestion + 1 < questions.avance.length) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(20);
        setMessage("");
      } else {
        setShowResult(true);
      }
    };
  
    return (
      <div className="qcm-container">
        {showResult ? (
          <div className="results">
            <h2>🎯 Score final : {score} / {questions.avance.length}</h2>
            {score > 3 ? (
              <p className="success">🚀 Excellent travail !</p>
            ) : (
              <p className="fail">📚 Révisez encore un peu !</p>
            )}
          </div>
        ) : (
          <div>
            <h4 className="title">QCM Python Avancé 🐍</h4>
            <QuestionCard
              question={questions.avance[currentQuestion].question}
              options={questions.avance[currentQuestion].options}
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