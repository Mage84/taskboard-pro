import { Routes } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'tasks', loadChildren: () => import('./features/task/tasks.routes').then((m) => m.TASK_ROUTES)
  }
];
