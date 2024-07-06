import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerComponent } from './computer/computer.component';
import { LanguageSkillsComponent } from './language-skills/language-skills.component';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';
import { OthertSkillsComponent } from './othert-skills/othert-skills.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ComputerComponent },
    { path: 'language', component: LanguageSkillsComponent },
    { path: 'soft', component: SoftSkillsComponent },
    { path: 'other', component: OthertSkillsComponent }
])],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
