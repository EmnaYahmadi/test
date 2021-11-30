import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  

})
export class AppComponent {
  title = 'MoviesApp';
  
  onActivate() {
    if(typeof window != "undefined"){
      window.scrollTo(0, 0);
    }
  }
  
}
