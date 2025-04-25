import React, { useState, useEffect } from "react";
import "./QCMStyles.css";

// Flashcards pour le niveau basic
const basicSlides = [
  {
    "question": "Qu'est-ce qu'un délégué en C# ?",
    "answer": "Un délégué est un type qui représente une référence vers une méthode. Il permet de passer des méthodes en tant que paramètres ou de les stocker pour une exécution ultérieure."
  },
  {
    "question": "Exemple de délégué en C#.",
    "answer": "public delegate void MonDelegate(string message); public static void AfficherMessage(string message) { Console.WriteLine($\"Message : {message}\"); } MonDelegate delegue = new MonDelegate(AfficherMessage); delegue(\"Bonjour !\");"
  },
  {
    "question": "Qu'est-ce qu'un événement en C# ?",
    "answer": "Un événement est basé sur un délégué et permet de notifier des actions ou des changements dans une application."
  },
  {
    "question": "Exemple d'événement en C#.",
    "answer": "public class Bouton { public event Action<string> OnClic; public void Clic() { OnClic?.Invoke(\"Bouton cliqué !\"); } } Bouton bouton = new Bouton(); bouton.OnClic += message => Console.WriteLine(message); bouton.Clic();"
  },
  {
    "question": "Qu'est-ce qu'une méthode d'extension en C# ?",
    "answer": "Une méthode d'extension permet d'ajouter des fonctionnalités à des types existants sans modifier leur code source."
  },
  {
    "question": "Exemple de méthode d'extension en C#.",
    "answer": "public static class StringExtensions { public static bool EstPalindrome(this string str) { return str.SequenceEqual(str.Reverse()); } } string mot = \"radar\"; Console.WriteLine(mot.EstPalindrome()); // True"
  },
  {
    "question": "Qu'est-ce qu'un tuple en C# ?",
    "answer": "Un tuple permet de regrouper plusieurs valeurs dans une seule structure légère."
  },
  {
    "question": "Exemple de tuple en C#.",
    "answer": "var personne = (Nom: \"Alice\", Age: 30); Console.WriteLine($\"{personne.Nom} a {personne.Age} ans.\");"
  },
  {
    "question": "Qu'est-ce qu'une expression régulière en C# ?",
    "answer": "Une expression régulière permet de rechercher, valider ou manipuler des chaînes de caractères complexes."
  },
  {
    "question": "Exemple d'expression régulière en C#.",
    "answer": "string texte = \"Mon numéro est 123-456-7890.\"; Regex regex = new Regex(@\"\\d{3}-\\d{3}-\\d{4}\"); Match match = regex.Match(texte); if (match.Success) { Console.WriteLine($\"Numéro trouvé : {match.Value}\"); }"
  },
  {
    "question": "Qu'est-ce que la programmation asynchrone en C# ?",
    "answer": "La programmation asynchrone permet d'exécuter des tâches longues sans bloquer le thread principal, grâce aux mots-clés async et await."
  },
  {
    "question": "Exemple de programmation asynchrone en C#.",
    "answer": "public static async Task Main() { Console.WriteLine(\"Début du traitement...\"); await Task.Delay(2000); // Simule un délai de 2 secondes Console.WriteLine(\"Traitement terminé !\"); }"
  },
  {
    "question": "Qu'est-ce que WinForms en C# ?",
    "answer": "WinForms est une technologie pour créer des interfaces graphiques simples et interactives."
  },
  {
    "question": "Exemple de WinForms en C#.",
    "answer": "public class Fenetre : Form { public Fenetre() { this.Text = \"Mon Application WinForms\"; Button btn = new Button { Text = \"Cliquez-moi\" }; btn.Click += (sender, e) => MessageBox.Show(\"Bouton cliqué !\"); this.Controls.Add(btn); } } [STAThread] public static void Main() { Application.Run(new Fenetre()); }"
  },
  {
    "question": "Qu'est-ce que WPF en C# ?",
    "answer": "WPF (Windows Presentation Foundation) est une technologie moderne pour créer des interfaces graphiques riches et interactives."
  },
  {
    "question": "Exemple de WPF en C#.",
    "answer": "<Window x:Class=\"WpfApp.MainWindow\" xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\" xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\" Title=\"Mon Application WPF\" Height=\"200\" Width=\"400\"> <Grid> <Button Content=\"Cliquez-moi\" HorizontalAlignment=\"Center\" VerticalAlignment=\"Center\" Click=\"Button_Click\"/> </Grid> </Window> private void Button_Click(object sender, RoutedEventArgs e) { MessageBox.Show(\"Bouton cliqué !\"); }"
  },
  {
    "question": "Comment créer une API REST avec ASP.NET Core ?",
    "answer": "ASP.NET Core permet de créer des API RESTful pour exposer des services web via des contrôleurs et des routes."
  },
  {
    "question": "Exemple d'API REST avec ASP.NET Core.",
    "answer": "[ApiController] [Route(\"api/[controller]\")] public class ProduitsController : ControllerBase { private static List<string> produits = new List<string> { \"Livre\", \"Stylo\", \"Cahier\" }; [HttpGet] public IActionResult Get() { return Ok(produits); } [HttpPost] public IActionResult Post([FromBody] string produit) { produits.Add(produit); return Created(\"\", produit); } }"
  },
  {
    "question": "Qu'est-ce qu'ADO.NET ?",
    "answer": "ADO.NET permet d'interagir directement avec une base de données via des requêtes SQL."
  },
  {
    "question": "Exemple d'accès à une base de données avec ADO.NET.",
    "answer": "string connectionString = \"Server=.;Database=MaBase;Trusted_Connection=True;\"; using (SqlConnection connection = new SqlConnection(connectionString)) { connection.Open(); SqlCommand command = new SqlCommand(\"SELECT * FROM Produits\", connection); SqlDataReader reader = command.ExecuteReader(); while (reader.Read()) { Console.WriteLine(reader[\"Nom\"]); } }"
  },
  {
    "question": "Qu'est-ce que LINQ to SQL ?",
    "answer": "LINQ to SQL permet d'interroger une base de données avec LINQ, simplifiant l'accès aux données."
  },
  {
    "question": "Exemple d'utilisation de LINQ to SQL.",
    "answer": "var produits = from p in dbContext.Produits where p.Prix > 100 select p; foreach (var produit in produits) { Console.WriteLine(produit.Nom); }"
  },
  {
    "question": "Qu'est-ce qu'Entity Framework ?",
    "answer": "Entity Framework est un ORM (Object-Relational Mapping) qui simplifie l'accès aux données en mappant des objets C# à des tables de base de données."
  },
  {
    "question": "Exemple d'utilisation d'Entity Framework.",
    "answer": "public class ApplicationContext : DbContext { public DbSet<Produit> Produits { get; set; } } public class Produit { public int Id { get; set; } public string Nom { get; set; } public decimal Prix { get; set; } } using (var context = new ApplicationContext()) { var produit = new Produit { Nom = \"Livre\", Prix = 50 }; context.Produits.Add(produit); context.SaveChanges(); }"
  },
  {
    "question": "Comment structurer un projet complet en C# ?",
    "answer": "Un projet complet inclut des fonctionnalités CRUD, une gestion des entrées/sorties, des tests unitaires, une documentation, et peut être une application desktop, web ou API."
  },
  {
    "question": "Exemple de structure d'un projet ASP.NET Core avec Entity Framework.",
    "answer": "[ApiController] [Route(\"api/[controller]\")] public class UtilisateursController : ControllerBase { private readonly ApplicationDbContext _context; public UtilisateursController(ApplicationDbContext context) { _context = context; } [HttpGet] public IActionResult Get() { return Ok(_context.Utilisateurs.ToList()); } [HttpPost] public IActionResult Post(Utilisateur utilisateur) { _context.Utilisateurs.Add(utilisateur); _context.SaveChanges(); return Created(\"\", utilisateur); } }"
  },
  {
    "point_pertinent": "Utilisation des délégués en C#",
    "answer": "Les délégués sont des types qui représentent des références à des méthodes avec une signature spécifique. Ils permettent de passer des méthodes comme arguments ou de les assigner à des variables. Exemple :\n\n```csharp\ndelegate int Operation(int x, int y);\nOperation addition = (a, b) => a + b;\nint resultat = addition(3, 4); // resultat vaut 7\n```"
  },
  {
    "point_pertinent": "Gestion des événements avec des délégués",
    "answer": "Les événements en C# utilisent des délégués pour notifier les abonnés lorsqu'une action se produit. Exemple :\n\n```csharp\npublic event EventHandler MonEvenement;\n\nprotected virtual void OnMonEvenement()\n{\n    MonEvenement?.Invoke(this, EventArgs.Empty);\n}\n```"
  },
  {
    "point_pertinent": "Méthodes d'extension",
    "answer": "Les méthodes d'extension permettent d'ajouter de nouvelles méthodes à des types existants sans modifier leur définition. Exemple :\n\n```csharp\npublic static class Extensions\n{\n    public static bool EstPair(this int nombre)\n    {\n        return nombre % 2 == 0;\n    }\n}\n\nint x = 4;\nbool estPair = x.EstPair(); // estPair vaut true\n```"
  },
  {
    "point_pertinent": "Utilisation des tuples",
    "answer": "Les tuples permettent de regrouper plusieurs valeurs dans une seule structure. Exemple :\n\n```csharp\n(string nom, int age) personne = (\"Alice\", 30);\nConsole.WriteLine($\"Nom: {personne.nom}, Âge: {personne.age}\");\n```"
  },
  {
    "point_pertinent": "Expressions régulières en C#",
    "answer": "Les expressions régulières sont utilisées pour rechercher des motifs dans des chaînes de caractères. Exemple :\n\n```csharp\nusing System.Text.RegularExpressions;\n\nstring texte = \"Mon email est exemple@domaine.com\";\nbool contientEmail = Regex.IsMatch(texte, @\"\\w+@\\w+\\.\\w+\"); // contientEmail vaut true\n```"
  },
  {
    "point_pertinent": "Programmation asynchrone avec async/await",
    "answer": "Les mots-clés async et await permettent d'écrire du code asynchrone de manière plus lisible. Exemple :\n\n```csharp\npublic async Task<string> ObtenirDonneesAsync()\n{\n    using HttpClient client = new HttpClient();\n    string resultat = await client.GetStringAsync(\"https://exemple.com\");\n    return resultat;\n}\n```"
  },
  {
    "point_pertinent": "Création d'une interface graphique avec WinForms",
    "answer": "WinForms permet de créer des applications Windows avec une interface utilisateur graphique. Exemple :\n\n```csharp\nusing System.Windows.Forms;\n\npublic class MonFormulaire : Form\n{\n    public MonFormulaire()\n    {\n        Text = \"Mon Application\";\n    }\n}\n\nApplication.Run(new MonFormulaire());\n```"
  },
  {
    "point_pertinent": "Création d'une interface graphique avec WPF",
    "answer": "WPF (Windows Presentation Foundation) permet de créer des interfaces utilisateur riches en utilisant XAML. Exemple :\n\n```xaml\n<Window x:Class=\"MonApplication.MainWindow\"\n        xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"\n        Title=\"Mon Application\" Height=\"350\" Width=\"525\">\n    <Grid>\n        <Button Content=\"Cliquez-moi\" Width=\"100\" Height=\"30\" />\n    </Grid>\n</Window>\n```"
  },
  {
    "point_pertinent": "Développement d'une API REST avec ASP.NET",
    "answer": "ASP.NET permet de créer des API RESTful pour exposer des services web. Exemple :\n\n```csharp\n[ApiController]\n[Route(\"api/[controller]\")]\npublic class ProduitsController : ControllerBase\n{\n    [HttpGet]\n    public IEnumerable<string> Get()\n    {\n        return new string[] { \"Produit1\", \"Produit2\" };\n    }\n}\n```"
  },
  {
    "point_pertinent": "Accès aux données avec ADO.NET",
    "answer": "ADO.NET fournit des classes pour interagir avec des bases de données relationnelles. Exemple :\n\n```csharp\nusing System.Data.SqlClient;\n\nstring connectionString = \"...\";\nusing SqlConnection connexion = new SqlConnection(connectionString);\nconnexion.Open();\nSqlCommand commande = new SqlCommand(\"SELECT * FROM Clients\", connexion);\nSqlDataReader lecteur = commande.ExecuteReader();\nwhile (lecteur.Read())\n{\n    Console.WriteLine(lecteur[\"Nom\"]);\n}\n```"
  },
  {
    "point_pertinent": "Utilisation de LINQ to SQL",
    "answer": "LINQ to SQL permet de mapper des classes C# à des tables SQL et de requêter la base de données en utilisant LINQ. Exemple :\n\n```csharp\nDataContext contexte = new DataContext(\"...\");\nTable<Client> clients = contexte.GetTable<Client>();\nvar resultat = from c in clients where c.Ville == \"Paris\" select c;\n```"
  },
  {
    "point_pertinent": "Utilisation d'Entity Framework",
    "answer": "Entity Framework est un ORM qui permet de travailler avec des bases de données en utilisant des objets C#. Exemple :\n\n```csharp\nusing (var contexte = new MonContexte())\n{\n    var clients = contexte.Clients.Where(c => c.Ville == \"Paris\").ToList();\n}\n```"
  },
  {
    "point_pertinent": "Réalisation d'un projet complet avec gestion des entrées/sorties",
    "answer": "Un projet complet en C# peut inclure la lecture et l'écriture de fichiers, la gestion des entrées utilisateur, et la persistance des données. Exemple :\n\n```csharp\nstring chemin = \"donnees.txt\";\nFile.WriteAllText(chemin, \"Bonjour le monde\");\nstring contenu = File.ReadAllText(chemin);\nConsole.WriteLine(contenu);\n```"
  }
];

