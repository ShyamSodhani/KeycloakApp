import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/utility/app.guard';
import {QueryComponent} from './query/query.component';
import {TrainingComponent} from './training/training.component'

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  {path:'query', component: QueryComponent},
  {path:'training', component: TrainingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
