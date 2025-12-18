import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'about', loadChildren: () => import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES) },
  { path: 'tasks', loadChildren: () => import('./features/task/tasks.routes').then((m) => m.TASK_ROUTES) },
];
