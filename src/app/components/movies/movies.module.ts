import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MoviesListingComponent } from './movies-listing/movies-listing.component';
import { MoviesSingleComponent } from './movies-single/movies-single.component';
import { SharedModule } from 'src/app/components/shared/shared.module';

const routes: Routes = [
  { path: '', component: MoviesListingComponent },
  { path: 'movie/:id', component: MoviesSingleComponent},
];

@NgModule({
    declarations: [
        MoviesListingComponent,
        MoviesSingleComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        
    ],
    exports: [
        MoviesListingComponent,
        MoviesSingleComponent
    ],
    providers:[
        MoviesListingComponent,
        MoviesSingleComponent
    ]
  
})

export class MoviesModule { }