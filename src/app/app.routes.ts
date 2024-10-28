import { Routes } from '@angular/router';
import { AboveTheFoldComponent } from './components/above-the-fold/above-the-fold.component';
import { WorkComponent } from './components/work/work.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ConnectComponent } from './components/connect/connect.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AddComponent } from './components/add/add.component';
import { GalleryViewComponent } from './components/gallery-view/gallery-view.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: AboveTheFoldComponent},
    {path: 'work', component: WorkComponent},
    {path: 'work/:categoryId', component: WorkComponent},
    {path: 'work/:categoryId/:subCategoryId', component: GalleryViewComponent},
    {path: 'about', component: AboutMeComponent},
    {path: 'connect', component: ConnectComponent},
    {path: 'imprint', component: ImprintComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    { 
        path: 'admin', 
        loadComponent: () => import('./components/add/add.component').then(m => m.AddComponent),
        canActivate: [authGuard]
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
     
];
