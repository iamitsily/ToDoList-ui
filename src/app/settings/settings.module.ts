import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormComponent } from './components/settings-form/settings-form.component';
import { SettingsPagComponent } from './pages/settings-pag/settings-pag.component';


@NgModule({
  declarations: [
    SettingsFormComponent,
    SettingsPagComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
