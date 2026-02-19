# Formation Angular - Guide pas-à-pas 🥸

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
24. [Récapitulatif des notions](#24---récapitulatif-des-notions)

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
    │   └── services/
    │       └── authentication.ts       ← Service d'authentification (DI)
    ├── shared/
    │   ├── models/
    │   │   ├── user.model.ts           ← Interface User partagée
    │   │   └── product.model.ts        ← Interface Product partagée
    │   ├── directives/
    │   │   └── highlight.ts            ← Directive personnalisée de surlignage
    │   └── pipes/
    │       ├── chrono-pipe.ts          ← Pipe pour formater le chrono
    │       ├── convert-to-dhms-pipe.ts ← Pipe pour convertir en jours/heures/min/sec
    │       ├── sum-pipe.ts             ← Pipe pour sommer un tableau
    │       └── temperature-pipe.ts     ← Pipe pour convertir les températures
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
        │   └── demo12-services-di/
        └── exercices/
            ├── exercices.ts
            ├── exercices.routes.ts
            ├── exo01/
            ├── exo02/
            ├── exo03/
            ├── exo05/
            ├── exo06/
            └── exo07/
                ├── add-product/        ← Composant enfant (formulaire)
                └── list-products/      ← Composant enfant (liste)
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

## 24 - Récapitulatif des notions

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
- [Guide des formulaires](https://angular.dev/guide/forms)
- [Référence de la CLI Angular](https://angular.dev/tools/cli)



