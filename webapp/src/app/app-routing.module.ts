import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HospitalComponent } from './hospital/hospital.component';

const routes: Routes = [
  {path : 'Home', component: HomeComponent},
  {path : 'Hospital', component: HospitalComponent},
  {path : '', redirectTo:'/Home', pathMatch:'full'},
  {path : '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
