import { Routes } from "@angular/router";

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import("./exercices")
      .then(c => c.Exercices)
  },
  {
    path: 'exo01',
    loadComponent: () => import("./exo01/exo01")
      .then(c => c.Exo01)
  },
  {
    path: 'exo02',
    loadComponent: () => import("./exo02/exo02")
      .then(c => c.Exo02)
  },
  {
    path: 'exo03',
    loadComponent: () => import("./exo03/exo03")
      .then(c => c.Exo03)
  },
  {
    path: 'exo05',
    loadComponent: () => import("./exo05/exo05")
      .then(c => c.Exo05)
  },
  {
    path: 'exo06',
    loadComponent: () => import("./exo06/exo06")
      .then(c => c.Exo06)
  },
  {
    path: 'exo07',
    loadComponent: () => import("./exo07/exo07")
      .then(c => c.Exo07)
  },
  {
    path: 'exo08',
    loadComponent: () => import("./exo08/exo08")
      .then(c => c.Exo08)
  },
  {
    path: 'exo09',
    loadComponent: () => import("./exo09/exo09")
      .then(c => c.Exo09)
  },
];