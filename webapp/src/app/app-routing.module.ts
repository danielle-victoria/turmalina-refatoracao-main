import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  { 
    path: 'documentation',
     loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  },
  // { 
  //   path: '',
  //    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  // },
  { 
    path: 'sandboxtest',
     loadChildren: () => import('./sandbox/sandbox.module').then(m => m.SandboxModule) 
  },
  { 
    path: 'logsteste',
     loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule) 
  },
  { 
    path: 'turmalina',
    loadChildren: () => import('./turmalina/turmalina.module').then(m => m.TurmalinaModule) 
  },
  { 
    path: 'rank',
     loadChildren: () => import('./rank/rank.module').then(m => m.RankModule) 
  },
  { 
    path: 'report',
     loadChildren: () => import('./report/report.module').then(m => m.ReportModule) 
  },
  { 
    path: 'evaluation',
     loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule) 
  },
  {
    path: '',
    redirectTo: 'turmalina',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
      {
        //useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    ),
    NgCircleProgressModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
