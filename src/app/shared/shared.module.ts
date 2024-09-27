import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarComponent, FooterComponent, AlertComponent]
})
export class SharedModule { }
