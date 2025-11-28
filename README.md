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