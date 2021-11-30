import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { MoviesService } from 'src/app/components/movies/movies.service';
import { ToastrModule } from 'ngx-toastr';


import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { MoviesState }  from 'src/app/store/states/movies.state';


@NgModule({
  declarations: [
    AppComponent,
 
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    ToastrModule.forRoot(),

    NgxsModule.forRoot([ MoviesState ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()

   
  ],
  providers: [
    MoviesService,
    
  ],
  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { 
 
}
