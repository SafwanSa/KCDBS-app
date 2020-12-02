import { ClubViewComponent } from './components/clubView/clubView.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//
import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { HomeComponent } from '../app/components/home/home.component';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { ClubsComponent } from '../app/components/clubs/clubs.component';
import { ClubComponent } from '../app/components/clubs/club/club.component';
//
import { AuthService } from '../app/services/auth.service';
import { PathRequester } from './shared/pathRequester';
import { ClubService } from './services/club.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Angular Material
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ClubsComponent,
    ClubComponent,
    ClubViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Angular Material
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [AuthService, PathRequester, ClubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
