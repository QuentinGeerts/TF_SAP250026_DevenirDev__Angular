# Exercices

## Exercice 01 - Créer son profil

> features/exercices/exo01

Vous devez créer une application pour permettre aux utilisateurs de créer leur propre profil personnel.
L'application doit contenir les champs suivants: 
- Nom complet
- Adresse email
- Date de naissance
- Genre
- Langues parlées
- URL de la photo de profil (optionnel)

Vous avez carte blanche pour le style visuel de la page HTML.

Pour rappel:
- Création d'un composant : `ng g c chemin/nom-du-composant`

## Exercice 02 - Créer son profil dynamique

> features/exercices/exo02

Vous devez créer une application séparée en deux parties.

La partie de gauche affiche un formulaire reprenant les informations du premier exercices.
La partie de droite affiche l'équivalent de l'exercice 1 par rapport aux données entrées à gauche.

La complétion du profil doit se faire en instantanée.

## Exercice 03 - Le chronomètre basique

Vous devez créer une application qui permet de gérer un chronomètre.
Vous pouvez : démarrer, mettre sur pause et reset le chronomètre.
Astuce: cherchez du côté du setInterval

## Exercice 04 - Menu exercice

Vous devez réimplémenter le routing pour les exercices.
Vous devez ajouter à la navbar les différents liens vers les exercices créés (1-4).
Vous devez créer un composant Exercices.
Vous devez créer un routing enfant pour les exercices.

Vous ne devez utiliser la balise <router-outlet> dans le composant Exercices (dans l'affichage, les exercices (1-4) remplace la vue du composant Exercices)

## Exercice 05 - Le chronomètre formaté

Reprenez l'exercice du chronomètre en ajoutant un pipe customisé sur le nombre de secondes.
Le format d'affichage doit être le suivant : 
- mm:ss

## Exercice 06 - Le convertisseur de degré

Créer un programme qui permet d'encoder une température et de choisir la source et la destination de la conversion.

Exemple:

- 24.5 | convertisseurDegre : 'celsius' : 'fahrenheit'

## Exercice 07 - Gestion des produits

Créer une petite application qui permet de gérer une liste de produits.
Vous devez créer deux sous-composants (enfants) pour afficher la liste et créer un produit.

Le composant "ListProducts" doit recevoir la liste des produits depuis le parent et ensuite l'afficher sur la page (carte blanche pour affichage)

Le composant "AddProduct" doit permettre de créer un produit et ensuite envoie le produit au parent qui l'ajoute à la liste.

Vous devez créer un modèle (interface) nommé Product qui possède les champs suivants :
- name: string
- price: number

## Exercice 08 - Gestion des produits (services)

Reprenez l'exercice précédent et ajouter la notion de service.
La logique métier et les données doivent se situer dans la classe du service.

Les composants doivent simplement injecter le service et le consommer.

## Exercice 09 - Vérification d'âge

Créer une application qui permet à l'utilisateur de rentrer sa date de naissance via un formulaire.

Vous devez créer un custom validator qui permet de vérifier si la personne est majeur ou non.
Dans le cas où elle est mineure, elle ne pourra pas valider le formulaire.