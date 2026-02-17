import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserWithId } from '../../../shared/models/user.model';

@Component({
  selector: 'app-demo16-resolvers',
  imports: [],
  templateUrl: './demo16-resolvers.html',
  styleUrl: './demo16-resolvers.css',
})
export class Demo16Resolvers implements DoCheck {
  
  private readonly _router: Router = inject(Router);
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  
  user!: UserWithId;
  
  ngDoCheck(): void {
    console.log('this._activatedRoute.snapshot.data :>> ', this._activatedRoute.snapshot.data);
    this.user = this._activatedRoute.snapshot.data["data"];
  }
  navigateTo(userId: number) {
    this._router.navigate(["demonstrations", "demo16", userId]);
  }
}
