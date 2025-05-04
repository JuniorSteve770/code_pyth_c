import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
  {
    "question": "Quels sont les composants clés du modèle TCP/IP ?",
    "answer": "1. Couche Application (HTTP, FTP, DNS, etc.) 2. Couche Transport (TCP, UDP) 3. Couche Internet (IP, ICMP) 4. Couche Accès Réseau (Ethernet, Wi-Fi, etc.)"
  },
  {
    "question": "Quels sont les outils de base pour construire un réseau ?",
    "answer": "1. Routeur : relie plusieurs réseaux. 2. Switch : connecte plusieurs appareils d’un même réseau local. 3. Câbles Ethernet / Fibre. 4. Firewall : contrôle les flux entrants/sortants. 5. Points d’accès Wi-Fi : connectivité sans fil."
  },
  {
    "question": "Que représente une adresse IP et un port ?",
    "answer": "1. L'adresse IP identifie une machine sur le réseau. 2. Le port identifie un service sur cette machine (ex: 80 pour HTTP, 443 pour HTTPS, 22 pour SSH)."
  },
  {
    "question": "Comment vérifier que la machine répond sur le réseau ?",
    "answer": "Utiliser `ping <adresse IP>` pour tester la connectivité de base entre deux machines via ICMP."
  },
  {
    "question": "Comment vérifier qu’un port est ouvert sur une machine distante ?",
    "answer": "Utiliser `telnet <adresse IP> <port>` ou `nc -zv <ip> <port>` pour tester si un service écoute sur ce port."
  },
  {
    "question": "Comment tracer le chemin réseau jusqu’à une machine distante ?",
    "answer": "Utiliser `traceroute <adresse>` (ou `tracert` sous Windows) pour visualiser chaque saut entre vous et la destination."
  },
  {
    "question": "Comment vérifier qu’un service HTTP ou une API est vivant ?",
    "answer": "Utiliser `curl http://adresse` ou `wget http://adresse` pour tester si un service HTTP répond avec un code 200 ou autre."
  },
  {
    "question": "Comment vérifier la résolution DNS d’un nom d’hôte ?",
    "answer": "Utiliser `nslookup nom_d_hote` ou `dig nom_d_hote` pour vérifier que le nom est bien traduit en adresse IP."
  },
  {
    "question": "Quels types de flux réseau peut-on rencontrer ?",
    "answer": "1. FTP/SFTP pour transfert de fichiers. 2. HTTP/HTTPS pour API ou sites web. 3. Market data en temps réel (multicast, websocket, TCP). 4. Flux batch via CRON/SFTP/ETL."
  },
  {
    "question": "Comment résoudre un timeout sur une API ?",
    "answer": "1. Vérifier connectivité (`ping`, `telnet`, `curl`). 2. Vérifier si le service est lent ou indisponible. 3. Vérifier les règles firewall/proxy. 4. Relancer avec logs et timeouts augmentés."
  },
  {
    "question": "Que faire si des données sont absentes dans un flux ?",
    "answer": "1. Vérifier la source (FTP/API). 2. S'assurer de la réception complète. 3. Consulter les logs d’import. 4. Redémarrer ou relancer manuellement le flux."
  },
  {
    "question": "Comment diagnostiquer un flux FTP cassé ?",
    "answer": "1. Tester l'accès avec `sftp` ou `ftp`. 2. Vérifier les identifiants. 3. Contrôler les droits d'écriture/lecture. 4. Vérifier les logs côté serveur FTP."
  },
  {
    "question": "Comment comprendre l’acheminement des données ?",
    "answer": "1. Analyser les couches du modèle TCP/IP. 2. Identifier les points de passage (firewall, proxy, load balancer). 3. Étudier les protocoles utilisés (ex: HTTP, TCP, FTP)."
  },
  {
    "question": "Quels tests effectuer en ligne de commande avant d'escalader ?",
    "answer": "1. `ping` pour tester la connectivité. 2. `curl` pour tester un service. 3. `telnet` ou `nc` pour tester un port. 4. `dig/nslookup` pour DNS. 5. Vérifier les logs locaux."
  },
  {
    "question": "Comment repérer les erreurs de connexion ou les timeouts ?",
    "answer": "1. Vérifier les logs (application, système, réseau). 2. Observer les temps de réponse avec `curl -v`. 3. Utiliser `tcpdump` ou `wireshark` pour analyser les paquets réseau."
  },
  {
    "question": "Comment expliquer les échanges applicatifs dans un projet ?",
    "answer": "Exemple : L’application de pricing appelle l’API de market data via HTTP/REST. Les données récupérées sont stockées dans une base PostgreSQL. Un ETL envoie ces données vers un système BI. SFTP est utilisé pour exporter des rapports vers des partenaires externes."
  },
  {
    "question": "Quelle est la différence entre TCP et UDP ?",
    "answer": "TCP est orienté connexion, garantit la fiabilité, l’ordre et la vérification des paquets (ex : HTTP, FTP). UDP est plus rapide mais non fiable, utilisé pour la voix, la vidéo ou les données en temps réel (ex : DNS, VoIP, streaming)."
  },
  {
    "question": "Quel outil en ligne de commande permet de capturer le trafic réseau ?",
    "answer": "L’outil `tcpdump` permet de capturer et analyser les paquets réseau en temps réel. Exemple : `tcpdump -i eth0 port 80` capture le trafic HTTP sur l’interface eth0."
  },
  {
    "question": "À quoi sert un firewall réseau ?",
    "answer": "Il contrôle les flux entrants et sortants selon des règles de sécurité définies (filtrage IP, port, protocole), protégeant les systèmes contre des connexions non autorisées ou malveillantes."
  },
  {
    "question": "Que signifie une erreur de type 'Connection refused' ?",
    "answer": "Cela indique que l’IP est joignable mais qu’aucun service n’écoute sur le port ciblé. Causes possibles : service arrêté, firewall local, mauvaise config de port."
  },
  {
    "question": "Quelles commandes permettent de diagnostiquer la bande passante réseau ?",
    "answer": "Des outils comme `iperf` ou `speedtest-cli` permettent de tester la vitesse de transmission entre deux machines ou vers un serveur distant."
  },
  {
    "question": "Pourquoi utiliser une redirection de port (port forwarding) ?",
    "answer": "Elle permet d’accéder à un service interne derrière un NAT ou un routeur en exposant un port externe qui redirige vers un port local (ex : accès SSH à une machine interne)."
  },
  {
    "question": "Comment expliquer une latence élevée dans un réseau ?",
    "answer": "Elle peut être due à : congestion du réseau, distance géographique, problème de routage, équipement défaillant (switch, câble), ou surcharge serveur."
  },
  {
    "question": "Quelle est la commande pour tester une requête DNS complète ?",
    "answer": "`dig` (ou `nslookup`) permet d’interroger un serveur DNS et d’avoir les détails sur la résolution du nom de domaine (A, CNAME, MX…)."
  },
  {
    "question": "Quelle différence entre un port TCP 'ouvert' et un port 'filtré' ?",
    "answer": "Un port ouvert accepte les connexions, un port filtré bloque ou ignore les requêtes (souvent via firewall). Outils comme `nmap` permettent de les identifier."
  },
  {
    "question": "Comment documenter une architecture réseau rencontrée en entreprise ?",
    "answer": "1. Schématiser les composants (app, base, proxy, pare-feu, load balancer). 2. Identifier les flux entre chaque brique (protocole, port). 3. Spécifier les points critiques (sécurité, volumétrie, dépendances)."
  }
           
];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [

    {
      "question": "Quelle commande permet de lister tous les fichiers, y compris les fichiers cachés ?",
      "options": [
        "pwd",
        "ls -la",
        "cat",
        "find"
      ],
      "answer": "ls -la",
      "explanation": "La commande `ls -la` permet d'afficher tous les fichiers, même les fichiers cachés (ceux commençant par un point)."
    },
    {
      "question": "Quelle commande permet de créer un dossier ?",
      "options": [
        "cd",
        "touch",
        "mkdir",
        "open"
      ],
      "answer": "mkdir",
      "explanation": "`mkdir` (make directory) est utilisée pour créer un nouveau dossier."
    },
    {
      "question": "Quelle commande permet d'afficher le chemin absolu du dossier courant ?",
      "options": [
        "cd",
        "pwd",
        "ls",
        "clear"
      ],
      "answer": "pwd",
      "explanation": "La commande `pwd` (print working directory) affiche le chemin complet du répertoire actuel."
    },
    {
      "question": "Quelle commande permet de supprimer un dossier et son contenu ?",
      "options": [
        "mv",
        "rm -r",
        "clear",
        "chmod"
      ],
      "answer": "rm -r",
      "explanation": "`rm -r` supprime récursivement un dossier et tout son contenu. Attention : c'est une commande dangereuse."
    },
    {
      "question": "Quelle commande est utilisée pour rechercher un mot dans un fichier ?",
      "options": [
        "less",
        "grep",
        "find",
        "cat"
      ],
      "answer": "grep",
      "explanation": "`grep` permet de rechercher une chaîne de caractères dans un ou plusieurs fichiers."
    },
    {
      "question": "Quelle commande est utilisée pour afficher les processus en cours ?",
      "options": [
        "scp",
        "ps aux",
        "chmod",
        "history"
      ],
      "answer": "ps aux",
      "explanation": "`ps aux` permet de visualiser tous les processus en cours d'exécution sur la machine."
    },
    {
      "question": "Quelle commande permet de copier un fichier d'un serveur à un autre ?",
      "options": [
        "scp",
        "mv",
        "cat",
        "cd"
      ],
      "answer": "scp",
      "explanation": "`scp` (secure copy) est utilisée pour transférer un fichier de manière sécurisée via SSH."
    },
    {
      "question": "Quelle commande affiche l'historique des commandes ?",
      "options": [
        "man",
        "history",
        "less",
        "open"
      ],
      "answer": "history",
      "explanation": "`history` affiche la liste des commandes précédemment exécutées dans le terminal."
    },
    {
      "question": "Quelle commande sert à planifier des tâches automatiques ?",
      "options": [
        "touch",
        "crontab",
        "ps aux",
        "grep"
      ],
      "answer": "crontab",
      "explanation": "`crontab` permet de planifier l’exécution automatique de commandes à intervalles réguliers."
    },
    {
      "question": "Quelle commande permet de modifier les permissions d’un fichier ?",
      "options": [
        "chmod",
        "cat",
        "scp",
        "mkdir"
      ],
      "answer": "chmod",
      "explanation": "`chmod` modifie les droits d'accès d'un fichier ou dossier (lecture, écriture, exécution)."
    },
    {
      "question": "Quelle commande permet de changer de répertoire dans un terminal Linux ?",
      "options": [
        "ls",
        "cd",
        "pwd",
        "mv"
      ],
      "answer": "cd",
      "explanation": "`cd` (change directory) permet de naviguer dans l’arborescence des dossiers."
    },
    {
      "question": "Quelle commande permet d’afficher le contenu d’un fichier texte ?",
      "options": [
        "touch",
        "cat",
        "chmod",
        "clear"
      ],
      "answer": "cat",
      "explanation": "`cat` est utilisée pour afficher directement le contenu d’un fichier dans le terminal."
    },
    {
      "question": "Quelle commande Linux est utilisée pour consulter un long fichier page par page ?",
      "options": [
        "cat",
        "less",
        "top",
        "ps aux"
      ],
      "answer": "less",
      "explanation": "`less` est idéale pour lire les fichiers volumineux page par page avec navigation possible (flèches, recherche)."
    },
    {
      "question": "Quelle commande permet de créer un fichier vide ?",
      "options": [
        "mkdir",
        "mv",
        "touch",
        "open"
      ],
      "answer": "touch",
      "explanation": "`touch` crée un fichier vide ou met à jour la date de modification s’il existe déjà."
    },
    {
      "question": "Quelle commande permet d’ouvrir un fichier ou un dossier avec l’interface graphique sous Linux ?",
      "options": [
        "xdg-open",
        "open",
        "less",
        "cd"
      ],
      "answer": "xdg-open",
      "explanation": "`xdg-open` ouvre un fichier/dossier dans l’application graphique par défaut (utile pour GUI depuis terminal)."
    },
    {
      "question": "Quelle commande permet de rechercher des fichiers selon un nom ou une extension ?",
      "options": [
        "grep",
        "find",
        "cat",
        "mv"
      ],
      "answer": "find",
      "explanation": "`find` permet de localiser des fichiers par nom, type ou date de modification, avec de nombreux filtres possibles."
    },
    {
      "question": "Quelle commande permet d'afficher le manuel d'utilisation d'une commande ?",
      "options": [
        "man",
        "help",
        "info",
        "doc"
      ],
      "answer": "man",
      "explanation": "`man` permet d’accéder à la documentation complète d’une commande (ex: `man ls`)."
    },
    {
      "question": "Quelle commande nettoie l’écran du terminal ?",
      "options": [
        "clean",
        "clear",
        "reset",
        "flush"
      ],
      "answer": "clear",
      "explanation": "`clear` vide le contenu de l’écran, mais n’efface pas l’historique des commandes."
    },
    {
      "question": "Quelle commande permet de déplacer ou renommer un fichier ?",
      "options": [
        "cp",
        "mv",
        "rm",
        "rename"
      ],
      "answer": "mv",
      "explanation": "`mv` (move) sert à déplacer un fichier ou à le renommer dans le système de fichiers."
    }
  ],
  avance: [
    {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nList<int> nombres = new List<int> { 1, 2, 3, 4, 5 };\nvar result = nombres.Where(n => n % 2 == 0).ToList();\nConsole.WriteLine(string.Join(\", \", result));\n```",
        "options": [
          "1, 3, 5",
          "2, 4",
          "1, 2, 3, 4, 5",
          "2, 3, 4"
        ],
        "answer": "2, 4",
        "explanation": "La méthode `Where` filtre les éléments de la liste en ne conservant que ceux qui satisfont la condition `n % 2 == 0`, c’est-à-dire les nombres pairs."
      },
      {
        "question": "Que se passe-t-il si vous tentez d'accéder à une clé inexistante dans un `Dictionary` en C# ?\n\n```csharp\nvar dict = new Dictionary<string, int>();\nint value = dict[\"inexistant\"];\n```",
        "options": [
          "La variable `value` reçoit la valeur 0.",
          "Une exception de type `KeyNotFoundException` est levée.",
          "La variable `value` reçoit la valeur `null`.",
          "Le programme compile mais échoue silencieusement à l'exécution."
        ],
        "answer": "Une exception de type `KeyNotFoundException` est levée.",
        "explanation": "Accéder à une clé inexistante dans un `Dictionary` avec l'indexeur lève une exception `KeyNotFoundException`. Pour éviter cela, utilisez `TryGetValue`."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nvar nombres = new List<int> { 1, 2, 3, 4, 5 };\nvar result = nombres.Select(n => n * 2).First();\nConsole.WriteLine(result);\n```",
        "options": [
          "2",
          "1",
          "10",
          "Aucune sortie, une exception est levée"
        ],
        "answer": "2",
        "explanation": "La méthode `Select` multiplie chaque élément par 2. `First` retourne le premier élément de la séquence résultante, soit 1 * 2 = 2."
      },
      {
        "question": "Quelle est la différence entre `First()` et `FirstOrDefault()` en LINQ ?",
        "options": [
          "`First()` retourne le premier élément ou une exception si la séquence est vide ; `FirstOrDefault()` retourne le premier élément ou la valeur par défaut du type si la séquence est vide.",
          "`First()` retourne toujours le premier élément ; `FirstOrDefault()` retourne toujours le dernier élément.",
          "`First()` et `FirstOrDefault()` sont identiques en comportement.",
          "`First()` retourne le premier élément qui satisfait une condition ; `FirstOrDefault()` retourne le premier élément sans condition."
        ],
        "answer": "`First()` retourne le premier élément ou une exception si la séquence est vide ; `FirstOrDefault()` retourne le premier élément ou la valeur par défaut du type si la séquence est vide.",
        "explanation": "`First()` lève une exception si la séquence est vide, tandis que `FirstOrDefault()` retourne la valeur par défaut du type (`null` pour les types référence, `0` pour les types valeur) dans ce cas."
      },
      {
        "question": "Quel est le rôle du mot-clé `async` en C# ?",
        "options": [
          "Il permet de définir une méthode asynchrone qui peut utiliser `await` pour des opérations non bloquantes.",
          "Il exécute une méthode en parallèle sur un autre thread.",
          "Il rend une méthode synchrone plus rapide.",
          "Il empêche une méthode de lever des exceptions."
        ],
        "answer": "Il permet de définir une méthode asynchrone qui peut utiliser `await` pour des opérations non bloquantes.",
        "explanation": "Le mot-clé `async` permet de définir une méthode asynchrone qui peut contenir des opérations `await`, facilitant l'écriture de code non bloquant."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\ntry\n{\n    int x = 0;\n    int y = 5 / x;\n}\ncatch (DivideByZeroException ex)\n{\n    Console.WriteLine(\"Erreur : \" + ex.Message);\n}\n```",
        "options": [
          "Erreur : Tentative de division par zéro.",
          "Erreur : Exception non gérée.",
          "Erreur : 0",
          "Aucune sortie, le programme plante."
        ],
        "answer": "Erreur : Tentative de division par zéro.",
        "explanation": "Une division par zéro lève une exception `DivideByZeroException`, qui est capturée par le bloc `catch`, affichant le message d'erreur."
      },
      {
        "question": "Quelle est la différence entre `List<T>` et `HashSet<T>` en C# ?",
        "options": [
          "`List<T>` permet des doublons et maintient l'ordre des éléments ; `HashSet<T>` ne permet pas de doublons et n'a pas d'ordre garanti.",
          "`List<T>` ne permet pas de doublons ; `HashSet<T>` permet des doublons.",
          "`List<T>` est plus rapide pour les recherches ; `HashSet<T>` est plus lent.",
          "`List<T>` est une collection non générique ; `HashSet<T>` est générique."
        ],
        "answer": "`List<T>` permet des doublons et maintient l'ordre des éléments ; `HashSet<T>` ne permet pas de doublons et n'a pas d'ordre garanti.",
        "explanation": "`List<T>` est une collection ordonnée qui accepte les doublons, tandis que `HashSet<T>` est une collection non ordonnée qui n'accepte pas les doublons."
      },
      {
        "question": "Quelle est la différence principale entre List<T> et Dictionary<TKey, TValue> en C# ?",
        "options": [
          "List<T> utilise des clés uniques pour accéder aux éléments, tandis que Dictionary<TKey, TValue> utilise des index numériques.",
          "List<T> stocke des paires clé-valeur, tandis que Dictionary<TKey, TValue> stocke des éléments simples.",
          "List<T> est une collection ordonnée accessible par index, tandis que Dictionary<TKey, TValue> est une collection non ordonnée accessible par clé.",
          "List<T> ne permet pas de doublons, tandis que Dictionary<TKey, TValue> le permet."
        ],
        "answer": "List<T> est une collection ordonnée accessible par index, tandis que Dictionary<TKey, TValue> est une collection non ordonnée accessible par clé.",
        "explanation": "List<T> est utilisée pour stocker des éléments dans un ordre spécifique, accessibles par leur position (index). En revanche, Dictionary<TKey, TValue> stocke des paires clé-valeur, permettant un accès rapide aux valeurs via des clés uniques."
      },
      {
        "question": "Quel est le résultat du code suivant ?\n\n```csharp\nList<int> nombres = new List<int> { 1, 2, 3 };\nnombres.RemoveAt(0);\nConsole.WriteLine(nombres[0]);\n```",
        "options": [
          "1",
          "2",
          "3",
          "Une exception est levée"
        ],
        "answer": "2",
        "explanation": "La méthode RemoveAt(0) supprime le premier élément de la liste (valeur 1). Ainsi, l'élément à l'index 0 devient 2."
      },
      {
        "question": "Que fait la méthode LINQ `Where()` en C# ?",
        "options": [
          "Elle trie les éléments d'une collection.",
          "Elle transforme chaque élément d'une collection.",
          "Elle filtre une collection en fonction d'une condition.",
          "Elle regroupe les éléments d'une collection."
        ],
        "answer": "Elle filtre une collection en fonction d'une condition.",
        "explanation": "La méthode `Where()` permet de filtrer les éléments d'une collection en retournant uniquement ceux qui satisfont une condition spécifiée."
      },
      {
        "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nint[] nombres = { 1, 2, 3 };\nvar result = nombres.Select(x => x * 2);\nforeach (var n in result) Console.Write(n + \" \");\n```",
        "options": [
          "1 2 3",
          "2 4 6",
          "1 4 9",
          "Une exception est levée"
        ],
        "answer": "2 4 6",
        "explanation": "La méthode `Select()` applique la fonction x => x * 2 à chaque élément du tableau, produisant ainsi 2, 4 et 6."
      },
      {
        "question": "Comment gérer une exception spécifique en C# ?",
        "options": [
          "En utilisant un bloc try-catch avec le type d'exception approprié.",
          "En utilisant uniquement un bloc try.",
          "En utilisant un bloc catch sans spécifier le type d'exception.",
          "En utilisant la méthode HandleException()."
        ],
        "answer": "En utilisant un bloc try-catch avec le type d'exception approprié.",
        "explanation": "Pour gérer une exception spécifique, on utilise un bloc try-catch en spécifiant le type d'exception à attraper. Par exemple :\n\n```csharp\ntry {\n    // Code pouvant générer une exception\n} catch (DivideByZeroException ex) {\n    Console.WriteLine(\"Division par zéro.\");\n}\n```"
      },
      {
        "question": "Quel est le rôle du bloc `finally` dans la gestion des exceptions en C# ?",
        "options": [
          "Il s'exécute uniquement si une exception est levée.",
          "Il s'exécute uniquement si aucune exception n'est levée.",
          "Il s'exécute toujours, qu'une exception soit levée ou non.",
          "Il empêche l'exécution du bloc catch."
        ],
        "answer": "Il s'exécute toujours, qu'une exception soit levée ou non.",
        "explanation": "Le bloc `finally` est utilisé pour exécuter du code de nettoyage ou libérer des ressources, indépendamment du fait qu'une exception ait été levée ou non."
      },
      {
        "question": "Quelle est la différence entre `throw` et `throw ex` dans un bloc catch en C# ?",
        "options": [
          "`throw` préserve la pile d'appels originale, tandis que `throw ex` la réinitialise.",
          "`throw` réinitialise la pile d'appels, tandis que `throw ex` la préserve.",
          "Il n'y a aucune différence entre les deux.",
          "`throw ex` est utilisé pour lever une nouvelle exception, tandis que `throw` relance l'exception actuelle."
        ],
        "answer": "`throw` préserve la pile d'appels originale, tandis que `throw ex` la réinitialise.",
        "explanation": "Utiliser `throw` sans spécifier l'exception relance l'exception actuelle en préservant la pile d'appels originale. En revanche, `throw ex` crée une nouvelle exception, réinitialisant la pile d'appels, ce qui peut compliquer le débogage."
      },
      {
        "question": "Quelle est la syntaxe correcte pour écrire un test unitaire avec xUnit en C# ?",
        "options": [
          "[Test] public void TestAddition() { Assert.Equal(5, 2 + 3); }",
          "[Fact] public void TestAddition() { Assert.Equal(5, 2 + 3); }",
          "[TestMethod] public void TestAddition() { Assert.AreEqual(5, 2 + 3); }",
          "[Theory] public void TestAddition() { Assert.Equal(5, 2 + 3); }"
        ],
        "answer": "[Fact] public void TestAddition() { Assert.Equal(5, 2 + 3); }",
        "explanation": "En xUnit, l'attribut `[Fact]` est utilisé pour indiquer une méthode de test sans paramètres. `[Theory]` est utilisé pour des tests paramétrés."
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
          <h4 className="subtitle"> collection-linQ-Error&test ! 🔹 Niveau : {level.toUpperCase()}</h4>

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

