import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
    ],
  exports: [
      RouterModule
    ]
})
export class AppRoutingModule { }
