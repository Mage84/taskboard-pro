# TaskboardPro

## Séquence 1 : création du projet
### Commands
Install angular : npm install @angular/cli@19.2.19 (@your.version.number is optional)
Create project : npm new Taskboard_pro
Create comp : ng g c name-of-component
Start app : ng serve (or in my case 'npm start' but that's just my preference)

### Active routes
'' : Home component
'/about' : About component

## Séquence 2 : Logique réactive du flux de données
### 1. Structure du flux
- Le service 'TaskService' utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches
- Le composant 'TaskComponent' s'abonne à ce flux vias 'tasks$' et le **| async**.

### 2. Mise à jour des données
- La méthode 'addTask()'  ajoute une tâche puis appelle 'next()' pour émettre la nouvelle liste.
- La méthode 'removeTask()' supprime une tâche via son ID puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement

### 3. Points clés retenus
- Pas besoin d'appeler 'getTask()' à chaque fois : la donnée est **vivante**.
- '| async' gère l'abonnement et le désabonnement automatiquement;
- Le flux reste cohérent entre le service et la vue.

## Séquence 3 : Lasy Loading
### 1. Lazy loading ?
Permet de ne pas charger la totalité de l'app à l'arrivée sur la landing-page. Celà permet de réduire le poids / la complexité de l'application pour le navigateur la rendant plus rapide. C'est mis en place par un systeme permettant de ne charger les routes dont l'application a besoin pour afficher à l'utilisateur les pages / fonctionnalités qu'il consulte / dont l'app à besoin pour afficher ce que l'utilisateur demande.

### 2. Structure
L'utilisation d'une architecture découpée par feature est generalement utilisié quand on implement le lazy loading. Cela permet de mettre en place ce systeme par feature pour limiter l'utilisation de ressources aux features nécéssaires pour accomplir les actions que demande l'utilisateur. On va donc ajouter un fichier de route (ex. my-feature.routes.ts) pour permettre la mise en place d'un lazy loading par feature.

### 3. Composant dynamique
C'est un composant qui peut être chargé, affiché ou modifié à la volée, c’est-à-dire pendant l’exécution de l’application, en fonction de certaines conditions ou données. Contrairement à un composant statique (toujours affiché de la même manière), un composant dynamique permet de changer de contenu ou de comportement sans recharger la page.

### 4. ViewContainerRef + createComponent()
**ViewContainerRef** représente un conteneur dans le DOM où tu peux ajouter, supprimer ou manipuler des composants dynamiquement.
**createComponent()** permet de créer une instance d’un composant et de l’ajouter au conteneur (ViewContainerRef)

## Séquence 4 — Tests Unitaires Angular
### 📚 Ce que j'ai appris
#### 1. Pourquoi tester ?
- Les tests permettent de garantir la stabilité du code, détecter les régressions, et faciliter la maintenance. Ils documentent aussi le comportement attendu du code.
- Sans tests, le risque est d’introduire des bugs à chaque modification, de ralentir les livraisons, et de perdre la confiance des utilisateurs.
- Exemple concret : **Au travail** La modification d'une methode d'un service pour une nouvell fonctionnalité à cassé le fonctionnement de plusieurs composants. Sans tests l'erreur aurrait pu arriver en production.

#### 2. Outils utilisés
- **Jasmine** : Framework de tests unitaires, permet d’écrire des tests clairs et expressifs.
- **Karma** : Exécuteur de tests, lance les tests dans différents navigateurs.
- **TestBed** : Environnement de test Angular, simule un module Angular pour tester les composants.

#### 3. Concepts clés maîtrisés
- **AAA Pattern** : Structure les tests en 3 phases : préparation (Arrange), exécution (Act), vérification (Assert).
- **Mocks** : Simulent des dépendances (ex : services HTTP) pour isoler le code testé.
- **Spies** : Espionnent les appels de fonction pour vérifier leur comportement (ex : *spyOn*).
- **Fixture & detectChanges()** : Permettent de manipuler et mettre à jour le DOM virtuel pendant les tests.

#### 4. Types de tests pratiqués
- ✅ Test d'un service
- ✅ Test d'un composant avec TestBed
- ✅ Test des @Input
- ✅ Test du DOM

#### 5. Erreurs courantes rencontrées
- Oublier `detectChanges()` : Les changements peuvent ne pas avoir été pris en compte.
- `No provider for...` : Déclarer le service dans le *TestBed.configureTestingModule({ providers: [...] })*.
- Tests qui dépendent les uns des autres : Utiliser *beforeEach* pour réinitialiser l’état avant chaque test et *afterEach* pour effectuer des operations apres les tests si nécessaire.

#### 6. Commandes importantes
```bash
ng test                    # Lancer les tests
ng test --code-coverage    # Avec rapport de couverture
```

#### 7. Code Coverage atteint
- Objectif : 70-80%
- Mon résultat : **100%** sur TaskBoard Pro (unitaire uniquement)

=============================== Coverage summary ===============================
Statements   : 100% ( 51/51 )
Branches     : 100% ( 3/3 )
Functions    : 100% ( 14/14 )
Lines        : 100% ( 46/46 )
================================================================================

#### 8. Difficultés rencontrées et solutions
| Difficulté | Solution trouvée |
|------------|------------------|
|    None    |       None       |

#### 9. Points à approfondir
- [X] Tests d'intégration
- [X] Tests E2E avec Cypress
- [X] Mocking avancé pour HttpClient
- [X] Tests de services asynchrones
(Déjà fait au travail mais pas en cours)

### 🎯 Projet : Tests TaskBoard Pro
#### Tests implémentés
- [x] TaskService
- ✅ `addTask()`
- ✅ `deleteTask()`
- ✅ `getTasks()`
- [x] TaskHighlight Component
- ✅ Affichage du titre
- ✅ @Input title
- ✅ Rendu dans le DOM
(Et plusd encore mais flemme de tout lister)

#### Résultats
- **Tests réussis** : 30 / 30
- **Code coverage** : 100%
- **Temps d'exécution** : 0.141 secondes

### 💡 Réflexion personnelle
C'est déjà ce que je fait au travail donc je ne sais pas trop quoi dire.

### 📚 Ressources consultées
- [Notes de cours - Séquence 1 à 4]