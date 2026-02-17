import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo15-guards',
  imports: [],
  templateUrl: './demo15-guards.html',
  styleUrl: './demo15-guards.css',
})
export class Demo15Guards {

  private readonly _router: Router = inject(Router);

  navigateToSecret() {
    this._router.navigate(["demonstrations", "demo15-secret"]);
  }

}
