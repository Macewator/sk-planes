import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { FlightEditComponent } from './flights/flight-edit/flight-edit.component';
import { FlightsComponent } from './flights/flights.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'full'
      },
      {
        path: 'flights',
        component: FlightsComponent
      },
      {
        path: 'flights/:key',
        component: FlightEditComponent
      }
    ]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