// QCM pour les niveaux moyen et avancé
const questions = {
  moyen: [
    {
      "question": "Quelle est la complexité temporelle d'un algorithme qui parcourt un tableau de taille n deux fois ?",
      "options": [
          "O(n)",
          "O(n²)",
          "O(2n)",
          "O(log n)"
      ],
      "answer": "O(n)",
      "explanation": "Bien que le tableau soit parcouru deux fois, cela reste linéaire par rapport à la taille des données. Les constantes comme '2' sont ignorées dans la notation Big-O."
  },
  {
      "question": "Quelle est la différence entre List<T> et Array en C# ?",
      "options": [
          "List<T> est immuable, Array est mutable.",
          "List<T> a une taille fixe, Array peut changer de taille.",
          "List<T> peut changer de taille, Array a une taille fixe.",
          "Aucune différence, elles sont interchangeables."
      ],
      "answer": "List<T> peut changer de taille, Array a une taille fixe.",
      "explanation": "List<T> est une collection dynamique qui peut être redimensionnée, tandis qu'un Array a une taille fixe définie lors de sa création."
  },
  {
      "question": "Quelle méthode LINQ permet de filtrer des éléments d'une collection ?",
      "options": [
          "Where()",
          "Select()",
          "OrderBy()",
          "GroupBy()"
      ],
      "answer": "Where()",
      "explanation": "La méthode Where() est utilisée pour filtrer les éléments d'une collection en fonction d'une condition spécifiée."
  },
  {
      "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nint[] nombres = { 1, 2, 3, 4, 5 };\nvar result = nombres.Where(n => n % 2 == 0);\nforeach (var n in result) Console.Write(n + \" \");```",
      "options": [
          "1 2 3 4 5",
          "2 4",
          "1 3 5",
          "Erreur de compilation"
      ],
      "answer": "2 4",
      "explanation": "La méthode Where() filtre les nombres pairs (divisibles par 2), donc la sortie est '2 4'."
  },
  {
      "question": "Quel mot-clé est utilisé pour déclarer un délégué en C# ?",
      "options": [
          "delegate",
          "event",
          "async",
          "await"
      ],
      "answer": "delegate",
      "explanation": "Le mot-clé 'delegate' est utilisé pour déclarer un délégué, qui représente une référence vers une méthode."
  },
  {
      "question": "Quelle est la principale utilité des événements en C# ?",
      "options": [
          "Stocker des données dans une base.",
          "Notifier des actions ou des changements dans une application.",
          "Exécuter des tâches asynchrones.",
          "Manipuler des chaînes de caractères."
      ],
      "answer": "Notifier des actions ou des changements dans une application.",
      "explanation": "Les événements permettent de notifier des actions ou des changements dans une application, souvent utilisés dans les interfaces graphiques."
  },
  {
      "question": "Quelle est la syntaxe correcte pour créer un tuple en C# ?",
      "options": [
          "var tuple = (Nom: \"Alice\", Age: 30);",
          "var tuple = new Tuple<string, int>(\"Alice\", 30);",
          "var tuple = Tuple.Create(\"Alice\", 30);",
          "Toutes les réponses ci-dessus."
      ],
      "answer": "Toutes les réponses ci-dessus.",
      "explanation": "En C#, vous pouvez créer des tuples avec une syntaxe simplifiée (nommée), avec Tuple.Create, ou en utilisant le constructeur Tuple."
  },
  {
      "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nvar personne = (Nom: \"Alice\", Age: 30);\nConsole.WriteLine(personne.Nom);```",
      "options": [
          "Alice",
          "30",
          "(Alice, 30)",
          "Erreur de compilation"
      ],
      "answer": "Alice",
      "explanation": "Le tuple nommé permet d'accéder aux valeurs via leurs noms de propriétés, donc 'personne.Nom' affiche 'Alice'."
  },
  {
      "question": "Quel mot-clé est utilisé pour exécuter une tâche asynchrone en C# ?",
      "options": [
          "async",
          "await",
          "task",
          "run"
      ],
      "answer": "async",
      "explanation": "Le mot-clé 'async' est utilisé pour marquer une méthode comme asynchrone, permettant l'utilisation de 'await' pour attendre des tâches asynchrones."
  },
  {
      "question": "Quelle est la sortie du code suivant ?\n\n```csharp\npublic static async Task Main() {\n    Console.WriteLine(\"Début\");\n    await Task.Delay(1000);\n    Console.WriteLine(\"Fin\");\n}```",
      "options": [
          "Début Fin",
          "Fin Début",
          "Début (pause de 1 seconde) Fin",
          "Erreur de compilation"
      ],
      "answer": "Début (pause de 1 seconde) Fin",
      "explanation": "La méthode Main() affiche 'Début', attend 1 seconde avec Task.Delay, puis affiche 'Fin'."
  },
  {
      "question": "Quelle technologie est utilisée pour créer des interfaces graphiques modernes en C# ?",
      "options": [
          "WinForms",
          "WPF",
          "Console",
          "ASP.NET"
      ],
      "answer": "WPF",
      "explanation": "WPF (Windows Presentation Foundation) est une technologie moderne pour créer des interfaces graphiques riches et interactives."
  },
  {
      "question": "Quelle est la principale utilité d'Entity Framework en C# ?",
      "options": [
          "Gérer les threads.",
          "Simplifier l'accès aux bases de données.",
          "Créer des interfaces graphiques.",
          "Exécuter des tâches asynchrones."
      ],
      "answer": "Simplifier l'accès aux bases de données.",
      "explanation": "Entity Framework est un ORM (Object-Relational Mapping) qui simplifie l'accès aux bases de données en mappant des objets C# à des tables de base de données."
  },
  {
      "question": "Quelle est la différence entre First() et FirstOrDefault() en LINQ ?",
      "options": [
          "First() lève une exception si aucun élément n'est trouvé, FirstOrDefault() retourne la valeur par défaut.",
          "FirstOrDefault() lève une exception, First() ne lève pas d'exception.",
          "Aucune différence.",
          "First() est utilisé uniquement avec les tableaux."
      ],
      "answer": "First() lève une exception si aucun élément n'est trouvé, FirstOrDefault() retourne la valeur par défaut.",
      "explanation": "First() lève une InvalidOperationException si aucun élément ne correspond, tandis que FirstOrDefault() retourne la valeur par défaut (null ou 0)."
  },
  {
      "question": "Quelle est la sortie du code suivant ?\n\n```csharp\nstring texte = \"Mon numéro est 123-456-7890.\";\nRegex regex = new Regex(@\"\\d{3}-\\d{3}-\\d{4}\");\nMatch match = regex.Match(texte);\nif (match.Success) Console.WriteLine(match.Value);```",
      "options": [
          "123-456-7890",
          "Mon numéro est",
          "Erreur de compilation",
          "Aucune sortie"
      ],
      "answer": "123-456-7890",
      "explanation": "L'expression régulière recherche un numéro de téléphone au format XXX-XXX-XXXX, donc la sortie est '123-456-7890'."
  },
  {
      "question": "Quelle est la principale utilité des tests unitaires en C# ?",
      "options": [
          "Valider chaque composant individuellement.",
          "Interroger une base de données.",
          "Créer des interfaces graphiques.",
          "Exécuter des tâches asynchrones."
      ],
      "answer": "Valider chaque composant individuellement.",
      "explanation": "Les tests unitaires permettent de vérifier qu'une unité spécifique de code (méthode ou fonction) fonctionne correctement de manière isolée."
  }
  ],
  avance: [
    {
      "question": "Quel est le rôle principal d'un délégué en C# ?",
      "options": [
        "Stocker des données",
        "Référencer une méthode avec une signature spécifique",
        "Créer une nouvelle classe",
        "Gérer les exceptions"
      ],
      "answer": "Référencer une méthode avec une signature spécifique",
      "explanation": "Un délégué est un type qui référence une méthode avec une signature donnée, permettant de passer des méthodes comme arguments ou de les assigner à des variables."
    },
    {
      "question": "Comment déclare-t-on une méthode d'extension en C# ?",
      "options": [
        "En utilisant le mot-clé 'extend'",
        "En définissant une méthode statique dans une classe statique avec le mot-clé 'this' devant le premier paramètre",
        "En héritant de la classe à étendre",
        "En utilisant des interfaces"
      ],
      "answer": "En définissant une méthode statique dans une classe statique avec le mot-clé 'this' devant le premier paramètre",
      "explanation": "Les méthodes d'extension sont des méthodes statiques définies dans des classes statiques, où le premier paramètre est précédé du mot-clé 'this' pour indiquer le type à étendre."
    },
    {
      "question": "Quelle est la sortie du code suivant ?\n\n```csharp\n(int, int) tuple = (5, 10);\nConsole.WriteLine(tuple.Item1 + tuple.Item2);\n```",
      "options": [
        "15",
        "510",
        "Erreur de compilation",
        "0"
      ],
      "answer": "15",
      "explanation": "Le tuple contient deux entiers, 5 et 10. La somme de tuple.Item1 et tuple.Item2 est 15."
    },
    {
      "question": "Quel est l'avantage principal de l'utilisation de async/await en C# ?",
      "options": [
        "Améliorer la sécurité du code",
        "Simplifier l'écriture de code asynchrone en le rendant plus lisible",
        "Augmenter la vitesse d'exécution du code",
        "Permettre l'héritage multiple"
      ],
      "answer": "Simplifier l'écriture de code asynchrone en le rendant plus lisible",
      "explanation": "Les mots-clés async et await permettent d'écrire du code asynchrone de manière plus lisible et maintenable, en évitant les callbacks complexes."
    },
    {
      "question": "Quelle technologie est un ORM complet pour gérer les données en C# ?",
      "options": [
        "ADO.NET",
        "Entity Framework",
        "LINQ",
        "Dapper"
      ],
      "answer": "Entity Framework",
      "explanation": "Entity Framework est un ORM (Object-Relational Mapper) complet qui facilite la gestion des données en mappant les objets C# aux tables de la base de données."
    },
    {
      "question": "Quel est le rôle d'un délégué en C# ?",
      "options": [
        "Il permet de définir une méthode abstraite.",
        "Il représente une référence à une méthode.",
        "Il est utilisé pour créer des classes génériques.",
        "Il sert à gérer les exceptions."
      ],
      "answer": "Il représente une référence à une méthode.",
      "explanation": "Un délégué est un type qui représente une référence à une méthode avec une signature spécifique, permettant de passer des méthodes en tant que paramètres."
    },
    {
      "question": "Comment déclare-t-on un événement en C# ?",
      "options": [
        "public delegate void MonEvenement();",
        "public event EventHandler MonEvenement;",
        "public void event MonEvenement();",
        "event public EventHandler MonEvenement;"
      ],
      "answer": "public event EventHandler MonEvenement;",
      "explanation": "La déclaration correcte d'un événement utilise le mot-clé 'event' suivi du type de délégué, généralement 'EventHandler'."
    },
    {
      "question": "Quelle est la syntaxe correcte pour une méthode d'extension ?",
      "options": [
        "public static void MaMethode(this string s) {}",
        "public void MaMethode(string s) {}",
        "static void MaMethode(this string s) {}",
        "public static void MaMethode(string s) {}"
      ],
      "answer": "public static void MaMethode(this string s) {}",
      "explanation": "Une méthode d'extension doit être une méthode statique dans une classe statique, avec le premier paramètre précédé du mot-clé 'this'."
    },
    {
      "question": "Comment déclare-t-on un tuple en C# ?",
      "options": [
        "var monTuple = (\"texte\", 123);",
        "Tuple monTuple = (\"texte\", 123);",
        "var monTuple = Tuple(\"texte\", 123);",
        "tuple monTuple = [\"texte\", 123];"
      ],
      "answer": "var monTuple = (\"texte\", 123);",
      "explanation": "Depuis C# 7.0, on peut déclarer un tuple en utilisant la syntaxe '(valeur1, valeur2)'."
    },
    {
      "question": "Quel est le rôle des expressions régulières en C# ?",
      "options": [
        "Elles permettent de gérer les exceptions.",
        "Elles servent à effectuer des opérations mathématiques.",
        "Elles permettent de valider et de manipuler des chaînes de caractères.",
        "Elles sont utilisées pour créer des interfaces graphiques."
      ],
      "answer": "Elles permettent de valider et de manipuler des chaînes de caractères.",
      "explanation": "Les expressions régulières sont utilisées pour rechercher, valider et manipuler des motifs spécifiques dans des chaînes de caractères."
    },
    {
      "question": "Quelle est la fonction de 'async' et 'await' en C# ?",
      "options": [
        "Ils permettent de définir des classes abstraites.",
        "Ils sont utilisés pour la gestion des exceptions.",
        "Ils facilitent la programmation asynchrone en permettant d'attendre des tâches sans bloquer le thread principal.",
        "Ils servent à créer des interfaces graphiques."
      ],
      "answer": "Ils facilitent la programmation asynchrone en permettant d'attendre des tâches sans bloquer le thread principal.",
      "explanation": "Les mots-clés 'async' et 'await' permettent d'écrire du code asynchrone de manière plus lisible, en évitant de bloquer le thread principal pendant l'attente de tâches longues."
    },
    {
      "question": "Quelle technologie utiliseriez-vous pour créer une interface graphique en C# ?",
      "options": [
        "ASP.NET Core",
        "Entity Framework",
        "WinForms ou WPF",
        "LINQ to SQL"
      ],
      "answer": "WinForms ou WPF",
      "explanation": "WinForms et WPF sont des technologies de Microsoft pour créer des interfaces graphiques desktop en C#."
    },
    {
      "question": "Quel framework est utilisé pour développer des API REST en C# ?",
      "options": [
        "WinForms",
        "WPF",
        "ASP.NET Web API",
        "Entity Framework"
      ],
      "answer": "ASP.NET Web API",
      "explanation": "ASP.NET Web API est un framework permettant de créer des services HTTP accessibles via des API RESTful."
    },
    {
      "question": "Quelle est la principale différence entre ADO.NET et Entity Framework ?",
      "options": [
        "ADO.NET est un ORM, tandis qu'Entity Framework ne l'est pas.",
        "Entity Framework est un ORM qui simplifie l'accès aux données, tandis qu'ADO.NET nécessite plus de code manuel.",
        "ADO.NET est utilisé uniquement pour les bases de données NoSQL.",
        "Entity Framework ne prend pas en charge les bases de données relationnelles."
      ],
      "answer": "Entity Framework est un ORM qui simplifie l'accès aux données, tandis qu'ADO.NET nécessite plus de code manuel.",
      "explanation": "Entity Framework est un ORM (Object-Relational Mapping) qui permet de travailler avec des bases de données en utilisant des objets .NET, réduisant ainsi le besoin de code SQL manuel requis avec ADO.NET."
    },
    {
      "question": "Comment effectuer une requête LINQ pour sélectionner tous les clients dont le nom commence par 'A' ?",
      "options": [
        "var result = clients.Where(c => c.Name.StartsWith(\"A\"));",
        "var result = clients.Select(c => c.Name == \"A\");",
        "var result = clients.FindAll(c => c.Name == \"A\");",
        "var result = clients.Get(c => c.Name.StartsWith(\"A\"));"
      ],
      "answer": "var result = clients.Where(c => c.Name.StartsWith(\"A\"));",
      "explanation": "La méthode 'Where' de LINQ permet de filtrer les éléments d'une collection en fonction d'une condition spécifiée."
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


