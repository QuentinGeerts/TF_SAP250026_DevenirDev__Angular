import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demo14-advanced-routing',
  imports: [],
  templateUrl: './demo14-advanced-routing.html',
  styleUrl: './demo14-advanced-routing.css',
})
export class Demo14AdvancedRouting implements OnInit {

  // Fournit les outils pour naviguer
  private readonly _router: Router = inject(Router);

  // Fournit les informations présentes dans la route
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  id!: number;
  person!: { lastname: string, firstname: string, extra?: { age: number, job: string } };

  ngOnInit(): void {

    console.log('_activatedRoute :>> ', this._activatedRoute);

    // Récupération du params (id)
    if (this._activatedRoute.snapshot.params["id"]) {
      this.id = this._activatedRoute.snapshot.params["id"];
      console.log('id :>> ', this.id);
    }

    // Récupération du queryParams (jeu de données)
    if (this._activatedRoute.snapshot.queryParams["lastname"]) {
      const { lastname, firstname, job, age } = this._activatedRoute.snapshot.queryParams;

      this.person = {
        lastname,
        firstname,
        extra: {
          age, job
        }
      }

      console.log('lastname :>> ', lastname);
      console.log('firstname :>> ', firstname);
    }

  }

  navigate() {
    this._router.navigate(["demonstrations", "demo14", "routage"]);
    // this._router.navigateByUrl("/demonstrations/demo14/routage");  
  }

  navigateWithParams() {
    this._router.navigate(["demonstrations", "demo14", 42]);
  }

  navigateWithQueryParams() {
    this._router.navigate(["demonstrations", "demo14"], {
      queryParams: { lastname: "Geerts", firstname: "Quentin", age: 29, job: 'coach' }
    })
  }

}
