# Formation Angular - Guide pas-à-pas

> Documentation officielle : [https://angular.dev](https://angular.dev)

Ce guide vous accompagne dans la recréation complète du projet Angular vu en formation. Chaque étape introduit une notion clé. Suivez-les dans l'ordre.

---

## Problème de scripts désactivés (Windows)

Si vous rencontrez l'erreur suivante lors de l'exécution de commandes Angular CLI :

```
ng : Impossible de charger le fichier C:\Users\...\npm\ng.ps1, car l'exécution de scripts est désactivée sur ce système.
```

Exécutez cette commande **en tant qu'administrateur** dans PowerShell :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis fermez et rouvrez votre terminal.

---

## Table des matières

1. [Prérequis](#1---prérequis)
2. [Créer le projet](#2---créer-le-projet)
3. [Structure du projet](#3---structure-du-projet)
4. [Comprendre le composant racine](#4---comprendre-le-composant-racine)
5. [Créer un modèle partagé](#5---créer-un-modèle-partagé)
6. [Démo 01 - Interpolation](#6---démo-01---interpolation)
7. [Démo 02 - Property Binding](#7---démo-02---property-binding)
8. [Démo 03 - Event Binding](#8---démo-03---event-binding)
9. [Démo 04 - Two-way Binding](#9---démo-04---two-way-binding)
10. [Exercice 01 - Profil statique](#10---exercice-01---profil-statique)
11. [Exercice 02 - Profil dynamique](#11---exercice-02---profil-dynamique)
12. [Exercice 03 - Chronomètre avec Signals](#12---exercice-03---chronomètre-avec-signals)
13. [Démo 05 - Le Routing](#13---démo-05---le-routing)
14. [Démo 06 - Les Pipes intégrés](#14---démo-06---les-pipes-intégrés)
15. [Démo 07 - Les Custom Pipes](#15---démo-07---les-custom-pipes)
16. [Exercice 05 - Chronomètre formaté](#16---exercice-05---chronomètre-formaté)
17. [Exercice 06 - Convertisseur de température](#17---exercice-06---convertisseur-de-température)
18. [Démo 08 - Les directives de composant](#18---démo-08---les-directives-de-composant)
19. [Démo 09 - Les directives structurelles](#19---démo-09---les-directives-structurelles)
20. [Démo 10 - Les directives personnalisées](#20---démo-10---les-directives-personnalisées)
21. [Démo 11 - Communication entre composants](#21---démo-11---communication-entre-composants)
22. [Exercice 07 - Gestion des produits](#22---exercice-07---gestion-des-produits)
23. [Démo 12 - Les services et l'injection de dépendances](#23---démo-12---les-services-et-linjection-de-dépendances)
25. [Démo 13 - Les Formulaires Réactifs](#25---démo-13---les-formulaires-réactifs)
26. [Démo 14 - Routing avancé](#26---démo-14---routing-avancé)
27. [Démo 15 - Les Guards](#27---démo-15---les-guards)
28. [Démo 16 - Les Resolvers](#28---démo-16---les-resolvers)
29. [Démo 17 - Les Observables (RxJS)](#29---démo-17---les-observables-rxjs)
30. [Exercice 08 - Gestion des produits avec service](#30---exercice-08---gestion-des-produits-avec-service)
31. [Démo 18 - HttpClient](#31---démo-18---httpclient)
32. [Démo 19 - HTTP avec Signaux (httpResource)](#32---démo-19---http-avec-signaux-httpresource)
33. [Démo 20 - Storage (localStorage / sessionStorage)](#33---démo-20---storage-localstorage--sessionstorage)
34. [Démo 21 - Intercepteur HTTP et Authentification JWT](#34---démo-21---intercepteur-http-et-authentification-jwt)
35. [Exercice 09 - Formulaire réactif avec validateur d'âge](#35---exercice-09---formulaire-réactif-avec-validateur-dâge)
36. [Récapitulatif des notions](#36---récapitulatif-des-notions)

---

## 1 - Prérequis

Avant de commencer, installez :

- **Node.js** (version LTS) : [https://nodejs.org](https://nodejs.org)
- **npm** est fourni avec Node.js
- **Angular CLI** :

```bash
npm install -g @angular/cli
```

Vérifiez que tout est bien installé :

```bash
node -v
npm -v
ng version
```

> Docs : [https://angular.dev/tools/cli/setup-local](https://angular.dev/tools/cli/setup-local)

---

## 2 - Créer le projet

```bash
ng new mon-projet-angular --skip-tests --style=css
```

| Option | Rôle |
|--------|------|
| `--skip-tests` | Ne génère pas les fichiers `.spec.ts` |
| `--style=css` | Utilise CSS comme format de style |

Puis lancez le serveur de développement :

```bash
cd mon-projet-angular
ng serve --open
```

L'application s'ouvre dans le navigateur à l'adresse `http://localhost:4200/`.

> Docs : [https://angular.dev/tools/cli](https://angular.dev/tools/cli)

### Autres options utiles de `ng new`

| Option | Description |
|--------|-------------|
| `--routing` | Ajoute le routing |
| `--ssr` | Active le Server-Side Rendering |
| `--standalone` | Composants standalone (par défaut depuis Angular 17+) |
| `--minimal` | Workspace minimal, idéal pour l'apprentissage |
| `--prefix` | Change le préfixe des sélecteurs (par défaut : `app`) |
| `--inline-style` | Styles directement dans le fichier `.ts` |
| `--inline-template` | Template directement dans le fichier `.ts` |

---

## 3 - Structure du projet

Voici la structure cible que nous allons construire au fil des étapes :

```
src/
├── index.html                  ← Page HTML principale
├── main.ts                     ← Point d'entrée de l'application
├── styles.css                  ← Styles globaux
└── app/
    ├── app.ts                  ← Composant racine
    ├── app.html                ← Template du composant racine
    ├── app.css                 ← Styles du composant racine
    ├── app.config.ts           ← Configuration de l'application
    ├── app.routes.ts           ← Configuration du routing
    ├── core/
    │   ├── guards/
    │   │   ├── auth.guard.ts               ← Guard canActivate (vérifie si connecté)
    │   │   └── confirm.guard.ts            ← Guard canDeactivate (confirmation avant départ)
    │   ├── interceptors/
    │   │   └── token-interceptor.ts        ← Intercepteur qui injecte le token JWT
    │   ├── resolvers/
    │   │   └── user-resolver.ts            ← Résolveur pour précharger un utilisateur
    │   └── services/
    │       ├── authentication.ts           ← Service d'auth par signaux (demo12)
    │       ├── auth.service.ts             ← Service auth JWT + HttpClient
    │       ├── fake-auth.service.ts        ← Service auth factice (BehaviorSubject)
    │       ├── fake-authentication.service.ts ← Service auth factice (signals)
    │       ├── product-httpclient.service.ts  ← Service produits (HttpClient)
    │       ├── product-httpresource.service.ts ← Service produits (httpResource)
    │       ├── products.service.ts         ← Service produits en mémoire
    │       ├── storage.service.ts          ← Service localStorage/sessionStorage
    │       └── todolist.service.ts         ← Service todos
    ├── shared/
    │   ├── models/
    │   │   ├── user.model.ts               ← Interfaces User, UserWithId, UserLogin, UserSignUp
    │   │   ├── product.model.ts            ← Interfaces Product, ProductDTO, PaginationParams
    │   │   ├── jwt.model.ts                ← Interfaces JwtPayload, TokenInfo
    │   │   └── todo.models.ts              ← Interface Todo
    │   ├── directives/
    │   │   └── highlight.ts                ← Directive personnalisée de surlignage
    │   ├── pipes/
    │   │   ├── chrono-pipe.ts              ← Pipe pour formater le chrono
    │   │   ├── convert-to-dhms-pipe.ts     ← Pipe pour convertir en jours/heures/min/sec
    │   │   ├── sum-pipe.ts                 ← Pipe pour sommer un tableau
    │   │   └── temperature-pipe.ts         ← Pipe pour convertir les températures
    │   └── validators/
    │       ├── age.validator.ts            ← Validateur d'âge minimum
    │       └── password-match.validator.ts ← Validateur confirmation mot de passe
    └── features/
        ├── home/
        │   └── home.ts
        ├── layout/
        │   └── navbar/
        │       └── navbar.ts   ← Composant de navigation
        ├── errors/
        │   └── not-found/
        │       └── not-found.ts ← Page 404
        ├── demonstrations/
        │   ├── demonstrations.ts
        │   ├── demonstrations.routes.ts
        │   ├── demo01-interpolation/
        │   ├── demo02-attribute-binding/
        │   ├── demo03-event-binding/
        │   ├── demo04-twoway-binding/
        │   ├── demo05-routing/
        │   ├── demo06-pipes/
        │   ├── demo07-custom-pipes/
        │   ├── demo08-component-directives/
        │   ├── demo09-structural-directives/
        │   ├── demo10-custom-directives/
        │   ├── demo11-communication-composants/
        │   │   └── enfant/             ← Composant enfant (Input/Output)
        │   ├── demo12-services-di/
        │   ├── demo13-reactive-forms/
        │   ├── demo14-advanced-routing/
        │   ├── demo15-guards/
        │   │   └── demo15-secret/      ← Page protégée par le guard
        │   ├── demo16-resolvers/
        │   ├── demo17-observables/
        │   ├── demo18-httpclient/
        │   │   ├── product-details/    ← Détail d'un produit
        │   │   └── product-create/     ← Formulaire de création
        │   ├── demo19-http-signal/
        │   ├── demo20-storage/
        │   └── demo21-interceptor/
        │       ├── auth-login/         ← Formulaire de connexion
        │       ├── auth-signup/        ← Formulaire d'inscription
        │       ├── todolist/           ← Liste des todos
        │       └── todolist-add/       ← Formulaire d'ajout de todo
        └── exercices/
            ├── exercices.ts
            ├── exercices.routes.ts
            ├── exo01/
            ├── exo02/
            ├── exo03/
            ├── exo05/
            ├── exo06/
            ├── exo07/
            │   ├── add-product/        ← Composant enfant (formulaire)
            │   └── list-products/      ← Composant enfant (liste)
            ├── exo08/
            │   ├── exo08-add/          ← Formulaire d'ajout de produit
            │   └── exo08-list/         ← Liste des produits
            └── exo09/                  ← Validateur d'âge
```

### Fichiers clés générés automatiquement

**`src/main.ts`** - Bootstrap de l'application (standalone) :

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

**`src/app/app.config.ts`** - Configuration globale :

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
```

**`src/app/app.routes.ts`** - Routes (vide pour le moment) :

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [];
```

> Docs : [https://angular.dev/guide/components](https://angular.dev/guide/components)

---

## 4 - Comprendre le composant racine

Un **composant** Angular est une classe TypeScript décorée avec `@Component`. C'est la brique de base de toute application Angular.

> Docs : [https://angular.dev/guide/components](https://angular.dev/guide/components)

Ouvrez `src/app/app.ts` et remplacez son contenu :

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',        // Balise HTML utilisée dans index.html
  imports: [],                  // Composants/modules importés
  templateUrl: './app.html',    // Fichier template HTML
  styleUrl: './app.css'         // Fichier de styles CSS
})
export class App {
  // Signal : système de réactivité moderne d'Angular
  protected readonly title = signal('Mon Projet Angular');
}
```

Dans `src/app/app.html` :

```html
<h1>{{ title() }}</h1>
```

### Ce qu'il faut retenir

| Concept | Description |
|---------|-------------|
| `@Component` | Décorateur qui transforme une classe en composant Angular |
| `selector` | Le nom de la balise HTML pour utiliser ce composant |
| `imports` | Liste des composants/directives/pipes utilisés dans le template |
| `templateUrl` | Chemin vers le fichier HTML du template |
| `styleUrl` | Chemin vers le fichier CSS du composant (styles encapsulés) |
| `signal()` | Crée une valeur réactive. On lit sa valeur en l'appelant : `title()` |

---

## 5 - Créer un modèle partagé

Avant de créer les démonstrations, créons une **interface TypeScript** pour typer nos données.

Créez le fichier `src/app/shared/models/user.model.ts` :

```typescript
export interface User {
  email: string;
  lastname: string;
  firstname: string;
}

export interface Login {
  email: string;
  password: string;
}
```

> Une **interface** définit un contrat : elle décrit la forme d'un objet sans fournir d'implémentation.

---

## 6 - Démo 01 - Interpolation

L'**interpolation** permet d'afficher des données du composant dans le template avec la syntaxe `{{ expression }}`.

> Docs : [https://angular.dev/guide/templates/binding](https://angular.dev/guide/templates/binding)

### Générer le composant

```bash
ng g c features/demonstrations/demo01-interpolation --skip-tests
```

### Le composant (`demo01-interpolation.ts`)

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-demo01-interpolation',
  imports: [],
  templateUrl: './demo01-interpolation.html',
  styleUrl: './demo01-interpolation.css',
})
export class Demo01Interpolation implements OnInit, OnDestroy {

  // Types de base
  firstname: string = "Quentin";
  age: number = 29;
  isDeveloper: boolean = true;

  // Assertion d'assignation définitive (sera assigné dans ngOnInit)
  maVariable1!: string;

  // Déclaration ambiante
  declare maVariable2: string;

  // Types union et optionnels
  maVariable3: string | null = null;
  maVariable4?: string = undefined;

  // Tableaux
  maVariable5: number[] = [1, 2, 3, 4, 5];
  maVariable6: Array<number> = [1, 2, 3, 4, 5];

  // Types spéciaux
  maVariable7: unknown;

  // Objet typé inline
  maVariable9: { lastname: string } = { lastname: 'Geerts' };

  // Objet typé avec une interface
  maVariable10: User = {
    email: "quentin.geerts@bstorm.be",
    lastname: 'Geerts',
    firstname: "Quentin"
  };

  // Tableau d'objets typés
  maVariable11: User[] = [this.maVariable10];

  constructor() { }

  ngOnInit(): void {
    this.maVariable1 = "Hello World !";
    this.maVariable2 = "Hi";
  }

  ngOnDestroy(): void {
    // Nettoyage (désabonnements, timers, etc.)
  }

  maMethode(a: string): string {
    return a;
  }
}
```

### Le template (`demo01-interpolation.html`)

```html
<h3>Démonstration 01 - Interpolation</h3>

<!-- Interpolation de propriétés -->
<p>Prénom : {{ firstname }}</p>
<p>Age : {{ age }}</p>

<!-- Opérateur ternaire dans l'interpolation -->
<p>{{ isDeveloper ? "Est un développeur" : "N'est pas un développeur" }}</p>

<!-- Accès aux propriétés d'un objet -->
<p>Nom : {{ maVariable9.lastname }}</p>
<p>Email : {{ maVariable10.email }}</p>

<!-- Appel de méthode -->
<p>{{ maMethode("Bonjour !") }}</p>

<!-- ngNonBindable : affiche la syntaxe {{ }} littéralement -->
<p>Syntaxe : <code ngNonBindable>{{ expression }}</code></p>
```

### Notions couvertes

| Notion | Exemple |
|--------|---------|
| Interpolation `{{ }}` | `{{ firstname }}` |
| Types TypeScript | `string`, `number`, `boolean`, `null`, `undefined` |
| Types union | `string \| null` |
| Propriétés optionnelles | `maVariable4?: string` |
| Assertion `!` | `maVariable1!: string` |
| Interfaces | `User` |
| Tableaux typés | `number[]`, `Array<number>`, `User[]` |
| Cycle de vie | `OnInit`, `OnDestroy` |
| Expressions dans le template | Ternaire, appels de méthodes, accès aux propriétés |
| `ngNonBindable` | Empêche l'interprétation Angular |

---

## 7 - Démo 02 - Property Binding

Le **property binding** permet de lier dynamiquement une valeur du composant à une propriété HTML/DOM avec la syntaxe `[propriété]="expression"`.

> Docs : [https://angular.dev/guide/templates/binding](https://angular.dev/guide/templates/binding)

### Générer le composant

```bash
ng g c features/demonstrations/demo02-attribute-binding --skip-tests
```

### Le composant (`demo02-attribute-binding.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo02-attribute-binding',
  imports: [],
  templateUrl: './demo02-attribute-binding.html',
  styleUrl: './demo02-attribute-binding.css',
})
export class Demo02AttributeBinding {
  showPassword: boolean = true;
  password: string = "MonPassword!123=";

  urlImage: string = "https://placecats.com/300/200";
  altImage: string = "Photo d'un petit chat";
  widthImage: string = "300";
}
```

### Le template (`demo02-attribute-binding.html`)

```html
<h2>Démonstration 02 - Property Binding</h2>

<!-- Liaison dynamique du type d'input (text/password) -->
<input [type]="showPassword ? 'text' : 'password'" [value]="password">

<!-- Liaison d'un booléen -->
<input type="checkbox" [checked]="showPassword">

<!-- Liaisons multiples sur un même élément -->
<img [src]="urlImage" [alt]="altImage" [width]="widthImage">
```

### Notions couvertes

| Notion | Exemple |
|--------|---------|
| Property binding `[prop]` | `[src]="urlImage"` |
| Expression conditionnelle | `[type]="showPassword ? 'text' : 'password'"` |
| Liaison de booléen | `[checked]="showPassword"` |
| Liaisons multiples | Plusieurs `[prop]` sur un même élément |

---

## 8 - Démo 03 - Event Binding

L'**event binding** permet de réagir aux actions de l'utilisateur (clic, saisie, etc.) avec la syntaxe `(événement)="méthode()"`.

> Docs : [https://angular.dev/guide/templates/event-listeners](https://angular.dev/guide/templates/event-listeners)

### Générer le composant

```bash
ng g c features/demonstrations/demo03-event-binding --skip-tests
```

### Le composant (`demo03-event-binding.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo03-event-binding',
  imports: [],
  templateUrl: './demo03-event-binding.html',
  styleUrl: './demo03-event-binding.css',
})
export class Demo03EventBinding {
  compteur: number = 0;
  firstname: string = "Quentin";

  // Méthode sans paramètre
  increase() {
    this.compteur++;
  }

  // Méthode avec l'objet Event
  decrease(event: Event) {
    event.preventDefault();
    this.compteur--;
  }

  // Récupérer la valeur d'un input via l'événement
  updateValue(event: Event) {
    const input = event.target as HTMLInputElement;
    this.firstname = input.value;
  }
}
```

### Le template (`demo03-event-binding.html`)

```html
<h2>Démonstration 03 - Event Binding</h2>

<p>Compteur : {{ compteur }}</p>

<!-- Événement click simple -->
<button (click)="increase()">+1</button>

<!-- Plusieurs événements sur un même élément -->
<!-- Clic gauche = +1, clic droit = -1 -->
<button (click)="increase()" (contextmenu)="decrease($event)">+1 / -1</button>

<!-- Événement input : on passe $event au handler -->
<p>Prénom : {{ firstname }}</p>
<input type="text" [value]="firstname" (input)="updateValue($event)">
```

### Notions couvertes

| Notion | Exemple |
|--------|---------|
| Event binding `(event)` | `(click)="increase()"` |
| Objet `$event` | `(contextmenu)="decrease($event)"` |
| `event.preventDefault()` | Empêche le comportement par défaut |
| `event.target as HTMLInputElement` | Cast de type pour accéder à `.value` |
| Événements multiples | `(click)` et `(contextmenu)` sur le même élément |

---

## 9 - Démo 04 - Two-way Binding

Le **two-way binding** synchronise automatiquement la valeur entre le composant et le template dans les deux sens. Syntaxe : `[(ngModel)]="propriété"` (dite "banana in a box").

> Docs : [https://angular.dev/guide/templates/two-way-binding](https://angular.dev/guide/templates/two-way-binding)

### Générer le composant

```bash
ng g c features/demonstrations/demo04-twoway-binding --skip-tests
```

### Le composant (`demo04-twoway-binding.ts`)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // OBLIGATOIRE pour ngModel

@Component({
  selector: 'app-demo04-twoway-binding',
  imports: [FormsModule],  // Il faut importer FormsModule
  templateUrl: './demo04-twoway-binding.html',
  styleUrl: './demo04-twoway-binding.css',
})
export class Demo04TwowayBinding {
  firstname: string = "Quentin";
}
```

### Le template (`demo04-twoway-binding.html`)

```html
<h2>Démonstration 04 - Two-way Binding</h2>

<label>Prénom : {{ firstname }}</label>
<br>
<input type="text" [(ngModel)]="firstname">

<!--
  [(ngModel)]="firstname" est un raccourci pour :
  [ngModel]="firstname" (ngModelChange)="firstname = $event"
-->
```

### Notions couvertes

| Notion | Exemple |
|--------|---------|
| Two-way binding `[()]` | `[(ngModel)]="firstname"` |
| `FormsModule` | Import obligatoire pour utiliser `ngModel` |
| Sucre syntaxique | Combine property binding + event binding |

---

## 10 - Exercice 01 - Profil statique

**Objectif** : Créer un composant qui affiche un profil utilisateur en utilisant l'interpolation et le property binding.

### Générer le composant

```bash
ng g c features/exercices/exo01 --skip-tests
```

### Le composant (`exo01.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-exo01',
  imports: [],
  templateUrl: './exo01.html',
  styleUrl: './exo01.css',
})
export class Exo01 {
  nomComplet: string = "Quentin Geerts";
  email: string = "quentin.geerts@bstorm.be";
  dateNaissance: Date = new Date("1996-04-03");

  // Type union pour restreindre les valeurs possibles
  genre: "M" | "F" | "X" = "M";

  langues: string[] = ["Français", "Néerlandais", "Anglais", "Japonais"];

  urlPhoto: string = "https://placecats.com/300/300";
}
```

### Le template (`exo01.html`)

```html
<h2>Exercice 01 - Mon profil</h2>

<!-- Property binding pour src, interpolation pour alt -->
<img [src]="urlPhoto" alt="Photo de profil de {{ nomComplet }}" width="200">

<!-- Ternaires imbriqués pour le genre -->
<p>{{ genre === "M" ? "Monsieur" : (genre === "F" ? "Madame" : "") }} {{ nomComplet }}</p>

<p>Email : <a href="mailto:{{ email }}">{{ email }}</a></p>

<!-- Appel de méthode JavaScript directement dans le template -->
<p>Naissance : {{ dateNaissance.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) }}</p>

<!-- Méthode join() sur un tableau -->
<p>Langues : {{ langues.join(", ") }}</p>

<!-- Accès par index -->
<ul>
  <li>{{ langues[0] }}</li>
  <li>{{ langues[1] }}</li>
  <li>{{ langues[2] }}</li>
  <li>{{ langues[3] }}</li>
</ul>
```

### Notions pratiquées

- Interpolation avec expressions complexes (ternaires imbriqués)
- Property binding (`[src]`)
- Types union (`"M" | "F" | "X"`)
- Appels de méthodes dans le template (`toLocaleDateString`, `join`)
- Accès aux index d'un tableau

---

## 11 - Exercice 02 - Profil dynamique

**Objectif** : Créer un formulaire avec two-way binding qui met à jour un aperçu du profil en temps réel.

### Générer le composant

```bash
ng g c features/exercices/exo02 --skip-tests
```

### Le composant (`exo02.ts`)

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exo02',
  imports: [FormsModule],
  templateUrl: './exo02.html',
  styleUrl: './exo02.css',
})
export class Exo02 {
  nomComplet: string = "";
  email: string = "";
  dateNaissance: string = "1996-04-03";
  genre: string = "M";
  langues: string = "";
  url: string = "";
}
```

### Le template (`exo02.html`)

```html
<h2>Exercice 02 - Profil dynamique</h2>

<div class="container">
  <!-- Partie formulaire -->
  <div class="formulaire">
    <h3>Formulaire</h3>
    <div class="fields">
      <label>Nom complet :</label>
      <input type="text" [(ngModel)]="nomComplet">

      <label>Email :</label>
      <input type="email" [(ngModel)]="email">

      <label>Date de naissance :</label>
      <input type="date" [(ngModel)]="dateNaissance">

      <label>Genre :</label>
      <select [(ngModel)]="genre">
        <option value="M">Homme</option>
        <option value="F">Femme</option>
        <option value="X">Autre</option>
      </select>

      <label>Langues (séparées par une virgule) :</label>
      <input type="text" [(ngModel)]="langues">

      <label>URL de la photo :</label>
      <input type="url" [(ngModel)]="url">
    </div>
  </div>

  <!-- Aperçu en temps réel -->
  <div class="profil">
    <h3>Aperçu</h3>
    <img [src]="url" alt="Photo de {{ nomComplet }}" width="250">
    <p>{{ genre === "M" ? "Monsieur" : (genre === "F" ? "Madame" : "") }} {{ nomComplet }}</p>
    <p>Email : <a href="mailto:{{ email }}">{{ email }}</a></p>
    <p>Naissance : {{ dateNaissance }}</p>
    <p>Langues : {{ langues }}</p>
  </div>
</div>
```

### Les styles (`exo02.css`)

```css
.container {
  display: flex;
  border: 1px solid black;
}

.formulaire, .profil {
  width: 50%;
  border: 1px solid black;
  height: 600px;
  padding: 0 10px;
}

.fields > * {
  display: block;
}

.fields input, .fields select {
  margin: 5px 0 20px;
}

/* Responsive : sur petit écran, le profil passe au-dessus */
@media screen and (max-width: 600px) {
  .container {
    flex-direction: column-reverse;
  }
  .formulaire, .profil {
    width: 100%;
  }
}
```

### Notions pratiquées

- Two-way binding sur plusieurs types d'inputs (`text`, `email`, `date`, `url`, `select`)
- `FormsModule` et `ngModel`
- Mise à jour en temps réel d'un aperçu
- CSS Flexbox et responsive design (media queries)

---

## 12 - Exercice 03 - Chronomètre avec Signals

**Objectif** : Créer un chronomètre en utilisant les **Signals**, le nouveau système de réactivité d'Angular.

> Docs : [https://angular.dev/guide/signals](https://angular.dev/guide/signals)

### Générer le composant

```bash
ng g c features/exercices/exo03 --skip-tests
```

### Le composant (`exo03.ts`)

```typescript
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-exo03',
  imports: [],
  templateUrl: './exo03.html',
  styleUrl: './exo03.css',
})
export class Exo03 {

  // Création d'un signal avec une valeur initiale
  chrono: WritableSignal<number> = signal(0);

  // ID du timer (undefined = chrono arrêté)
  timer?: number;

  increment() {
    // .update() calcule la nouvelle valeur à partir de l'ancienne
    this.chrono.update(value => value + 1);

    // Alternative : .set() remplace directement la valeur
    // this.chrono.set(this.chrono() + 1);
  }

  startChrono() {
    // Empêche de lancer plusieurs timers
    if (this.timer !== undefined) return;
    this.timer = setInterval(() => this.increment(), 1000);
  }

  stopChrono() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  resetChrono() {
    this.stopChrono();
    this.chrono.set(0);  // Remet le signal à 0
  }
}
```

### Le template (`exo03.html`)

```html
<h2>Exercice 03 - Chronomètre</h2>

<!-- Un signal se lit en l'appelant comme une fonction : chrono() -->
<p>Chrono : {{ chrono() }}</p>

<!-- [disabled] désactive le bouton selon une condition -->
<button (click)="startChrono()" [disabled]="timer">Démarrer</button>
<button (click)="stopChrono()" [disabled]="!timer">Pause</button>
<button (click)="resetChrono()" [disabled]="!chrono()">Réinitialiser</button>
```

### Les Signals en résumé

| Concept | Syntaxe | Description |
|---------|---------|-------------|
| Créer un signal | `signal(valeur)` | Crée un signal modifiable (`WritableSignal<T>`) |
| Lire un signal | `monSignal()` | Appeler comme une fonction pour obtenir la valeur |
| Modifier avec `.set()` | `monSignal.set(42)` | Remplace la valeur |
| Modifier avec `.update()` | `monSignal.update(v => v + 1)` | Calcule à partir de la valeur précédente |
| Signal en lecture seule | `monSignal.asReadonly()` | Retourne un `Signal<T>` non modifiable |

---

## 13 - Démo 05 - Le Routing

Le **routing** permet de naviguer entre différentes vues (composants) sans recharger la page. Angular utilise un système de routes qui mappe des URLs à des composants.

> Docs : [https://angular.dev/guide/routing](https://angular.dev/guide/routing)

### Configuration des routes principales (`app.routes.ts`)

```typescript
import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Demonstrations } from './features/demonstrations/demonstrations';

export const routes: Routes = [
  {
    path: 'home',
    // Eager loading: chargement direct
    component: Home
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: "demonstrations",
    component: Demonstrations,
    // Lazy loading des routes enfants
    loadChildren: () => import("./features/demonstrations/demonstrations.routes")
      .then(r => r.routes)
  },

  {
    path: 'exercices',
    loadChildren: () => import("./features/exercices/exercices.routes")
      .then(r => r.routes)
  },

  {
    path: '**',
    // Lazy loading: chargement à la demande
    loadComponent: () => import("./features/errors/not-found/not-found")
      .then(c => c.NotFound)
  }
];
```

### Routes enfants (`demonstrations.routes.ts`)

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'demo01',
    title: 'Démonstration 01 - Interpolation',
    loadComponent: () => import("./demo01-interpolation/demo01-interpolation")
      .then(c => c.Demo01Interpolation)
  },
  {
    path: 'demo02',
    loadComponent: () => import("./demo02-attribute-binding/demo02-attribute-binding")
      .then(c => c.Demo02AttributeBinding)
  },
  // ... autres démos
];
```

### Composant Navbar avec RouterLink (`navbar.ts`)

```typescript
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar { }
```

### Template de navigation (`navbar.html`)

```html
<nav>
  <ul>
    <li><a routerLink="">Home</a></li>
    <li><a routerLink="/home">Home (avec /home)</a></li>
    <li>
      <a routerLink="/demonstrations">Démonstrations</a>
      <ul>
        <li><a routerLink="/demonstrations/demo01">Démo 01 - Interpolation</a></li>
        <li><a routerLink="/demonstrations/demo02">Démo 02 - Attribute Binding</a></li>
        <!-- ... -->
      </ul>
    </li>
    <li>
      <a routerLink="/exercices">Exercices</a>
      <ul>
        <li><a routerLink="/exercices/exo01">Exo 01 - Profil</a></li>
        <!-- ... -->
      </ul>
    </li>
  </ul>
</nav>
```

### Composant racine avec RouterOutlet (`app.ts`)

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./features/layout/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
```

### Template racine (`app.html`)

```html
<div class="container-fluid">
  <div class="row">
    <div class="menu col-3">
      <app-navbar />
    </div>

    <main class="col">
      <div class="header"></div>
      <div class="content">
        <router-outlet />
      </div>
      <div class="footer"></div>
    </main>
  </div>
</div>
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `Routes` | Tableau de configuration des routes |
| `path` | URL de la route |
| `component` | Composant affiché (eager loading) |
| `loadComponent` | Chargement à la demande (lazy loading) |
| `loadChildren` | Chargement de routes enfants |
| `redirectTo` | Redirection vers une autre route |
| `pathMatch` | `'full'` ou `'prefix'` pour la correspondance |
| `**` | Route wildcard (page 404) |
| `RouterLink` | Directive pour les liens de navigation |
| `RouterOutlet` | Emplacement où le composant routé s'affiche |
| `title` | Titre de la page (onglet du navigateur) |

---

## 14 - Démo 06 - Les Pipes intégrés

Les **pipes** transforment les données dans le template. Angular fournit plusieurs pipes intégrés.

> Docs : [https://angular.dev/guide/pipes](https://angular.dev/guide/pipes)

### Générer le composant

```bash
ng g c features/demonstrations/demo06-pipes --skip-tests
```

### Le composant (`demo06-pipes.ts`)

```typescript
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-demo06-pipes',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    JsonPipe,
  ],
  templateUrl: './demo06-pipes.html',
  styleUrl: './demo06-pipes.css',
})
export class Demo06Pipes {
  now: Date = new Date();

  personne: User = {
    email: "quentin.geerts@bstorm.be",
    lastname: "Geerts",
    firstname: "Quentin"
  };
}
```

### Le template (`demo06-pipes.html`)

```html
<h2>Démonstration 06 - Les pipes (intégrés)</h2>

<h3>Syntaxe: </h3>
<code ngNonBindable>{{ expression | nomPipe }}</code>

<h3>Exemples</h3>

<h4>Chaînes de caractères:</h4>
<ul>
  <li>lowerCasePipe: {{ "couCou Les petitS LOUpS" | lowercase }}</li>
  <li>upperCasePipe: {{ "couCou Les petitS LOUpS" | uppercase }}</li>
  <li>titleCasePipe: {{ "couCou Les petitS LOUpS" | titlecase }}</li>
</ul>

<h4>Nombres:</h4>
<ul>
  <li>currencyPipe: {{ 1234.56 }}</li>
  <li>currencyPipe: {{ 1234.56 | currency }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'JPY' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' : 'symbol' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' : 'symbol-narrow' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' : 'code' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' : 'symbol' : '6.1-1' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'EUR' : 'code' : '1.2-2' : 'fr-BE' }}</li>
  <li>currencyPipe: {{ 1234.56 | currency : 'JPY' : 'symbol' : '' : 'ja-JP' }}</li>
</ul>

<p>Pareil pour DecimalPipe et PercentPipe. (plus simple: digitsInfo + locale)</p>

<h4>Date:</h4>
<ul>
  <li>datePipe: {{ now }}</li>
  <li>datePipe: {{ now | date }}</li>
  <li>datePipe: {{ now | date : 'dd/MM/yyyy HH:mm:ss' }}</li>
  <li>datePipe: {{ now | date : 'short' }}</li>
  <li>datePipe: {{ now | date : 'dd/MM/yyyy HH:mm:ss' : '+0230' }}</li>
  <li>datePipe: {{ now | date : 'EEEE dd MMMM yyyy HH:mm:ss' : '' : 'ja' }}</li>
</ul>

<h4>JSON:</h4>
<ul>
  <li>jsonPipe: {{ personne | json }}</li>
</ul>
```

### Pipes intégrés les plus courants

| Pipe | Syntaxe | Description |
|------|---------|-------------|
| `lowercase` | `{{ text \| lowercase }}` | Convertit en minuscules |
| `uppercase` | `{{ text \| uppercase }}` | Convertit en majuscules |
| `titlecase` | `{{ text \| titlecase }}` | Première lettre de chaque mot en majuscule |
| `currency` | `{{ price \| currency:'EUR':'symbol' }}` | Formate en devise |
| `date` | `{{ date \| date:'dd/MM/yyyy' }}` | Formate une date |
| `json` | `{{ object \| json }}` | Convertit en JSON (debug) |
| `decimal` | `{{ num \| number:'1.2-2' }}` | Formate un nombre décimal |
| `percent` | `{{ num \| percent }}` | Formate en pourcentage |

### Format des paramètres

```
{{ valeur | pipe : param1 : param2 : param3 }}
```

Pour `currency` : `{{ valeur | currency : 'CODE' : 'display' : 'digitsInfo' : 'locale' }}`

---

## 15 - Démo 07 - Les Custom Pipes

Vous pouvez créer vos propres pipes pour des transformations personnalisées.

> Docs : [https://angular.dev/guide/pipes/custom-pipes](https://angular.dev/guide/pipes/custom-pipes)

### Générer un pipe

```bash
ng g pipe shared/pipes/convert-to-dhms --skip-tests
```

### Pipe ConvertToDhms (`convert-to-dhms-pipe.ts`)

Convertit un nombre de secondes en format "X jours, X heures, X minutes, X secondes".

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToDhms',
})
export class ConvertToDhmsPipe implements PipeTransform {

  transform(value: number): string {

    if (value < 0) return value.toString();

    let nbDays = Math.floor(value / 86400);
    value = value % 86400;

    let nbHours = Math.floor(value / 3600);
    value = value % 3600;

    let nbMinutes = Math.floor(value / 60);
    value = value % 60;

    let format = "";

    format += nbDays + " " + (nbDays > 1 ? "jours" : "jour") + ", ";
    format += nbHours + " " + (nbHours > 1 ? "heures" : "heure") + ", ";
    format += nbMinutes + " " + (nbMinutes > 1 ? "minutes" : "minute") + ", ";
    format += value + " " + (value > 1 ? "secondes" : "seconde");

    return format;
  }
}
```

### Pipe Sum (`sum-pipe.ts`)

Calcule la somme d'un tableau de nombres avec un paramètre optionnel.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {

  transform(values: number[], initialValue: number): number {
    return values.reduce((value, acc) => acc + value, initialValue);
  }
}
```

### Le composant (`demo07-custom-pipes.ts`)

```typescript
import { Component } from '@angular/core';
import { ConvertToDhmsPipe } from "../../../shared/pipes/convert-to-dhms-pipe";
import { SumPipe } from "../../../shared/pipes/sum-pipe";

@Component({
  selector: 'app-demo07-custom-pipes',
  imports: [ConvertToDhmsPipe, SumPipe],
  templateUrl: './demo07-custom-pipes.html',
  styleUrl: './demo07-custom-pipes.css',
})
export class Demo07CustomPipes {
  time: number = 123456;
  values: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
```

### Le template (`demo07-custom-pipes.html`)

```html
<h2>Démonstration 07 - Les custom pipes</h2>

<h3>Exemple:</h3>

<h4>Convert To DHMS Pipe:</h4>
<p>Valeur d'origine: {{ time }} </p>
<p>Valeur convertie: {{ time | convertToDhms }}</p>

<h4>Sum</h4>
<p>Valeurs d'origine: {{ values }}</p>
<p>Somme: {{ values | sum : 0 }}</p>
```

### Structure d'un Custom Pipe

| Élément | Description |
|---------|-------------|
| `@Pipe({ name: 'xxx' })` | Décorateur qui définit le pipe |
| `name` | Nom utilisé dans le template avec `\|` |
| `implements PipeTransform` | Interface obligatoire |
| `transform(value, ...args)` | Méthode qui effectue la transformation |

---

## 16 - Exercice 05 - Chronomètre formaté

**Objectif** : Améliorer le chronomètre de l'exercice 03 en utilisant un custom pipe pour afficher le temps au format `MM:SS`.

### Générer le pipe

```bash
ng g pipe shared/pipes/chrono --skip-tests
```

### Le pipe Chrono (`chrono-pipe.ts`)

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chrono',
})
export class ChronoPipe implements PipeTransform {

  transform(value: number): string {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;

    let minFormat = minutes < 10 ? "0" + minutes : minutes;
    let secondsFormat = seconds < 10 ? "0" + seconds : seconds;

    return `${minFormat}:${secondsFormat}`;
  }
}
```

### Le composant (`exo05.ts`)

```typescript
import { Component, signal, WritableSignal } from '@angular/core';
import { ChronoPipe } from "../../../shared/pipes/chrono-pipe";

@Component({
  selector: 'app-exo05',
  imports: [ChronoPipe],
  templateUrl: './exo05.html',
  styleUrl: './exo05.css',
})
export class Exo05 {
  chrono: WritableSignal<number> = signal(59);
  timer?: number;

  increment() {
    this.chrono.update(value => value + 1);
  }

  startChrono() {
    if (this.timer !== undefined) return;
    this.timer = setInterval(() => this.increment(), 1000);
  }

  stopChrono() {
    clearInterval(this.timer);
    this.timer = undefined;
  }

  resetChrono() {
    this.stopChrono();
    this.chrono.set(0);
  }
}
```

### Le template (`exo05.html`)

```html
<h2>Exercice 05 - Le chronomètre formaté</h2>

<p>Chrono: {{ chrono() | chrono }}</p>

<button (click)="startChrono()" [disabled]="timer">Démarrer</button>
<button (click)="stopChrono()" [disabled]="!timer">Mettre en pause</button>
<button (click)="resetChrono()" [disabled]="!chrono()">Réinitialiser</button>
```

### Notions pratiquées

- Création d'un custom pipe
- Formatage avec padding (`"0" + value`)
- Template literals (`` `${min}:${sec}` ``)
- Utilisation d'un pipe sur un Signal

---

## 17 - Exercice 06 - Convertisseur de température

**Objectif** : Créer un convertisseur de température utilisant un pipe avec plusieurs paramètres et des Signals pour la réactivité.

### Générer le pipe

```bash
ng g pipe shared/pipes/temperature --skip-tests
```

### Le pipe Temperature (`temperature-pipe.ts`)

```typescript
import { Pipe, PipeTransform } from '@angular/core';

export type TemperatureType = "celsius" | "fahrenheit" | "kelvin";

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {

  transform(temperature: number, source: TemperatureType, destination: TemperatureType): string {

    const unitFormat = destination === "celsius"
      ? " °C" : destination === "fahrenheit"
      ? " °F" : " K";

    let result = 0;

    if (source === destination) return temperature + unitFormat;

    switch (source) {
      case "celsius":
        switch (destination) {
          case 'fahrenheit':
            result = (temperature * (9 / 5)) + 32;
            break;
          case 'kelvin':
            result = temperature + 273.15;
            break;
        }
        break;

      case "fahrenheit":
        switch (destination) {
          case 'celsius':
            result = (temperature - 32) * 5 / 9;
            break;
          case 'kelvin':
            result = (temperature - 32) * 5 / 9 + 273.15;
            break;
        }
        break;

      case 'kelvin':
        switch (destination) {
          case 'celsius':
            result = temperature - 273.15;
            break;
          case 'fahrenheit':
            result = (temperature - 273.15) * (9/5) + 32;
            break;
        }
        break;
    }

    return result.toFixed(2) + unitFormat;
  }
}
```

### Le composant (`exo06.ts`)

```typescript
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemperaturePipe, TemperatureType } from "../../../shared/pipes/temperature-pipe";

@Component({
  selector: 'app-exo06',
  imports: [FormsModule, TemperaturePipe],
  templateUrl: './exo06.html',
  styleUrl: './exo06.css',
})
export class Exo06 {
  temp: WritableSignal<number> = signal(0);
  unitSrc: WritableSignal<TemperatureType> = signal("celsius");
  unitDest: WritableSignal<TemperatureType> = signal("celsius");
}
```

### Le template (`exo06.html`)

```html
<h2>Exercice 06 - Convertisseur de degré</h2>

<div>
  <label for="temp">Température</label>
  <input type="number" name="temp" id="temp" [(ngModel)]="temp">
</div>

<div>
  <label for="source">Source:</label>
  <select name="source" id="source" [(ngModel)]="unitSrc">
    <option value="celsius">Celsius</option>
    <option value="fahrenheit">Fahrenheit</option>
    <option value="kelvin">Kelvin</option>
  </select>
</div>

<div>
  <label for="destination">Destination:</label>
  <select name="destination" id="destination" [(ngModel)]="unitDest">
    <option value="celsius">Celsius</option>
    <option value="fahrenheit">Fahrenheit</option>
    <option value="kelvin">Kelvin</option>
  </select>
</div>

<div>
  <p>{{ temp() | temperature : unitSrc() : unitDest() }}</p>
</div>
```

### Notions pratiquées

- Pipe avec plusieurs paramètres
- Type alias TypeScript (`type TemperatureType = ...`)
- Export de types depuis un fichier
- Signals avec `[(ngModel)]`
- Lecture de Signals dans un pipe : `temp()`, `unitSrc()`, `unitDest()`

---

## 18 - Démo 08 - Les directives de composant

Les **directives de composant** (`NgClass`, `NgStyle`) permettent d'appliquer dynamiquement des classes CSS ou des styles inline.

> Docs : [https://angular.dev/guide/directives](https://angular.dev/guide/directives)

### Générer le composant

```bash
ng g c features/demonstrations/demo08-component-directives --skip-tests
```

### Le composant (`demo08-component-directives.ts`)

```typescript
import { NgClass, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo08-component-directives',
  imports: [NgClass, NgStyle],
  templateUrl: './demo08-component-directives.html',
  styleUrl: './demo08-component-directives.css',
})
export class Demo08ComponentDirectives {
  italic: boolean = false;
  bold: boolean = false;
  color: boolean = false;

  toggleItalic() {
    this.italic = !this.italic;
  }

  toggleBold() {
    this.bold = !this.bold;
  }

  toggleColor() {
    this.color = !this.color;
  }
}
```

### Le template (`demo08-component-directives.html`)

```html
<h2>Démonstration 08 - Les directives de composant</h2>

<h3>Directive: NgClass</h3>

<h4>Avec ngClass (nécessite un import)</h4>
<p [ngClass]="{'fst-italic': italic, 'fw-bold': bold, 'text-primary': color}">
  Lorem ipsum dolor sit amet consectetur adipisicing elit...
</p>

<h4>Sous forme de Property Binding (sans import)</h4>
<p [class]="{'fst-italic': italic, 'fw-bold': bold, 'text-primary': color}">
  Lorem ipsum dolor sit amet consectetur adipisicing elit...
</p>

<button (click)="toggleItalic()">Toggle italic</button> {{ italic }}
<button (click)="toggleBold()">Toggle bold</button> {{ bold }}
<button (click)="toggleColor()">Toggle color</button> {{ color }}


<h3>Directive NgStyle</h3>

<h4>Avec ngStyle (nécessite un import)</h4>
<p [ngStyle]="{'color': 'green'}">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit...
</p>

<h4>Sous forme de Property Binding (sans import)</h4>
<p [style]="{'color': 'green'}">
  Lorem ipsum dolor sit amet consectetur, adipisicing elit...
</p>
```

### Comparaison NgClass vs [class]

| Directive | Import requis | Syntaxe |
|-----------|---------------|---------|
| `[ngClass]` | Oui (`NgClass`) | `[ngClass]="{'classe': condition}"` |
| `[class]` | Non | `[class]="{'classe': condition}"` |

### Comparaison NgStyle vs [style]

| Directive | Import requis | Syntaxe |
|-----------|---------------|---------|
| `[ngStyle]` | Oui (`NgStyle`) | `[ngStyle]="{'prop': 'value'}"` |
| `[style]` | Non | `[style]="{'prop': 'value'}"` |

> **Astuce** : Depuis Angular 15+, préférez `[class]` et `[style]` qui ne nécessitent pas d'import.

---

## 19 - Démo 09 - Les directives structurelles

Les **directives structurelles** modifient la structure du DOM en ajoutant ou supprimant des éléments.

> Docs : [https://angular.dev/guide/directives/structural-directives](https://angular.dev/guide/directives/structural-directives)

### Générer le composant

```bash
ng g c features/demonstrations/demo09-structural-directives --skip-tests
```

### Le composant (`demo09-structural-directives.ts`)

```typescript
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-demo09-structural-directives',
  imports: [NgIf],
  templateUrl: './demo09-structural-directives.html',
  styleUrl: './demo09-structural-directives.css',
})
export class Demo09StructuralDirectives {
  isShowed: boolean = true;

  toggleShowed() {
    this.isShowed = !this.isShowed;
  }
}
```

### Le template (`demo09-structural-directives.html`)

```html
<h2>Démonstration 09 - Les directives structurelles</h2>

<h3>Directive *ngIf</h3>

<h4>Ancienne version (sera retiré en Angular V22)</h4>

<button (click)="toggleShowed()">Montrer / Cacher</button>

<p *ngIf="isShowed">
  Lorem ipsum dolor sit amet consectetur adipisicing elit...
</p>

<h4>Nouvelle version (à partir de la V18)</h4>

@if (isShowed) {
<p>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit...
</p>
}
```

### Syntaxe Control Flow (Angular 17+)

Angular introduit une nouvelle syntaxe de "control flow" plus lisible :

| Ancienne syntaxe | Nouvelle syntaxe |
|------------------|------------------|
| `*ngIf="condition"` | `@if (condition) { }` |
| `*ngIf="cond; else tpl"` | `@if (cond) { } @else { }` |
| `*ngFor="let item of items"` | `@for (item of items; track item.id) { }` |
| `*ngSwitch` | `@switch (value) { @case (x) { } }` |

### Exemple avec @if / @else

```html
@if (isLoggedIn) {
  <p>Bienvenue, {{ username }}</p>
} @else {
  <p>Veuillez vous connecter</p>
}
```

### Exemple avec @for

```html
@for (item of items; track item.id) {
  <li>{{ item.name }}</li>
} @empty {
  <li>Aucun élément</li>
}
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `*ngIf` | Affiche/masque un élément selon une condition |
| `*ngFor` | Répète un élément pour chaque item d'une liste |
| `*ngSwitch` | Affiche un élément parmi plusieurs selon une valeur |
| `@if` | Nouvelle syntaxe conditionnelle (Angular 17+) |
| `@for` | Nouvelle syntaxe de boucle avec `track` obligatoire |
| `@switch` | Nouvelle syntaxe switch/case |

---

## 20 - Démo 10 - Les directives personnalisées

Une **directive personnalisée** (custom directive) permet de créer un comportement réutilisable que vous pouvez appliquer à n'importe quel élément HTML. Contrairement à un composant, une directive n'a pas de template.

> Docs : [https://angular.dev/guide/directives/attribute-directives](https://angular.dev/guide/directives/attribute-directives)

### Générer la directive

```bash
ng g directive shared/directives/highlight --skip-tests
```

### La directive (`shared/directives/highlight.ts`)

```typescript
import { Directive, effect, ElementRef, HostListener, inject, input, Input, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  // Nouvelle façon : déclarer les événements et bindings dans "host"
  host: {
    // Mapping des événements
    "(mouseleave)": "onMouseLeave()",

    // Mapping des classes CSS
    "[class.fst-italic]": 'italic()'
  }
})
export class Highlight {

  // Injection de l'élément DOM via inject()
  element: ElementRef = inject(ElementRef);

  defaultHighlight = "yellow";

  // Ancienne version : @Input() avec décorateur
  @Input() appHighlight: string = "";

  // Nouvelle version : input() comme fonction (signal-based)
  defaultColor = input("transparent");
  italic = input(true);

  constructor() {
    // effect() réagit aux changements de signaux
    effect(() => {
      console.log("Italic: ", this.italic());
    });
  }

  // Ancienne façon : @HostListener pour écouter des événements DOM
  @HostListener("mouseenter")
  onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = this.appHighlight || this.defaultHighlight;
  }

  // Nouvelle façon : déclaré dans le bloc "host" du décorateur
  onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = this.defaultColor();
  }
}
```

### Générer le composant de démonstration

```bash
ng g c features/demonstrations/demo10-custom-directives --skip-tests
```

### Le composant (`demo10-custom-directives.ts`)

```typescript
import { Component, signal, WritableSignal } from '@angular/core';
import { Highlight } from "../../../shared/directives/highlight";

@Component({
  selector: 'app-demo10-custom-directives',
  imports: [Highlight],
  templateUrl: './demo10-custom-directives.html',
  styleUrl: './demo10-custom-directives.css',
})
export class Demo10CustomDirectives {

  italic: WritableSignal<boolean> = signal(false);

  onClick() {
    this.italic.update(value => !value);
  }
}
```

### Le template (`demo10-custom-directives.html`)

```html
<h2>Démonstration 10 - Les directives personnalisées</h2>

<!-- Utilisation avec une couleur personnalisée -->
<p appHighlight="blue">
  Ce texte sera surligné en bleu au survol.
</p>

<!-- Utilisation avec une couleur par défaut personnalisée au départ -->
<p appHighlight defaultColor="chartreuse">
  Ce texte sera surligné en jaune au survol, puis chartreuse quand la souris quitte.
</p>

<!-- Utilisation avec binding sur italic -->
<p appHighlight [italic]="italic()">
  Ce texte peut devenir italique dynamiquement.
</p>

<button (click)="onClick()">Italic ?</button>
```

### Ce qu'il faut retenir

| Concept | Description |
|---------|-------------|
| `@Directive` | Décorateur qui crée une directive (sans template) |
| `selector: '[appHighlight]'` | Sélecteur d'attribut (entre crochets) |
| `ElementRef` | Référence vers l'élément DOM natif |
| `inject(ElementRef)` | Injection de dépendance via la fonction `inject()` |
| `@HostListener("event")` | Ancienne façon d'écouter les événements de l'hôte |
| `host: { "(event)": "fn()" }` | Nouvelle façon de déclarer les événements |
| `host: { "[class.x]": "expr" }` | Binding de classe CSS sur l'élément hôte |
| `input()` | Nouvelle façon de déclarer un Input (signal-based) |
| `effect()` | Exécute du code quand un signal change de valeur |

### Différences entre Composant et Directive

| | Composant | Directive |
|-|-----------|-----------|
| Template | Oui (`templateUrl`) | Non |
| Décorateur | `@Component` | `@Directive` |
| Sélecteur | Élément (`app-xxx`) | Attribut (`[appXxx]`) |
| Usage | Brique visuelle | Comportement réutilisable |

---

## 21 - Démo 11 - Communication entre composants

La **communication entre composants** est essentielle pour construire des applications modulaires. Angular propose deux mécanismes principaux :
- **`@Input()` / `input()`** : le parent envoie des données vers l'enfant
- **`@Output()` / `output()`** : l'enfant envoie des événements vers le parent

> Docs : [https://angular.dev/guide/components/inputs](https://angular.dev/guide/components/inputs) et [https://angular.dev/guide/components/outputs](https://angular.dev/guide/components/outputs)

### Générer les composants

```bash
ng g c features/demonstrations/demo11-communication-composants --skip-tests
ng g c features/demonstrations/demo11-communication-composants/enfant --skip-tests
```

### Le composant enfant (`enfant/enfant.ts`)

C'est le composant enfant qui déclare ses entrées (`input`) et ses sorties (`output`) :

```typescript
import { Component, EventEmitter, Input, input, InputSignal, output, Output, OutputEmitterRef, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enfant',
  imports: [FormsModule],
  templateUrl: './enfant.html',
  styleUrl: './enfant.css',
})
export class Enfant {

  // ====== RECEVOIR des données du parent ======

  // Ancienne façon : décorateur @Input()
  @Input() valueFromParentDecorator: string = "";

  // Nouvelle façon : fonction input() (signal-based)
  valueFromParentSignal: InputSignal<string> = input("");

  // ====== ENVOYER des données au parent ======

  // Ancienne façon : décorateur @Output() + EventEmitter
  @Output() valueEmitted: EventEmitter<string> = new EventEmitter();

  // Nouvelle façon : fonction output()
  valueEmittedSignal: OutputEmitterRef<string> = output();

  // Valeurs locales
  value = "";
  valueSignal = signal("");

  sendToParent() {
    // Émettre via l'ancienne façon
    this.valueEmitted.emit(this.value);
    // Émettre via la nouvelle façon
    this.valueEmittedSignal.emit(this.valueSignal());
  }
}
```

### Le template enfant (`enfant/enfant.html`)

```html
<h3>Composant enfant</h3>

<!-- Lecture des valeurs reçues du parent -->
<p>Valeur provenant du parent (décorateur): {{ valueFromParentDecorator }}</p>
<p>Valeur provenant du parent (signal): {{ valueFromParentSignal() }}</p>

<!-- Champs pour envoyer des données au parent -->
<input type="text" [(ngModel)]="value" (input)="sendToParent()">
<input type="text" [(ngModel)]="valueSignal" (input)="sendToParent()">
```

### Le composant parent (`demo11-communication-composants.ts`)

```typescript
import { Component } from '@angular/core';
import { Enfant } from "./enfant/enfant";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo11-communication-composants',
  imports: [FormsModule, Enfant],
  templateUrl: './demo11-communication-composants.html',
  styleUrl: './demo11-communication-composants.css',
})
export class Demo11CommunicationComposants {

  value: string = "J'ai faim";
  valueFromChild: string = "";
  valueFromChildSignal: string = "";

  receiveValue($event: string) {
    this.valueFromChild = $event;
  }
}
```

### Le template parent (`demo11-communication-composants.html`)

```html
<h2>Démonstration 11 - Communication entre composants</h2>

<div>
  <h3>Composant parent</h3>
  <input type="text" [(ngModel)]="value">
  <p>Message provenant de l'enfant: {{ valueFromChild }}</p>
  <p>Message provenant de l'enfant (signal): {{ valueFromChildSignal }}</p>
</div>

<div>
  <!-- Utilisation du composant enfant avec bindings -->
  <app-enfant
    [valueFromParentDecorator]="value"
    [valueFromParentSignal]="value"
    (valueEmitted)="valueFromChild = $event"
    (valueEmittedSignal)="valueFromChildSignal = $event"
  />
</div>
```


### Comparaison ancienne vs nouvelle syntaxe

| Action | Ancienne syntaxe (décorateurs) | Nouvelle syntaxe (signal-based) |
|--------|-------------------------------|-------------------------------|
| Recevoir du parent | `@Input() prop: string = ""` | `prop = input("")` |
| Type du signal d'input | — | `InputSignal<string>` |
| Lire la valeur | `this.prop` | `this.prop()` (comme un signal) |
| Envoyer au parent | `@Output() evt = new EventEmitter<string>()` | `evt = output<string>()` |
| Type de l'output | `EventEmitter<T>` | `OutputEmitterRef<T>` |
| Émettre | `this.evt.emit(value)` | `this.evt.emit(value)` |

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `@Input()` | Décorateur pour recevoir des données du parent |
| `input()` | Fonction signal-based pour recevoir des données du parent |
| `@Output()` | Décorateur pour émettre des événements vers le parent |
| `output()` | Fonction signal-based pour émettre des événements |
| `EventEmitter<T>` | Classe pour émettre des événements typés |
| `OutputEmitterRef<T>` | Type retourné par `output()` |
| `.emit(value)` | Envoie une valeur au parent |
| `(event)="handler($event)"` | Écoute un événement émis par l'enfant |

---

## 22 - Exercice 07 - Gestion des produits

**Objectif** : Mettre en pratique la communication entre composants en créant une application de gestion de produits avec un composant parent, un composant liste et un composant formulaire.

### Créer le modèle Product

Créez le fichier `src/app/shared/models/product.model.ts` :

```typescript
export interface Product {
  name: string;
  price: number;
}
```

### Générer les composants

```bash
ng g c features/exercices/exo07 --skip-tests
ng g c features/exercices/exo07/list-products --skip-tests
ng g c features/exercices/exo07/add-product --skip-tests
```

### Le composant parent (`exo07.ts`)

Le parent gère la liste de produits et orchestre la communication entre les enfants :

```typescript
import { Component } from '@angular/core';
import { ListProducts } from "./list-products/list-products";
import { AddProduct } from "./add-product/add-product";
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-exo07',
  imports: [ListProducts, AddProduct],
  templateUrl: './exo07.html',
  styleUrl: './exo07.css',
})
export class Exo07 {

  products: Product[] = [
    { name: 'Pomme', price: 1.2 },
    { name: 'Poire', price: 1.23 },
    { name: 'Cerise', price: 3.23 },
  ];

  addToProducts($event: Product) {
    this.products.push($event);
  }
}
```

### Le template parent (`exo07.html`)

```html
<h2>Exercice 07 - Gestion des produits</h2>

<div class="container-fluid">
  <div class="row">
    <div class="col">
      <!-- La liste reçoit les produits via @Input -->
      <app-list-products [productsToDisplay]="products" />
    </div>
    <div class="col">
      <!-- Le formulaire émet un produit via @Output -->
      <app-add-product (createdProduct)="addToProducts($event)" />
    </div>
  </div>
</div>
```

### Le composant liste (`list-products/list-products.ts`)

Ce composant **reçoit** les produits du parent via `input()` :

```typescript
import { Component, input } from '@angular/core';
import { Product } from '../../../../shared/models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-products',
  imports: [CurrencyPipe],
  templateUrl: './list-products.html',
  styleUrl: './list-products.css',
})
export class ListProducts {

  // input() signal-based pour recevoir les données du parent
  productsToDisplay = input<Product[]>([]);
}
```

### Le template liste (`list-products/list-products.html`)

```html
<h3>Liste des produits:</h3>

<table class="table table-striped table-hover">
  <tr>
    <th>Nom</th>
    <th>Prix</th>
  </tr>
  @for (product of productsToDisplay(); track product.name) {
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.price | currency : 'EUR' : 'symbol' : '1.2-2' : 'fr-BE' }}</td>
  </tr>
  }
  @empty {
    <tr>
      <td colspan="2">Aucun produit présent.</td>
    </tr>
  }
</table>
```

### Le composant formulaire (`add-product/add-product.ts`)

Ce composant **émet** un nouveau produit vers le parent via `output()` :

```typescript
import { Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../shared/models/product.model';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {

  // Output pour envoyer le produit créé au parent
  createdProduct: OutputEmitterRef<Product> = output<Product>();

  // Propriétés du formulaire (signals)
  productName: WritableSignal<string> = signal("");
  productPrice = signal(0);

  createProduct() {
    const newProduct: Product = {
      name: this.productName(),
      price: this.productPrice()
    };

    // Réinitialiser le formulaire
    this.productName.set("");
    this.productPrice.set(0);

    // Émettre le produit au parent
    this.createdProduct.emit(newProduct);
  }
}
```

### Le template formulaire (`add-product/add-product.html`)

```html
<h3>Ajouter un produit :</h3>
<div class="mb-3">
  <label class="form-label" for="product-name">Nom du produit:</label>
  <input class="form-control" type="text" name="product-name" id="product-name" [(ngModel)]="productName">
</div>
<div class="mb-3">
  <label class="form-label" for="product-price">Prix du produit:</label>
  <input class="form-control" type="text" name="product-price" id="product-price" [(ngModel)]="productPrice">
</div>

<div class="mb-3">
  <button class="btn btn-dark" (click)="createProduct()">Créer le produit</button>
</div>
```

### Notions pratiquées

- Communication parent → enfant avec `input()` (signal-based)
- Communication enfant → parent avec `output()` et `.emit()`
- Architecture en composants imbriqués (parent + 2 enfants)
- `@for` avec `track` pour itérer sur un tableau
- `@empty` pour gérer le cas d'une liste vide
- `CurrencyPipe` pour formater les prix
- Signals dans les formulaires avec `[(ngModel)]`

---

## 23 - Démo 12 - Les services et l'injection de dépendances

Un **service** est une classe TypeScript qui encapsule de la logique métier ou des données partagées entre composants. Angular utilise l'**injection de dépendances** (DI) pour fournir automatiquement les instances de services aux composants qui en ont besoin.

> Docs : [https://angular.dev/guide/di](https://angular.dev/guide/di)

### Pourquoi utiliser un service ?

| Problème | Solution avec un service |
|----------|-------------------------|
| Dupliquer la même logique dans plusieurs composants | Centraliser dans un service |
| Partager des données entre composants non liés | Le service sert de "source de vérité" |
| Séparer la logique métier de l'affichage | Le composant gère l'UI, le service gère la logique |

### Générer un service

```bash
ng g service core/services/authentication --skip-tests
```

> **Convention** : Les services se placent dans le dossier `core/services/`.

### Le service (`core/services/authentication.ts`)

```typescript
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',  // Disponible partout dans l'application (singleton)
})
export class Authentication {

  // Signal privé pour stocker l'état de connexion
  private isConnected = signal(true);

  // Getter qui expose le signal en lecture seule
  get status() {
    return this.isConnected;
  }

  login() {
    this.isConnected.set(true);
  }

  logout() {
    this.isConnected.set(false);
  }
}
```

### Générer le composant de démonstration

```bash
ng g c features/demonstrations/demo12-services-di --skip-tests
```

### Le composant (`demo12-services-di.ts`)

```typescript
import { Component, inject } from '@angular/core';
import { Authentication } from '../../../core/services/authentication';

@Component({
  selector: 'app-demo12-services-di',
  imports: [],
  templateUrl: './demo12-services-di.html',
  styleUrl: './demo12-services-di.css',
})
export class Demo12ServicesDi {

  // Injection du service via inject()
  private _authenticationService: Authentication = inject(Authentication);

  // Lecture de l'état depuis le service
  isConnected: boolean = this._authenticationService.status();

  login() {
    this._authenticationService.login();
    this.isConnected = this._authenticationService.status();
  }

  logout() {
    this._authenticationService.logout();
    this.isConnected = this._authenticationService.status();
  }
}
```

### Le template (`demo12-services-di.html`)

```html
<h2>Démonstration 12 - Services et DI</h2>

<div class="container-fluid">
  <p>État de connexion: {{ isConnected }}</p>
  <button (click)="login()" class="btn btn-dark">Se connecter</button>
  <button (click)="logout()" class="btn btn-dark">Se déconnecter</button>
</div>
```

### Utilisation du service dans la Navbar

Le même service peut être utilisé dans un autre composant. Comme il est `providedIn: 'root'`, c'est **la même instance** (singleton) :

```typescript
// navbar.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Authentication } from '../../../core/services/authentication';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private _authenticationService: Authentication = inject(Authentication);
  isConnected: boolean = this._authenticationService.status();
}
```

```html
<!-- navbar.html (extrait) -->
<div>
  État de connexion: {{ isConnected }}
</div>
```

> Quand on se connecte/déconnecte dans la démo 12, l'état est aussi visible dans la navbar car le service est partagé !

### Ce qu'il faut retenir

| Concept | Description |
|---------|-------------|
| `@Injectable()` | Décorateur qui marque une classe comme injectable |
| `providedIn: 'root'` | Le service est un **singleton** disponible partout |
| `inject(Service)` | Injecte une instance du service (nouvelle façon) |
| `constructor(private svc: Service)` | Injection via le constructeur (ancienne façon) |
| Singleton | Une seule instance partagée dans toute l'application |
| Séparation des responsabilités | Composant = UI, Service = logique métier/données |

### Injection de dépendances : comment ça marche ?

```
1. Le composant demande un service  →  inject(Authentication)
2. Angular cherche un fournisseur   →  providedIn: 'root'
3. Angular crée OU réutilise        →  Singleton (une seule instance)
   l'instance du service
4. L'instance est injectée           →  this._authenticationService
   dans le composant
```

---

## 25 - Démo 13 - Les Formulaires Réactifs

Les **formulaires réactifs** (_Reactive Forms_) offrent une approche programmatique pour créer et gérer des formulaires. Contrairement à l'approche template (`ngModel`), toute la logique réside dans la classe TypeScript.

> Docs : [https://angular.dev/guide/forms/reactive-forms](https://angular.dev/guide/forms/reactive-forms)

### Générer le composant

```bash
ng g c features/demonstrations/demo13-reactive-forms --skip-tests
```

### Les 4 briques fondamentales

| Classe | Description |
|--------|-------------|
| `FormControl` | Représente un seul champ de formulaire |
| `FormGroup` | Groupe de `FormControl` (un objet) |
| `FormArray` | Liste dynamique de contrôles |
| `FormBuilder` | Service raccourci pour créer des formulaires |

### 1. FormControl — champ unique

```typescript
import { FormControl, Validators } from '@angular/forms';

// Valeur initiale + liste de validateurs
email = new FormControl<string>('', [Validators.email, Validators.required]);
```

```html
<!-- [formControl] lie directement un FormControl à un input -->
<input [formControl]="email">

@if (email.invalid && email.touched) {
  <span class="text-danger">Email invalide</span>
}
```

### 2. FormGroup — groupe de champs

```typescript
import { FormControl, FormGroup, Validators } from '@angular/forms';

catFormGroup: FormGroup = new FormGroup({
  catName:      new FormControl(null, [Validators.required]),
  catNbPaws:    new FormControl(4),
  catMainColor: new FormControl(null, [Validators.required])
});

onSubmitCatForm() {
  if (this.catFormGroup.invalid) return;  // Ne pas soumettre si invalide
  console.log(this.catFormGroup.value);   // { catName: '...', ... }
}
```

```html
<!-- [formGroup] lie le FormGroup au <form> -->
<form [formGroup]="catFormGroup" (ngSubmit)="onSubmitCatForm()">

  <!-- formControlName lie l'input à un contrôle du groupe par son nom -->
  <input formControlName="catName">

  @if (catFormGroup.get('catName')?.invalid && catFormGroup.get('catName')?.touched) {
    <div class="text-danger">Le nom est requis</div>
  }

  <input formControlName="catNbPaws" type="number">
  <button type="submit">Soumettre</button>
</form>
```

### 3. FormBuilder — syntaxe raccourcie

`FormBuilder` est un service qui simplifie la création de formulaires :

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

private readonly _fb: FormBuilder = inject(FormBuilder);

// Équivalent à : new FormGroup({ nom: new FormControl(null, []) })
userForm: FormGroup = this._fb.group({
  lastname:  [null, []],
  firstname: [null, []],

  // FormGroup imbriqué (adresse)
  address: this._fb.group({
    street: [null, []],
    city:   [null, []]
  })
});
```

```html
<form [formGroup]="userForm">
  <input formControlName="lastname">

  <!-- formGroupName pour les groupes imbriqués -->
  <div formGroupName="address">
    <input formControlName="street">
    <input formControlName="city">
  </div>
</form>
```

### 4. FormArray — champs dynamiques

```typescript
import { FormArray, FormBuilder, Validators } from '@angular/forms';

profileForm: FormGroup = this._fb.group({
  spokenLanguages: this._fb.array([
    this._fb.control(null)  // Un champ initial
  ])
});

// Getter pour accéder au FormArray facilement
get spokenLanguages(): FormArray {
  return this.profileForm.get("spokenLanguages") as FormArray;
}

addLanguageField() {
  this.spokenLanguages.push(this._fb.control(null, [Validators.required]));
}

removeLanguageField(index: number) {
  if (this.spokenLanguages.length === 1) return;
  this.spokenLanguages.removeAt(index);
}
```

```html
<div formArrayName="spokenLanguages">
  @for (ctrl of spokenLanguages.controls; track $index) {
    <div>
      <input [formControlName]="$index">
      <button type="button" (click)="removeLanguageField($index)">Retirer</button>
    </div>
  }
</div>
<button type="button" (click)="addLanguageField()">Ajouter une langue</button>
```

### Validators intégrés

| Validator | Description |
|-----------|-------------|
| `Validators.required` | Champ obligatoire |
| `Validators.email` | Format email valide |
| `Validators.minLength(n)` | Longueur minimale |
| `Validators.maxLength(n)` | Longueur maximale |
| `Validators.min(n)` | Valeur numérique minimale |
| `Validators.max(n)` | Valeur numérique maximale |
| `Validators.pattern(regex)` | Correspondance avec une expression régulière |

### Méthodes de formulaire

| Méthode | Description |
|---------|-------------|
| `form.value` | Objet avec les valeurs actuelles |
| `form.valid` / `form.invalid` | État de validation global |
| `form.reset()` | Remet tout à `null` |
| `form.reset({ champ: 'val' })` | Remet avec valeurs par défaut |
| `form.patchValue({...})` | Remplit partiellement (champs inconnus ignorés) |
| `form.setValue({...})` | Remplit entièrement (tous les champs requis) |
| `control.errors` | Objet des erreurs actives (`null` si valide) |
| `control.touched` | L'utilisateur a quitté le champ au moins une fois |
| `control.dirty` | La valeur a été modifiée au moins une fois |

### Validator personnalisé — cross-field (vérification entre champs)

Un validator posé sur un `FormGroup` peut comparer plusieurs champs entre eux :

```typescript
// shared/validators/password-match.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
  passwordFieldName: string = "password",
  confirmPasswordFieldName: string = "confirmPassword"
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordFieldName);
    const confirm  = control.get(confirmPasswordFieldName);

    if (password?.value !== confirm?.value) {
      return { passwordMismatch: 'Les mots de passe ne correspondent pas.' };
    }
    return null;  // null = valide
  };
}
```

Utilisation dans un `FormGroup` avec `FormBuilder` :

```typescript
profileForm: FormGroup = this._fb.group({
  passwords: this._fb.group({
    password:        [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, []]
  }, {
    validators: [passwordMatchValidator()]  // Validator posé sur le groupe
  })
});
```

```html
@if (profileForm.get('passwords')?.errors?.['passwordMismatch']) {
  <span class="text-danger">Les mots de passe ne correspondent pas.</span>
}
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `FormControl` | Champ individuel avec valeur et validateurs |
| `FormGroup` | Groupe de contrôles (y compris imbriqués) |
| `FormBuilder` | Service de création de formulaires avec `[]` |
| `FormArray` | Tableau de contrôles dynamique |
| `[formGroup]` | Lie un FormGroup à un `<form>` |
| `formControlName` | Lie un champ HTML à un FormControl par nom |
| `formGroupName` | Lie un sous-groupe dans le template |
| `formArrayName` | Lie un FormArray dans le template |
| `Validators` | Collection de validateurs intégrés |
| `ValidatorFn` | Interface pour créer des validateurs personnalisés |
| Validator cross-field | Posé sur un `FormGroup`, compare plusieurs champs |

---

## 26 - Démo 14 - Routing avancé

Le **routing avancé** couvre la navigation programmatique, les **paramètres de route** (`:id`) et les **query parameters** (`?key=value`).

> Docs : [https://angular.dev/guide/routing/router-reference](https://angular.dev/guide/routing/router-reference)

### Générer le composant

```bash
ng g c features/demonstrations/demo14-advanced-routing --skip-tests
```

### Configuration de la route avec paramètre

```typescript
// demonstrations.routes.ts
{
  path: 'demo14',
  loadComponent: () => import("./demo14-advanced-routing/demo14-advanced-routing")
    .then(c => c.Demo14AdvancedRouting)
},
{
  path: 'demo14/:id',   // :id est un paramètre de route dynamique
  loadComponent: () => import("./demo14-advanced-routing/demo14-advanced-routing")
    .then(c => c.Demo14AdvancedRouting)
},
```

### Le composant (`demo14-advanced-routing.ts`)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ /* ... */ })
export class Demo14AdvancedRouting implements OnInit {

  // Router : navigue vers d'autres routes
  private readonly _router: Router = inject(Router);

  // ActivatedRoute : lit les informations de la route active
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  id!: number;
  person!: { lastname: string, firstname: string };

  ngOnInit(): void {
    // Lire un paramètre de route (:id)
    if (this._activatedRoute.snapshot.params["id"]) {
      this.id = this._activatedRoute.snapshot.params["id"];
    }

    // Lire des query parameters (?lastname=...&firstname=...)
    if (this._activatedRoute.snapshot.queryParams["lastname"]) {
      const { lastname, firstname } = this._activatedRoute.snapshot.queryParams;
      this.person = { lastname, firstname };
    }
  }

  // Navigation simple (tableau de segments → /demonstrations/demo14/routage)
  navigate() {
    this._router.navigate(["demonstrations", "demo14", "routage"]);
    // Équivalent : this._router.navigateByUrl("/demonstrations/demo14/routage");
  }

  // Navigation avec paramètre de route → /demonstrations/demo14/42
  navigateWithParams() {
    this._router.navigate(["demonstrations", "demo14", 42]);
  }

  // Navigation avec query parameters → /demonstrations/demo14?lastname=Geerts&firstname=Quentin
  navigateWithQueryParams() {
    this._router.navigate(["demonstrations", "demo14"], {
      queryParams: { lastname: "Geerts", firstname: "Quentin", age: 29 }
    });
  }
}
```

### Comparaison params vs queryParams

| | Paramètre de route | Query Parameter |
|--|-------------------|-----------------|
| Syntaxe URL | `/demo14/42` | `/demo14?id=42` |
| Déclaration route | `path: 'demo14/:id'` | `path: 'demo14'` |
| Lecture | `snapshot.params["id"]` | `snapshot.queryParams["id"]` |
| Obligatoire ? | Oui (fait partie de la route) | Non (optionnel) |
| Usage typique | Identifiant d'une ressource | Filtres, tri, pagination |

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `Router` | Service de navigation programmatique |
| `router.navigate([...])` | Navigation par tableau de segments |
| `router.navigateByUrl('/...')` | Navigation par URL complète |
| `ActivatedRoute` | Informations sur la route actuellement active |
| `snapshot.params` | Paramètres de route (`/:id`) |
| `snapshot.queryParams` | Paramètres de requête (`?key=value`) |
| `{ queryParams: {...} }` | Passer des query params lors de la navigation |

---

## 27 - Démo 15 - Les Guards

Les **guards** protègent les routes. `canActivate` bloque l'accès si une condition n'est pas remplie, `canDeactivate` demande confirmation avant de quitter une page.

> Docs : [https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)

### Générer les composants

```bash
ng g c features/demonstrations/demo15-guards --skip-tests
ng g c features/demonstrations/demo15-guards/demo15-secret --skip-tests
```

### Guard canActivate (`core/guards/auth.guard.ts`)

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FakeAuthenticationService } from '../services/fake-authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Retourne true → accès autorisé
  // Retourne une redirection → accès refusé + redirection
  return inject(FakeAuthenticationService).status()
    ? true
    : inject(Router).navigate(["demonstrations", "demo12"]);
};
```

### Guard canDeactivate (`core/guards/confirm.guard.ts`)

```typescript
import { CanDeactivateFn } from '@angular/router';

export const confirmGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return confirm("Es-tu sûr de vouloir partir ?");
};
```

### Configuration dans les routes

```typescript
// demonstrations.routes.ts
{
  path: 'demo15-secret',
  canActivate:   [authGuard],      // Vérifie avant d'activer la route
  canDeactivate: [confirmGuard],   // Vérifie avant de quitter la route
  loadComponent: () => import("./demo15-guards/demo15-secret/demo15-secret")
    .then(c => c.Demo15Secret)
},
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `CanActivateFn` | Fonction guard pour protéger l'accès à une route |
| `CanDeactivateFn` | Fonction guard pour protéger le départ d'une route |
| `canActivate: [guard]` | Configure un guard d'accès sur une route |
| `canDeactivate: [guard]` | Configure un guard de sortie sur une route |
| Retour `true` | Accès / départ autorisé |
| Retour `false` ou redirection | Accès / départ refusé |
| `inject()` dans un guard | L'injection de dépendances fonctionne dans les fonctions |

---

## 28 - Démo 16 - Les Resolvers

Un **resolver** permet de **précharger des données** avant qu'un composant ne soit activé. Ainsi, le composant reçoit ses données dès son initialisation, sans état de chargement intermédiaire.

> Docs : [https://angular.dev/guide/routing/common-router-tasks#resolve-pre-fetching-component-data](https://angular.dev/guide/routing/common-router-tasks#resolve-pre-fetching-component-data)

### Le resolver (`core/resolvers/user-resolver.ts`)

```typescript
import { ResolveFn } from '@angular/router';
import { UserWithId } from '../../shared/models/user.model';

export const userResolver: ResolveFn<UserWithId | null> = (route, state) => {

  const users: UserWithId[] = [
    { id: 1, email: 'quentin.geerts@bstorm.be', lastname: 'Geerts', firstname: 'Quentin' },
    { id: 2, email: 'john.doe@scoobydoo.be',    lastname: 'Doe',    firstname: 'John' },
  ];

  const id = +route.params["id"];

  if (!users.some(u => u.id === id)) return null;

  return users.find(u => u.id === id)!;
  // En pratique, on appellerait un service : inject(UserService).getById(id)
};
```

### Configuration dans les routes

```typescript
// demonstrations.routes.ts
{
  path: 'demo16/:id',
  resolve: {
    data: userResolver   // Angular exécute le resolver AVANT d'activer le composant
  },
  loadComponent: () => import("./demo16-resolvers/demo16-resolvers")
    .then(c => c.Demo16Resolvers)
},
```

### Le composant (`demo16-resolvers.ts`)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserWithId } from '../../../shared/models/user.model';

@Component({ /* ... */ })
export class Demo16Resolvers implements OnInit {

  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  user!: UserWithId;

  ngOnInit(): void {
    // Les données résolues sont disponibles dans snapshot.data sous la clé configurée
    this.user = this._activatedRoute.snapshot.data["data"];
  }

  navigateTo(userId: number) {
    // La navigation vers une autre route (et donc un autre userId) relance le resolver
    this._router.navigate(["demonstrations", "demo16", userId]);
  }
}
```

### Modèle mis à jour (`shared/models/user.model.ts`)

```typescript
export interface User {
  email: string;
  lastname: string;
  firstname: string;
}

// Extend : hérite des propriétés de User et en ajoute
export interface UserWithId extends User {
  id: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignUp {
  email: string;
  password: string;
  lastname?: string;
  firstname?: string;
}
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `ResolveFn<T>` | Type d'une fonction resolver |
| `resolve: { clé: resolver }` | Configure le resolver dans la route |
| `snapshot.data["clé"]` | Accès aux données résolues dans le composant |
| `extends` (interface) | Héritage d'interface : `UserWithId extends User` |
| Avantage du resolver | Le composant n'a pas besoin de gérer l'état "en cours de chargement" |

---

## 29 - Démo 17 - Les Observables (RxJS)

Les **Observables** de la librairie **RxJS** sont le mécanisme de réactivité historique d'Angular. Ils représentent un flux de valeurs émises dans le temps.

> Docs : [https://angular.dev/guide/signals/rxjs-interop](https://angular.dev/guide/signals/rxjs-interop)
> RxJS : [https://rxjs.dev](https://rxjs.dev)

### Service avec BehaviorSubject (`core/services/fake-auth.service.ts`)

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FakeAuthService {

  private _isConnected: boolean = false;

  // BehaviorSubject : Observable spécial qui :
  // 1. Retient sa dernière valeur
  // 2. L'émet immédiatement à tout nouveau subscriber
  authentication$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this._isConnected);

  login() {
    this._isConnected = true;
    this.authentication$.next(this._isConnected);  // Émet la nouvelle valeur
  }

  logout() {
    this._isConnected = false;
    this.authentication$.next(this._isConnected);
  }
}
```

### Le composant (`demo17-observables.ts`)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { FakeAuthService } from '../../../core/services/fake-auth.service';

@Component({ /* ... */ })
export class Demo17Observables implements OnInit {

  private readonly _authService: FakeAuthService = inject(FakeAuthService);

  isConnected!: boolean;

  ngOnInit(): void {
    // .subscribe() s'exécute à chaque fois qu'une nouvelle valeur est émise
    this._authService.authentication$.subscribe({
      next: (value: boolean) => {
        this.isConnected = value;
      }
    });
  }
}
```

### Observables vs Signals

| | Observable (RxJS) | Signal (Angular) |
|--|-------------------|-----------------|
| Paradigme | Flux asynchrone | Valeur réactive synchrone |
| Lecture | `.subscribe({ next: v => ... })` | `monSignal()` |
| Création | `new BehaviorSubject(val)` | `signal(val)` |
| Émission | `.next(valeur)` | `.set(valeur)` |
| Dans le template | `AsyncPipe` ou `subscribe` | `monSignal()` directement |
| Unsubscribe requis ? | Oui (risque de fuite mémoire) | Non |
| Opérateurs | `map`, `filter`, `mergeMap`... | `computed()`, `effect()` |
| Usage typique HTTP | `HttpClient` retourne des Observables | `httpResource()` retourne des Signaux |

### Convention de nommage

Par convention, les variables Observable sont suffixées par `$` :

```typescript
authentication$: BehaviorSubject<boolean>;
products$: Observable<Product[]>;
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `Observable<T>` | Flux de valeurs (0 à n) émises dans le temps |
| `BehaviorSubject<T>` | Observable qui retient et réémet sa dernière valeur |
| `.next(value)` | Émet une nouvelle valeur dans un Subject |
| `.subscribe({ next })` | S'abonne pour réagir aux émissions |
| Convention `$` | Suffixe pour les variables de type Observable |

---

## 30 - Exercice 08 - Gestion des produits avec service

**Objectif** : Reprendre l'exercice 07 en déplaçant la logique de données dans un **service**. Le composant ne s'occupe que de l'affichage ; le service gère les données.

### Générer le service et les composants

```bash
ng g service core/services/products --skip-tests
ng g c features/exercices/exo08 --skip-tests
ng g c features/exercices/exo08/exo08-list --skip-tests
ng g c features/exercices/exo08/exo08-add --skip-tests
```

### Le service (`core/services/products.service.ts`)

```typescript
import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private _products: Product[] = [
    { name: 'Pomme', price: 1.2 },
    { name: 'Poire', price: 1.23 },
  ];

  getProducts(): Product[] {
    return this._products;
  }

  addProduct(product: Product): void {
    this._products.push(product);
  }

  removeProduct(index: number): void {
    this._products.splice(index, 1);
  }
}
```

### Le composant parent (`exo08.ts`)

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { Exo08List } from "./exo08-list/exo08-list";
import { Exo08Add } from "./exo08-add/exo08-add";
import { Product } from '../../../shared/models/product.model';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-exo08',
  imports: [Exo08List, Exo08Add],
  templateUrl: './exo08.html',
  styleUrl: './exo08.css',
})
export class Exo08 implements OnInit {

  private readonly _productsService: ProductsService = inject(ProductsService);
  products: Product[] = [];

  ngOnInit(): void {
    // Chargement initial depuis le service
    this.products = this._productsService.getProducts();
  }

  addToProducts(newProduct: Product) {
    this._productsService.addProduct(newProduct);
    this.products = this._productsService.getProducts(); // Mise à jour de la vue
  }

  removeToProducts(index: number) {
    this._productsService.removeProduct(index);
    this.products = this._productsService.getProducts();
  }
}
```

### Notions pratiquées

- Séparation des responsabilités : **service** = données, **composant** = affichage
- `ngOnInit` pour charger les données au démarrage
- Communication parent ↔ enfants avec `input()` et `output()`
- `output<number>()` pour transmettre un index de suppression

---

## 31 - Démo 18 - HttpClient

**HttpClient** permet d'effectuer des requêtes HTTP vers une API. Il retourne des **Observables**.

> Docs : [https://angular.dev/guide/http](https://angular.dev/guide/http)

### Configurer HttpClient (`app.config.ts`)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ← Importer
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()   // ← Activer HttpClient dans toute l'application
  ]
};
```

### Générer le service et les composants

```bash
ng g service core/services/product-httpclient --skip-tests
ng g c features/demonstrations/demo18-httpclient --skip-tests
ng g c features/demonstrations/demo18-httpclient/product-details --skip-tests
ng g c features/demonstrations/demo18-httpclient/product-create --skip-tests
```

### Modèle étendu (`shared/models/product.model.ts`)

```typescript
export interface Product {
  name: string;
  price: number;
}

// DTO (Data Transfer Object) : représente ce que l'API retourne
// L'API ajoute un 'id' que le client ne connaît pas à la création
export interface ProductDTO extends Product {
  id: string;
}
```

### Le service (`core/services/product-httpclient.service.ts`)

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductDTO } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductHttpclientService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly base_url = "http://localhost:3000/products";

  getAllProducts(): Observable<ProductDTO[]> {
    return this._httpClient.get<ProductDTO[]>(this.base_url);
  }

  getProductById(id: string): Observable<ProductDTO> {
    return this._httpClient.get<ProductDTO>(`${this.base_url}/${id}`);
  }

  createProduct(product: Product): Observable<void> {
    return this._httpClient.post<void>(this.base_url, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this._httpClient.delete<void>(`${this.base_url}/${id}`);
  }
}
```

### Utilisation avec subscribe

```typescript
// Approche manuelle : subscribe + stockage dans une propriété
this._productsService.getAllProducts().subscribe({
  next: (value: ProductDTO[]) => { this.products = value; },
  error: (err) => { console.error(err); }
});
```

### Utilisation avec AsyncPipe (recommandé)

L'`AsyncPipe` s'abonne à l'Observable dans le template et **se désabonne automatiquement** à la destruction du composant :

```typescript
// Dans le composant : stocker l'Observable, pas les données
products$ = this._productsService.getAllProducts();
```

```html
<!-- Dans le template : le pipe async gère le cycle de vie -->
@for (product of products$ | async; track product.id) {
  <tr>
    <td>{{ product.name }}</td>
    <td>{{ product.price | currency:'EUR':'symbol':'1.2-2':'fr-BE' }}</td>
  </tr>
}
```

### Chaîner des requêtes avec mergeMap

```typescript
import { mergeMap } from 'rxjs';

// Supprimer un produit, puis recharger automatiquement la liste
deleteProduct(id: string) {
  this.products$ = this._productsService.deleteProduct(id).pipe(
    mergeMap(() => this._productsService.getAllProducts())
  );
}
```

### Convertir un Observable en Signal avec toSignal()

```typescript
import { toSignal } from '@angular/core/rxjs-interop';

// Convertit un Observable en Signal (utilisable sans subscribe ni AsyncPipe)
product = toSignal(this._productService.getProductById(id));
// product est maintenant un Signal<ProductDTO | undefined>
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `provideHttpClient()` | Active le client HTTP dans l'application |
| `inject(HttpClient)` | Injecte le client HTTP |
| `http.get<T>(url)` | Requête GET typée, retourne `Observable<T>` |
| `http.post<T>(url, body)` | Requête POST |
| `http.delete<T>(url)` | Requête DELETE |
| `http.patch<T>(url, body)` | Requête PATCH (modification partielle) |
| `AsyncPipe` | S'abonne/désabonne automatiquement dans le template |
| `mergeMap` | Opérateur RxJS : exécute un Observable à partir d'un autre |
| `toSignal()` | Convertit un Observable en Signal |
| DTO | _Data Transfer Object_ : interface calquée sur la réponse de l'API |

---

## 32 - Démo 19 - HTTP avec Signaux (httpResource)

**`httpResource()`** est l'approche **signal-based** pour les requêtes HTTP. Il fonctionne comme un `computed()` : il rejoue automatiquement la requête quand les signaux qu'il lit à l'intérieur de sa factory changent.

> Docs : [https://angular.dev/guide/http/making-requests#using-resources](https://angular.dev/guide/http/making-requests#using-resources)

### Générer le service et le composant

```bash
ng g service core/services/product-httpresource --skip-tests
ng g c features/demonstrations/demo19-http-signal --skip-tests
```

### Modèles pour la pagination (`shared/models/product.model.ts`)

```typescript
export interface PaginatedResponse<T> {
  first: number;       // Numéro de la première page
  prev: number | null; // Page précédente (null si première page)
  next: number | null; // Page suivante (null si dernière page)
  last: number;        // Numéro de la dernière page
  pages: number;       // Nombre total de pages
  items: number;       // Nombre total d'éléments
  data: T[];           // Les éléments de la page courante
}

export interface PaginationParams {
  _page: number;
  _per_page: number;
  _sort?: keyof Product | `-${keyof Product}`;
}
```

### Le service (`core/services/product-httpresource.service.ts`)

```typescript
import { HttpClient, HttpParams, HttpResourceRef, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductHttpresourceService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly base_url = "http://localhost:3000/products";

  // httpResource : pour la LECTURE (GET), retourne un Signal
  getAllProducts(): HttpResourceRef<ProductDTO[]> {
    return httpResource<ProductDTO[]>(() => this.base_url, { defaultValue: [] });
  }

  // Avec paramètres dynamiques : la factory lit un signal → relance auto si signal change
  getProductsWithParams(params: () => PaginationParams) {
    return httpResource<PaginatedResponse<ProductDTO>>(() => {
      const p = params();
      const query = new HttpParams({
        fromObject: { _page: String(p._page), _per_page: String(p._per_page) }
      });
      return { url: this.base_url, params: query };
    });
  }

  // HttpClient classique : pour les MUTATIONS (POST, DELETE, PATCH)
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base_url}/${id}`);
  }
}
```

### Le composant (`demo19-http-signal.ts`)

```typescript
import { Component, computed, inject, signal } from '@angular/core';
import { ProductHttpresourceService } from '../../../core/services/product-httpresource.service';

@Component({ /* ... */ })
export class Demo19HttpSignal {

  page     = signal(1);
  perPage  = signal(15);

  private readonly productService = inject(ProductHttpresourceService);

  // Signal contenant les paramètres → sa mise à jour déclenche httpResource
  private readonly paginationParams = signal({
    _page: this.page(), _per_page: this.perPage()
  });

  // httpResource lit paginationParams() → relance la requête si ce signal change
  response = this.productService.getProductsWithParams(() => this.paginationParams());

  // computed() extrait les données du signal de réponse
  products = computed(() => this.response.value()?.data ?? []);

  deleteProduct(id: string) {
    // Mutation avec HttpClient classique, puis .reload() pour rafraîchir
    this.productService.deleteProduct(id).subscribe({
      next: () => this.response.reload()
    });
  }

  loadPage(page: number) {
    // Mettre à jour le signal de params → httpResource relance automatiquement
    this.paginationParams.update(prev => ({ ...prev, _page: page }));
    this.page.set(page);
  }
}
```

### httpResource vs HttpClient Observable

| | `httpResource()` | `HttpClient` Observable |
|--|-----------------|------------------------|
| Type de retour | `HttpResourceRef<T>` (Signal) | `Observable<T>` |
| Lecture dans template | `resource.value()` | `resource$ \| async` |
| Réactivité | Automatique si signaux dans la factory changent | Manuel (subscribe) |
| Rafraîchissement | `.reload()` | Nouveau subscribe |
| Mutations (POST/DELETE) | Non adapté | Oui |
| Pagination réactive | Simple (signal de params) | Plus complexe |

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `httpResource(() => url)` | Crée une ressource HTTP réactive |
| `HttpResourceRef<T>` | Type retourné par `httpResource()` |
| `resource.value()` | Lit les données (Signal) |
| `resource.reload()` | Force un rechargement de la requête |
| Factory function | Fonction passée à `httpResource()`, lue comme un `computed()` |
| `HttpParams` | Construit les query parameters |
| `computed()` avec resource | Extrait et transforme les données d'une resource |

---

## 33 - Démo 20 - Storage (localStorage / sessionStorage)

**localStorage** et **sessionStorage** permettent de persister des données côté client dans le navigateur. Ce demo introduit un `StorageService` générique qui encapsule ces APIs.

> Docs Web : [https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

### Générer le service et le composant

```bash
ng g service core/services/storage --skip-tests
ng g c features/demonstrations/demo20-storage --skip-tests
```

### Le service (`core/services/storage.service.ts`)

```typescript
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  // localStorage : persiste entre toutes les sessions (onglets, fermetures du navigateur)

  setLocal<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));  // Sérialise l'objet en chaîne
  }

  getLocal<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;        // Désérialise et type
  }

  removeLocal(key: string): void { localStorage.removeItem(key); }
  clearLocal(): void              { localStorage.clear(); }

  // sessionStorage : limité à l'onglet et à la session courante

  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getSession<T>(key: string): T | null {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
  }

  removeSession(key: string): void { sessionStorage.removeItem(key); }
  clearSession(): void              { sessionStorage.clear(); }
}
```

### Le composant (`demo20-storage.ts`)

```typescript
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';

export interface Preferences {
  theme: string;
  language: string;
}

@Component({
  selector: 'app-demo20-storage',
  imports: [ReactiveFormsModule],
  templateUrl: './demo20-storage.html',
  styleUrl: './demo20-storage.css',
})
export class Demo20Storage implements OnInit {

  private readonly storageService = inject(StorageService);
  private readonly fb = inject(FormBuilder);

  // Charge les préférences sauvegardées, ou des valeurs par défaut
  preferences = signal(this.loadLocal());

  preferencesForm = this.fb.group({
    theme:    [this.preferences().theme],
    language: [this.preferences().language]
  });

  ngOnInit(): void {
    // Applique le thème sauvegardé dès l'ouverture du composant
    document.documentElement.setAttribute('data-bs-theme', this.preferences().theme);
  }

  loadLocal(): Preferences {
    // ?? : retourne la valeur de droite si la gauche est null/undefined
    return this.storageService.getLocal<Preferences>('preferences')
      ?? { theme: 'light', language: 'fr' };
  }

  apply() {
    this.storageService.setLocal('preferences', this.preferencesForm.value);  // 1. Persister
    this.preferences.set(this.preferencesForm.value as Preferences);          // 2. Signal
    document.documentElement.setAttribute('data-bs-theme', this.preferences().theme); // 3. DOM
  }

  removePreferences() {
    this.storageService.removeLocal('preferences');
    const defaults: Preferences = { theme: 'light', language: 'fr' };
    this.preferences.set(defaults);
    this.preferencesForm.setValue(defaults);
    document.documentElement.setAttribute('data-bs-theme', defaults.theme);
  }
}
```

### Comparaison localStorage vs sessionStorage

| | `localStorage` | `sessionStorage` |
|--|----------------|-----------------|
| Durée | Illimitée (jusqu'à suppression) | Session courante (onglet) |
| Portée | Tous les onglets du même domaine | Onglet actuel uniquement |
| Survit à la fermeture | Oui | Non |
| Usage typique | Préférences utilisateur, token | Compteurs, données temporaires |

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `localStorage` / `sessionStorage` | APIs web natives de stockage côté client |
| `JSON.stringify` / `JSON.parse` | Sérialisation nécessaire (le stockage ne gère que des chaînes) |
| Générics dans un service | `getLocal<T>()` retourne le bon type TypeScript |
| `??` (nullish coalescing) | Valeur par défaut si `null` ou `undefined` |
| `document.documentElement` | Accès à la balise `<html>` pour les attributs globaux |

---

## 34 - Démo 21 - Intercepteur HTTP et Authentification JWT

Un **intercepteur HTTP** intercepte toutes les requêtes sortantes pour les modifier (ex: ajouter un header d'authentification). Ce demo illustre un flux d'authentification complet avec **JWT** (JSON Web Token).

> Docs : [https://angular.dev/guide/http/interceptors](https://angular.dev/guide/http/interceptors)

### Installer jwt-decode

```bash
npm install jwt-decode
```

### Configurer l'intercepteur (`app.config.ts`)

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([tokenInterceptor])  // ← Active l'intercepteur
    )
  ]
};
```

### L'intercepteur (`core/interceptors/token-interceptor.ts`)

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = inject(AuthService).connectedUser()?.token;

  // Si pas de token : on laisse passer la requête telle quelle
  if (!token) return next(req);

  // Sinon : on clone la requête et on ajoute le header Authorization
  const secured = req.clone({
    setHeaders: { Authorization: `bearer ${token}` }
  });

  return next(secured);
};
```

### Modèles JWT (`shared/models/jwt.model.ts`)

```typescript
export interface JwtPayload {
  sub?: string;    // Subject (identifiant de l'utilisateur)
  email?: string;
  role?: string;
  exp?: number;    // Expiration (timestamp Unix)
  token: string;   // Le token JWT brut
}

export interface TokenInfo {
  token: string;
  expiration: Date | null;
}
```

### Service d'authentification (`core/services/auth.service.ts`)

```typescript
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { UserLogin, UserSignUp } from '../../shared/models/user.model';
import { JwtPayload, TokenInfo } from '../../shared/models/jwt.model';
import { jwtDecode } from 'jwt-decode';
import { StorageService } from './storage.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly http    = inject(HttpClient);
  private readonly storage = inject(StorageService);

  // Persiste entre les rechargements grâce au localStorage
  connectedUser = signal<JwtPayload | null>(
    this.storage.getLocal<JwtPayload>("payload")
  );

  login(login: UserLogin) {
    return this.http.post<TokenInfo>(`${environment.apiUrl}/api/auth/login`, login)
      .pipe(
        tap((token: TokenInfo) => this.decodeToken(token))
      );
  }

  signup(signup: UserSignUp) {
    return this.http.post<void>(`${environment.apiUrl}/api/auth/register`, signup);
  }

  private decodeToken(token: TokenInfo): void {
    // Décode le JWT pour extraire les claims (email, rôle, exp...)
    const claims = jwtDecode<JwtPayload>(token.token);
    this.connectedUser.set({ token: token.token, ...claims });
    this.storage.setLocal("payload", this.connectedUser());
  }

  logout() {
    this.connectedUser.set(null);
    this.storage.removeLocal("payload");
  }
}
```

### Fichier d'environnement (`src/environments/environment.ts`)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'  // URL de base de l'API
};
```

### @ViewChild — accéder à un élément du template

```typescript
import { ViewChild, ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';

export class Todolist {

  // Référence vers un élément DOM identifié par #modalEl dans le template
  @ViewChild('modalEl') modalEl!: ElementRef;

  openModal() {
    const modal = new Modal(this.modalEl.nativeElement);
    modal.show();
  }
}
```

```html
<!-- Template reference variable : #modalEl -->
<div #modalEl class="modal fade">...</div>
```

### Architecture du demo 21

```
demo21-interceptor/
├── demo21-interceptor.ts       ← Composant parent (orchestre connexion et todos)
├── auth-login/                 ← Formulaire de connexion (reactive form)
├── auth-signup/                ← Formulaire d'inscription (reactive form + passwordMatch)
├── todolist/                   ← Liste des todos (requêtes authentifiées via intercepteur)
└── todolist-add/               ← Formulaire d'ajout de todo
```

### Flux d'authentification JWT

```
1. Utilisateur soumet email + mot de passe
2. POST /api/auth/login → serveur retourne un token JWT
3. jwtDecode(token) → extrait les claims (email, rôle, exp)
4. connectedUser signal mis à jour + persisté dans localStorage
5. Pour toute requête suivante : l'intercepteur lit connectedUser().token
   et l'injecte dans le header "Authorization: bearer <token>"
6. L'API autorise la requête car elle reconnaît le token
```

### Notions couvertes

| Notion | Description |
|--------|-------------|
| `HttpInterceptorFn` | Type d'un intercepteur fonctionnel |
| `withInterceptors([...])` | Active les intercepteurs dans `provideHttpClient()` |
| `req.clone({ setHeaders })` | Clone une requête en ajoutant des headers |
| `next(req)` | Passe la requête au handler suivant (ou au serveur) |
| JWT | Token d'authentification encodé (header.payload.signature) |
| `jwtDecode<T>(token)` | Décode les claims d'un JWT sans vérification de signature |
| `environment` | Variables d'environnement (URL d'API, feature flags...) |
| `@ViewChild('ref')` | Référence vers un élément DOM ou composant enfant |
| Template reference variable | `#nomRef` dans le template HTML |

---

## 35 - Exercice 09 - Formulaire réactif avec validateur d'âge

**Objectif** : Créer un formulaire réactif avec un validateur personnalisé qui vérifie que l'utilisateur a l'âge minimum requis à partir d'une date de naissance.

### Générer le composant

```bash
ng g c features/exercices/exo09 --skip-tests
```

### Le validateur (`shared/validators/age.validator.ts`)

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ageValidator(minimum: number = 18): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const now       = new Date();
    const birthDate = new Date(control.value);

    // Calcul de l'âge
    let age = now.getFullYear() - birthDate.getFullYear();

    // Correction : l'anniversaire n'est pas encore passé cette année
    if (
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < minimum) {
      // Retourner un objet = INVALIDE (la clé est accessible via control.errors?.['age'])
      return { age: `Vous êtes trop jeune. Âge minimum requis : ${minimum} ans.` };
    }

    return null;  // null = VALIDE
  };
}
```

### Le composant (`exo09.ts`)

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ageValidator } from '../../../shared/validators/age.validator';

@Component({
  selector: 'app-exo09',
  imports: [ReactiveFormsModule],
  templateUrl: './exo09.html',
  styleUrl: './exo09.css',
})
export class Exo09 {

  private readonly _fb: FormBuilder = inject(FormBuilder);

  form: FormGroup = this._fb.group({
    birthDate: [null, [
      Validators.required,
      ageValidator()     // ← Validateur personnalisé avec âge minimum de 18 ans (par défaut)
      // ageValidator(21) // ← Ou avec un âge minimum personnalisé
    ]]
  });

  onSubmit() {
    if (this.form.invalid) return;
    console.log("Formulaire valide :", this.form.value);
  }
}
```

### Le template (`exo09.html`)

```html
<h2>Exercice 09 - Validateur d'âge</h2>

<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label for="birthDate">Date de naissance :</label>
    <input
      id="birthDate"
      type="date"
      formControlName="birthDate"
      [class.is-invalid]="form.get('birthDate')?.invalid && form.get('birthDate')?.touched"
    >

    @if (form.get('birthDate')?.errors?.['required'] && form.get('birthDate')?.touched) {
      <span class="text-danger">La date de naissance est requise.</span>
    }
    @if (form.get('birthDate')?.errors?.['age']) {
      <span class="text-danger">{{ form.get('birthDate')?.errors?.['age'] }}</span>
    }
  </div>

  <button type="submit" [disabled]="form.invalid">Valider</button>
</form>
```

### Anatomie d'un ValidatorFn

```
ValidatorFn = (control: AbstractControl) => ValidationErrors | null
```

### Notions pratiquées

| Notion | Description |
|--------|-------------|
| `ValidatorFn` | Type d'un validateur personnalisé |
| `AbstractControl` | Type générique pour accéder à `.value` dans un validator |
| `ValidationErrors` | Type `{ [key: string]: any }` pour les erreurs |
| Validateur avec paramètre | `ageValidator(minimum: number = 18)` |
| Calcul d'âge précis | Tenir compte du mois et du jour d'anniversaire |
| `errors?.['clé']` | Accès sécurisé aux erreurs dans le template |

---

## 36 - Récapitulatif des notions

### Data Binding

| Type | Syntaxe | Direction | Exemple |
|------|---------|-----------|---------|
| Interpolation | `{{ expr }}` | Composant → Template | `{{ firstname }}` |
| Property Binding | `[prop]="expr"` | Composant → DOM | `[src]="urlImage"` |
| Event Binding | `(event)="fn()"` | DOM → Composant | `(click)="save()"` |
| Two-way Binding | `[(ngModel)]="prop"` | Composant ↔ DOM | `[(ngModel)]="name"` |

### Composants Angular

| Concept | Description |
|---------|-------------|
| `@Component` | Décorateur qui définit un composant |
| `selector` | Balise HTML personnalisée |
| `imports` | Dépendances du composant (composants, directives, modules) |
| `templateUrl` / `template` | Template HTML externe ou inline |
| `styleUrl` / `styles` | Styles CSS externes ou inline (encapsulés par défaut) |

### Routing

| Concept | Description |
|---------|-------------|
| `Routes` | Configuration des routes de l'application |
| `RouterLink` | Directive pour la navigation par liens |
| `RouterOutlet` | Zone d'affichage des composants routés |
| `loadComponent` | Lazy loading d'un composant |
| `loadChildren` | Lazy loading de routes enfants |
| `path: '**'` | Route wildcard (page 404) |

### Pipes

| Concept | Description |
|---------|-------------|
| `@Pipe` | Décorateur qui définit un pipe |
| `transform()` | Méthode de transformation |
| Pipes intégrés | `lowercase`, `uppercase`, `date`, `currency`, `json` |
| Custom pipe | Créer avec `ng g pipe nom` |
| Paramètres | `{{ val \| pipe : param1 : param2 }}` |

### Directives

| Type | Exemples | Description |
|------|----------|-------------|
| Composant | `NgClass`, `NgStyle` | Modifie classes/styles |
| Structurelle | `*ngIf`, `*ngFor`, `*ngSwitch` | Modifie le DOM |
| Control Flow | `@if`, `@for`, `@switch` | Nouvelle syntaxe Angular 17+ |
| Personnalisée | `@Directive` + `[appXxx]` | Comportement réutilisable sur un élément |

### Communication entre composants

| Direction | Ancienne syntaxe | Nouvelle syntaxe |
|-----------|-----------------|------------------|
| Parent → Enfant | `@Input() prop` | `prop = input()` |
| Enfant → Parent | `@Output() evt = new EventEmitter()` | `evt = output()` |

### Services et Injection de dépendances

| Concept | Description |
|---------|-------------|
| `@Injectable()` | Décorateur qui marque une classe comme injectable |
| `providedIn: 'root'` | Singleton disponible dans toute l'application |
| `inject(Service)` | Injecte une instance (nouvelle façon) |
| `constructor(private svc: Service)` | Injection via constructeur (ancienne façon) |

### TypeScript essentiel

| Concept | Exemple |
|---------|---------|
| Types de base | `string`, `number`, `boolean` |
| Tableaux | `string[]` ou `Array<string>` |
| Interfaces | `interface User { name: string }` |
| Types union | `"M" \| "F" \| "X"` |
| Type alias | `type Unit = "celsius" \| "fahrenheit"` |
| Optionnel | `age?: number` |
| Assertion `!` | `value!: string` (sera assigné plus tard) |
| Cast de type | `event.target as HTMLInputElement` |

### Signals (réactivité moderne)

| Concept | Syntaxe |
|---------|---------|
| Créer | `signal(valeurInitiale)` |
| Lire | `monSignal()` |
| Écrire | `.set(valeur)` ou `.update(v => ...)` |
| Lecture seule | `.asReadonly()` |

### Cycle de vie

| Hook | Quand ? |
|------|---------|
| `ngOnInit` | Après l'initialisation du composant |
| `ngOnDestroy` | Avant la destruction du composant |

### Formulaires Réactifs

| Concept | Description |
|---------|-------------|
| `FormControl` | Champ individuel avec valeur et validateurs |
| `FormGroup` | Groupe de contrôles (y compris imbriqués) |
| `FormArray` | Liste dynamique de contrôles |
| `FormBuilder` | Service de création de formulaires (`inject(FormBuilder)`) |
| `[formGroup]` | Lie un FormGroup à un `<form>` |
| `formControlName` | Lie un input à un contrôle par son nom |
| `Validators` | Validateurs intégrés (`required`, `email`, `minLength`...) |
| `ValidatorFn` | Type pour les validateurs personnalisés |

### Routing avancé

| Concept | Description |
|---------|-------------|
| `Router.navigate([...])` | Navigation programmatique par segments |
| `Router.navigateByUrl('/...')` | Navigation par URL complète |
| `ActivatedRoute` | Informations sur la route active |
| `snapshot.params["id"]` | Paramètre de route (`:id`) |
| `snapshot.queryParams["k"]` | Paramètre de requête (`?k=v`) |
| `{ queryParams: {...} }` | Passer des query params à la navigation |

### Guards et Resolvers

| Concept | Description |
|---------|-------------|
| `CanActivateFn` | Protège l'accès à une route |
| `CanDeactivateFn` | Protège le départ d'une route |
| `canActivate: [guard]` | Configure un guard d'accès sur une route |
| `canDeactivate: [guard]` | Configure un guard de sortie sur une route |
| `ResolveFn<T>` | Précharge des données avant l'activation |
| `resolve: { clé: fn }` | Configuration du resolver dans la route |
| `snapshot.data["clé"]` | Accès aux données résolues |

### RxJS et Observables

| Concept | Description |
|---------|-------------|
| `Observable<T>` | Flux de valeurs émises dans le temps |
| `BehaviorSubject<T>` | Observable qui retient et réémet sa dernière valeur |
| `.next(value)` | Émet une nouvelle valeur dans un Subject |
| `.subscribe({ next })` | S'abonne pour réagir aux émissions |
| `AsyncPipe` | Gère le subscribe/unsubscribe automatiquement dans le template |
| `mergeMap` | Opérateur : exécute un Observable à partir d'un autre |
| `toSignal()` | Convertit un Observable en Signal |
| Convention `$` | Suffixe pour les variables de type Observable |

### HTTP

| Concept | Description |
|---------|-------------|
| `provideHttpClient()` | Active HttpClient dans l'application |
| `withInterceptors([...])` | Active les intercepteurs |
| `http.get/post/delete/patch<T>()` | Méthodes HTTP typées |
| `httpResource(() => url)` | Requête HTTP réactive (signal-based) |
| `HttpResourceRef<T>.value()` | Lit les données d'une resource (Signal) |
| `.reload()` | Rafraîchit une HttpResource |
| DTO | _Data Transfer Object_ : interface calquée sur la réponse API |

### Intercepteurs et Authentification JWT

| Concept | Description |
|---------|-------------|
| `HttpInterceptorFn` | Type d'un intercepteur fonctionnel |
| `req.clone({ setHeaders })` | Clone une requête en ajoutant des headers |
| `next(req)` | Passe la requête au handler suivant |
| JWT | Token d'authentification encodé (header.payload.signature) |
| `jwtDecode<T>(token)` | Décode les claims d'un JWT |
| `environment` | Variables d'environnement (URL d'API, feature flags) |
| `@ViewChild('ref')` | Référence vers un élément DOM ou composant enfant |

### Storage

| Concept | Description |
|---------|-------------|
| `localStorage` | Persistant entre toutes les sessions |
| `sessionStorage` | Limité à l'onglet/session courante |
| `JSON.stringify/parse` | Sérialisation nécessaire pour le stockage |
| `??` (nullish coalescing) | Valeur par défaut si `null` ou `undefined` |

### Commandes CLI utiles

```bash
ng new mon-projet              # Créer un projet
ng serve -o                    # Lancer le serveur + ouvrir le navigateur
ng g c nom-composant           # Générer un composant
ng g pipe nom-pipe             # Générer un pipe
ng g directive nom-directive   # Générer une directive
ng g service nom-service       # Générer un service
ng build                       # Compiler pour la production
```

---

## Ressources

- [Documentation officielle Angular](https://angular.dev)
- [Guide des composants](https://angular.dev/guide/components)
- [Guide des templates et bindings](https://angular.dev/guide/templates)
- [Guide du Routing](https://angular.dev/guide/routing)
- [Guide des Pipes](https://angular.dev/guide/pipes)
- [Guide des Directives](https://angular.dev/guide/directives)
- [Guide des Directives d'attribut](https://angular.dev/guide/directives/attribute-directives)
- [Guide des Signals](https://angular.dev/guide/signals)
- [Guide des Inputs](https://angular.dev/guide/components/inputs)
- [Guide des Outputs](https://angular.dev/guide/components/outputs)
- [Guide de l'injection de dépendances](https://angular.dev/guide/di)
- [Guide des Formulaires Réactifs](https://angular.dev/guide/forms/reactive-forms)
- [Guide HTTP](https://angular.dev/guide/http)
- [Guide des Intercepteurs](https://angular.dev/guide/http/interceptors)
- [Guide des Guards et Resolvers](https://angular.dev/guide/routing/common-router-tasks)
- [Interopérabilité RxJS ↔ Signals](https://angular.dev/guide/signals/rxjs-interop)
- [Guide des formulaires](https://angular.dev/guide/forms)
- [Référence de la CLI Angular](https://angular.dev/tools/cli)
