import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";
import { confirmGuard } from "../../core/guards/confirm.guard";

export const routes: Routes = [
  // { path: '', component: Demonstrations },
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
  {
    path: 'demo03',
    loadComponent: () => import("./demo03-event-binding/demo03-event-binding")
      .then(c => c.Demo03EventBinding)
  },
  {
    path: 'demo04',
    loadComponent: () => import("./demo04-twoway-binding/demo04-twoway-binding")
      .then(c => c.Demo04TwowayBinding)
  },
  {
    path: 'demo05',
    loadComponent: () => import("./demo05-routing/demo05-routing")
      .then(c => c.Demo05Routing)
  },
  {
    path: 'demo06',
    loadComponent: () => import("./demo06-pipes/demo06-pipes")
      .then(c => c.Demo06Pipes)
  },
  {
    path: 'demo07',
    loadComponent: () => import("./demo07-custom-pipes/demo07-custom-pipes")
      .then(c => c.Demo07CustomPipes)
  },
  {
    path: 'demo08',
    loadComponent: () => import("./demo08-component-directives/demo08-component-directives")
      .then(c => c.Demo08ComponentDirectives)
  },
  {
    path: 'demo09',
    loadComponent: () => import("./demo09-structural-directives/demo09-structural-directives")
      .then(c => c.Demo09StructuralDirectives)
  },
  {
    path: 'demo10',
    loadComponent: () => import("./demo10-custom-directives/demo10-custom-directives")
      .then(c => c.Demo10CustomDirectives)
  },
  {
    path: 'demo11',
    loadComponent: () => import("./demo11-communication-composants/demo11-communication-composants")
      .then(c => c.Demo11CommunicationComposants)
  },
  {
    path: 'demo12',
    loadComponent: () => import("./demo12-services-di/demo12-services-di")
      .then(c => c.Demo12ServicesDi)
  },
  {
    path: 'demo13',
    loadComponent: () => import("./demo13-reactive-forms/demo13-reactive-forms")
      .then(c => c.Demo13ReactiveForms)
  },
  {
    path: 'demo14',
    loadComponent: () => import("./demo14-advanced-routing/demo14-advanced-routing")
      .then(c => c.Demo14AdvancedRouting)
  },
  {
    path: 'demo14/:id',
    loadComponent: () => import("./demo14-advanced-routing/demo14-advanced-routing")
      .then(c => c.Demo14AdvancedRouting)
  },
  {
    path: 'demo15',
    loadComponent: () => import("./demo15-guards/demo15-guards")
      .then(c => c.Demo15Guards)
  },
  {
    path: 'demo15-secret',
    loadComponent: () => import("./demo15-guards/demo15-secret/demo15-secret")
      .then(c => c.Demo15Secret),
    canActivate: [authGuard],
    canDeactivate: [confirmGuard]
  }
];