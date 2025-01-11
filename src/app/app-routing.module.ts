import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventComponent } from './list-event/list-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', redirectTo: '/event', pathMatch: 'full' },
  { path: 'event', component: ListEventComponent },

  { path: 'add-event', component: AddEventComponent },
  { path: 'not-found', component: Page404Component },

  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
