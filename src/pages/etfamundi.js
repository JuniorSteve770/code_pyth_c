import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
    {
        question: "Quelle est la différence entre List<T> et Dictionary<TKey, TValue> ?",
        answer: "List<T> stocke des éléments indexés par leur position, tandis que Dictionary<TKey, TValue> stocke des paires clé-valeur pour un accès rapide via une clé unique."
      },
      {
        question: "Quel est le rôle de LINQ dans C# ?",
        answer: "LINQ (Language Integrated Query) permet d'interroger et transformer des données à partir de collections, de bases de données ou d'autres sources, en utilisant une syntaxe déclarative."
      },
      {
        question: "Donnez un exemple d'utilisation de LINQ pour filtrer une liste.",
        answer: "var nombresPairs = nombres.Where(n => n % 2 == 0); // Filtre les nombres pairs d'une liste."
      },
      {
        question: "Comment gérer une exception spécifique en C# ?",
        answer: "Utilisez un bloc try-catch avec le type d'exception approprié. Exemple : catch (DivideByZeroException ex) { Console.WriteLine(\"Division par zéro.\"); }"
      },
      {
        question: "Quel est le rôle du bloc finally dans la gestion des exceptions ?",
        answer: "Le bloc finally s'exécute toujours, indépendamment de l'occurrence d'une exception, garantissant ainsi la libération des ressources ou l'exécution de code de nettoyage."
      },
      {
        question: "Quelle est la différence entre Debug.Assert et une exception ?",
        answer: "Debug.Assert vérifie une condition pendant le débogage, tandis qu'une exception interrompt l'exécution normale du programme lorsqu'une erreur survient."
      },
      {
        question: "Qu'est-ce qu'un test unitaire et pourquoi est-il important ?",
        answer: "Un test unitaire valide qu'une unité de code fonctionne correctement isolément. Il garantit la fiabilité et facilite la maintenance du code."
      },
      {
        question: "Quelle est la syntaxe pour écrire un test unitaire avec xUnit ?",
        answer: "[Fact] public void TestAddition() { Assert.Equal(5, Calculatrice.Addition(2, 3)); }"
      },
      {
        question: "Quelle est la différence entre [Fact] et [Theory] dans xUnit ?",
        answer: "[Fact] teste un cas unique, tandis que [Theory] teste plusieurs cas avec des données fournies via [InlineData]."
      },
      {
        question: "Comment utiliser LINQ pour trier une collection ?",
        answer: "Utilisez OrderBy ou OrderByDescending. Exemple : var triees = nombres.OrderBy(n => n);"
      },
      {
        question: "Quelle collection utiliseriez-vous pour éviter les doublons dans une liste ?",
        answer: "HashSet<T> est idéal pour stocker des éléments uniques sans doublons."
      },
      {
        question: "Comment ajouter un élément à une Dictionary<TKey, TValue> ?",
        answer: "Utilisez la méthode Add ou l'assignation directe. Exemple : employes.Add(1, \"Alice\"); ou employes[2] = \"Bob\";"
      },
      {
        question: "Quelle est la sortie du code suivant ?\nList<int> nombres = new List<int> { 1, 2, 3 }; nombres.RemoveAt(0); Console.WriteLine(nombres[0]);",
        answer: "2, car RemoveAt(0) supprime le premier élément, et nombres[0] devient 2."
      },
      {
        question: "Quelle est la meilleure pratique pour structurer un projet CRUD en C# ?",
        answer: "Organiser le code par fonctionnalité (ex. dossier 'Produits' contenant les contrôleurs, services et modèles liés aux produits)."
      },
      {
        question: "Quel framework pouvez-vous utiliser pour tester une API RESTful en C# ?",
        answer: "Vous pouvez utiliser des frameworks comme NUnit, xUnit ou MSTest pour tester les endpoints de l'API."
      },
      {
        question: "Comment déboguer efficacement un bug dans Visual Studio ?",
        answer: "Utilisez des points d'arrêt (breakpoints), inspectez les variables avec la fenêtre 'Locals', et utilisez Debug.Assert pour valider des hypothèses."
      },
      {
        question: "Quelle est la différence entre First() et FirstOrDefault() dans LINQ ?",
        answer: "First() lève une exception si aucun élément n'est trouvé, tandis que FirstOrDefault() retourne la valeur par défaut (null ou 0) en cas d'absence d'élément."
      },
      {
        question: "Pourquoi utiliser des tests unitaires dans un projet ?",
        answer: "Les tests unitaires garantissent que chaque composant fonctionne correctement, réduisent les risques de régression et facilitent la maintenance."
      },
      {
        question: "Quelle est la syntaxe pour créer une classe générique en C# ?",
        answer: "public class Boite<T> { public T Contenu { get; set; } }"
      },
      {
        question: "Quelle est la principale utilité des assertions dans le débogage ?",
        answer: "Les assertions permettent de valider des hypothèses sur l'état du programme pendant le développement et le débogage."
      },
      {
          "question": " Qu'est-ce qu'une `List<T>` en C# ?",
          "answer": "Une collection générique qui représente une liste dynamique d'éléments de type T, permettant l'ajout, la suppression et l'accès aux éléments par index."
        },
        {
          "question": " À quoi sert un `Dictionary<TKey, TValue>` ?",
          "answer": "À stocker des paires clé/valeur, offrant un accès rapide aux valeurs via leurs clés uniques."
        },
        {
          "question": " Que permet la méthode LINQ `Where()` ?",
          "answer": "Elle filtre une collection en retournant les éléments qui satisfont une condition spécifiée."
        },
        {
          "question": " Que fait la méthode LINQ `Select()` ?",
          "answer": "Elle projette chaque élément d'une collection dans une nouvelle forme, souvent utilisée pour transformer les données."
        },
        {
          "question": " Comment compter les éléments d'une collection avec LINQ ?",
          "answer": "En utilisant la méthode `Count()`, qui retourne le nombre total d'éléments dans la collection."
        },
        {
          "question": " Quelle est la structure d'un bloc try-catch-finally en C# ?",
          "answer": "```csharp\ntry {\n    // Code pouvant générer une exception\n} catch (Exception ex) {\n    // Gestion de l'exception\n} finally {\n    // Code exécuté dans tous les cas\n}\n```"
        },
        {
          "question": " Comment lever une exception personnalisée ?",
          "answer": "En utilisant le mot-clé `throw` suivi d'une instance d'exception, par exemple : `throw new ArgumentException(\"Message d'erreur\");`"
        },
        {
          "question": " Quel attribut est utilisé pour marquer une méthode de test dans MSTest ?",
          "answer": "`[TestMethod]` est utilisé pour indiquer qu'une méthode est un test unitaire dans MSTest."
        },
        {
          "question": " Quel attribut est utilisé pour marquer une méthode de test dans xUnit ?",
          "answer": "`[Fact]` est utilisé pour indiquer une méthode de test sans paramètres dans xUnit."
        },
        {
          "question": " Comment tester une exception attendue avec xUnit ?",
          "answer": "En utilisant `Assert.Throws<T>(() => méthode())`, où T est le type d'exception attendu."
        },
        {
          "question": " Quelle est la différence entre `[Fact]` et `[Theory]` dans xUnit ?",
          "answer": "`[Fact]` est utilisé pour des tests sans paramètres, tandis que `[Theory]` permet des tests paramétrés avec des données d'entrée variables."
        },
        {
          "question": " Comment marquer une classe de test dans MSTest ?",
          "answer": "En utilisant l'attribut `[TestClass]` au-dessus de la définition de la classe."
        },
        {
          "question": " Quel attribut MSTest est utilisé pour initialiser des ressources avant chaque test ?",
          "answer": "`[TestInitialize]` est utilisé pour exécuter du code avant chaque méthode de test."
        },
        {
          "question": "🧹 Quel attribut MSTest est utilisé pour nettoyer des ressources après chaque test ?",
          "answer": "`[TestCleanup]` est utilisé pour exécuter du code après chaque méthode de test."
        },
        {
          "question": " Comment vérifier qu'une méthode lève une exception spécifique dans MSTest ?",
          "answer": "En utilisant l'attribut `[ExpectedException(typeof(ExceptionType))]` au-dessus de la méthode de test."
        },
        {
          "question": " Comment initialiser des ressources une seule fois pour tous les tests d'une classe dans MSTest ?",
          "answer": "En utilisant l'attribut `[ClassInitialize]` sur une méthode statique qui s'exécute une fois avant tous les tests de la classe."
        },
        {
          "question": " Comment nettoyer des ressources une seule fois après tous les tests d'une classe dans MSTest ?",
          "answer": "En utilisant l'attribut `[ClassCleanup]` sur une méthode statique qui s'exécute une fois après tous les tests de la classe."
        },
        {
          "question": " Comment ignorer un test spécifique dans MSTest ?",
          "answer": "En utilisant l'attribut `[Ignore]` au-dessus de la méthode de test que l'on souhaite ignorer."
        },
        {
          "question": " Comment ignorer un test spécifique dans xUnit ?",
          "answer": "En ajoutant le paramètre `Skip` à l'attribut `[Fact]`, par exemple : `[Fact(Skip = \"Raison\")]`."
        },
        {
          "question": " Comment trier une collection en ordre croissant avec LINQ ?",
          "answer": "En utilisant la méthode `OrderBy()`, par exemple : `collection.OrderBy(x => x.Propriété)`."
        },
        {
            question: "Qu'est-ce qu'une collection générique en C# ?",
            answer: "Une collection générique est une structure de données fortement typée qui peut stocker un nombre variable d'éléments, comme List<T> ou Dictionary<TKey, TValue>."
          },
          {
            question: "Quelle est la différence entre List<T> et Array en C# ?",
            answer: "List<T> est dynamique et peut changer de taille, tandis qu'un Array a une taille fixe définie lors de sa création."
          },
          {
            question: "Comment utiliser LINQ pour filtrer des données dans une liste ?",
            answer: "LINQ permet de filtrer des données à l'aide de méthodes comme Where(). Exemple : var result = list.Where(x => x > 10);"
          },
          {
            question: "Quelle est la syntaxe pour trier une liste avec LINQ ?",
            answer: "Utilisez OrderBy() ou OrderByDescending(). Exemple : var sorted = list.OrderBy(x => x);"
          },
          {
            question: "Qu'est-ce que l'exception DivideByZeroException en C# ?",
            answer: "Une exception levée lorsqu'une division par zéro est tentée dans le code."
          },
          {
            question: "Quel est le rôle du bloc 'finally' dans un try-catch ?",
            answer: "Le bloc 'finally' s'exécute toujours, indépendamment de l'occurrence d'une exception, pour libérer des ressources ou effectuer des nettoyages."
          },
          {
            question: "Quelle est la différence entre throw et throw ex dans un catch ?",
            answer: "throw préserve la pile d'appels originale, tandis que throw ex réinitialise la pile d'appels, ce qui peut rendre le débogage plus difficile."
          },
          {
            question: "Qu'est-ce qu'un test unitaire en C# ?",
            answer: "Un test unitaire vérifie qu'une unité spécifique de code (méthode ou fonction) fonctionne correctement de manière isolée."
          },
          {
            question: "Quelle est la syntaxe pour écrire un test avec xUnit ?",
            answer: "Utilisez [Fact] pour un test simple ou [Theory] avec [InlineData] pour des tests paramétrés. Exemple : [Fact] public void TestAddition() { Assert.Equal(5, 2 + 3); }"
          },
          {
            question: "Quelle est la différence entre MSTest et xUnit ?",
            answer: "MSTest est intégré à Visual Studio, tandis que xUnit est plus moderne et flexible, souvent préféré pour les projets open source."
          },
          {
            question: "Comment déboguer efficacement une application C# ?",
            answer: "Utilisez des points d'arrêt (breakpoints), inspectez les variables, et utilisez Debug.Assert pour valider des hypothèses."
          },
          {
            question: "Quelle est la sortie du code suivant ?\nList<int> nombres = new List<int> { 1, 2, 3 }; nombres.Add(4); Console.WriteLine(nombres.Count);",
            answer: "La sortie est 4, car la méthode Add() ajoute un élément à la liste, augmentant sa taille."
          },
          {
            question: "Quelle est la différence entre Dictionary<TKey, TValue> et HashSet<T> ?",
            answer: "Dictionary stocke des paires clé-valeur, tandis que HashSet stocke des éléments uniques sans doublons."
          },
          {
            question: "Comment supprimer un élément d'un Dictionary<TKey, TValue> ?",
            answer: "Utilisez Remove(key). Exemple : myDictionary.Remove(\"clé\");"
          },
          {
            question: "Quelle est la syntaxe pour interroger une collection avec LINQ en syntaxe de requête ?",
            answer: "Exemple : var result = from item in collection where item > 10 select item;"
          },
          {
            question: "Quelle est la différence entre First() et FirstOrDefault() en LINQ ?",
            answer: "First() lève une exception si aucun élément n'est trouvé, tandis que FirstOrDefault() retourne la valeur par défaut (null ou 0)."
          },
          {
            question: "Quelle est la sortie du code suivant ?\nint[] nombres = { 1, 2, 3 }; var result = nombres.Select(x => x * 2); foreach (var n in result) Console.Write(n + \" \");",
            answer: "La sortie est '2 4 6', car Select() transforme chaque élément en le multipliant par 2."
          },
          {
            question: "Quelle est la différence entre Exception et ApplicationException en C# ?",
            answer: "Exception est la classe de base pour toutes les exceptions, tandis que ApplicationException est une sous-classe spécifique aux exceptions liées à l'application."
          },
          {
            question: "Quelle est la meilleure pratique pour gérer les exceptions dans un programme C# ?",
            answer: "Utiliser des blocs try-catch spécifiques pour chaque type d'exception et éviter les catch généraux (catch (Exception ex)) sauf pour la journalisation finale."
          },
          {
            question: "Quelle est la syntaxe pour créer une classe de test MSTest ?",
            answer: "Ajoutez [TestClass] à la classe et [TestMethod] aux méthodes de test. Exemple : [TestClass] public class Tests { [TestMethod] public void TestMethod() { } }"
          },
          {
            question: "Quelle est la différence entre Assert.AreEqual et Assert.IsTrue ?",
            answer: "Assert.AreEqual vérifie que deux valeurs sont égales, tandis que Assert.IsTrue vérifie qu'une condition booléenne est vraie."
          },
          {
            question: "Comment tester une méthode qui lève une exception en xUnit ?",
            answer: "Utilisez Assert.Throws<T>(). Exemple : Assert.Throws<InvalidOperationException>(() => MaMethode());"
          },
          {
            question: "Quelle est la sortie du code suivant ?\ntry { throw new ArgumentException(\"Erreur\"); } catch (Exception ex) { Console.WriteLine(ex.Message); }",
            answer: "La sortie est 'Erreur', car le message de l'exception est affiché dans le bloc catch."
          },
          {
            question: "Quelle est la différence entre un projet CRUD et un gestionnaire de contacts ?",
            answer: "Un projet CRUD gère des opérations Create, Read, Update, Delete sur des données, tandis qu'un gestionnaire de contacts est un cas particulier de CRUD pour gérer des informations personnelles."
          },
          {
            question: "Quelle est la syntaxe pour ajouter un élément à un HashSet<T> ?",
            answer: "Utilisez Add(). Exemple : myHashSet.Add(\"élément\");"
          },
          {
            question: "Quelle est la sortie du code suivant ?\nDictionary<int, string> dict = new Dictionary<int, string>(); dict.Add(1, \"A\"); dict[1] = \"B\"; Console.WriteLine(dict[1]);",
            answer: "La sortie est 'B', car la valeur associée à la clé 1 est mise à jour."
          }
           
];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [

        {
            "question": "Quelle est la différence entre List<T> et Dictionary<TKey, TValue> ?",
            "options": [
                "List<T> stocke des paires clé-valeur, Dictionary<TKey, TValue> des éléments indexés",
                "List<T> stocke des éléments indexés par position, Dictionary<TKey, TValue> des paires clé-valeur pour accès rapide",
                "List<T> est immuable, Dictionary<TKey, TValue> est mutable",
                "Aucune différence, ils fonctionnent de la même manière"
            ],
            "answer": "List<T> stocke des éléments indexés par position, Dictionary<TKey, TValue> des paires clé-valeur pour accès rapide",
            "explanation": "List<T> est une collection ordonnée accessible par index, tandis que Dictionary<TKey, TValue> permet un accès rapide aux valeurs via des clés uniques."
        },
        {
            "question": "Que fait ce code LINQ ?\nvar result = numbers.Where(n => n > 5).OrderBy(n => n);",
            "options": [
                "Supprime les nombres supérieurs à 5",
                "Filtre les nombres > 5 et les trie par ordre croissant",
                "Compte le nombre d'éléments > 5",
                "Convertit les nombres en chaînes de caractères"
            ],
            "answer": "Filtre les nombres > 5 et les trie par ordre croissant",
            "explanation": "Where() filtre les éléments selon la condition, et OrderBy() les trie en ordre croissant."
        },
        {
            "question": "Comment gérer correctement une DivideByZeroException ?",
            "options": [
                "Ignorer l'exception",
                "Utiliser un bloc try-catch spécifique",
                "Désactiver les exceptions dans les paramètres du projet",
                "Toujours utiliser finally sans catch"
            ],
            "answer": "Utiliser un bloc try-catch spécifique",
            "explanation": "Il est recommandé d'attraper les exceptions spécifiques plutôt que la classe Exception de base."
        },
        {
            "question": "Quel est le résultat de ce code ?\ntry {\n    int x = 0;\n    int y = 10 / x;\n}\ncatch (DivideByZeroException ex) {\n    Console.WriteLine(\"Erreur\");\n}\nfinally {\n    Console.WriteLine(\"Fini\");\n}",
            "options": [
                "Erreur\nFini",
                "Fini",
                "Erreur",
                "Le code ne compile pas"
            ],
            "answer": "Erreur\nFini",
            "explanation": "Le bloc catch gère l'exception, et finally s'exécute toujours."
        },
        {
            "question": "Quelle est la différence entre [Fact] et [Theory] dans xUnit ?",
            "options": [
                "[Fact] est pour les tests asynchrones, [Theory] pour les tests synchrones",
                "[Fact] teste un cas unique, [Theory] permet des tests paramétrés",
                "[Fact] est obsolète, il faut toujours utiliser [Theory]",
                "Aucune différence, ils sont interchangeables"
            ],
            "answer": "[Fact] teste un cas unique, [Theory] permet des tests paramétrés",
            "explanation": "[Fact] est pour des tests simples, [Theory] permet d'utiliser [InlineData] pour tester plusieurs jeux de données."
        },
        {
            "question": "Que fait ce code avec Dictionary ?\nvar dict = new Dictionary<int, string>();\ndict.Add(1, \"Un\");\ndict[2] = \"Deux\";\nConsole.WriteLine(dict[1]);",
            "options": [
                "Affiche \"Un\"",
                "Affiche \"Deux\"",
                "Lève une KeyNotFoundException",
                "Affiche \"1\""
            ],
            "answer": "Affiche \"Un\"",
            "explanation": "dict[1] retourne la valeur associée à la clé 1, qui est \"Un\"."
        },
        {
            "question": "Quelle collection utiliser pour garantir l'unicité des éléments ?",
            "options": [
                "List<T>",
                "Array",
                "HashSet<T>",
                "Dictionary<TKey, TValue>"
            ],
            "answer": "HashSet<T>",
            "explanation": "HashSet<T> ne permet pas les doublons, contrairement à List<T>."
        },
        {
            "question": "Que fait ce test xUnit ?\n[Theory]\n[InlineData(2, 2, 4)]\n[InlineData(3, 5, 8)]\npublic void TestAddition(int a, int b, int expected) {\n    Assert.Equal(expected, a + b);\n}",
            "options": [
                "Teste une seule addition",
                "Teste plusieurs cas d'addition avec différentes valeurs",
                "Teste la concaténation de chaînes",
                "Teste la gestion des exceptions"
            ],
            "answer": "Teste plusieurs cas d'addition avec différentes valeurs",
            "explanation": "[Theory] avec [InlineData] permet de tester plusieurs jeux de paramètres."
        },
        {
            "question": "Quelle est la sortie de ce code ?\nList<int> list = new List<int> { 1, 2, 3 };\nlist.RemoveAt(1);\nConsole.WriteLine(list[1]);",
            "options": [
                "1",
                "2",
                "3",
                "Erreur IndexOutOfRangeException"
            ],
            "answer": "3",
            "explanation": "RemoveAt(1) supprime l'élément à l'index 1 (valeur 2), laissant [1, 3]. list[1] vaut donc 3."
        },
        {
            "question": "Comment trier une List<string> par ordre alphabétique inverse ?",
            "options": [
                "list.Sort((a, b) => b.CompareTo(a));",
                "list.OrderBy(x => x);",
                "list.Reverse();",
                "list.Sort().Reverse();"
            ],
            "answer": "list.Sort((a, b) => b.CompareTo(a));",
            "explanation": "CompareTo avec b en premier paramètre effectue un tri décroissant."
        },
        {
            "question": "Quelle est la meilleure pratique pour gérer les ressources dans un bloc try-catch ?",
            "options": [
                "Utiliser using pour les objets IDisposable",
                "Ne pas gérer les ressources",
                "Toujours utiliser finally sans using",
                "Désactiver le garbage collector"
            ],
            "answer": "Utiliser using pour les objets IDisposable",
            "explanation": "using garantit l'appel à Dispose() même en cas d'exception."
        },
        {
            "question": "Que fait FirstOrDefault() si aucun élément ne correspond au filtre ?",
            "options": [
                "Lève une exception",
                "Retourne null (ou default(T))",
                "Crée un nouvel élément",
                "Retourne le premier élément de la collection"
            ],
            "answer": "Retourne null (ou default(T))",
            "explanation": "Contrairement à First(), FirstOrDefault() retourne la valeur par défaut plutôt que de lever une exception."
        },
        {
            "question": "Comment tester qu'une méthode lève une exception spécifique en MSTest ?",
            "options": [
                "[ExpectedException(typeof(InvalidOperationException))]",
                "try-catch avec Assert.Fail()",
                "Assert.ThrowsException<InvalidOperationException>()",
                "Les deux premières réponses"
            ],
            "answer": "Les deux premières réponses",
            "explanation": "MSTest supporte les deux méthodes (attribut et méthode Assert)."
        },
        {
            "question": "Quelle est la différence entre OrderBy() et ThenBy() en LINQ ?",
            "options": [
                "OrderBy() est pour le tri principal, ThenBy() pour les tris secondaires",
                "ThenBy() est obsolète",
                "OrderBy() fonctionne seulement sur les nombres",
                "Aucune différence"
            ],
            "answer": "OrderBy() est pour le tri principal, ThenBy() pour les tris secondaires",
            "explanation": "ThenBy() s'utilise après OrderBy() pour des tris multiples."
        },
        {
            "question": "Que fait ce code avec HashSet ?\nvar set = new HashSet<int> { 1, 2, 2, 3 };\nConsole.WriteLine(set.Count);",
            "options": [
                "3",
                "4",
                "1",
                "Erreur de compilation"
            ],
            "answer": "3",
            "explanation": "HashSet élimine automatiquement les doublons (ici, la valeur 2)."
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

