import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurmalinaComponent } from './turmalina.component';
import { MapleafComponent } from './mapleaf/mapleaf.component';

const routes: Routes = [
  { path: '', component: TurmalinaComponent, children:[
    {path: '', redirectTo: 'mapleaf', pathMatch: 'full'},
    { path: 'mapleaf', component: MapleafComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurmalinaRoutingModule { }
