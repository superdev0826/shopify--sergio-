import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BootstrapNavbarComponent } from './components/bootstrap-navbar/bootstrap-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BootstrapNavbarComponent,
    HomeComponent,
    LoginComponent,
  ],
  exports: [
    BootstrapNavbarComponent
  ]
})
export class CoreModule { }
