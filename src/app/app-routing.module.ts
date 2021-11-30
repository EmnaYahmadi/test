import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesModule } from 'src/app/components/movies/movies.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('src/app/components/movies/movies.module').then(m => m.MoviesModule) }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MoviesModule
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
