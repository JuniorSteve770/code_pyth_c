import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

import "./QCMStyles.css";

const questions = {
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
            question: "Quelle est la différence entre une clé primaire et une clé secondaire ?",
            options: [
            "La clé primaire est toujours numérique, la clé secondaire est textuelle",
            "La clé primaire identifie une ligne de manière unique, la clé secondaire est une alternative pour les requêtes",
            "La clé secondaire remplace la clé primaire si elle est absente",
            "Il n'y a pas de différence, les termes sont synonymes"
            ],
            answer: "La clé primaire identifie une ligne de manière unique, la clé secondaire est une alternative pour les requêtes",
            explanation: "La clé secondaire (ou clé candidate) est une autre colonne unique pouvant servir d'identifiant, mais non choisie comme PK. Exemple : Email dans Clients."
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
            explanation: "Une PK doit être UNIQUE et NOT NULL pour garantir l'intégrité des données. Exemple : ID_Commande INT PRIMARY KEY."
            },
            
            {
            question: "Une clé secondaire peut-elle être NULL ?",
            options: [
            "Oui, si elle n'est pas utilisée comme contrainte d'unicité",
            "Non, comme la clé primaire",
            "Seulement dans les bases NoSQL",
            "Uniquement si elle est de type TEXT"
            ],
            answer: "Oui, si elle n'est pas utilisée comme contrainte d'unicité",
            explanation: "Une clé secondaire (comme Email) peut autoriser NULL, sauf si elle est définie comme UNIQUE. Exemple : Email VARCHAR(100) UNIQUE."
            },
            
 
            {
            question: "Dans une table Étudiants(ID, Numéro_Étudiant, Email), quelle colonne est la meilleure candidate pour la clé primaire ?",
            options: [
            "Email (car texte explicite)",
            "Numéro_Étudiant (car unique et stable)",
            "ID (car auto-incrémenté)",
            "Aucune, il faut une clé composite"
            ],
            answer: "ID (car auto-incrémenté)",
            explanation: "ID (souvent un entier auto-incrémenté) est idéal car stable, simple, et indépendante du métier. Numéro_Étudiant pourrait être une clé secondaire."
            },
            
            {
            question: "Quand utiliser une clé composite comme clé primaire ?",
            options: [
            "Lorsqu'aucune colonne seule n'est unique",
            "Uniquement pour les jointures many-to-many",
            "Pour améliorer les performances des INSERT",
            "Jamais, c'est une mauvaise pratique"
            ],
            answer: "Lorsqu'aucune colonne seule n'est unique",
            explanation: "Exemple : Dans une table Résultats_Examens(ID_Étudiant, ID_Examen), la PK composite est (ID_Étudiant, ID_Examen) car un étudiant peut passer plusieurs examens."
            },
            

            {
            question: "Quelle est la relation entre une clé secondaire et une clé étrangère ?",
            options: [
            "Une clé secondaire est toujours une clé étrangère",
            "Une clé étrangère référence une clé primaire ou secondaire d'une autre table",
            "Les deux termes désignent la même chose",
            "Une clé étrangère ne peut référencer que des PK"
            ],
            answer: "Une clé étrangère référence une clé primaire ou secondaire d'une autre table",
            explanation: "Une FK pointe vers une colonne unique (PK ou clé secondaire UNIQUE). Exemple : ID_Client dans Commandes est une FK référençant ID (PK) dans Clients."
            },
            
            {
            question: "Pourquoi éviter d'utiliser une clé secondaire comme clé étrangère ?",
            options: [
            "Car les FK doivent toujours pointer vers des PK",
            "Car cela ralentit les requêtes JOIN",
            "Car les clés secondaires peuvent changer (ex: email)",
            "Car c'est interdit en SQL"
            ],
            answer: "Car les clés secondaires peuvent changer (ex: email)",
            explanation: "Une PK est stable (ex: ID auto-incrémenté), tandis qu'une clé secondaire (ex: Email) peut être modifiée, ce qui complique la gestion des FK."
            },
            
            {
            question: "Quelle condition doit satisfaire une table pour être en 1NF ?",
            options: ["Avoir une clé primaire", "Éviter les groupes répétitifs", "Supprimer les dépendances transitives", "Utiliser des clés étrangères"],
            answer: "Éviter les groupes répétitifs",
            explanation: "La 1NF exige que tous les attributs soient atomiques (pas de groupes répétitifs)."
            },
            
            {
            question: "Une table en 2NF doit d'abord être conforme à :",
            options: ["1NF", "3NF", "BCNF", "4NF"],
            answer: "1NF",
            explanation: "La 2NF suppose que la table est déjà en 1NF."
            },
            
            {
            question: "Une dépendance transitive viole quelle forme normale ?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            answer: "3NF",
            explanation: "La 3NF élimine les dépendances des attributs non-clés sur d'autres attributs non-clés."
            },
            
            {
            question: "Dans une table Employé(ID, Nom, Département, Localisation_Département), quelle anomalie la 3NF cherche-t-elle à résoudre ?",
            options: ["Redondance de Localisation_Département", "Absence de clé primaire", "Dépendance partielle de Nom sur ID", "Groupes répétitifs"],
            answer: "Redondance de Localisation_Département",
            explanation: "Localisation_Département dépend de Département (attribut non-clé), ce qui viole la 3NF."
            },
            
            {
            question: "Quelle forme normale exige que toute dépendance fonctionnelle X → Y ait X comme super-clé ?",
            options: ["2NF", "3NF", "BCNF", "4NF"],
            answer: "BCNF",
            explanation: "BCNF est une version renforcée de la 3NF où X doit être une super-clé."
            },

            {
            question: "Quel langage utilise un garbage collector pour la gestion de la mémoire ?",
            options: ["C++", "C#", "Python", "C# et Python"],
            answer: "C# et Python",
            explanation: "C# et Python utilisent un GC, contrairement à C++ (mémoire manuelle/RAII)."
            },
            
            {
            question: "Quel langage est le plus adapté pour le développement de jeux vidéo AAA ?",
            options: ["C#", "C++", "Python", "Java"],
            answer: "C++",
            explanation: "C++ offre un contrôle fin sur les performances et la mémoire, crucial pour les jeux."
            },
            
            {
            question: "Quel langage supporte nativement le duck typing ?",
            options: ["C#", "C++", "Python", "Aucun"],
            answer: "Python",
            explanation: "Python permet le duck typing (« si ça marche comme un canard, c’est un canard »)."
            },
            
            {
            question: "Quel langage utilise des pointeurs de manière explicite ?",
            options: ["C#", "C++", "Python", "C# et C++"],
            answer: "C++",
            explanation: "C++ permet la manipulation directe des pointeurs (int* ptr = &x;)."
            },
        ],
    moyen: [
            
            {
            question: "Quel langage est interprété ?",
            options: ["C#", "C++", "Python", "C# et Python"],
            answer: "Python",
            explanation: "Python est interprété, tandis que C# et C++ sont compilés (C# via JIT)."
            },
            {
                question: "Qu'est-ce que la 1NF (Première Forme Normale) ?",
                options: [
                "Une table sans clé primaire",
                "Une table avec des attributs atomiques et sans groupes répétitifs",
                "Une table sans dépendances fonctionnelles",
                "Une table avec des jointures optimisées"
                ],
                answer: "Une table avec des attributs atomiques et sans groupes répétitifs",
                explanation: "La 1NF exige que tous les attributs soient indivisibles (atomiques) et qu'il n'y ait pas de répétition de groupes (ex: plusieurs numéros de téléphone dans une seule cellule)."
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
                explanation: "BCNF est plus stricte que la 3NF : toute dépendance fonctionnelle doit avoir une super-clé à gauche (X doit identifier uniquement Y)."
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
                question: "Dans quel contexte utilise-t-on l'UAT (User Acceptance Testing) ?",
                options: [
                "Validation technique par les développeurs",
                "Validation par les utilisateurs finaux pour vérifier que le système répond à leurs besoins",
                "Test des performances sous charge",
                "Vérification de la couverture de code"
                ],
                answer: "Validation par les utilisateurs finaux pour vérifier que le système répond à leurs besoins",
                explanation: "L'UAT est la dernière phase de test où les utilisateurs métier valident que le système est conforme à leurs exigences."
                },
                
                {
                question: "Quel outil est souvent associé au BDD (Behavior-Driven Development) ?",
                options: [
                "JUnit",
                "Selenium",
                "Cucumber",
                "Postman"
                ],
                answer: "Cucumber",
                explanation: "Cucumber permet d'écrire des scénarios de test en langage naturel (Gherkin) pour le BDD, ex: Given-When-Then."
                },
                
                {
                question: "Quelle est la différence entre TDD et BDD ?",
                options: [
                "Le TDD utilise des tests unitaires, le BDD des tests métier",
                "Le BDD ignore les tests automatisés",
                "Le TDD se concentre sur le comportement utilisateur",
                "Aucune différence, ce sont des synonymes"
                ],
                answer: "Le TDD utilise des tests unitaires, le BDD des tests métier",
                explanation: "Le TDD est centré sur les tests techniques (unitaires), tandis que le BDD se focalise sur le comportement métier (scénarios compréhensibles par tous)."
                },
                
                {
                question: "Quelle est la première étape d'un projet BA (Business Analysis) ?",
                options: [
                "Développement de la solution",
                "Collecte et analyse des besoins métier",
                "Déploiement en production",
                "Rédaction des spécifications techniques"
                ],
                answer: "Collecte et analyse des besoins métier",
                explanation: "Un projet BA commence par comprendre les besoins des parties prenantes (entretiens, ateliers, analyse documentaire)."
                },
                
                {
                question: "Quel livrable est typiquement produit lors de la phase de conception en BI ?",
                options: [
                "Un rapport Power BI finalisé",
                "Un modèle de données dimensionnel (ex: schéma en étoile)",
                "Un script SQL optimisé",
                "Un dashboard interactif"
                ],
                answer: "Un modèle de données dimensionnel (ex: schéma en étoile)",
                explanation: "La phase de conception en BI inclut la modélisation des données (ex: dimensions, faits) pour alimenter les rapports."
                },
                
                {
                question: "Quel outil est couramment utilisé pour l'ETL (Extract-Transform-Load) en BI ?",
                options: [
                "Tableau",
                "Power BI",
                "Talend",
                "SAP"
                ],
                answer: "Talend",
                explanation: "Talend est un outil d'ETL open source pour extraire, transformer et charger des données dans un entrepôt BI."
                },
                
                {
                question: "Quelle étape suit la modélisation des données dans un projet BI ?",
                options: [
                "Tests utilisateurs (UAT)",
                "Développement des rapports/dashboards",
                "Collecte des besoins",
                "Mise en production"
                ],
                answer: "Développement des rapports/dashboards",
                explanation: "Une fois le modèle de données validé, on crée les visualisations (ex: avec Power BI, Tableau)."
                }                
            ],
    avance: [
        {
            question: "Quelle forme normale est violée si une table contient (A → B → C) où A est la clé primaire ?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            answer: "3NF",
            explanation: "Dépendance transitive (A → B → C), car C dépend d'un attribut non-clé (B)."
            },
            
            {
            question: "Quelle version de C# a introduit les record struct ?",
            options: ["C# 9.0", "C# 10.0", "C# 11.0", "C# 12.0"],
            answer: "C# 10.0",
            explanation: "C# 10.0 (2021) a ajouté les record struct pour des types immuables légers."
            },
            
            {
            question: "En C++, quel mot-clé permet de garantir la libération automatique d'une ressource ?",
            options: ["new", "delete", "unique_ptr", "finally"],
            answer: "unique_ptr",
            explanation: "std::unique_ptr suit le principe RAII (Resource Acquisition Is Initialization)."
            },
            
            {
            question: "En Python, quel mécanisme permet de gérer les contextes (ex: fichiers) ?",
            options: ["try/finally", "with", "using", "dispose"],
            answer: "with",
            explanation: "Le bloc with garantit la fermeture automatique des ressources (ex: with open() as f)."
            },
            
            {
            question: "Quelle forme normale est la plus stricte ?",
            options: ["1NF", "3NF", "BCNF", "4NF"],
            answer: "4NF",
            explanation: "La 4NF traite des dépendances multi-valuées, allant plus loin que BCNF."
            },
        
        
        
        ]
};

const Timer = ({ timeLeft }) => (
    <p className="timer">⏳ Temps restant : <span>{timeLeft}s</span></p>
);

const QuestionCard = ({ question, options, onAnswerClick, timeLeft }) => (
    <div className="question-card">
        <h4>💡 {question}</h4>
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
                <p className="success">🚀 Excellent travail ! Vous maîtrisez bien les Grecs des options !</p>
            ) : (
                <p className="fail">📚 Révisez encore un peu pour bien comprendre les concepts !</p>
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
                    <h4 className="title">QCM sur les F.N !🔹 Niveau : {level.toUpperCase()}</h4>
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

export default Nforms;
