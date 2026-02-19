import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserLogin } from '../../../shared/models/user.model';

@Component({
  selector: 'app-demo01-interpolation',
  imports: [],
  templateUrl: './demo01-interpolation.html',
  styleUrl: './demo01-interpolation.css',
})
export class Demo01Interpolation implements OnInit, OnDestroy {

  firstname: string = "Quentin";
  age: number = 29;
  isDeveloper: boolean = true;

  maVariable1!: string; // Definite assignment assertion
  declare maVariable2: string; // Ambient declaration

  maVariable3: string | null = null;
  maVariable4?: string = undefined;

  maVariable5: number[] = [1, 2, 3, 4, 5]; // ❤️
  maVariable6: Array<number> = [1, 2, 3, 4, 5];

  maVariable7: unknown; // Principalement utilisé dans des méthodes (indication)
  maVariable8!: never; // Principalement utilisé dans des méthodes (indication)

  maVariable9: { lastname: string } = { lastname: 'Geerts' };
  maVariable10: User = {
    email: "quentin.geerts@bstorm.be",
    lastname: 'Geerts',
    firstname: "Quentin"
  };

  maVariable11: User[] = [
    this.maVariable10,
    { email: "", lastname: "", firstname: "" }
  ];

  // Injection de dépendance
  constructor() { }

  // La méthode du cycle de vie lors de l'initialisation du composant
  ngOnInit(): void {
    // Initialisation des variables
    // Abonnements aux sujets d'observation
    // ...

    this.maVariable1 = "Hello World !";
    this.maVariable2 = "Hi";
  }

  // La méthode du cycle de vie lors de la destruction du composant (quand on part du composant)
  ngOnDestroy(): void {
    // Désabonnements aux sujets d'observation
  }

  maMethode(a: string): string {
    return a;
  }

}
