import { UsersComponent } from './components/users/users.component';
import { AddClubComponent } from './components/addClub/addClub.component';
import { ClubViewComponent } from './components/clubView/clubView.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ClubsComponent } from '../app/components/clubs/clubs.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'club/:id', component: ClubViewComponent },
  { path: 'addClub', component: AddClubComponent },
  { path: 'users', component: UsersComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
