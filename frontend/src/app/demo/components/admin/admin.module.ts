import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AdminRoutingModule } from './admin-routing.module';
import { ComputerComponent } from './computer/computer.component';
import { LanguageSkillsComponent } from './language-skills/language-skills.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';
import { OthertSkillsComponent } from './othert-skills/othert-skills.component';


@NgModule({
  declarations: [ComputerComponent,LanguageSkillsComponent,SoftSkillsComponent,OthertSkillsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    AdminRoutingModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    ToolbarModule,
    CardModule,
    MultiSelectModule,
    SelectButtonModule,
  ]
})
export class AdminModule { }
